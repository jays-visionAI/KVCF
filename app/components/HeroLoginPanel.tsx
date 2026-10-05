"use client";

type WindowWithAuth = Window & {
  doLogin?: (role: string, email?: string, password?: string) => void;
};

/**
 * 히어로 우측 로그인 패널.
 *
 * - 회원 로그인 전용입니다. 어드민 로그인은 헤더의 `관리자로그인` → 어드민 셸
 *   (AdminLoginCard) 경로로만 열립니다. 여기서는 어드민 폼을 다루지 않습니다.
 * - 폼 제출은 레거시 `doLogin('member', …)` 을 그대로 사용합니다. 즉 기존
 *   /#login 페이지와 인증 코드 경로가 하나뿐이라, 이 패널은 "바로 입력하는
 *   진입점"일 뿐 인증 로직을 복제하지 않습니다.
 * - 세션 상태는 이 컴포넌트가 보관하지 않습니다. 로그인 성공 시 레거시가
 *   마이페이지로 라우팅하고, 실패 시 레거시가 안내를 냅니다.
 * - 빈 입력은 input 의 required 가 브라우저 검증으로 막으므로 JS 재검증은
 *   두지 않습니다.
 */
export default function HeroLoginPanel() {
  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const f = event.currentTarget;
    const email = (f.elements.namedItem("heroEmail") as HTMLInputElement).value.trim();
    const password = (f.elements.namedItem("heroPassword") as HTMLInputElement).value;
    (window as WindowWithAuth).doLogin?.("member", email, password);
  }

  return (
    <div className="nh-hero-login">
      <div className="nh-hero-login-head">
        <span className="nh-hero-login-tag">{"MEMBER LOGIN"}</span>
        <h2>{"로그인"}</h2>
        <p>{"내 자격 현황, 시험 접수·이력,"}</p>
        <p>{"교육 진도와 자격증 발급을 한 곳에서."}</p>
      </div>
      <form className="nh-hero-login-form" onSubmit={onSubmit}>
        <div className="nh-hero-login-row">
          <label htmlFor="heroEmail">{"이메일"}</label>
          <input
            id="heroEmail"
            name="heroEmail"
            type="email"
            autoComplete="email"
            placeholder={"email@example.com"}
            required={true}
          />
        </div>
        <div className="nh-hero-login-row">
          <label htmlFor="heroPassword">{"비밀번호"}</label>
          <input
            id="heroPassword"
            name="heroPassword"
            type="password"
            autoComplete="current-password"
            placeholder={"••••••••"}
            required={true}
          />
        </div>
        <button className="nh-hero-login-submit" type="submit">
          {"로그인"}
        </button>
      </form>
      <div className="nh-hero-login-links">
        <a data-r="signup">{"계정생성(무료)"}</a>
        <span aria-hidden="true">{"·"}</span>
        <a data-r="join">{"협회회원가입"}</a>
        <span aria-hidden="true">{"·"}</span>
        <a className="nh-hero-login-admin" data-r="admin" title="관리자(ADMIN) 전용 로그인">
          {"관리자 로그인"}
        </a>
      </div>
    </div>
  );
}
