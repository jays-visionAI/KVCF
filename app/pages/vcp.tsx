export default function VcpPage() {
  return (
    <div className="page" id="p-vcp" hidden={true}>
      <div className={"pagehead"}>
        <div className={"w"}>
          <div className={"crumb"}>
            {"HOME / 자격검정 / VCP"}
          </div>
          <h1>
            {"VCP (2급 · 실무)"}
          </h1>
          <p>
            {"Vibe Coding Professional — 선택 트랙에서 외부 연동·사용자 인증·데이터 보안을 갖춘 실서비스를 기획부터 배포까지 독립 수행하는 역량을 검정합니다."}
          </p>
        </div>
      </div>
      <section className={"sec"}>
        <div className={"w"}>
          <div className={"certblock"}>
            <div className={"top"}>
              <div>
                <span className={"g"}>
                  {"VCP · 2급"}
                </span>
                <h2>
                  {"바이브코딩 전문가"}
                </h2>
                <div className={"lv"}>
                  {"Vibe Coding Professional"}
                </div>
                <p className={"desc"}>
                  {"웹·모바일·응용·임베디드 중 한 분야를 선택하여, 실제 사용자가 쓸 수 있는 서비스를 완성하고 배포까지 수행합니다."}
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
                  {"3급 취득 또는 동등 역량"}
                </div>
              </div>
              <div className={"it"}>
                <div className={"k"}>
                  {"검정방법"}
                </div>
                <div className={"v"}>
                  {"트랙 실서비스 실기"}
                </div>
              </div>
              <div className={"it"}>
                <div className={"k"}>
                  {"합격기준"}
                </div>
                <div className={"v"}>
                  {"취약점 통과 + 실배포 + 기준점"}
                </div>
              </div>
              <div className={"it"}>
                <div className={"k"}>
                  {"누적 권장 학습 시간"}
                </div>
                <div className={"v"}>
                  {"70~76시간"}
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
                      {"실서비스 설계·구현 · 외부 연동 · 사용자 인증 · 데이터 보안 · 취약점 스캔 통과 · 실환경 배포"}
                    </td>
                  </tr>
                  <tr>
                    <th>
                      {"검정과목"}
                    </th>
                    <td>
                      {"공통 기초 + 분야별 심화 1개 트랙 (웹 서비스 / 모바일 앱 / 응용 프로그램 / 임베디드)"}
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
