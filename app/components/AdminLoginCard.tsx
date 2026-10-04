"use client";

/**
 * #admin 단일 라우트에서 미인증/비-admin 사용자에게 표시되는 로그인 카드.
 * ForgeDB Auth 로 관리자 인증을 시도하며, role==='admin' 메타데이터가 있어야 어드민 콘솔로 진입합니다.
 * (이전 #adminlogin 라우트와 동일 UX 를 #admin 안에서 분기.)
 */
export default function AdminLoginCard() {
  return (
    <div className={"login"}>
      <div className={"brand"}>
        <div className={"login-brand-content"}>
          <p className={"login-brand-intro"}>
            {"관리자(ADMIN) 전용 로그인입니다."}<br />
            {"협회 운영 · 콘텐츠 관리 · 회원/신청/문의사항 처리를"}
            <br />
            {"한 곳에서 처리할 수 있습니다."}
          </p>
          <p className={"login-brand-note"} lang={"en"}>
            <span>{"RESTRICTED · ADMINISTRATOR ONLY."}</span>
            <span>{"NOT FOR PUBLIC ACCESS."}</span>
          </p>
          <ul style={{"marginTop": "26px"}}>
            <li>{"사이트 콘텐츠(메인·배너·도서·공지 등) 직접 편집"}</li>
            <li>{"회원/신청/문의/모집 데이터 조회 및 상태 관리"}</li>
            <li>{"자격 종목·검정 회차·발급 관리"}</li>
            <li>{"관리자 메타(role=admin) 보유 계정만 접근 가능"}</li>
          </ul>
        </div>
        <img className="login-brand-mark" src="/assets/kvcf-logo-white.png" alt="" aria-hidden="true" />
      </div>
      <div className={"panel"}>
        <div className={"card"}>
          <h1>{"관리자 로그인"}</h1>
          <div className={"sub"}>{"ADMIN · KVCF 운영 콘솔"}</div>
          <form
            className={"form"}
            onSubmit={(event) => {
              event.preventDefault();
              const f = event.currentTarget as HTMLFormElement;
              const email = (f.querySelector('input[type="email"]') as HTMLInputElement | null)?.value ?? "";
              const password = (f.querySelector('input[type="password"]') as HTMLInputElement | null)?.value ?? "";
              (window as Window & { doLogin?: (role: string, email?: string, password?: string) => void }).doLogin?.("admin", email, password);
            }}
            style={{"gap": "12px", "maxWidth": "none"}}
          >
            <div>
              <label>{"관리자 이메일"}</label>
              <input type={"email"} placeholder={"admin@example.com"} />
            </div>
            <div>
              <label>{"비밀번호"}</label>
              <input type={"password"} placeholder={"••••••••"} />
            </div>
            <button className={"b fill"} type={"submit"}>{"관리자 로그인"}</button>
          </form>
          <div style={{"fontSize": "14px", "color": "var(--sub)", "marginTop": "6px"}}>
            {"일반 회원이신가요? "}
            <a style={{"color": "var(--blue)", "fontWeight": "700", "cursor": "pointer"}} data-r={"login"}>{"회원 로그인"}</a>
            {" · "}
            <a style={{"color": "var(--blue)", "fontWeight": "700", "cursor": "pointer"}} data-r={"signup"}>{"계정생성(무료)"}</a>
          </div>
          <div className={"legalbox"} style={{"marginTop": "12px"}}>
            <div className={"warn"}>
              {"※ 이 페이지는 운영자(ADMIN) 전용입니다. role=admin 권한이 없는 계정으로 로그인하면 회원 로그인과 동일하게 대시보드로 이동하며, 콘솔은 잠깁니다."}
              <br />
              {"관리자 권한은 협회 사무국이 직접 부여합니다. 개인이 임의로 신청할 수 없습니다."}
            </div>
          </div>
          <div className={"hint"}>
            {"※ 인증은 ForgeDB Auth 로 처리됩니다. 등록된 관리자 이메일과 비밀번호로 로그인해 주세요."}
          </div>
        </div>
      </div>
    </div>
  );
}