export default function OrgPage() {
  return (
    <div className="page" id="p-org" hidden={true}>
      <div className={"pagehead"}>
        <div className={"w"}>
          <div className={"crumb"}>
            {"HOME / 협회소개 / 조직안내"}
          </div>
          <h1>
            {"조직안내"}
          </h1>
          <p>
            {"회장과 수석부회장, 4인의 부회장 아래 사무총장이 5개 국(局)을 총괄하며, 감사는 독립 기구로 운영됩니다."}
          </p>
        </div>
      </div>
      <section className={"sec"}>
        <div className={"w"}>
          <div className={"lbl"}>
            {"ORGANIZATION CHART"}
          </div>
          <h2 className={"h2"} style={{"marginBottom": "8px"}}>
            {"조직도"}
          </h2>
          <p className={"lead"} style={{"marginBottom": "26px"}}>
            {"회장 아래 수석부회장과 4인의 부회장을 두고, 사무총장이 5개 국(局)을 총괄합니다. 감사는 독립 기구로 회무와 회계를 감사합니다."}
          </p>
          <div className={"org-chart-viewport"} role={"region"} aria-label={"협회 조직도. 회장, 수석부회장, 부회장, 사무총장과 5개 국. 감사는 독립 기구입니다."} tabIndex={0}>
            <div className={"chart"}>
              <div className={"crow1"}>
                <div className={"cnode chief"}>
                  <span className={"org-en"}>
                    {"CHAIRMAN"}
                  </span>
                  <b>
                    {"회장"}
                  </b>
                </div>
                <div className={"cnode audit"}>
                  <span className={"org-en"}>
                    {"INDEPENDENT"}
                  </span>
                  <b>
                    {"감사"}
                  </b>
                </div>
              </div>
              <div className={"cline"}></div>
              <div className={"cnode senior"}>
                <span className={"org-en"}>
                  {"SENIOR VICE CHAIR"}
                </span>
                <b>
                  {"수석부회장"}
                </b>
              </div>
              <div className={"cline"}></div>
              <div className={"vps"}>
                <div className={"cnode vp"}>
                  <b>
                    {"부회장"}
                  </b>
                  <span>
                    {"정책 · 기획"}
                  </span>
                </div>
                <div className={"cnode vp"}>
                  <b>
                    {"부회장"}
                  </b>
                  <span>
                    {"교육 · 자격"}
                  </span>
                </div>
                <div className={"cnode vp"}>
                  <b>
                    {"부회장"}
                  </b>
                  <span>
                    {"산업 · 기술"}
                  </span>
                </div>
                <div className={"cnode vp"}>
                  <b>
                    {"부회장"}
                  </b>
                  <span>
                    {"대외 · 회원"}
                  </span>
                </div>
              </div>
              <div className={"cline"}></div>
              <div className={"cnode sg"}>
                <b>
                  {"사무총장"}
                </b>
                <span className={"org-en"}>
                  {"SECRETARY GENERAL"}
                </span>
              </div>
              <div className={"cline"}></div>
              <div className={"bureaus"}>
                <div className={"bur"}>
                  <div className={"bh3"}>
                    {"기획행정국"}
                  </div>
                  <ul>
                    <li>
                      {"경영지원"}
                    </li>
                    <li>
                      {"전략기획"}
                    </li>
                    <li>
                      {"홍보 · 브랜딩"}
                    </li>
                  </ul>
                </div>
                <div className={"bur"}>
                  <div className={"bh3"}>
                    {"교육자격국"}
                  </div>
                  <ul>
                    <li>
                      {"교육기획"}
                    </li>
                    <li>
                      {"자격검정"}
                    </li>
                    <li>
                      {"강사양성"}
                    </li>
                  </ul>
                </div>
                <div className={"bur"}>
                  <div className={"bh3"}>
                    {"산업협력국"}
                  </div>
                  <ul>
                    <li>
                      {"기업협력"}
                    </li>
                    <li>
                      {"스타트업 육성"}
                    </li>
                    <li>
                      {"산학연계"}
                    </li>
                  </ul>
                </div>
                <div className={"bur"}>
                  <div className={"bh3"}>
                    {"기술표준국"}
                  </div>
                  <ul>
                    <li>
                      {"K-바이브 연구"}
                    </li>
                    <li>
                      {"프롬프트 / AI"}
                    </li>
                    <li>
                      {"표준화"}
                    </li>
                  </ul>
                </div>
                <div className={"bur"}>
                  <div className={"bh3"}>
                    {"대외협력국"}
                  </div>
                  <ul>
                    <li>
                      {"대관 · 대외협력"}
                    </li>
                    <li>
                      {"회원관리 · 확대"}
                    </li>
                    <li>
                      {"국제교류"}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={"sec alt"}>
        <div className={"w"}>
          <div className={"lbl"}>
            {"BUREAUS"}
          </div>
          <h2 className={"h2"} style={{"marginBottom": "20px"}}>
            {"국별 주요 업무"}
          </h2>
          <div className={"g3 org-bureau-cards"}>
            <div className={"card2"}>
              <h3>
                {"기획행정국"}
              </h3>
              <p>
                {"경영지원·전략기획을 총괄하고, 홍보·브랜딩으로 협회의 대외 인지도를 높입니다."}
              </p>
            </div>
            <div className={"card2"}>
              <h3>
                {"교육자격국"}
              </h3>
              <p>
                {"표준 커리큘럼 기반의 교육을 기획하고, 자격검정 운영과 인증 강사 양성을 담당합니다."}
              </p>
            </div>
            <div className={"card2"}>
              <h3>
                {"산업협력국"}
              </h3>
              <p>
                {"기업협력·스타트업 육성·산학연계를 추진하여 바이브코딩 산업 생태계를 확장합니다."}
              </p>
            </div>
            <div className={"card2"}>
              <h3>
                {"기술표준국"}
              </h3>
              <p>
                {"K-바이브와 프롬프트·AI 기술을 연구하고, 한국형 바이브코딩 표준을 정립합니다."}
              </p>
            </div>
            <div className={"card2"}>
              <h3>
                {"대외협력국"}
              </h3>
              <p>
                {"대관·대외협력, 회원관리·확대, 국제교류를 통해 협회의 대외 네트워크를 구축합니다."}
              </p>
            </div>
            <div className={"card2"}>
              <h3>
                {"감사 (독립)"}
              </h3>
              <p>
                {"독립 기구로서 회무와 회계를 감사하고,"}
                <br />
                {"그 결과를 총회에 보고합니다."}
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className={"sec"}>
        <div className={"w"}>
          <div className={"lbl"}>
            {"OFFICERS"}
          </div>
          <h2 className={"h2"} style={{"marginBottom": "22px"}}>
            {"임원 명단"}
          </h2>
          <div className={"offgrid"} id={"bOfficers"}></div>
          <p className={"note"}>
            {"※ [성명]·[소속]은 임원 확정 후 반영됩니다."}
          </p>
        </div>
      </section>
      <section className={"sec alt"}>
        <div className={"w"}>
          <div className={"lbl"}>
            {"INSTRUCTORS"}
          </div>
          <h2 className={"h2"} style={{"marginBottom": "8px"}}>
            {"강사진"}
          </h2>
          <p className={"lead"} style={{"maxWidth": "660px", "marginBottom": "22px"}}>
            {"협회 인증 강사는 최고 등급(VCE) 취득자 중 강사 인증 절차를 통과한 전문가로 구성됩니다. 현재 "}
            <b>
              {"1기 인증 강사를 모집"}
            </b>
            {"하고 있습니다."}
          </p>
          <div className={"g3 instructor-cards"}>
            <div className={"card2"}>
              <h3>
                <span className={"material-symbols-outlined instructor-icon"} aria-hidden={"true"}>
                  {"verified"}
                </span>
                {"강사 인증 기준"}
              </h3>
              <p>
                {"VCE(1급) 취득 · 강의 시연 및 교안 심사 · 윤리 서약. 표준 커리큘럼 이수 후 인증."}
              </p>
            </div>
            <div className={"card2"}>
              <h3>
                <span className={"material-symbols-outlined instructor-icon"} aria-hidden={"true"}>
                  {"person_add"}
                </span>
                {"1기 강사 모집 중"}
              </h3>
              <p>
                {"인증 강사 지원을 받고 있습니다. 지원 자격·절차는 문의하기로 연락 주세요."}
              </p>
            </div>
            <div className={"card2"}>
              <h3>
                <span className={"material-symbols-outlined instructor-icon"} aria-hidden={"true"}>
                  {"school"}
                </span>
                {"강사 역할"}
              </h3>
              <p>
                {"인증 교육과정 강의, 실습 지도, VCA·VCP 대비 교육을 담당합니다."}
              </p>
            </div>
          </div>
          <div className={"instructor-actions"}>
            <p className={"note"}>
              {"※ 강사 프로필은 1기 인증 완료 후 공개됩니다."}
            </p>
            <a className={"b line"} href={"#inquiry"} data-r={"inquiry"}>
              {"지원 문의 "}
              <span aria-hidden={"true"}>
                {"↗"}
              </span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
