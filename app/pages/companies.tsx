export default function CompaniesPage() {
  return (
    <div className="page" id="p-companies" hidden={true}>
      <div className={"pagehead"}>
        <div className={"w"}>
          <div className={"crumb"}>
            {"HOME / 회원 / 회원사 소개"}
          </div>
          <h1>
            {"회원사 소개"}
          </h1>
          <p>
            {"협회와 함께하는 회원사와 협력기관입니다."}
          </p>
        </div>
      </div>
      <section className={"sec"}>
        <div className={"w"}>
          <div style={{"overflowX": "auto"}}>
            <div className={"table-scroll"} role={"region"} aria-label={"표 내용"} tabIndex={0}>
              <table className={"ptable"}>
                <thead>
                  <tr>
                    <th>
                      {"기업명"}
                    </th>
                    <th>
                      {"업종"}
                    </th>
                    <th>
                      {"한줄 소개"}
                    </th>
                    <th>
                      {"링크"}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <b>
                        {"블루포지 (BlueForge)"}
                      </b>
                    </td>
                    <td>
                      {"AI 소프트웨어 플랫폼"}
                    </td>
                    <td>
                      {"협회 공식 실습·검정 플랫폼. 아이디어에서 배포까지 한 흐름으로 지원."}
                    </td>
                    <td>
                      <a href={"http://blueforge.space"} target={"_blank"} rel={"noopener"} style={{"color": "var(--blue)", "fontWeight": "700"}}>
                        {"바로가기 ↗"}
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <b>
                        {"바나나부츠 (BananaBoots)"}
                      </b>
                    </td>
                    <td>
                      {"AI 바이브코딩 서비스"}
                    </td>
                    <td>
                      {"비개발자를 위한 AI 개발 도구."}
                    </td>
                    <td>
                      <a href={"https://bananaboots.space/"} target={"_blank"} rel={"noopener"} style={{"color": "var(--blue)", "fontWeight": "700"}}>
                        {"바로가기 ↗"}
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={4} style={{"textAlign": "center", "color": "var(--sub)", "padding": "26px"}}>
                      {"회원사 모집 중 — 가입 문의는 "}
                      <a data-r={"join"} style={{"color": "var(--blue)", "fontWeight": "700", "cursor": "pointer"}}>
                        {"회원 가입 신청"}
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      <section className={"sec alt"}>
        <div className={"w"}>
          <div className={"sech"}>
            <h2>
              {"협력기관"}
            </h2>
          </div>
          <div className={"links4"}>
            <a className={"lk"} href={"https://hallyu.sookmyung.ac.kr/hallyu/index.do"} target={"_blank"} rel={"noopener"}>
              <span className={"t"}>
                <span className={"partner-name"}>
                  {"숙명여자대학교 한류국제대학"}
                </span>
                <small>
                  {"SOOKMYUNG"}
                </small>
              </span>
              <span className={"a"}>
                {"↗"}
              </span>
            </a>
            <a className={"lk"} href={"https://kaiea.kr/"} target={"_blank"} rel={"noopener"}>
              <span className={"t"}>
                <span className={"partner-name"}>
                  {"한국AI교육협회"}
                </span>
                <small>
                  {"KAIEA"}
                </small>
              </span>
              <span className={"a"}>
                {"↗"}
              </span>
            </a>
            <a className={"lk"} href={"https://bananaboots.space/"} target={"_blank"} rel={"noopener"}>
              <span className={"t"}>
                <span className={"partner-name"}>
                  {"바나나부츠"}
                </span>
                <small>
                  {"BANANABOOTS"}
                </small>
              </span>
              <span className={"a"}>
                {"↗"}
              </span>
            </a>
            <a className={"lk"} href={"http://blueforge.space"} target={"_blank"} rel={"noopener"}>
              <span className={"t"}>
                <span className={"partner-name"}>
                  {"블루포지"}
                </span>
                <small>
                  {"BLUEFORGE"}
                </small>
              </span>
              <span className={"a"}>
                {"↗"}
              </span>
            </a>
          </div>
          <div className={"logos"} style={{"marginTop": "16px"}}>
            <div className={"lc"}>
              {"회원사 로고"}
            </div>
            <div className={"lc"}>
              {"회원사 로고"}
            </div>
            <div className={"lc"}>
              {"회원사 로고"}
            </div>
            <div className={"lc"}>
              {"회원사 로고"}
            </div>
            <div className={"lc"}>
              {"회원사 로고"}
            </div>
            <div className={"lc"}>
              {"회원사 로고"}
            </div>
          </div>
          <p className={"note"}>
            {"※ 로고는 사용 허가 확인 후 게재됩니다."}
          </p>
        </div>
      </section>
    </div>
  );
}
