"use client";

/**
 * 어드민 전용 로그인 카드.
 * 회원 사이트의 .login / .login-brand-* / .panel / .form / .legalbox / .warn 등 어떤 회원 로그인 클래스와도 공유하지 않습니다.
 * 어드민 셸(.admin-shell) 안에서만 마운트되며 회원 사이트에서는 절대 보이지 않습니다.
 * 회원 사이트에 노출되는 어떤 요소(이메일 입력란 라벨, CTA 문구, 회원 로그인 페이지의 시각 디자인)와도 시각·구조가 완전히 다릅니다.
 */
export default function AdminLoginCard() {
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
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const f = event.currentTarget as HTMLFormElement;
            const email = (f.querySelector('input[type="email"]') as HTMLInputElement | null)?.value ?? "";
            const password = (f.querySelector('input[type="password"]') as HTMLInputElement | null)?.value ?? "";
            (window as Window & { doAdminLogin?: (email?: string, password?: string) => void }).doAdminLogin?.(email, password);
          }}
        >
          <div>
            <label htmlFor="admLoginEmail">{"관리자 이메일"}</label>
            <input id="admLoginEmail" type="email" autoComplete="email" placeholder="admin@kvcf.kr" required />
          </div>
          <div>
            <label htmlFor="admLoginPassword">{"비밀번호"}</label>
            <input id="admLoginPassword" type="password" autoComplete="current-password" placeholder="••••••••" required />
          </div>
          <button className="submit" type="submit">{"관리자 콘솔 진입"}</button>
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
            {"로그인이 안 되시나요? · 화이트리스트 등록 가이드"}
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
              <b>{"화이트리스트 동기화"}</b>
              {" — SQL Editor 에서 `select * from public.v_admin_accounts;` 조회 시 해당 이메일이 보이지 않으면, `migrations/0004_admin_lockdown.sql` 의 이메일 화이트리스트(`jays@blueforge.space`) 에 본인을 추가해야 합니다."}
            </li>
            <li>
              <b>{"로그인 시도"}</b>
              {" — 위 절차가 끝나면 이 화면에서 동일한 자격증명으로 로그인할 수 있습니다. 권한이 없는 계정은 콘솔 진입이 차단됩니다."}
            </li>
            <li>
              <b>{"이메일 미수신"}</b>
              {" — 인증 메일이 필요한 절차라면 스팸함 확인 → 메일함 용량 점검 → 수신 도메인 화이트리스트에 `@forgedb.cloud` 추가 후 5분 뒤 재시도."}
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