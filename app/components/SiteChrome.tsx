export function UtilityBar() {
  return (
    <>
      <div className={"util"}>
        <div className={"w"}>
          <span>
            {"HUMAN IMAGINATION · AI"}
          </span>
          <span>
            <a data-r={"verify"}>
              {"자격 검증"}
            </a>
            <a data-r={"partners"}>
              {"인증 교육기관"}
            </a>
            <a href={"http://blueforge.space"} target={"_blank"} rel={"noopener"}>
              {"BlueForge"}
            </a>
            <a data-r={"faq"}>
              {"고객지원"}
            </a>
          </span>
        </div>
      </div>
    </>
  );
}

export function SiteHeader() {
  return (
    <>
      <header>
        <div className={"w"}>
          <div className={"nav"}>
            <a className={"logo"} data-r={"home"}>
              <span className={"header-brand-mark"}>
                <img src={"assets/kvcf-logo-basic.png"} alt={"한국바이브코딩협회"} />
              </span>
            </a>
            <nav id={"publicNav"}>
              <div className={"mobile-auth"} id={"mobileAuth"} aria-label={"회원 메뉴"}></div>
              <div className={"hasmenu"}>
                <a data-r={"about"}>
                  {"협회소개"}
                </a>
                <div className={"submenu"}>
                  <a data-r={"about"}>
                    {"협회소개"}
                  </a>
                  <a data-r={"greeting"}>
                    {"회장 인사말"}
                  </a>
                  <a data-r={"org"}>
                    {"조직안내"}
                  </a>
                  <a data-r={"history"}>
                    {"연혁"}
                  </a>
                  <a data-r={"contact"}>
                    {"오시는 길"}
                  </a>
                </div>
              </div>
              <div className={"hasmenu"}>
                <a data-r={"cert"}>
                  {"자격검정"}
                </a>
                <div className={"submenu"}>
                  <a data-r={"cert"}>
                    {"자격체계 안내"}
                  </a>
                  <a data-r={"vca"}>
                    {"VCA (3급·준전문가)"}
                  </a>
                  <a data-r={"vcp"}>
                    {"VCP (2급·전문가)"}
                  </a>
                  <a data-r={"vce"}>
                    {"VCE (1급·수석전문가)"}
                  </a>
                  <a data-r={"consultant"}>
                    {"바이브코딩컨설턴트"}
                  </a>
                  <a data-r={"schedule"}>
                    {"시험 접수·일정"}
                  </a>
                  <a data-r={"rules"}>
                    {"검정 규정·환불"}
                  </a>
                </div>
              </div>
              <div className={"hasmenu"}>
                <a data-r={"edu"}>
                  {"교육"}
                </a>
                <div className={"submenu"}>
                  <a data-r={"edu"}>
                    {"교육과정 안내"}
                  </a>
                  <a data-r={"partners"}>
                    {"인증 교육기관"}
                  </a>
                  <a data-r={"apply"}>
                    {"교육기관 신청"}
                  </a>
                </div>
              </div>
              <a data-r={"verify"}>
                {"자격검증"}
              </a>
              <div className={"hasmenu"}>
                <a data-r={"member"}>
                  {"회원"}
                </a>
                <div className={"submenu"}>
                  <a data-r={"member"}>
                    {"회원 안내"}
                  </a>
                  <a data-r={"join"}>
                    {"회원 가입 신청"}
                  </a>
                  <a data-r={"companies"}>
                    {"회원사 소개"}
                  </a>
                </div>
              </div>
              <div className={"hasmenu"}>
                <a data-r={"notice"}>
                  {"소식"}
                </a>
                <div className={"submenu"}>
                  <a data-r={"notice"}>
                    {"공지사항"}
                  </a>
                  <a data-r={"recruit"}>
                    {"모집공고"}
                  </a>
                  <a data-r={"press"}>
                    {"보도자료·언론"}
                  </a>
                  <a data-r={"library"}>
                    {"자료실"}
                  </a>
                </div>
              </div>
              <div className={"hasmenu"}>
                <a data-r={"faq"}>
                  {"고객지원"}
                </a>
                <div className={"submenu"}>
                  <a data-r={"faq"}>
                    {"자주 묻는 질문"}
                  </a>
                  <a data-r={"inquiry"}>
                    {"문의하기"}
                  </a>
                </div>
              </div>
            </nav>
            <div className={"authbox"} id={"authbox"}></div>
            <button className={"burger"} aria-label={"메뉴"} aria-controls={"publicNav"} aria-expanded={"false"}>
              {"☰"}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

export function AdminEditor() {
  return (
    <>
      <div className={"aeditor"} id={"aEditor"} hidden={true}>
        <div className={"box"}>
          <button className={"x"} id={"aeX"}>
            {"×"}
          </button>
          <h3 id={"aeTitle"}>
            {"편집"}
          </h3>
          <div className={"af"} id={"aeFields"}></div>
          <div className={"foot"}>
            <button className={"abtn"} id={"aeCancel"}>
              {"취소"}
            </button>
            <button className={"abtn pri"} id={"aeSave"}>
              {"저장"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export function ApplicationModal() {
  return (
    <>
      <div className={"modal"} id={"applyModal"} hidden={true}>
        <div className={"modal-card"}>
          <button className={"modal-x"} id={"amClose"} aria-label={"닫기"}>
            {"×"}
          </button>
          <div className={"lbl"}>
            {"CERTIFICATION APPLICATION"}
          </div>
          <h3 id={"amTitle"} style={{"fontSize": "22px", "fontWeight": "900", "letterSpacing": "-.5px", "marginBottom": "4px"}}>
            {"자격 등록 신청"}
          </h3>
          <p id={"amSub"} style={{"fontSize": "13.5px", "color": "var(--sub)", "marginBottom": "16px"}}></p>
          <div className={"am-box"} id={"amCert"}></div>
          <div className={"am-agree"}>
            <div className={"am-h"}>
              {"동의 사항"}
            </div>
            <label className={"am-chk"}>
              <input type={"checkbox"} className={"agchk"} />
              <span>
                {"개인정보 수집·이용에 동의합니다. (성명·연락처·이메일 — 접수 및 안내 목적)"}
              </span>
            </label>
            <label className={"am-chk"}>
              <input type={"checkbox"} className={"agchk"} />
              <span>
                {"본 자격이 "}
                <b>
                  {"등록(예정) 민간자격이며 국가공인 자격이 아님"}
                </b>
                {"을 확인했습니다."}
              </span>
            </label>
            <label className={"am-chk"}>
              <input type={"checkbox"} className={"agchk"} />
              <span>
                {"응시료 환불규정(자격기본법 시행령 기준)을 확인했습니다."}
              </span>
            </label>
          </div>
          <div className={"am-note"}>
            {"※ 데모 목업입니다. 실제 접수·결제는 민간자격 등록 완료 후 개방되며, 신청 시 확인 이메일 발송이 시뮬레이션됩니다."}
          </div>
          <div className={"modal-acts"}>
            <button className={"b line"} id={"amCancel"}>
              {"취소"}
            </button>
            <button className={"b fill"} id={"amSubmit"}>
              {"동의하고 신청"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export function MembershipCTA() {
  return (
    <>
      <section className={"ctaband"}>
        <div className={"w"}>
          <div className={"in"}>
            <div>
              <h2>
                {"지금, 출범 회원이 되세요"}
              </h2>
              <p>
                {"자격 사전신청과 교육 혜택을 가장 먼저 받으세요."}
              </p>
            </div>
            <a className={"membership-benefits-link"} href={"#member"} data-r={"member"}>
              {"회원 혜택 알아보기 "}
              <span aria-hidden={"true"}>
                {"↗"}
              </span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

export function SiteFooter() {
  return (
    <>
      <footer>
        <div className={"w"}>
          <div className={"fgov"}>
            <div className={"gc"}>
              {"숙명여대 한류국제대학"}
            </div>
            <div className={"gc"}>
              {"한국AI교육협회"}
            </div>
            <div className={"gc"}>
              {"바나나부츠"}
            </div>
            <div className={"gc"}>
              {"블루포지"}
            </div>
          </div>
          <div className={"fcols"}>
            <div className={"fl"}>
              <img className={"footer-brand-logo"} src={"assets/kvcf-logo-white.png"} alt={"한국바이브코딩협회"} />
            </div>
            <nav>
              <a data-r={"about"}>
                {"협회소개"}
              </a>
              <a href={"#books"} data-r={"books"}>
                {"회장 저서"}
              </a>
              <a data-r={"cert"}>
                {"자격검정"}
              </a>
              <a data-r={"edu"}>
                {"교육"}
              </a>
              <a data-r={"verify"}>
                {"자격검증"}
              </a>
              <a data-r={"member"}>
                {"회원"}
              </a>
              <a data-r={"notice"}>
                {"소식"}
              </a>
              <a data-r={"faq"}>
                {"고객지원"}
              </a>
              <a data-r={"terms"}>
                {"이용약관"}
              </a>
              <a data-r={"privacy"}>
                {"개인정보처리방침"}
              </a>
              <a data-r={"noemail"}>
                {"이메일무단수집거부"}
              </a>
            </nav>
          </div>
          <div className={"fcontact"} id={"bFooterContact"}></div>
          <div className={"legal"}>
            <b>
              {"민간자격 등록 진행 중"}
            </b>
            {" · 등록 완료 후 등록번호·자격관리기관을 표기합니다. 본 자격은 국가공인 자격이 아닙니다. NCS 연계·국가공인은 협회의 목표이며 현 시점의 지위가 아닙니다."}
            <br />
            <div className="footer-business"><span id={"fvCompany"}>한국(K-)바이브코딩협회</span><span id={"fvBrn"}>사업자등록번호: 410-82-85804</span><span id={"fvCeo"}>문형남</span><span>창립 2026.06.09</span><span>© 2026 Korea Vibe Coding Federation. All rights reserved.</span></div>
          </div>
        </div>
      </footer>
    </>
  );
}
