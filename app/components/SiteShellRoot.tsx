"use client";

import { useEffect, useState } from "react";

/**
 * 회원 사이트 셸(#siteShell) 의 최상위 래퍼.
 *
 * 이 컴포넌트는 React 트리에서 siteShell 의 자식들을 감싸고 있어,
 * React 가 자식 트리를 렌더할 때 사이트 셸 자체에 `hidden` 속성을 강제로 적용합니다.
 *
 * 기존 문제:
 *  - `legacy-app.js` 의 show(r) 는 adminShell.hidden 만 토글합니다.
 *  - siteShell 의 가시성은 body.admin-mode CSS 클래스에 의존하는데,
 *    legacy 스크립트 로드 타이밍에 따라 사이트 셸이 잠시 보이는 race condition 이 발생합니다.
 *
 * 이 컴포넌트는 #admin 라우트일 때 siteShell 에 `hidden` 속성을 React 가 직접 부여해
 * 사이트 셸이 어떤 순간에도 보이지 않도록 보장합니다.
 */
// SSR 단계에서는 hash 를 알 수 없으므로 isAdmin=false 로 시작합니다.
// 클라이언트 hydration 직후 useLayoutEffect 에서 hash 를 읽어 즉시 첫 렌더 결과를 덮어씁니다.
function getInitialIsAdmin(): boolean {
  if (typeof window === "undefined") return false;
  const raw = (window.location.hash || "#home").slice(1);
  const [page = "home"] = raw.split("?");
  return page === "admin";
}

export default function SiteShellRoot({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState<boolean>(getInitialIsAdmin);

  useEffect(() => {
    const update = () => {
      const raw = (window.location.hash || "#home").slice(1);
      const [page = "home"] = raw.split("?");
      setIsAdmin(page === "admin");
    };
    update();
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);

  return (
    <div
      className="site-shell"
      id="siteShell"
      hidden={isAdmin}
      style={isAdmin ? { display: "none" } : undefined}
    >
      {children}
    </div>
  );
}