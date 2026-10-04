"use client";

import { useEffect, useState } from "react";

type LegacyAuth = { role?: string | null; name?: string | null; email?: string | null; userId?: string | null };

/**
 * legacy 글로벌 `window.auth` 의 변화를 폴링해 현재 사용자가 admin 인지 판단합니다.
 * join 페이지와 동일한 패턴 — legacy 가 window 이벤트를 노출하지 않으므로 짧은 간격으로 동기화.
 */
export function useAdminAuth(): { authReady: boolean; isAdmin: boolean } {
  const [authReady, setAuthReady] = useState(false);
  const [auth, setAuth] = useState<LegacyAuth | null>(null);
  useEffect(() => {
    const sync = () => {
      const w = window as Window & { auth?: LegacyAuth };
      const a = w.auth;
      setAuth(a && a.role ? a : null);
      setAuthReady(true);
    };
    sync();
    // 첫 1초 동안은 자주 폴링 (legacy app.js 가 window.auth 를 설정할 시간을 확보),
    // 이후에는 600ms 간격으로 완화.
    let fast = 0;
    const fastId = window.setInterval(() => { sync(); if (++fast >= 10) window.clearInterval(fastId); }, 100);
    const id = window.setInterval(sync, 600);
    window.addEventListener("hashchange", sync);
    return () => { window.clearInterval(id); window.clearInterval(fastId); window.removeEventListener("hashchange", sync); };
  }, []);
  return { authReady, isAdmin: authReady && !!auth && auth.role === "admin" };
}