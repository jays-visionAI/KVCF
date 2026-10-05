"use client";

import { useState } from "react";
import { client } from "../lib/forgedb";

/**
 * 어드민 전용 로그인 카드.
 * - 어드민 셸(#adminShell) 안에서만 마운트되며, 회원 사이트 셸(#siteShell) 안에는
 *   이 컴포넌트 자체가 존재하지 않습니다. 회원 로그인 페이지에도 이 카드가 없습니다.
 * - 회원 로그인(legacy `doLogin`)과 완전히 다른 코드 경로입니다. 이 컴포넌트는
 *   레거시를 전혀 호출하지 않고 `client().auth.signInWithPassword()` 를 직접 호출합니다.
 * - 로그인은 이메일+비밀번호 단일 경로입니다 (매직링크는 제거됨).
 */
export default function AdminLoginCard() {
  const [pwSending, setPwSending] = useState(false);
  const [pwMsg, setPwMsg] = useState<string | null>(null);
  const [pwTone, setPwTone] = useState<"info" | "error" | "success">("info");
  async function onSubmitPassword(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPwMsg(null);
    const f = event.currentTarget;
    const email = (f.elements.namedItem("email") as HTMLInputElement | null)?.value?.trim() ?? "";
    const password = (f.elements.namedItem("password") as HTMLInputElement | null)?.value ?? "";
    if (!email || !password) {
      setPwTone("error");
      setPwMsg("이메일과 비밀번호를 입력해 주세요.");
      return;
    }
    const fb = client();
    if (!fb) {
      setPwTone("error");
      setPwMsg("인증 모듈에 연결할 수 없습니다. .env 의 NEXT_PUBLIC_FORGEDB_ANON_KEY 가 설정되었는지 확인해 주세요.");
      return;
    }
    setPwSending(true);
    try {
      const r = await fb.auth.signInWithPassword({ email, password });
      const u = r?.data?.user;
      if (!u) {
        setPwTone("error");
        setPwMsg("로그인에 실패했습니다. 이메일과 비밀번호를 확인해 주세요.");
        return;
      }
      // 관리자 권한 검사 — DB 의 is_admin() RPC 와 계정 메타데이터를 모두 확인한다.
      let dbIsAdmin = false;
      try {
        const rpc = await fb.rpc("is_admin");
        // is_admin() 은 스칼라 boolean 을 반환한다 (배열 아님).
        const d = rpc?.data as unknown;
        dbIsAdmin = d === true || (Array.isArray(d) && (d[0] as { is_admin?: boolean })?.is_admin === true);
      } catch (_) { dbIsAdmin = false; }
      const md = (u.user_metadata as Record<string, unknown> | null) ?? {};
      const metaIsAdmin = md["role"] === "admin";
      const isAdmin = dbIsAdmin || metaIsAdmin;
      if (!isAdmin) {
        // 관리자 권한 없음 — 세션 정리 후 어드민 셸 안에 머무른다 (회원 사이트로 리다이렉트하지 않는다).
        try { await fb.auth.signOut(); } catch (_) { /* noop */ }
        setPwTone("error");
        setPwMsg(
          "관리자 권한이 없습니다.\n" +
          "role=admin 이 지정된 계정만 관리자 콘솔에 접근할 수 있습니다."
        );
        return;
      }
      // 관리자 권한 확인 — 어드민 셸 안 어드민 콘솔로 진입한다.
      setPwTone("success");
      setPwMsg("인증되었습니다. 어드민 콘솔로 이동합니다…");
      try {
        // legacy 가 읽는 전역 인증 객체를 반드시 새로 만든다.
        // (레거시는 모듈 스코프 `auth` 를 쓰므로 window.auth 가 없으면 폴링이 영원히 실패한다)
        const w = window as Window & {
          auth?: { role?: string | null; name?: string | null; email?: string | null; userId?: string | null };
        };
        w.auth = {
          role: "admin",
          email: u.email || email,
          name: (typeof md["name"] === "string" && (md["name"] as string)) || (u.email || email).split("@")[0] || "관리자",
          userId: u.id,
        };
        if (typeof window.location !== "undefined") {
          window.location.hash = "#admin";
          window.dispatchEvent(new HashChangeEvent("hashchange"));
        }
      } catch (_) { /* noop */ }
    } catch (err) {
      const msg = (err && typeof err === "object" && "message" in err) ? String((err as { message?: string }).message) : "이메일·비밀번호를 확인하세요.";
      setPwTone("error");
      setPwMsg("로그인 실패: " + msg);
    } finally {
      setPwSending(false);
    }
  }
  return (
    <div className="adm-login-shell">
      <div className="adm-login-card">
        <div className="adm-login-tag">{"RESTRICTED · ADMIN ONLY"}</div>
        <div className="adm-login-head">
          <img src="/assets/kvcf-logo-white.png" alt="" aria-hidden="true" />
          <div>
            <h1>{"관리자 콘솔 로그인"}</h1>
            <div className="sub">{"ADMIN CONSOLE · KVCF"}</div>
          </div>
        </div>
        <form onSubmit={onSubmitPassword}>
          <div>
            <label htmlFor="admLoginEmail">{"관리자 이메일"}</label>
            <input id="admLoginEmail" name="email" type="email" autoComplete="email" placeholder="sangky94@gmail.com" required />
          </div>
          <div>
            <label htmlFor="admLoginPassword">{"비밀번호"}</label>
            <input id="admLoginPassword" name="password" type="password" autoComplete="current-password" placeholder="••••••••" required />
          </div>
          <button className="submit" type="submit" disabled={pwSending}>
            {pwSending ? "확인 중…" : "관리자 콘솔 진입"}
          </button>
          {pwMsg ? (
            <div className={"adm-login-pw-msg adm-login-pw-msg--" + pwTone}>{pwMsg}</div>
          ) : null}
        </form>
        <div className="adm-login-warn">
          {"※ 이 페이지는 운영자(ADMIN) 전용입니다."}
          <br />
          {"권한이 없는 계정으로 로그인하면 콘솔은 잠깁니다."}
          <br />
          {"관리자 권한은 협회 사무국이 직접 부여하며, 개인이 임의로 신청할 수 없습니다."}
        </div>
        <details className="adm-login-checklist">
          <summary>
            {"로그인이 안 되시나요?"}
            <span className="adm-login-checklist-caret" aria-hidden="true">{"▾"}</span>
          </summary>
          <ol>
            <li>
              <b>{"이메일 또는 비밀번호가 다릅니다"}</b>
              {" — 관리자 계정의 이메일과 비밀번호를 정확히 입력해 주세요. 일반 회원 계정은 관리자 권한이 없어 진입할 수 없습니다."}
            </li>
            <li>
              <b>{"관리자 권한이 없습니다"}</b>
              {" — 협회 사무국이 관리자로 지정한 계정만 접근할 수 있습니다. 계정 지정이 필요하면 협회 사무국에 문의해 주세요."}
            </li>
            <li>
              <b>{"비밀번호를 잊으셨나요"}</b>
              {" — 이 화면에는 비밀번호 재설정 기능이 없습니다. ForgeDB 콘솔(https://forgedb.cloud) → 프로젝트 → Authentication → Users 에서 해당 계정의 비밀번호를 직접 변경한 뒤, 위 양식으로 다시 로그인해 주세요."}
            </li>
            <li>
              <b>{"이메일 인증은 필요 없습니다"}</b>
              {" — 이메일 확인 메일 없이 이메일+비밀번호로 바로 로그인됩니다."}
            </li>
          </ol>
          <div className="adm-login-checklist-foot">
            {"이 안내는 어드민 셸 안에서만 노출되며, 회원 사이트에는 표시되지 않습니다."}
          </div>
        </details>
      </div>
    </div>
  );
}