"use client";

import { useEffect, useLayoutEffect } from "react";

// useLayoutEffect 는 SSR 에서는 useEffect 로 폴백 (React 공식 권장 패턴)
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * 회원 사이트 셸(#siteShell) 과 어드민 셸(#adminShell) 의 가시성을
 * 현재 해시 라우트에 맞춰 단일 진실 공급원(body.admin-mode + admin-shell.css)
 * 에 동기화하는 가벼운 브리지.
 *
 * 셸 가시성 정책:
 *   - `body.admin-mode` 가 켜져 있을 때: admin-shell.css 가 `.site-shell{display:none!important}`
 *     과 `.admin-shell{display:block!important}` 를 적용한다. 이게 단일 진실 공급원.
 *   - 이 브리지는 body.admin-mode 와 admin 셸 / p-admin 의 hidden 만 즉시 보정한다.
 *   - React 가 admin 셸 자식의 hidden 을 매 렌더마다 덮어쓸 수 있으므로, hashchange
 *     시점에 한 번 더 보정한다 (단, requestAnimationFrame 으로 두 번 토글하던 이전
 *     패턴은 race condition 을 만들 수 있어 제거).
 *   - `<html>` 배경색도 이 브리지가 단일로 소유한다. legacy-app.js 의 show() 도
 *     같은 값을 쓰고 있었는데, 두 경로가 어긋나면 어드민 라우트에서 html 은 흰색으로
 *     남아 어두운 어드민 셸 밖 여백이 흰 배경으로 노출된다 (배경이 두 개로 보임).
 */
export default function ShellVisibilityBridge() {
  // hydration 직후 즉시 한 번 동기화 — React 가 첫 hidden 적용을 끝내기 전에
  // body 클래스 / admin 셸 hidden 을 먼저 보정한다.
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

  // 1) body 클래스 즉시 토글 — CSS가 셸 가시성을 결정한다.
  document.body.classList.toggle("admin-mode", isAdmin);

  // 1-1) <html> 배경도 여기서 단일로 맞춘다.
  //   어드민 셸이 떠 있는 동안 html 이 흰색으로 남아 있으면, 어두운 어드민 셸이
  //   콘텐츠 영역만 덮고 스크롤 여백/짧은 페이지 하단이 흰 배경으로 노출된다
  //   (파란 배경과 흰 배경이 두 개로 보이는 증상). legacy-app.js 의 show() 도
  //   같은 값을 쓰고 있었기에 이중 통제였다 — 여기서 한 곳으로 모은다.
  const rootStyle = document.documentElement.style;
  rootStyle.backgroundColor = isAdmin
    ? "#0a1024"
    : page === "home"
      ? ""
      : "#ffffff";
  document.documentElement.classList.toggle("home-background", page === "home");

  // 2) siteShell: 가시성은 admin-shell.css 가 결정한다. inline display 는
  //    admin 모드가 아닐 때만 보장해주면 되고, admin 모드에서는 CSS 의
  //    !important 가 inline 을 덮어쓴다.
  if (siteShell && !isAdmin) {
    siteShell.style.display = "";
  }

  // 3) adminShell: admin 라우트일 때만 보이도록 CSS 가 처리한다.
  //    React 가 admin 셸 자식 hidden 을 매 렌더마다 덮어쓰는 경우를 막기 위해
  //    hidden 속성을 강제로 false 로 맞춘다 (CSS 가 우선이므로 안전).
  if (adminShell) {
    adminShell.hidden = false;
  }
  if (pAdmin && isAdmin) {
    pAdmin.hidden = false;
  }
}