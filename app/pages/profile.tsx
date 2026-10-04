export default function ProfilePage() {
  return (
    <div className="page" id="p-profile" hidden={true}>
      <div className={"pagehead"}>
        <div className={"w"}>
          <div className={"crumb"}>
            {"HOME / 마이페이지 / 회원정보 수정"}
          </div>
          <h1>
            {"회원정보 수정"}
          </h1>
          <p>
            {"기본 정보를 확인하고 변경할 수 있습니다."}
          </p>
        </div>
      </div>
      <div className={"sec"}>
        <div className={"w"}>
          <form id={"memberProfileForm"} className={"form"}>
            <div className={"profile-summary"}>
              <span>
                {"회원 유형"}
              </span>
              <strong id={"profileType"}>
                {"개인 회원"}
              </strong>
              <p>
                {"유형 변경은 별도 절차가 필요합니다. 사무국에 문의해 주세요."}
              </p>
            </div>
            <div className={"profile-grid"}>
              <fieldset className={"profile-group"}>
                <legend>
                  {"기본 정보"}
                </legend>
                <div>
                  <label htmlFor={"profileName"}>
                    {"이름"}
                  </label>
                  <input id={"profileName"} name={"name"} autoComplete={"off"} required={true} maxLength={40} />
                </div>
                <div>
                  <label htmlFor={"profileEmail"}>
                    {"이메일"}
                  </label>
                  <input id={"profileEmail"} name={"email"} type={"email"} autoComplete={"off"} required={true} maxLength={120} />
                </div>
                <div>
                  <label htmlFor={"profilePhone"}>
                    {"연락처"}
                  </label>
                  <input id={"profilePhone"} name={"phone"} type={"tel"} autoComplete={"off"} maxLength={30} placeholder={"010-1234-5678"} />
                </div>
              </fieldset>
              <fieldset className={"profile-group"} aria-describedby={"passwordUiNote"}>
                <legend>
                  {"비밀번호 재설정"}
                </legend>
                <div>
                  <label htmlFor={"profileCurrentPassword"}>
                    {"현재 비밀번호"}
                  </label>
                  <input id={"profileCurrentPassword"} type={"password"} autoComplete={"current-password"} placeholder={"현재 비밀번호 입력"} disabled={true} />
                </div>
                <div>
                  <label htmlFor={"profileNewPassword"}>
                    {"새 비밀번호"}
                  </label>
                  <input id={"profileNewPassword"} type={"password"} autoComplete={"new-password"} placeholder={"새 비밀번호 입력"} disabled={true} />
                </div>
                <div>
                  <label htmlFor={"profileConfirmPassword"}>
                    {"새 비밀번호 확인"}
                  </label>
                  <input id={"profileConfirmPassword"} type={"password"} autoComplete={"new-password"} placeholder={"새 비밀번호 다시 입력"} disabled={true} />
                </div>
                <p id={"passwordUiNote"} className={"profile-password-note"}>
                  {"비밀번호 재설정은 기능 연결 후 이용할 수 있습니다."}
                </p>
              </fieldset>
            </div>
            <p className={"profile-demo-note"}>
              {"데모 화면입니다. 기본 정보는 예시로 입력해 주세요. 저장 내용은 새로고침하면 초기화됩니다."}
            </p>
            <div className={"profile-actions"}>
              <button type={"button"} className={"b line"} data-r={"mypage"}>
                {"취소"}
              </button>
              <button type={"submit"} className={"b fill"}>
                {"기본 정보 저장"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
