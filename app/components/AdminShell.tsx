"use client";

/**
 * 어드민 사이트 셸 — 회원 사이트와 완전히 분리된 독립 셸.
 *
 * 분리 원칙:
 *  - 회원 사이트의 어떤 컴포넌트(UtilityBar, SiteHeader, SiteFooter, MembershipCTA, AdminEditor, ApplicationModal)도 이 셸 안에 마운트되지 않습니다.
 *  - 어드민 셸 안에서는 어드민 전용 CSS 만 사용합니다 (admin-shell.css).
 *  - 어드민 셸 안 AdminLoginCard 와 어드민 콘솔은 회원 사이트 로그인 페이지와 시각/구조가 완전히 다릅니다.
 *  - 회원 사이트 페이지(login, dashboard, profile 등)는 어드민 셸 안에 마운트되지 않습니다.
 *  - 어드민 사이트에 진입한 사용자가 회원 사이트로 갈 수 있는 직접 링크도 없습니다.
 *
 * admin-shell.css 는 app/layout.tsx 에서 SSR 시점에 항상 로드되어,
 * hydration 또는 컴포넌트 마운트 타이밍에 의존하지 않고 admin 라우트 진입 즉시 어드민 셸이 정확히 표시됩니다.
 * 어드민 셸의 가시성은 body.admin-mode 클래스 + 어드민 셸/사이트 셸의 display CSS 가 단일 진실 공급원으로 관리합니다.
 */
export default function AdminShell({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}