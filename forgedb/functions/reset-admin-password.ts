// ============================================================================
//  ForgeDB Edge Function: reset-admin-password
//
//  jays@blueforge.space 의 비밀번호를 강제로 재설정한다.
//  service_role 키로 GoTrue/PostgREST admin API 를 직접 호출해
//  인증 풀에서 사용자를 영구 삭제한 뒤 동일 이메일로 새 사용자를 만든다.
//  메타데이터(role:admin) 까지 일관성 있게 복구.
//
//  호출 방법:
//    POST https://forgedb.cloud/api/v1/kvcf-jt1bd3/functions/v1/reset-admin-password
//    Headers:
//      Authorization: Bearer <service_role_key>
//      Content-Type: application/json
//    Body (선택):
//      { "new_password": "..." }   // 기본값: Jays@Blueforge2026!
//
//  보안:
//    - service_role 키만 호출 가능 (anon 호출은 401).
//    - 본 함수는 1 회 사용 후 삭제 권장.
// ============================================================================

const TARGET_EMAIL = "jays@blueforge.space";
const DEFAULT_PASSWORD = "Jays@Blueforge2026!";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json; charset=utf-8" },
  });
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, 405);

  const PROJECT_URL = Deno.env.get("FORGEDB_URL") || "https://forgedb.cloud/api/v1/kvcf-jt1bd3";
  const SERVICE_ROLE_KEY = Deno.env.get("FORGEDB_SERVICE_ROLE_KEY") || "";

  if (!SERVICE_ROLE_KEY) return json({ error: "service_role_key_not_configured" }, 500);

  const authHeader = req.headers.get("authorization") || "";
  const presented = authHeader.replace(/^Bearer\s+/i, "");
  if (presented !== SERVICE_ROLE_KEY) return json({ error: "unauthorized" }, 401);

  let newPassword = DEFAULT_PASSWORD;
  try {
    const body = await req.json();
    if (body && typeof body.new_password === "string" && body.new_password.length >= 8) {
      newPassword = body.new_password;
    }
  } catch {
    // 본문 없음 → 기본값
  }

  const adminHeaders = {
    "Authorization": `Bearer ${SERVICE_ROLE_KEY}`,
    "apikey": SERVICE_ROLE_KEY,
    "Content-Type": "application/json",
  };

  // 1) 기존 사용자 조회 (페이지네이션: 50명 단위로 1000명까지 안전)
  let targetUserId: string | null = null;
  for (let page = 1; page <= 20; page++) {
    const listUrl = `${PROJECT_URL}/auth/v1/admin/users?page=${page}&per_page=50`;
    const listResp = await fetch(listUrl, { headers: adminHeaders });
    if (!listResp.ok) return json({ error: "list_users_failed", status: listResp.status }, 500);
    const listJson = await listResp.json();
    const users: Array<{ id: string; email?: string | null }> = listJson?.users ?? listJson ?? [];
    const found = users.find((u) => (u.email ?? "").toLowerCase() === TARGET_EMAIL.toLowerCase());
    if (found) {
      targetUserId = found.id;
      break;
    }
    if (users.length < 50) break;
  }

  // 2) 기존 사용자 영구 삭제
  let deleted = false;
  if (targetUserId) {
    const delUrl = `${PROJECT_URL}/auth/v1/admin/users/${targetUserId}`;
    const delResp = await fetch(delUrl, {
      method: "DELETE",
      headers: adminHeaders,
    });
    if (!delResp.ok) {
      const txt = await delResp.text();
      return json({ error: "delete_user_failed", status: delResp.status, detail: txt }, 500);
    }
    deleted = true;
  }

  // 3) 동일 이메일로 새 사용자 생성 (메타데이터 포함)
  const createUrl = `${PROJECT_URL}/auth/v1/admin/users`;
  const createResp = await fetch(createUrl, {
    method: "POST",
    headers: adminHeaders,
    body: JSON.stringify({
      email: TARGET_EMAIL,
      password: newPassword,
      email_confirm: true,
      user_metadata: {
        name: "jays",
        role: "admin",
        member_type: "individual",
      },
    }),
  });
  if (!createResp.ok) {
    const txt = await createResp.text();
    return json({ error: "create_user_failed", status: createResp.status, detail: txt }, 500);
  }
  const created = await createResp.json();

  return json({
    ok: true,
    email: TARGET_EMAIL,
    new_password: newPassword,
    user_id: created?.id ?? null,
    recreated: deleted,
    note: "1회 사용 후 함수를 삭제하거나 service_role 키를 회전하세요.",
  });
});