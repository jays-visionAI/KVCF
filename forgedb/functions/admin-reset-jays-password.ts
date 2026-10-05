// ============================================================================
//  ForgeDB Edge Function: admin-reset-jays-password  —  DISABLED (영구 차단 스텁)
//
//  왜 이 파일이 다시 생겼나:
//  v0.11(93954fe)에서 로컬에서 삭제되었으나 원격 배포본은 남아 있었다. 원격
//  확인 결과 이 함수도 여전히 살아 있다. 구버전은 Postgres 에 직접 연결해
//  `auth.users.encrypted_password` 를 bcrypt 해시로 덮어썼다.
//
//  참고 (조사 중 확인된 사실):
//  이 프로젝트의 auth.users 스키마에는 `encrypted_password` 컬럼 자체가 없다.
//  컬럼은 id, email, email_verified, raw_user_meta_data, raw_app_meta_data,
//  created_at, updated_at, last_sign_in_at 뿐이고, DB 전체를 password/credential
//  로 훑어도 0건이다. 즉 이 코드는 이 DB 에서 동작하지 않았을 가능성이 높고,
//  비밀번호는 ForgeDB 인증 파이프라인이 별도로 보관한다.
//  다만 "동작하지 않았다"를 보장할 수는 없으므로, 확인된 사실에 의존해 통과시키지
//  않고 원격에서 무력화한다.
//
//  조치: 삭제 대신 중립 스텁으로 덮어써 계정 파괴 capability 를 0으로 만든다.
//
//  이 스텁은:
//    - DB 연결도, 키 검증도, 계정 접근도 전혀 하지 않는다
//    - 무조건 403 을 반환한다
//    - 되돌릴 방법이 없다 — 되돌리려면 이 스텁을 지우고 새 함수를 작성해야 한다
// ============================================================================

function json(status: number, body: unknown) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "access-control-allow-origin": "*",
      "access-control-allow-headers": "authorization, content-type, apikey",
      "access-control-allow-methods": "POST, OPTIONS",
    },
  });
}

Deno.serve((req: Request) => {
  if (req.method === "OPTIONS") return json(204, {});
  return json(403, {
    error: "function_disabled",
    message:
      "admin-reset-jays-password is permanently disabled. Passwords live in the ForgeDB auth pipeline, not in this database. Use UI sign-in, or auth-magic-link for admin access.",
  });
});
