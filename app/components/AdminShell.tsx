"use client";

import { useEffect } from "react";

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
 * 어드민 셸이 표시되는 동안에만 admin-shell.css 가 페이지에 로드되며,
 * 회원 사이트 라우트일 때는 어드민 셸이 hidden 이고 CSS 도 unload 되어 회원 사이트 페이지에 영향을 주지 않습니다.
 */
export default function AdminShell({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const id = "admin-shell-css";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = "/admin-shell.css";
    document.head.appendChild(link);
    return () => {
      const el = document.getElementById(id);
      if (el) el.remove();
    };
  }, []);
  return <>{children}</>;
}