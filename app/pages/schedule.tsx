export default function SchedulePage() {
  return (
    <div className="page" id="p-schedule" hidden={true}>
      <div className={"pagehead"}>
        <div className={"w"}>
          <div className={"crumb"}>
            {"HOME / 자격검정 / 시험 접수·일정"}
          </div>
          <h1>
            {"시험 접수 · 일정"}
          </h1>
          <p>
            {"민간자격 등록 완료 후 정기 검정 일정이 공고됩니다. 교육 수강과 검정 응시는 별도 절차이며, 실제 검정 접수는 일정 공고 후 개방됩니다."}
          </p>
        </div>
      </div>
      <section className={"sec"}>
        <div className={"w"}>
          <div className={"lbl"}>
            {"SCHEDULE"}
          </div>
          <h2 className={"h2"} style={{"marginBottom": "20px"}}>
            {"연간 시행 일정"}
          </h2>
          <div style={{"overflowX": "auto"}}>
            <div className={"table-scroll"} role={"region"} aria-label={"표 내용"} tabIndex={0}>
              <table className={"ptable"}>
                <thead>
                  <tr>
                    <th>
                      {"회차"}
                    </th>
                    <th>
                      {"종목"}
                    </th>
                    <th>
                      {"접수기간"}
                    </th>
                    <th>
                      {"시험일"}
                    </th>
                    <th>
                      {"발표일"}
                    </th>
                    <th>
                      {"상태"}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      {"2026-01"}
                    </td>
                    <td>
                      {"VCA (3급)"}
                    </td>
                    <td>
                      {"등록 완료 후 공고"}
                    </td>
                    <td>
                      {"—"}
                    </td>
                    <td>
                      {"—"}
                    </td>
                    <td>
                      <span className={"tag2 rev"}>
                        {"준비 중"}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {"2026-01"}
                    </td>
                    <td>
                      {"VCP (2급)"}
                    </td>
                    <td>
                      {"등록 완료 후 공고"}
                    </td>
                    <td>
                      {"—"}
                    </td>
                    <td>
                      {"—"}
                    </td>
                    <td>
                      <span className={"tag2 rev"}>
                        {"준비 중"}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {"2026-02"}
                    </td>
                    <td>
                      {"VCE (1급)"}
                    </td>
                    <td>
                      {"—"}
                    </td>
                    <td>
                      {"—"}
                    </td>
                    <td>
                      {"—"}
                    </td>
                    <td>
                      <span className={"tag2 wait"}>
                        {"미개설"}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {"2026-01"}
                    </td>
                    <td>
                      {"바이브코딩컨설턴트"}
                    </td>
                    <td>
                      {"등록 완료 후 공고"}
                    </td>
                    <td>
                      {"—"}
                    </td>
                    <td>
                      {"—"}
                    </td>
                    <td>
                      <span className={"tag2 rev"}>
                        {"준비 중"}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <p className={"note"}>
            {"※ 일정은 민간자격 등록 진행 상황에 따라 변경될 수 있으며, 확정 시 공지사항으로 안내합니다."}
          </p>
        </div>
      </section>
      <section className={"sec alt"}>
        <div className={"w"}>
          <div className={"g3"}>
            <div className={"card2"}>
              <h3>
                {"검정 응시 신청"}
              </h3>
              <p>
                {"일정 공고 후 응시할 종목과 회차를 선택해 접수합니다. 교육 수강 신청 및 합격 후 자격증 발급과는 별도 절차입니다."}
              </p>
            </div>
            <div className={"card2"}>
              <h3>
                {"준비물"}
              </h3>
              <p>
                {"신분증(본인 확인), 인터넷이 가능한 PC, BlueForge 계정. 실기는 온라인 환경에서 진행됩니다."}
              </p>
            </div>
            <div className={"card2"}>
              <h3>
                {"유의사항"}
              </h3>
              <p>
                {"부정행위 적발 시 해당 검정은 무효 처리되며 일정 기간 응시가 제한됩니다. 산출물의 저작권·보안 규정을 준수해야 합니다."}
              </p>
            </div>
          </div>
          <div className={"acts"} style={{"marginTop": "20px"}}>
            <a className={"b line sm"} data-r={"edu"}>
              {"교육과정 안내"}
            </a>
            <a className={"b line"} data-r={"rules"}>
              {"검정 규정 보기"}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
