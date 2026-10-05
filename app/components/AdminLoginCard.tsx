"use client";

import { useState } from "react";
import { requestAdminMagicLink, client } from "../lib/forgedb";

/**
 * 어드민 전용 로그인 카드.
 * 회원 사이트의 .login / .login-brand-* / .panel / .form / .legalbox / .warn 등 어떤 회원 로그인 클래스와도 공유하지 않습니다.
 * 어드민 셸(.admin-shell) 안에서만 마운트되며 회원 사이트에서는 절대 보이지 않습니다.
 * 회원 사이트에 노출되는 어떤 요소(이메일 입력란 라벨, CTA 문구, 회원 로그인 페이지의 시각 디자인)와도 시각·구조가 완전히 다릅니다.
 *
 * 로그인 방식:
 *  - 비밀번호 로그인은 `client().auth.signInWithPassword()` 를 직접 호출합니다
 *    (legacy `window.doAdminLogin` 에 의존하지 않습니다). 관리자 권한 확인 후
 *    어드민 셸 안 AdminConsole 이 같은 페이지에서 다시 보이도록 페이지 route 를
 *    `admin` 으로 재트리거합니다.
 *  - 매직링크는 `auth-magic-link` Edge Function 으로 발송됩니다. 발신 대상은
 *    role=admin 인 계정으로 제한되며(마이그레이션 0008_admin_by_role.sql),
 *    메일함에 도착한 링크로 진입하면 세션이 생성되고 어드민 콘솔이 나타납니다.
 */
export default function AdminLoginCard() {
  const [magicSending, setMagicSending] = useState(false);
  const [magicMsg, setMagicMsg] = useState<string | null>(null);
  const [magicLink, setMagicLink] = useState<string | null>(null);
  const [pwSending, setPwSending] = useState(false);
  const [pwMsg, setPwMsg] = useState<string | null>(null);
  const [pwTone, setPwTone] = useState<"info" | "error" | "success">("info");
  async function onRequestMagicLink() {
    setMagicMsg(null);
    setMagicLink(null);
    const input = document.getElementById("admLoginEmail") as HTMLInputElement | null;
    const target = (input?.value || "").trim();
    if (!target) {
      setMagicMsg("발송 실패: 관리자 이메일을 먼저 입력해 주세요.");
      return;
    }
    setMagicSending(true);
    const r = await requestAdminMagicLink(target, window.location.origin + "/#admin");
    setMagicSending(false);
    if (r.ok) {
      setMagicMsg(
        "매직링크가 " + (r.email || target) + " 으로 발송되었습니다. 메일함을 확인해 주세요."
      );
      if (r.action_link) setMagicLink(r.action_link);
    } else {
      setMagicMsg("발송 실패: " + (r.error || "알 수 없는 오류"));
    }
  }
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
        dbIsAdmin = Boolean(rpc?.data && rpc.data.length > 0 && rpc.data[0]?.is_admin === true);
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
        const w = window as Window & {
          auth?: { role?: string | null; name?: string | null; email?: string | null; userId?: string | null };
        };
        if (w.auth) {
          w.auth.role = "admin";
          w.auth.email = u.email || email;
          w.auth.name = (typeof md["name"] === "string" && (md["name"] as string)) || (u.email || email).split("@")[0] || "관리자";
          w.auth.userId = u.id;
        }
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
            <input id="admLoginEmail" name="email" type="email" autoComplete="email" placeholder="admin@kvcf.kr" required />
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
        <div className="adm-login-magic">
          <div className="adm-login-magic-head">
            <b>{"비밀번호 대신 매직링크로 진입"}</b>
            <span>{"이 인스턴스는 이메일+비밀번호 provider가 비활성이라 매직링크(OTP)로만 인증됩니다."}</span>
          </div>
          <button
            className="submit magic"
            type="button"
            onClick={onRequestMagicLink}
            disabled={magicSending}
          >
            {magicSending ? "발송 중…" : "관리자 메일로 매직링크 발송"}
          </button>
          {magicMsg ? <div className="adm-login-magic-msg">{magicMsg}</div> : null}
          {magicLink ? (
            <div className="adm-login-magic-link">
              <span>{"개발/QA용 즉시 진입 링크:"}</span>
              <a href={magicLink}>{magicLink}</a>
            </div>
          ) : null}
        </div>
        <div className="adm-login-warn">
          {"※ 이 페이지는 운영자(ADMIN) 전용입니다."}
          <br />
          {"권한이 없는 계정으로 로그인하면 콘솔은 잠깁니다."}
          <br />
          {"관리자 권한은 협회 사무국이 직접 부여하며, 개인이 임의로 신청할 수 없습니다."}
        </div>
        <details className="adm-login-checklist">
          <summary>
            {"로그인이 안 되시나요? · 관리자 권한 부여 가이드"}
            <span className="adm-login-checklist-caret" aria-hidden="true">{"▾"}</span>
          </summary>
          <ol>
            <li>
              <b>{"인증 사용자 생성"}</b>
              {" — ForgeDB 콘솔(forgedb.cloud) → 프로젝트 → Authentication → Users → “Add user”. 일반 회원 가입 폼으로는 어드민 권한이 부여되지 않습니다."}
            </li>
            <li>
              <b>{"이메일 / 비밀번호"}</b>
              {" — 어드민에 사용할 이메일을 정확히 입력하고 생성합니다. 비밀번호는 6자 이상."}
            </li>
            <li>
              <b>{"현재 관리자 계정 확인"}</b>
              {" — SQL Editor 에서 `select * from public.v_admin_accounts;` 를 조회하면 role=admin 인 계정만 나옵니다. 이메일을 코드에 하드코딩한 화이트리스트는 더 이상 쓰지 않으므로(`migrations/0008_admin_by_role.sql`), 소스 수정 없이 계정의 role 만으로 관리자가 정해집니다."}
            </li>
            <li>
              <b>{"관리자 권한을 부여하려면"}</b>
              {" — SQL Editor 에서 아래처럼 해당 계정의 role 만 바꾸세요. (코드를 고칠 필요가 없습니다)"}
              <pre className="adm-login-code">
                {"update auth.users\n   set raw_app_meta_data = coalesce(raw_app_meta_data,'{}'::jsonb)\n                            || jsonb_build_object('role','admin')\n where lower(email) = lower('your' || '@' || 'example.com');"}
              </pre>
              {"해제하려면 같은 구문에서 `|| ...` 부분을 `- 'role'` 로 바꾸면 됩니다."}
            </li>
            <li>
              <b>{"이메일 인증 활성화"}</b>
              {" — `select id, email, email_verified from auth.users;` 로 본인 계정의 email_verified 가 true 인지 확인하세요. false 면 콘솔 Users 탭에서 “Confirm email” 으로 활성화해야 로그인할 수 있습니다."}
            </li>
            <li>
              <b>{"이메일 미수신"}</b>
              {" — 매직링크 인증 메일이 필요한 절차라면 스팸함 확인 → 메일함 용량 점검 → 수신 도메인 화이트리스트에 `@forgedb.cloud` 추가 후 5분 뒤 재시도."}
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