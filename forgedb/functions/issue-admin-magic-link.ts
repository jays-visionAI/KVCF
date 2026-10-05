// Edge Function: issue-admin-magic-link — RETIRED (중단됨)
//
// 왜 이 파일이 다시 생겼나:
//   v0.12 커밋(93954fe)에서 로컬 삭제됐지만 ForgeDB 배포본은 살아남았다.
//   수신자 이메일이 코드에 하드코딩되어 있고 redirect_to 가 만료된 라이브
//   호스트로 박혀 있어, 정상 어드민 인증 경로로 쓸 수 없는 상태였다.
//   그럼에도 원격에 남아 있던 이유는 삭제를 시도해도 ForgeDB 가 405 를
//   반환했기 때문이다 (DELETE 미지원).
//
// 현재 동작: 어떤 요청도 받지 않는다. 매직링크를 생성·발송하지 않는다.
// 정상 어드민 인증은 어드민 콘솔의 이메일+비밀번호 로그인뿐이다
// (`auth-magic-link` 도 운영자 요청으로 삭제됨).

const RETIRED = {
  error: "retired",
  message: "issue-admin-magic-link 는 사용이 중단된 함수입니다. 이 엔드포인트로는 매직링크를 발급하지 않습니다.",
  replacement: "어드민 콘솔 이메일+비밀번호 로그인, 또는 ForgeDB 콘솔 → Authentication → Users",
  retired_at: "2026-10-05T00:00:00.000Z",
};

function json(status: number, body: unknown) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json",
      "cache-control": "no-store",
      "access-control-allow-origin": "*",
      "access-control-allow-headers": "authorization, content-type, apikey",
      "access-control-allow-methods": "GET, POST, OPTIONS",
    },
  });
}

Deno.serve(() => json(410, RETIRED));
