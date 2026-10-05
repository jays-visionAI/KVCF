// ============================================================================
//  ForgeDB Edge Function: reset-admin-password  —  DISABLED (영구 차단 스텁)
//
//  왜 이 파일이 다시 생겼나:
//  이 함수는 v0.11(93954fe)에서 로컬에서 삭제되었지만, 원격 배포본은 삭제되지
//  않고 남아 있었다. 원격 확인 결과 4개 함수 모두 여전히 살아 있고, 이 함수는
//  jays@blueforge.space 를 **영구 삭제 후 동일 이메일로 재생성**하며 기본 비밀
//  번호를 하드코딩해 박는다. 인증은 service_role 키 일치만 본다.
//
//  위험: 서비스 롤 키가 유출되면(과거 로그/함수에 노출된 이력 있음) 아무나 이
//  계정을 지우고 재생성해 비밀번호를 바꿀 수 있다. "비밀번호가 변경되었습니다"
//  알림은 이 경로에서만 발생한다.
//
//  조치: 삭제 대신 **중립 스텁으로 덮어써** 원격 구버전을 무력화한다.
//        삭제는 콘솔에서 수동으로 해야 하므로, 그전까지 위험을 0으로 만든다.
//        실수로 다시 호출해도 어떤 계정도 건드리지 않는다.
//
//  이 스텁은:
//    - 비밀번호를 하드코딩하지 않는다 (구버전의 기본값 제거)
//    - 키를 받든 안 받든 무조건 403 을 반환한다
//    - 계정 조회/생성/삭제 API 를 전혀 호출하지 않는다
//    - 되돌릴 방법이 없다 — 되돌리려면 이 스텁을 지우고 새 함수를 작성해야 한다
//
//  계정 비밀번호를 바꾸는 정상 경로는 UI 로그인(Auth)이며, 관리자용은
//  auth-magic-link 가 담당한다. 이 함수는 그 어떤 경로의 대체재도 아니다.
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
      "reset-admin-password is permanently disabled. It used to delete and recreate the admin account with a hardcoded default password. Use UI sign-in, or auth-magic-link for admin access.",
  });
});
