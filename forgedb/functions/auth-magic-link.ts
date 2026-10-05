// Edge Function: auth-magic-link
// service_role 키로 ForgeDB admin REST API 를 직접 호출해
// magiclink 의 action_link 를 반환한다. (외부 import 금지 정책)
//
// POST: { "email": "...", "redirect_to": "https://..." (선택) }
// 200:  { "ok": true, "email": "...", "action_link": "https://..." }
//
// NOTE: 기존 `issue-admin-magic-link` 는 특정 이메일로 하드코딩되어 있고
// redirect_to 가 만료된 라이브 호스트로 박혀 있어 재사용 불가. 이 함수는 그 자리를
// 범용으로 대체하며, `role=admin` 인 계정 외에는 거부한다.
//
// 어드민 판정 기준 = 계정 메타데이터 role (마이그레이션 0008_admin_by_role.sql).
//   • raw_app_meta_data.role  — 서비스 롤 키로만 부여 가능 (RLS 판정용, 권장)
//   • raw_user_meta_data.role — 콘솔 Users 탭 / auth.updateUser() 로 부여
// 화이트리스트(이메일 하드코딩)는 쓰지 않으므로, 어드민을 추가·삭제할 때 이
// 함수를 고칠 필요 없이 계정 role 만 바꾸면 된다.

const FORGEDB_URL = Deno.env.get("FORGEDB_URL");
const FORGEDB_SERVICE_ROLE_KEY = Deno.env.get("FORGEDB_SERVICE_ROLE_KEY");

/** 해당 이메일의 계정이 어드민(role=admin)인지 서비스 롤 키로 확인한다. */
async function isAdminAccount(email: string): Promise<boolean> {
  const r = await fetch(`${FORGEDB_URL!.replace(/\/$/, "")}/auth/v1/admin/users`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      "apikey": FORGEDB_SERVICE_ROLE_KEY!,
      "authorization": `Bearer ${FORGEDB_SERVICE_ROLE_KEY!}`,
    },
  });
  if (!r.ok) return false;
  const text = await r.text();
  let parsed: any;
  try { parsed = JSON.parse(text); } catch { return false; }
  const users: any[] = Array.isArray(parsed?.users) ? parsed.users : [];
  const u = users.find((x) => String(x?.email || "").toLowerCase() === email);
  if (!u) return false;
  return (u?.app_metadata?.role ?? u?.user_metadata?.role) === "admin";
}

function json(status: number, body: unknown) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json",
      "access-control-allow-origin": "*",
      "access-control-allow-headers": "authorization, content-type, apikey",
      "access-control-allow-methods": "POST, OPTIONS",
    },
  });
}

Deno.serve(async (req: Request) => {
  // CORS preflight
  if (req.method === "OPTIONS") return json(204, {});
  if (req.method !== "POST") return json(405, { error: "method_not_allowed" });
  if (!FORGEDB_URL || !FORGEDB_SERVICE_ROLE_KEY) {
    return json(500, { error: "missing_env" });
  }

  let payload: { email?: string; redirect_to?: string } = {};
  try { payload = await req.json(); } catch { return json(400, { error: "invalid_json" }); }

  const email = (payload.email || "").trim().toLowerCase();
  if (!email) return json(400, { error: "missing_email" });
  if (!(await isAdminAccount(email))) {
    return json(403, { error: "not_admin_account" });
  }

  // redirect_to 가 없으면 요청의 Origin 을 사용 (dev / production 모두 동작).
  let redirectTo: string;
  try {
    const u = new URL(req.url);
    const origin = req.headers.get("origin") || `${u.protocol}//${u.host}`;
    redirectTo = (payload.redirect_to && /^https?:\/\//i.test(payload.redirect_to))
      ? payload.redirect_to
      : `${origin.replace(/\/$/, "")}/#admin`;
  } catch {
    redirectTo = payload.redirect_to || "http://127.0.0.1:4193/#admin";
  }

  // ForgeDB admin endpoint: /auth/v1/admin/generate_link
  const url = `${FORGEDB_URL.replace(/\/$/, "")}/auth/v1/admin/generate_link`;
  const r = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "apikey": FORGEDB_SERVICE_ROLE_KEY,
      "authorization": `Bearer ${FORGEDB_SERVICE_ROLE_KEY}`,
    },
    body: JSON.stringify({
      type: "magiclink",
      email,
      options: { redirect_to: redirectTo },
    }),
  });

  const text = await r.text();
  if (!r.ok) {
    return json(r.status, { error: "generate_link_failed", detail: text });
  }

  let parsed: any;
  try { parsed = JSON.parse(text); } catch {
    return json(500, { error: "bad_response", detail: text });
  }

  const actionLink: string | undefined = parsed?.properties?.action_link
    ?? parsed?.action_link
    ?? parsed?.link;

  if (!actionLink) {
    return json(500, { error: "no_action_link", detail: parsed });
  }

  return json(200, {
    ok: true,
    email,
    action_link: actionLink,
    sent_at: new Date().toISOString(),
  });
});