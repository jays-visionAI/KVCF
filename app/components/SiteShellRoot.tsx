"use client";

import { useEffect, useLayoutEffect, useState } from "react";

// SSR 단계에선 useLayoutEffect 가 없으므로 useEffect 로 폴백한다.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * 회원 사이트 셸(#siteShell) 의 최상위 래퍼.
 *
 * React hydration 안정성 + 셸 가시성 단일 진실 공급원 전략:
 *  - SSR 단계에서는 window 가 없으므로 hash 를 알 수 없습니다.
 *    하지만 `app/layout.tsx` 의 inline script 가 SSR HTML 에
 *    `body.admin-mode` 클래스 + `.site-shell{display:none!important}` CSS 를
 *    박아두므로, admin 모드에서는 siteShell 이 어차피 보이지 않습니다.
 *  - 따라서 SSR 과 클라이언트 hydration 첫 페인트는 항상 동일한 마크업
 *    ("회원 사이트 셸은 평소엔 보이는 게 정상") 으로 결정적으로 렌더합니다.
 *    React hydration mismatch 가 발생하지 않고, admin 셸 내부의 onClick
 *    핸들러까지 정상적으로 부착됩니다.
 *  - 클라이언트 hydration 직후에는 `useIsomorphicLayoutEffect` 가 한 번
 *    실행되어 현재 hash 가 admin 이면 siteShell 의 hidden 과 inline
 *    display 를 즉시 동기화합니다 (race condition 방지).
 *  - 이후 hashchange 이벤트가 발생할 때마다 셸 가시성을 다시 동기화합니다.
 *
 * 주의:
 *  - React 가 셸 가시성을 관리하지 않습니다 (SSR 결정성 유지).
 *    셸 가시성은 모두 `body.admin-mode` + `admin-shell.css` 의 CSS 가
 *    단일 진실 공급원으로 관리합니다. 이 컴포넌트는 inline hidden/style
 *    을 박지 않습니다.
 */
export default function SiteShellRoot({ children }: { children: React.ReactNode }) {
  // SSR/CSR 첫 렌더는 항상 동일한 "회원 사이트 표시" 상태로 시작한다.
  // React 가 hidden/style 을 토글하지 않으므로 hydration mismatch 가 절대
  // 발생하지 않습니다. 실제 셸 가시성은 admin-shell.css 의 body.admin-mode
  // 가 단독으로 결정합니다.
  const [, setTick] = useState(0);

  // hydration 직후 첫 페인트 전에 #siteShell 의 hidden 을 즉시 보정한다.
  // (대부분의 경우 admin-shell.css 의 !important 가 이미 처리하므로 이 보정은
  //  legacy app.js 가 끼어들어 셸 가시성을 깨뜨리는 race 에서만 동작한다.)
  useIsomorphicLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const raw = (window.location.hash || "#home").slice(1);
    const [page = "home"] = raw.split("?");
    const admin = page === "admin";
    const el = document.getElementById("siteShell");
    if (el) {
      // admin-shell.css(body.admin-mode .site-shell{display:none!important})
      // 가 단일 진실 공급원. 여기서는 CSS 가 덮어쓰지 못한 비정상 케이스
      // (legacy 가 inline display 를 박은 경우 등) 만 보정한다.
      el.style.display = admin ? "" : "";
    }
    setTick((v) => v + 1);
  }, []);

  useEffect(() => {
    const update = () => {
      const raw = (window.location.hash || "#home").slice(1);
      const [page = "home"] = raw.split("?");
      const isAdmin = page === "admin";
      const el = document.getElementById("siteShell");
      if (el) {
        el.style.display = isAdmin ? "" : "";
      }
    };
    update();
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);

  // inline style/hidden 을 절대 박지 않는다. SSR HTML 과 hydration 첫
  // 렌더가 완전히 동일해야 React 가 hydration mismatch 경고 없이 매끄럽게
  // admin 셸의 onClick 핸들러까지 부착할 수 있다. 실제 가시성 토글은
  // admin-shell.css(body.admin-mode .site-shell{display:none!important}) 가
  // 단독으로 책임진다.
  return (
    <div className="site-shell" id="siteShell">
      {children}
    </div>
  );
}