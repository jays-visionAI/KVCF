"use client";

export default function LoginPage() {
  return (
    <div className="page" id="p-login" hidden={true}>
      <div className={"login"}>
        <div className={"brand"}>
          <div className={"login-brand-content"}>
            <p className={"login-brand-intro"}>
              {"로그인하면 내 자격 현황,"}<br />
              {"시험 접수·이력, 교육 진도, 자격증 발급을"}<br />
              {"한 곳에서 관리할 수 있습니다."}
            </p>
            <p className={"login-brand-note"} lang={"en"}>
              <span>
                {"YOUR QUALIFICATIONS AND LEARNING,"}
              </span>
              <span>
                {"ALL IN ONE PLACE."}
              </span>
            </p>
            <ul style={{"marginTop": "26px"}}>
              <li>
                {"내 자격(VCA·VCP·VCE) 현황과 자격증"}
              </li>
              <li>
                {"교육 수강 · 검정 응시 · 자격증 발급 내역을 구분해 확인"}
              </li>
              <li>
                {"교육 수강 진도 · BlueForge 실습"}
              </li>
              <li>
                {"회원정보 · 회비 · 알림"}
              </li>
            </ul>
          </div>
          <img className="login-brand-mark" src="/assets/kvcf-logo-white.png" alt="" aria-hidden="true" />
        </div>
        <div className={"panel"}>
          <div className={"card"}>
            <h1>
              {"로그인"}
            </h1>
            <div className={"sub"}>
              {"한국바이브코딩협회(KVCF) 회원 포털"}
            </div>
            <form
              className={"form"}
              onSubmit={(event) => {
                event.preventDefault();
                const f = event.currentTarget as HTMLFormElement;
                const email = (f.querySelector('input[type="email"]') as HTMLInputElement | null)?.value ?? "";
                const password = (f.querySelector('input[type="password"]') as HTMLInputElement | null)?.value ?? "";
                (window as Window & { doLogin?: (role: string, email?: string, password?: string) => void }).doLogin?.("member", email, password);
              }}
              style={{"gap": "12px", "maxWidth": "none"}}
            >
              <div>
                <label>
                  {"이메일"}
                </label>
                <input type={"email"} placeholder={"email@example.com"} />
              </div>
              <div>
                <label>
                  {"비밀번호"}
                </label>
                <input type={"password"} placeholder={"••••••••"} />
              </div>
              <button className={"b fill"} type={"submit"}>
                {"로그인"}
              </button>
            </form>
            <div style={{"fontSize": "14px", "color": "var(--sub)", "marginTop": "6px"}}>
              {"계정이 없으신가요? "}
              <a style={{"color": "var(--blue)", "fontWeight": "700", "cursor": "pointer"}} data-r={"signup"}>
                {"계정생성(무료)"}
              </a>
              {" · "}
              <a style={{"color": "var(--blue)", "fontWeight": "700", "cursor": "pointer"}} data-r={"join"}>
                {"협회회원가입"}
              </a>
            </div>
            <div className="adm-gate-card">
              <div className="adm-gate-head">
                <span className="adm-gate-tag">{"ADMIN"}</span>
                <span className="adm-gate-title">{"운영자 전용 로그인"}</span>
              </div>
              <p className="adm-gate-desc">
                {"이 화면은 일반 회원 로그인 화면입니다. 운영자(ADMIN) 는 아래 전용 경로로 이동해 주세요."}
              </p>
              <a className="adm-gate-btn" data-r={"admin"}>
                <span>{"관리자 콘솔 로그인"}</span>
                <span className="adm-gate-arrow" aria-hidden="true">{"→"}</span>
              </a>
              <div className="adm-gate-note">
                {"※ 어드민 콘솔은 회원 사이트와 완전히 분리된 전용 셸에서 동작하며, 권한이 없는 계정은 진입할 수 없습니다."}
              </div>
            </div>
            <div className={"hint"}>
              {"※ 인증은 ForgeDB Auth 로 처리됩니다. 가입한 이메일과 비밀번호로 로그인해 주세요."}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
