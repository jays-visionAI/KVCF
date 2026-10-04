"use client";

export default function DashboardPage() {
  return (
    <div className="page" id="p-dashboard" hidden={true}>
      <div className={"w"}>
        <div className={"dash mp"}>
          <div className={"dashhead"}>
            <div>
              <h1>
                {"안녕하세요, "}
                <span id={"dashName"}>
                  {"회원"}
                </span>
                {"님"}
              </h1>
              <p>
                {"개인 회원 · 회원번호 KVCF-M-2026-00137 · 회비 정상"}
              </p>
            </div>
            <div className={"acts"}>
              <a className={"b line sm"} data-r={"schedule"}>
                {"검정 일정 안내"}
              </a>
              <button className={"b fill sm"} data-r={"edu"}>
                {"교육 이어하기"}
              </button>
            </div>
          </div>
          <p className={"mp-demo"}>
            {"UI 데모 · 신청·결제·이수·합격·발급 상태는 모두 예시입니다. 실제 처리나 데이터 저장은 진행되지 않습니다."}
          </p>
          <div className={"mp-tabs"} role={"tablist"} aria-label={"마이페이지 메뉴"}>
            <button type={"button"} role={"tab"} id={"mp-tab-overview"} aria-controls={"mp-panel-overview"} aria-selected={"true"} tabIndex={0} data-mp-tab={"overview"}>
              {"이용 현황"}
            </button>
            <button type={"button"} role={"tab"} id={"mp-tab-education"} aria-controls={"mp-panel-education"} aria-selected={"false"} tabIndex={-1} data-mp-tab={"education"}>
              {"내 교육"}
            </button>
            <button type={"button"} role={"tab"} id={"mp-tab-exams"} aria-controls={"mp-panel-exams"} aria-selected={"false"} tabIndex={-1} data-mp-tab={"exams"}>
              {"시험 신청·결과"}
            </button>
            <button type={"button"} role={"tab"} id={"mp-tab-certificates"} aria-controls={"mp-panel-certificates"} aria-selected={"false"} tabIndex={-1} data-mp-tab={"certificates"}>
              {"자격증·발급"}
            </button>
            <button type={"button"} role={"tab"} id={"mp-tab-payments"} aria-controls={"mp-panel-payments"} aria-selected={"false"} tabIndex={-1} data-mp-tab={"payments"}>
              {"결제·환불 내역"}
            </button>
            <button type={"button"} role={"tab"} id={"mp-tab-account"} aria-controls={"mp-panel-account"} aria-selected={"false"} tabIndex={-1} data-mp-tab={"account"}>
              {"회원정보"}
            </button>
            <button type={"button"} role={"tab"} id={"mp-tab-alerts"} aria-controls={"mp-panel-alerts"} aria-selected={"false"} tabIndex={-1} data-mp-tab={"alerts"}>
              {"알림"}
            </button>
          </div>
          <section className={"mp-panel"} id={"mp-panel-overview"} role={"tabpanel"} aria-labelledby={"mp-tab-overview"} tabIndex={0}>
            <div className={"mp-section-head"}>
              <div>
                <h2>
                  {"다음에 할 일"}
                </h2>
                <p>
                  {"신청 상태에 따른 확인 항목입니다. 아래 안내는 UI 예시입니다."}
                </p>
              </div>
            </div>
            <div id={"mp-next"} className={"mp-next"}></div>
            <div className={"kpis"}>
              <div className={"kpi"}>
                <div className={"l"}>
                  {"보유 자격"}
                </div>
                <div className={"n"}>
                  {"1"}
                </div>
                <div className={"s"}>
                  {"VCA 입문"}
                </div>
              </div>
              <div className={"kpi"}>
                <div className={"l"}>
                  {"진행 중"}
                </div>
                <div className={"n"}>
                  {"1"}
                </div>
                <div className={"s"}>
                  {"VCP 실무 검정 준비"}
                </div>
              </div>
              <div className={"kpi"}>
                <div className={"l"}>
                  {"교육 진도"}
                </div>
                <div className={"n"}>
                  {"62%"}
                </div>
                <div className={"s"}>
                  {"공통기초 완료"}
                </div>
              </div>
              <div className={"kpi"}>
                <div className={"l"}>
                  {"다음 회차"}
                </div>
                <div className={"n"} style={{"fontSize": "20px", "paddingTop": "8px"}}>
                  {"준비 중"}
                </div>
                <div className={"s"}>
                  {"등록 완료 후 개방"}
                </div>
              </div>
            </div>
            <div className={"dgrid"}>
              <div>
                <div className={"panel2"}>
                  <div className={"ph2"}>
                    <h3>
                      {"보유 자격 · 자격증 발급"}
                    </h3>
                    <a data-r={"cert"}>
                      {"자격 안내 →"}
                    </a>
                  </div>
                  <div className={"certrow"}>
                    <span className={"g"}>
                      {"VCA · 3급"}
                    </span>
                    <div className={"info"}>
                      <div className={"t"}>
                        {"입문 — Vibe Coding Associate"}
                      </div>
                      <div className={"d"}>
                        {"취득일 2026.—.— · 자격번호 KVCF-VCA-2026-00921"}
                      </div>
                    </div>
                    <span className={"pill2 ok"}>
                      {"취득"}
                    </span>
                    <button className={"minibtn"} disabled={true}>
                      {"발급 연동 준비 중"}
                    </button>
                  </div>
                </div>
                <div className={"panel2"}>
                  <div className={"ph2"}>
                    <h3>
                      {"검정 응시 이력"}
                    </h3>
                    <a data-r={"schedule"}>
                      {"시험 일정 →"}
                    </a>
                  </div>
                  <div className={"table-scroll"} role={"region"} aria-label={"표 내용"} tabIndex={0}>
                    <table className={"dtable"}>
                      <thead>
                        <tr>
                          <th>
                            {"일자"}
                          </th>
                          <th>
                            {"종목"}
                          </th>
                          <th>
                            {"구분"}
                          </th>
                          <th>
                            {"상태"}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            {"2026.—.—"}
                          </td>
                          <td>
                            {"VCA 입문"}
                          </td>
                          <td>
                            {"실기"}
                          </td>
                          <td>
                            <span className={"pill2 ok"} style={{"fontSize": "14px"}}>
                              {"합격"}
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            {"예정"}
                          </td>
                          <td>
                            {"VCP 실무(웹)"}
                          </td>
                          <td>
                            {"실기"}
                          </td>
                          <td>
                            <span className={"pill2 prog"} style={{"fontSize": "14px"}}>
                              {"접수 예정"}
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className={"panel2"}>
                  <div className={"ph2"}>
                    <h3>
                      {"교육 수강 현황"}
                    </h3>
                    <a data-r={"edu"}>
                      {"이어하기 →"}
                    </a>
                  </div>
                  <div className={"prog-item"}>
                    <div className={"row"}>
                      <span>
                        {"공통 기초 (C1–C7)"}
                      </span>
                      <span className={"pc"}>
                        {"100%"}
                      </span>
                    </div>
                    <div className={"prog-b"}>
                      <i style={{"width": "100%"}}></i>
                    </div>
                  </div>
                  <div className={"prog-item"}>
                    <div className={"row"}>
                      <span>
                        {"심화 · 웹 서비스"}
                      </span>
                      <span className={"pc"}>
                        {"45%"}
                      </span>
                    </div>
                    <div className={"prog-b"}>
                      <i style={{"width": "45%"}}></i>
                    </div>
                  </div>
                  <div className={"prog-item"}>
                    <div className={"row"}>
                      <span>
                        {"고급·통합 (X1–X7)"}
                      </span>
                      <span className={"pc"}>
                        {"0%"}
                      </span>
                    </div>
                    <div className={"prog-b"}>
                      <i style={{"width": "0%"}}></i>
                    </div>
                  </div>
                  <div style={{"marginTop": "14px"}}>
                    <button className={"b fill sm"} style={{"width": "100%"}} onClick={() => window.open("http://blueforge.space", "_blank")}>
                      {"BlueForge 실습 열기"}
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <div className={"panel2"}>
                  <div className={"ph2"}>
                    <h3>
                      {"회원 정보"}
                    </h3>
                  </div>
                  <div style={{"fontSize": "14px", "lineHeight": "1.9", "color": "var(--sub)"}}>
                    {"유형: 개인 회원"}
                    <br />
                    {"회비: 정상 (2026)"}
                    <br />
                    {"이메일: "}
                    <span id={"memberEmail"}>
                      {""}
                    </span>
                    <br />
                    {"연락처: "}
                    <span id={"memberPhone"}>
                      {"미등록"}
                    </span>
                  </div>
                  <button className={"minibtn"} style={{"marginTop": "12px"}} data-r={"profile"}>
                    {"정보 수정"}
                  </button>
                  <p id={"profileSaved"} role={"status"} style={{"fontSize": "14px", "marginTop": "10px", "color": "var(--sub)"}}></p>
                </div>
                <div className={"panel2"} id={"notifPanel"}>
                  <div className={"ph2"}>
                    <h3>
                      {"알림"}
                    </h3>
                  </div>
                  <div id={"notifList"}>
                    <div style={{"fontSize": "14px", "color": "var(--faint)"}}>
                      {"새 알림이 없습니다."}
                    </div>
                  </div>
                </div>
                <div className={"panel2"}>
                  <div className={"ph2"}>
                    <h3>
                      {"공지"}
                    </h3>
                    <a data-r={"notice"}>
                      {"전체 →"}
                    </a>
                  </div>
                  <div style={{"fontSize": "14px", "lineHeight": "1.9", "color": "var(--sub)"}}>
                    {"· 교육·검정 일정 안내 "}
                    <span style={{"color": "var(--faint)"}}>
                      {"06.16"}
                    </span>
                    <br />
                    {"· 민간자격 등록 진행 현황 "}
                    <span style={{"color": "var(--faint)"}}>
                      {"06.14"}
                    </span>
                    <br />
                    {"· 인증 교육기관 모집 "}
                    <span style={{"color": "var(--faint)"}}>
                      {"06.13"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className={"mp-panel"} id={"mp-panel-education"} role={"tabpanel"} aria-labelledby={"mp-tab-education"} tabIndex={0} hidden={true}>
            <div className={"mp-section-head"}>
              <div>
                <h2>
                  {"내 교육"}
                </h2>
                <p>
                  {"신청부터 수강·이수까지 과정별 내역을 확인합니다."}
                </p>
              </div>
              <button className={"b line sm"} data-r={"edu"}>
                {"교육과정 안내"}
              </button>
            </div>
            <div id={"mp-education"} className={"mp-records"}></div>
          </section>
          <section className={"mp-panel"} id={"mp-panel-exams"} role={"tabpanel"} aria-labelledby={"mp-tab-exams"} tabIndex={0} hidden={true}>
            <div className={"mp-section-head"}>
              <div>
                <h2>
                  {"시험 신청·결과"}
                </h2>
                <p>
                  {"접수·응시료와 필기·실기·최종 결과를 구분해 확인합니다."}
                </p>
              </div>
              <button className={"b line sm"} data-r={"schedule"}>
                {"검정 일정 안내"}
              </button>
            </div>
            <p className={"mp-policy"}>
              {"필기·실기 적용 여부, 비율, 합격 기준은 종목별 운영 기준 확정 후 안내됩니다."}
            </p>
            <div id={"mp-exams"} className={"mp-records"}></div>
          </section>
          <section className={"mp-panel"} id={"mp-panel-certificates"} role={"tabpanel"} aria-labelledby={"mp-tab-certificates"} tabIndex={0} hidden={true}>
            <div className={"mp-section-head"}>
              <div>
                <h2>
                  {"자격증·발급"}
                </h2>
                <p>
                  {"합격 이후 발급 신청·결제·처리 내역과 보유 자격을 확인합니다."}
                </p>
              </div>
            </div>
            <p className={"mp-policy"}>
              {"발급 형태·비용·소요 기간 및 자격 등록 시점은 확정 후 안내됩니다."}
            </p>
            <div id={"mp-certificates"} className={"mp-records"}></div>
          </section>
          <section className={"mp-panel"} id={"mp-panel-payments"} role={"tabpanel"} aria-labelledby={"mp-tab-payments"} tabIndex={0} hidden={true}>
            <div className={"mp-section-head"}>
              <div>
                <h2>
                  {"결제·환불 내역"}
                </h2>
                <p>
                  {"수강료·응시료·발급비를 신청 건과 연결해 확인합니다."}
                </p>
              </div>
            </div>
            <div className={"mp-filters"} role={"group"} aria-label={"결제 내역 종류"}>
              <button aria-pressed={"true"} data-mp-filter={"all"}>
                {"전체"}
              </button>
              <button aria-pressed={"false"} data-mp-filter={"education"}>
                {"수강료"}
              </button>
              <button aria-pressed={"false"} data-mp-filter={"exams"}>
                {"응시료"}
              </button>
              <button aria-pressed={"false"} data-mp-filter={"certificates"}>
                {"발급비"}
              </button>
            </div>
            <div id={"mp-payments"} className={"mp-records"}></div>
            <div className={"mp-box mp-empty"}>
              <h3>
                {"환불 신청 내역이 없습니다."}
              </h3>
              <p>
                {"환불 신청·검토·처리 결과를 표시할 영역입니다. 환불 기준과 가능 여부는 운영정책 확정 후 안내됩니다."}
              </p>
            </div>
          </section>
          <section className={"mp-panel"} id={"mp-panel-account"} role={"tabpanel"} aria-labelledby={"mp-tab-account"} tabIndex={0} hidden={true}>
            <div className={"mp-section-head"}>
              <div>
                <h2>
                  {"회원정보"}
                </h2>
                <p>
                  {"기본 정보와 계정 정보를 확인합니다."}
                </p>
              </div>
              <button className={"b line sm"} data-r={"profile"}>
                {"정보 수정"}
              </button>
            </div>
            <section className={"mp-box"}>
              <dl className={"mp-account"}>
                <div>
                  <dt>
                    {"회원 유형"}
                  </dt>
                  <dd>
                    {"개인 회원"}
                  </dd>
                </div>
                <div>
                  <dt>
                    {"이메일"}
                  </dt>
                  <dd id={"mp-account-email"}>
                    {""}
                  </dd>
                </div>
                <div>
                  <dt>
                    {"연락처"}
                  </dt>
                  <dd id={"mp-account-phone"}>
                    {"미등록"}
                  </dd>
                </div>
                <div>
                  <dt>
                    {"회원번호"}
                  </dt>
                  <dd>
                    {"실제 운영 연결 후 표시"}
                  </dd>
                </div>
                <div>
                  <dt>
                    {"회비 안내"}
                  </dt>
                  <dd>
                    {"정책 확정 후 안내"}
                  </dd>
                </div>
                <div>
                  <dt>
                    {"비밀번호"}
                  </dt>
                  <dd>
                    <button className={"minibtn"} data-r={"profile"}>
                      {"비밀번호 변경 UI 보기"}
                    </button>
                  </dd>
                </div>
              </dl>
              <p className={"mp-muted"}>
                {"회원 유형 변경은 별도 절차로 안내됩니다. 비밀번호 확인·변경 기능은 연결되지 않았습니다."}
              </p>
              <p id={"mp-profile-saved"} role={"status"} className={"mp-muted"}></p>
            </section>
          </section>
          <section className={"mp-panel"} id={"mp-panel-alerts"} role={"tabpanel"} aria-labelledby={"mp-tab-alerts"} tabIndex={0} hidden={true}>
            <div className={"mp-section-head"}>
              <div>
                <h2>
                  {"알림"}
                </h2>
                <p>
                  {"내 신청 건과 관련된 안내를 확인합니다."}
                </p>
              </div>
              <button className={"b line sm"} data-r={"notice"}>
                {"협회 공지사항"}
              </button>
            </div>
            <section className={"mp-box"} id={"mp-notif-panel"}>
              <h3>
                {"최근 신청 알림"}
              </h3>
              <div id={"mp-notif-list"}></div>
            </section>
            <section className={"mp-box"}>
              <h3>
                {"알림 예시"}
              </h3>
              <p className={"mp-muted"}>
                {"아래 알림은 UI 확인을 위한 예시입니다. 실제 발송되거나 결제가 처리되지 않습니다."}
              </p>
              <div id={"mp-alerts"}></div>
            </section>
          </section>
          <dialog id={"mp-dialog"} aria-labelledby={"mp-dialog-title"}>
            <div className={"mp-dialog-head"}>
              <h2 id={"mp-dialog-title"}></h2>
              <button type={"button"} data-mp-close={""} aria-label={"닫기"}>
                {"×"}
              </button>
            </div>
            <div id={"mp-dialog-body"}></div>
            <form method={"dialog"}>
              <button className={"b line sm"}>
                {"닫기"}
              </button>
            </form>
          </dialog>
        </div>
      </div>
    </div>
  );
}
