"use client";

export default function SignupPage() {
  return (
    <div className="page" id="p-signup" hidden={true}>
      <div className={"pagehead"}>
        <div className={"w"}>
          <div className={"crumb"}>
            {"HOME / 회원 / 계정생성"}
          </div>
          <h1>
            {"계정생성 (무료)"}
          </h1>
          <p>
            {"로그인에 사용할 계정을 무료로 만듭니다. 협회회원가입(/#join)과는 별도 절차입니다."}
          </p>
        </div>
      </div>
      <section className={"sec"}>
        <div className={"w"}>
          <div className={"g2"} style={{"gap": "44px", "alignItems": "start"}}>
            <form
              className={"form"}
              onSubmit={(event) => {
                event.preventDefault();
                const f = event.currentTarget as HTMLFormElement;
                const name = (f.querySelector('input[name="name"]') as HTMLInputElement | null)?.value ?? "";
                const email = (f.querySelector('input[type="email"]') as HTMLInputElement | null)?.value ?? "";
                const password = (f.querySelector('input[name="password"]') as HTMLInputElement | null)?.value ?? "";
                const confirm = (f.querySelector('input[name="confirm"]') as HTMLInputElement | null)?.value ?? "";
                const agreeTerms = (f.querySelector('input[name="agreeTerms"]') as HTMLInputElement | null)?.checked ?? false;
                const agreePrivacy = (f.querySelector('input[name="agreePrivacy"]') as HTMLInputElement | null)?.checked ?? false;
                if (!email || !password) {
                  window.alert("이메일과 비밀번호를 입력해 주세요.");
                  return;
                }
                if (password !== confirm) {
                  window.alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
                  return;
                }
                if (!agreeTerms || !agreePrivacy) {
                  window.alert("필수 약관에 모두 동의해 주세요.");
                  return;
                }
                (window as Window & { doSignup?: (name: string, email: string, password: string) => void }).doSignup?.(name, email, password);
              }}
              style={{"gap": "12px", "maxWidth": "none"}}
            >
              <div>
                <label>
                  {"성명"}
                </label>
                <input name={"name"} placeholder={"성명"} />
              </div>
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
                <input type={"password"} name={"password"} autoComplete={"new-password"} placeholder={"비밀번호 입력 (8자 이상 권장)"} />
              </div>
              <div>
                <label>
                  {"비밀번호 확인"}
                </label>
                <input type={"password"} name={"confirm"} autoComplete={"new-password"} placeholder={"비밀번호 다시 입력"} />
              </div>
              <div className={"agree"}>
                <label>
                  <input type={"checkbox"} name={"agreeTerms"} />
                  <span>
                    <b>
                      {"[필수]"}
                    </b>
                    {" 협회 이용약관에 동의합니다."}
                  </span>
                </label>
                <label>
                  <input type={"checkbox"} name={"agreePrivacy"} />
                  <span>
                    <b>
                      {"[필수]"}
                    </b>
                    {" 개인정보 수집·이용에 동의합니다. (수집항목: 성명·이메일 / 목적: 계정 관리 / 보유: 탈퇴 시까지)"}
                  </span>
                </label>
              </div>
              <button className={"b fill"} type={"submit"}>
                {"계정생성"}
              </button>
              <div style={{"fontSize": "14px", "color": "var(--sub)", "marginTop": "6px"}}>
                {"이미 계정이 있으신가요? "}
                <a style={{"color": "var(--blue)", "fontWeight": "700", "cursor": "pointer"}} data-r={"login"}>
                  {"로그인"}
                </a>
              </div>
              <div className={"hint"}>
                {"※ 계정생성 직후 가입한 이메일로 인증 메일이 발송됩니다. 인증 완료 후 로그인이 가능합니다."}
                <br />
                {"인증 메일이 도착하지 않으면 스팸함 확인 · 메일함 용량 점검 후, 메일 서비스의 화이트리스트에 @forgedb.cloud 도메인을 추가하고 다시 시도해 주세요."}
              </div>
            </form>
            <div>
              <div className={"lbl"}>
                {"INFO"}
              </div>
              <h2 className={"h2"} style={{"fontSize": "22px", "marginBottom": "16px"}}>
                {"계정생성과 협회회원가입의 차이"}
              </h2>
              <div className={"table-scroll"} role={"region"} aria-label={"표 내용"} tabIndex={0}>
                <table className={"ptable"}>
                  <tbody>
                    <tr>
                      <th style={{"width": "140px"}}>
                        {"계정생성"}
                      </th>
                      <td>
                        {"로그인에 사용할 이메일·비밀번호를 무료로 만드는 절차입니다. 마이페이지·자격 현황 조회를 위한 최소 단위입니다."}
                      </td>
                    </tr>
                    <tr>
                      <th>
                        {"협회회원가입"}
                      </th>
                      <td>
                        {"개인·기업·교육기관 회원으로 정식 등록되는 유료 절차입니다. 심사(기업·교육기관)와 회비 납부가 필요합니다. "}
                        <a style={{"color": "var(--blue)", "fontWeight": "700", "cursor": "pointer"}} data-r={"join"}>
                          {"/#join"}
                        </a>
                        {"으로 진행합니다."}
                      </td>
                    </tr>
                    <tr>
                      <th>
                        {"안내"}
                      </th>
                      <td>
                        {"계정을 먼저 만들고, 필요 시 협회회원가입을 별도로 신청해 주세요. 두 절차는 독립적입니다."}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className={"legalbox"} style={{"marginTop": "16px"}}>
                <div className={"warn"}>
                  {"※ 인증 메일이 오지 않으면 스팸함 또는 사서함 용량을 확인해 주세요. 인증 메일은 ForgeDB Auth 가 발송합니다."}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}