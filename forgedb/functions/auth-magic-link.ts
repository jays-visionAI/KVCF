// Edge Function: auth-magic-link — RETIRED (중단됨)
//
// 운영자 지시로 매직링크 경로는 **삭제**되었습니다. 이 함수는 더 이상
// 매직링크를 생성·발송하지 않으며, 어떤 입력에도 어떤 링크도 반환하지 않습니다.
//
//   · 요청 방식(GET/POST/OPTIONS)과 무관하게 항상 410 을 반환합니다.
//   · service_role 키로 인증 API 를 호출하지 않으므로,
//     우발적으로 비밀번호·세션·링크를 다루는 capability 가 남아 있지 않습니다.
//
// 어드민 로그인은 **이메일 + 비밀번호**(`AdminLoginCard.tsx` →
// `client().auth.signInWithPassword()`)로만 이루어집니다.
// 계정·권한( role=admin ) 관리는 ForgeDB 콘솔
// (https://forgedb.cloud/dashboard/project/012ca4bb-ca73-478c-8d84-54c0b678cea0
//  → Authentication → Users)에서만 수행합니다.

const RETIRED = {
  error: "retired",
  message: "auth-magic-link 는 사용이 중단된 함수입니다. 이 엔드포인트로는 매직링크를 발급하지 않습니다.",
  replacement: "관리자 콘솔 로그인 폼(이메일 + 비밀번호) 또는 ForgeDB 콘솔 → Authentication → Users",
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
