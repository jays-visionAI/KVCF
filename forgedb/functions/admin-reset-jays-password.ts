// ============================================================================
// forgedb/functions/admin-reset-jays-password.ts  (v4, postgres.js 직접 연결)
//
// 응급 복구: jays@blueforge.space 의 비밀번호를 직접 Postgres 연결 + pgcrypto 로
// 즉시 재설정. REST admin API 가 막힌 환경 대비책.
//
// ⚠️ 사용 후 함수 삭제 / is_public=false 유지 권장.
// ============================================================================

// deno-lint-ignore-file no-explicit-any

import postgres from "npm:@vercel/postgres-generator"; // 가용성 검증 필요
// 또는
import postgresDriver from "npm:postgres";

const TARGET_EMAIL = "jays@blueforge.space";

Deno.serve(async (req: Request): Promise<Response> => {
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, 405);

  let body: { new_password?: string };
  try {
    body = await req.json();
  } catch {
    return json({ error: "invalid_json" }, 400);
  }
  const newPassword = (body?.new_password ?? "").trim();
  if (newPassword.length < 8) return json({ error: "password_too_short" }, 400);

  const dbUrl = Deno.env.get("FORGEDB_DATABASE_URL") ??
    Deno.env.get("DATABASE_URL") ??
    Deno.env.get("POSTGRES_URL");

  if (!dbUrl) {
    return json({
      error: "missing_env",
      message: "FORGEDB_DATABASE_URL / DATABASE_URL 환경변수가 필요합니다. 콘솔의 Connection string 을 주입해 주세요.",
      hint: "ForgeDB 콘솔 → Project → Settings → Database → Connection string (Direct)",
    }, 500);
  }

  let sql: any;
  try {
    sql = postgresDriver(dbUrl, { max: 1, prepare: false });
  } catch (e) {
    return json({ error: "client_init_failed", detail: String(e) },
  }

  try {
    // pgcrypto 가 이미 설치돼 있는지 확인 후 무결 설정
    await sql`create extension if not exists pgcrypto`;

    // 1) 대상 사용자 확인 — 화이트리스트 강제
    const targetRows = await sql<{ id: string; email: string }[]>`
      select id::text, email
        from auth.users
       where lower(email) = lower(${TARGET_EMAIL})
       limit 1
    `;
    if (!targetRows.length) {
      return json({ error: "user_not_found", target: TARGET_EMAIL }, 404);
    }
    const target = targetRows[0];

    // 2) bcrypt 해시 생성 (cost 10) + UPDATE
    //    pgcrypto 의 crypt(pw, gen_salt('bf', 10)) 는 표준 $2b$ 해시를 만듭니다.
    const updRows = await sql<{ updated_at: string }[]>`
      update auth.users
         set encrypted_password = crypt(${newPassword}, gen_salt('bf', 10)),
             updated_at = now()
       where id = ${target.id}::uuid
     returning updated_at::text as updated_at
    `;
    if (!updRows.length) {
      return json({ error: "update_no_row", user_id: target.id }, 500);
    }

    // 3) 메타데이터 보강 (role:admin, name:운영자) — is_admin() 가 role 키를 참고하는 코드 대비
    await sql`
      update auth.users
         set raw_user_meta_data = coalesce(raw_user_meta_data, '{}'::jsonb)
                                 || jsonb_build_object('role','admin','name','운영자')
       where id = ${target.id}::uuid
    `;

    return json({
      ok: true,
      email: target.email,
      user_id: target.id,
      reset_at: updRows[0].updated_at,
    });
  } catch (e) {
    return json({ error: "sql_failed", detail: String(e) }, 500);
  } finally {
    await sql.end({ timeout: 1 });
  }
});

function json(payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "content-type": "application/json" },
  });
}