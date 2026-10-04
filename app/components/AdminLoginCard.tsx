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
        <div className="adm-login-hint">
          {"※ 인증은 ForgeDB Auth 의 is_admin() 화이트리스트(sangky94@gmail.com 단독) 로 처리됩니다."}
          <br />
          {"이 화면은 회원 사이트의 로그인 페이지와 완전히 분리된 어드민 셸에서만 제공됩니다."}
        </div>
      </div>
    </div>
  );
}