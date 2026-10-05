import type { NextConfig } from "next";

/**
 * KVCF 사이트 — Next.js 16 + React 19.
 *
 * - 본 사이트는 **ForgeDB Static Hosting** 에 정적 export 로 배포합니다
 *   (`output: "export"`). 따라서 커스텀 서버 / API 핸들러 / 미들웨어 사용 불가.
 * - 모든 데이터는 @forgedb/client 로 ForgeDB 에서 직접 가져옵니다 (RLS 보호).
 * - 정적 빌드 결과물은 `out/` 디렉터리에 생성되며, 빌드 후
 *   `public/.well-known/forge-hosting.json` 의 호스트 슬러그로 자동 배포됩니다.
 */
const nextConfig: NextConfig = {
  reactStrictMode: false,

  // 정적 export — ForgeDB Static Hosting 에 그대로 올릴 수 있는 out/ 디렉터리 생성.
  output: "export",

  // 모든 경로를 사전 렌더링 (해시 라우팅 SPA 라 추가 prefetch 라우트는 불필요).
  trailingSlash: true,
  images: { unoptimized: true },

  // turbopack / 트레이싱은 이 저장소를 루트로 고정.
  turbopack: { root: process.cwd() },
  outputFileTracingRoot: process.cwd(),

  // dev 서버 HMR / RSC 요청 호스트 화이트리스트 — Next.js 16 기본 차단 해제.
  // 정적 export 자체에는 무관하지만, dev 환경에서 127.0.0.1 / 사내 IP 로 접속할 때
  // "Blocked cross-origin request" 경고가 뜨며 HMR 이 끊기는 현상을 막습니다.
  allowedDevOrigins: ["127.0.0.1", "localhost", "0.0.0.0"],

  // 클라이언트가 이미지를 가져올 수 있는 외부 호스트 (Open Graph 등 외부 사진 사용 시).
  // Org 멤버 사진은 public/assets/ 에서 직접 서빙하므로 보통 비워 둡니다.
};

export default nextConfig;