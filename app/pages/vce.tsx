export default function VcePage() {
  return (
    <div className="page" id="p-vce" hidden={true}>
      <div className={"pagehead"}>
        <div className={"w"}>
          <div className={"crumb"}>
            {"HOME / 자격검정 / VCE"}
          </div>
          <h1>
            {"VCE (1급 · 전문)"}
          </h1>
          <p>
            {"Vibe Coding Expert — 멀티 도메인 아키텍처 설계와 에이전트 오케스트레이션, 보안 심화와 팀 리딩을 수행하는 전문가 자격입니다."}
          </p>
        </div>
      </div>
      <section className={"sec"}>
        <div className={"w"}>
          <div className={"certblock"}>
            <div className={"top"}>
              <div>
                <span className={"g"}>
                  {"VCE · 1급"}
                </span>
                <h2>
                  {"바이브코딩 수석전문가"}
                </h2>
                <div className={"lv"}>
                  {"Vibe Coding Expert"}
                </div>
                <p className={"desc"}>
                  {"여러 도메인에 걸친 시스템을 설계하고, 복잡한 프로젝트를 주도하며, 팀의 산출물 품질과 보안을 책임질 수 있는 최고 등급입니다."}
                </p>
              </div>
              <div className={"cst"}>
                <span className={"st"}>
                  {"민간자격 등록 진행 중"}
                </span>
                <span className={"cert-status-note"}>
                  {"검정 접수 일정은 추후 공지됩니다."}
                </span>
              </div>
            </div>
            <div className={"spec"}>
              <div className={"it"}>
                <div className={"k"}>
                  {"응시자격"}
                </div>
                <div className={"v"}>
                  {"2급(VCP) 취득"}
                </div>
              </div>
              <div className={"it"}>
                <div className={"k"}>
                  {"검정방법"}
                </div>
                <div className={"v"}>
                  {"멀티도메인 종합 프로젝트"}
                </div>
              </div>
              <div className={"it"}>
                <div className={"k"}>
                  {"합격기준"}
                </div>
                <div className={"v"}>
                  {"심화 루브릭 종합 충족"}
                </div>
              </div>
              <div className={"it"}>
                <div className={"k"}>
                  {"누적 권장 학습 시간"}
                </div>
                <div className={"v"}>
                  {"100~106시간"}
                </div>
              </div>
            </div>
            <div className={"table-scroll"} role={"region"} aria-label={"표 내용"} tabIndex={0}>
              <table className={"ptable"} style={{"marginTop": "18px"}}>
                <tbody>
                  <tr>
                    <th style={{"width": "150px"}}>
                      {"검정기준"}
                    </th>
                    <td>
                      {"시스템 아키텍처 설계 · 멀티에이전트 오케스트레이션 · 보안 심화 · 배포/운영/관측 · 리딩·멘토링"}
                    </td>
                  </tr>
                  <tr>
                    <th>
                      {"검정과목"}
                    </th>
                    <td>
                      {"공통 기초 + 분야별 심화 + 고급·통합 X1–X7"}
                    </td>
                  </tr>
                  <tr>
                    <th>
                      {"응시료"}
                    </th>
                    <td className={"price"}>
                      {"추후 공지 (민간자격 등록 완료 후)"}
                    </td>
                  </tr>
                  <tr>
                    <th>
                      {"부가 자격"}
                    </th>
                    <td>
                      {"VCE 취득자는 협회 인증 강사 지원 자격을 갖습니다."}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className={"legalbox"}>
              <div className={"r"}>
                <span className={"k"}>
                  {"자격관리기관"}
                </span>
                <span>
                  {"한국바이브코딩협회(KVCF)"}
                </span>
              </div>
              <div className={"r"}>
                <span className={"k"}>
                  {"등록번호"}
                </span>
                <span>
                  {"민간자격 등록 진행 중 (등록 완료 후 표기)"}
                </span>
              </div>
              <div className={"r"}>
                <span className={"k"}>
                  {"환불규정"}
                </span>
                <span>
                  {"자격기본법 시행령 기준에 따름 — "}
                  <a data-r={"rules"} style={{"color": "var(--blue)", "cursor": "pointer", "fontWeight": "700"}}>
                    {"검정 규정·환불 보기"}
                  </a>
                </span>
              </div>
              <div className={"warn"}>
                {"※ 본 자격은 국가공인 자격이 아닌 등록(예정) 민간자격입니다."}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
