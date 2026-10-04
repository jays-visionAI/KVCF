export default function PartnersPage() {
  return (
    <div className="page" id="p-partners" hidden={true}>
      <div className={"pagehead"}>
        <div className={"w"}>
          <div className={"crumb"}>
            {"HOME / 교육 / 인증 교육기관"}
          </div>
          <h1>
            {"인증 교육기관"}
          </h1>
          <p>
            {"협회 인증 교육기관은 표준 커리큘럼과 교재로 자격 대비 과정을 운영합니다. 현재 1기 인증 교육기관을 모집하고 있습니다."}
          </p>
        </div>
      </div>
      <section className={"sec"}>
        <div className={"w"}>
          <div className={"sech"}>
            <h2>
              {"인증 교육기관 목록"}
            </h2>
            <a data-r={"apply"}>
              {"교육기관 신청 →"}
            </a>
          </div>
          <div style={{"overflowX": "auto"}}>
            <div className={"table-scroll"} role={"region"} aria-label={"표 내용"} tabIndex={0}>
              <table className={"ptable"}>
                <thead>
                  <tr>
                    <th>
                      {"기관명"}
                    </th>
                    <th>
                      {"지역"}
                    </th>
                    <th>
                      {"운영 과정"}
                    </th>
                    <th>
                      {"연락처"}
                    </th>
                    <th>
                      {"상태"}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={5} style={{"textAlign": "center", "color": "var(--sub)", "padding": "36px"}}>
                      {"현재 인증 교육기관 "}
                      <b>
                        {"1기 모집 중"}
                      </b>
                      {"입니다. 지정 완료 후 목록이 공개됩니다."}
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
          <div className={"g3"}>
            <div className={"card2"}>
              <h3>
                {"표준 커리큘럼 제공"}
              </h3>
              <p>
                {"자격별 출제기준에 맞춘 표준 교육과정과 교재를 제공합니다."}
              </p>
            </div>
            <div className={"card2"}>
              <h3>
                {"BlueForge 실습 연계"}
              </h3>
              <p>
                {"실습·평가 환경을 함께 제공하여 교육과 검정이 동일한 기준으로 이어집니다."}
              </p>
            </div>
            <div className={"card2"}>
              <h3>
                {"인증 표장 사용"}
              </h3>
              <p>
                {"지정된 기관은 협회 인증 교육기관 표장을 정해진 범위에서 사용할 수 있습니다."}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
