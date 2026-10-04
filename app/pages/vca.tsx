export default function VcaPage() {
  return (
    <div className="page" id="p-vca" hidden={true}>
      <div className={"pagehead"}>
        <div className={"w"}>
          <div className={"crumb"}>
            {"HOME / 자격검정 / VCA"}
          </div>
          <h1>
            {"VCA (3급 · 입문)"}
          </h1>
          <p>
            {"Vibe Coding Associate — 명세가 주어지면 AI 협업으로 단순 애플리케이션을 안전하게 생성하고 빌드 게이트를 통과시키는 역량을 검정합니다."}
          </p>
        </div>
      </div>
      <section className={"sec"}>
        <div className={"w"}>
          <div className={"certblock"}>
            <div className={"top"}>
              <div>
                <span className={"g"}>
                  {"VCA · 3급"}
                </span>
                <h2>
                  {"바이브코딩 준전문가"}
                </h2>
                <div className={"lv"}>
                  {"Vibe Coding Associate"}
                </div>
                <p className={"desc"}>
                  {"AI 협업 개발의 기본 원리를 이해하고, 주어진 명세에 따라 동작하는 결과물을 안전하게 생성·검증할 수 있는 입문 단계 자격입니다."}
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
                  {"제한 없음"}
                </div>
              </div>
              <div className={"it"}>
                <div className={"k"}>
                  {"검정방법"}
                </div>
                <div className={"v"}>
                  {"명세 기반 실기"}
                </div>
              </div>
              <div className={"it"}>
                <div className={"k"}>
                  {"합격기준"}
                </div>
                <div className={"v"}>
                  {"빌드 게이트 통과 + 기준점"}
                </div>
              </div>
              <div className={"it"}>
                <div className={"k"}>
                  {"누적 권장 학습 시간"}
                </div>
                <div className={"v"}>
                  {"40시간"}
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
                      {"요구사항 명세 이해 · AI 협업 코드 생성 · 기본 검증 · 보안 기본값 적용"}
                    </td>
                  </tr>
                  <tr>
                    <th>
                      {"검정과목"}
                    </th>
                    <td>
                      {"공통 기초 C1–C7 (바이브코딩 개론, AI 코드생성 원리, 컨텍스트 엔지니어링, 요구사항 명세, 표준 워크플로우, 검증·디버깅, 보안 기초)"}
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
                      {"실습·검정 환경"}
                    </th>
                    <td>
                      {"BlueForge"}
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
