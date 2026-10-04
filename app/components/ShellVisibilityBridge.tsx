"use client";

import { useEffect, useLayoutEffect } from "react";

// useLayoutEffect 는 SSR 에서는 useEffect 로 폴백 (React 공식 권장 패턴)
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * 회원 사이트 셸(#siteShell) 과 어드민 셸(#adminShell) 의 가시성을
 * 현재 해시 라우트에 맞춰 동기화하는 가벼운 브리지.
 *
 * 문제 배경:
 *  - `legacy-app.js` 의 show(r) 는 adminShell.hidden 토글만 담당합니다.
 *    siteShell 은 body.admin-mode 클래스의 CSS(display:none) 에 의존합니다.
 *  - 그런데 legacy 스크립트가 늦게 로드되거나 React hydration 이 먼저 일어나면
 *    body 클래스 토글이 race condition 으로 씹히는 경우가 있습니다.
 *  - 또한 React 가 admin 셸/페이지를 다시 렌더할 때 `hidden` 속성을 덮어쓰면서
 *    legacy 가 풀어준 상태가 다시 가려질 수 있습니다.
 *
 * 이 브리지는:
 *   1) React 첫 마운트 직후 한 번, 현재 라우트(#admin 등) 에 맞춰 siteShell / adminShell 의
 *      hidden 속성을 즉시 강제합니다.
 *   2) 이후 hashchange 이벤트가 발생할 때마다 같은 로직을 다시 적용합니다.
 *   3) 어드민 셸은 React 가 자식 JSON 단의 hidden 을 매번 다시 적용하므로, 가시성 토글을
 *      미니 setTimeout 으로 React 렌더 패스 다음 프레임에 다시 적용합니다.
 */
export default function ShellVisibilityBridge() {
  // hydration 직후 즉시 한 번 동기화 — React 가 첫 hidden 적용을 끝내기 전에 셸 가시성을 먼저 잡습니다.
  useIsomorphicLayoutEffect(() => {
    applyShellVisibility();
  }, []);

  useEffect(() => {
    applyShellVisibility();
    window.addEventListener("hashchange", applyShellVisibility);
    return () => window.removeEventListener("hashchange", applyShellVisibility);
  }, []);

  return null;
}

function applyShellVisibility() {
  if (typeof window === "undefined") return;
  const raw = (window.location.hash || "#home").slice(1);
  const [page = "home"] = raw.split("?");
  const isAdmin = page === "admin";
  const siteShell = document.getElementById("siteShell");
  const adminShell = document.getElementById("adminShell");
  const pAdmin = document.getElementById("p-admin");

  if (siteShell) {
    // admin 라우트일 때는 회원 사이트 셸을 완전히 숨깁니다.
    siteShell.hidden = isAdmin;
    siteShell.style.display = isAdmin ? "none" : "";
  }
  if (adminShell) {
    adminShell.hidden = !isAdmin;
  }
  if (pAdmin && isAdmin) {
    pAdmin.hidden = false;
  }

  // React 가 다음 렌더 패스에서 hidden 을 다시 덮어쓰는 경우를 대비해
  // 다음 프레임에 한 번 더 동기화합니다.
  window.requestAnimationFrame(() => {
    const ss = document.getElementById("siteShell");
    const as = document.getElementById("adminShell");
    const pa = document.getElementById("p-admin");
    if (ss) {
      ss.hidden = isAdmin;
      ss.style.display = isAdmin ? "none" : "";
    }
    if (as) as.hidden = !isAdmin;
    if (pa && isAdmin) pa.hidden = false;
  });
}