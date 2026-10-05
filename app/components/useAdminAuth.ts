"use client";

import { useEffect, useState } from "react";
import { client } from "../lib/forgedb";

type LegacyAuth = { role?: string | null; name?: string | null; email?: string | null; userId?: string | null };

/**
 * 현재 로그인한 사용자가 admin 인지 판단합니다.
 *
 * ⚠️ 판정 근거는 ForgeDB 세션(SDK) 이며, legacy 전역 `window.auth` 가 아닙니다.
 *    legacy-app.js 안의 `let auth={role:null,name:null}` 는 모듈 스코프 변수라
 *    `window.auth` 로 노출되지 않습니다 (브라우저에서 `window.auth === undefined`
 *    로 직접 확인). 예전처럼 `window.auth` 만 폴링하면 비밀번호 로그인이 성공해도
 *    `role` 을 절대 못 읽어 어드민 콘솔이 뜨지 않습니다.
 *
 * admin 판정 = ① 계정 메타데이터 role=admin  또는 ② DB `is_admin()` RPC = true.
 * 판정 결과를 레거시가 읽는 `window.auth` 로 미러링해 두면 레거시 UI
 * (상단 바 · GUARD) 도 같은 세션을 봅니다.
 */
export function useAdminAuth(): { authReady: boolean; isAdmin: boolean } {
  const [authReady, setAuthReady] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function sync() {
      const fb = client();
      if (!fb) {
        if (!cancelled) { setIsAdmin(false); setAuthReady(true); }
        return;
      }
      try {
        const { data: sess } = await fb.auth.getSession();
        const user = sess?.session?.user ?? null;
        if (!user) {
          if (!cancelled) { setIsAdmin(false); setAuthReady(true); }
          return;
        }
        const md = (user.user_metadata as Record<string, unknown> | null) ?? {};
        const metaIsAdmin = md["role"] === "admin";
        let dbIsAdmin = false;
        try {
          const rpc = await fb.rpc("is_admin");
          // is_admin() 은 스칼라 boolean 을 반환한다 (배열 아님).
          const d = rpc?.data as unknown;
          dbIsAdmin = d === true || (Array.isArray(d) && (d[0] as { is_admin?: boolean })?.is_admin === true);
        } catch { dbIsAdmin = false; }

        const admin = metaIsAdmin || dbIsAdmin;
        if (!cancelled) { setIsAdmin(admin); setAuthReady(true); }

        // 레거시가 기대하는 전역 인증 객체를 항상 생성/갱신한다.
        const w = window as Window & { auth?: LegacyAuth };
        w.auth = {
          role: admin ? "admin" : "member",
          name: (typeof md["name"] === "string" && md["name"]) || (user.email || "").split("@")[0] || null,
          email: user.email ?? null,
          userId: user.id,
        };
      } catch {
        if (!cancelled) { setIsAdmin(false); setAuthReady(true); }
      }
    }

    sync();
    // 로그인 직후엔 빠르게, 안정되면 완만하게 폴링한다.
    const fastId = window.setInterval(sync, 400);
    const stopFast = window.setTimeout(() => window.clearInterval(fastId), 2400);
    const id = window.setInterval(sync, 3000);
    const onHash = () => { void sync(); };
    window.addEventListener("hashchange", onHash);
    window.addEventListener("storage", onHash);
    return () => {
      cancelled = true;
      window.clearTimeout(stopFast);
      window.clearInterval(fastId);
      window.clearInterval(id);
      window.removeEventListener("hashchange", onHash);
      window.removeEventListener("storage", onHash);
    };
  }, []);

  return { authReady, isAdmin };
}
