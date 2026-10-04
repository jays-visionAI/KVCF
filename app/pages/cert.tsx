export default function CertPage() {
  return (
    <div className="page" id="p-cert" hidden={true}>
      <div className={"pagehead"}>
        <div className={"w"}>
          <div className={"crumb"}>
            {"HOME / 자격검정"}
          </div>
          <h1>
            {"자격체계 안내"}
          </h1>
          <p>
            {"협회는 ‘만드는 역량’을 3단계(VCA·VCP·VCE)로 인증하며, 조직의 AI 도입을 자문하는 바이브코딩컨설턴트를 별도 트랙으로 운영합니다. 모든 자격은 민간자격 등록 진행 중입니다."}
          </p>
          <div className={"acts"} style={{"marginTop": "18px"}}>
            <a className={"b line sm"} data-r={"edu"}>
              {"교육과정 안내"}
            </a>
            <a className={"b line sm"} data-r={"schedule"}>
              {"검정 일정 안내"}
            </a>
          </div>
        </div>
      </div>
      <section className={"sec"}>
        <div className={"w"}>
          <div className={"lbl"}>
            {"OVERVIEW"}
          </div>
          <h2 className={"h2"} style={{"marginBottom": "20px"}}>
            {"4개 자격 개요"}
          </h2>
          <div style={{"overflowX": "auto"}}>
            <div className={"table-scroll"} role={"region"} aria-label={"표 내용"} tabIndex={0}>
              <table className={"ptable"}>
                <thead>
                  <tr>
                    <th>
                      {"자격명"}
                    </th>
                    <th>
                      {"등급"}
                    </th>
                    <th>
                      {"대상"}
                    </th>
                    <th>
                      {"누적 권장 학습 시간"}
                    </th>
                    <th>
                      {"검정방법"}
                    </th>
                  </tr>
                </thead>
                <tbody id={"bCertTable"}></tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      <section className={"sec alt"}>
        <div className={"w"}>
          <div className={"lbl"}>
            {"PATH"}
          </div>
          <h2 className={"h2"} style={{"marginBottom": "20px"}}>
            {"자격 취득 경로"}
          </h2>
          <div className={"tiers"}>
            <div className={"tier"} data-r={"vca"}>
              <span className={"g"}>
                {"STEP 1"}
              </span>
              <h3>
                {"VCA · 3급"}
              </h3>
              <div className={"lv"}>
                {"응시자격 제한 없음"}
              </div>
              <p>
                {"공통 기초 40시간. 명세가 주어지면 안전하게 만들고 빌드를 통과시키는 능력을 검정합니다."}
              </p>
              <div className={"hr"}>
                {"VCA 상세보기 ↗"}
              </div>
            </div>
            <div className={"tier"} data-r={"vcp"}>
              <span className={"g"}>
                {"STEP 2"}
              </span>
              <h3>
                {"VCP · 2급"}
              </h3>
              <div className={"lv"}>
                {"3급 취득 또는 동등 역량"}
              </div>
              <p>
                {"분야별 심화(30–36h) 중 하나 이상의 트랙 선택. 실서비스를 기획부터 배포까지 독립 수행합니다."}
              </p>
              <div className={"hr"}>
                {"VCP 상세보기 ↗"}
              </div>
            </div>
            <div className={"tier"} data-r={"vce"}>
              <span className={"g"}>
                {"STEP 3"}
              </span>
              <h3>
                {"VCE · 1급"}
              </h3>
              <div className={"lv"}>
                {"2급 취득"}
              </div>
              <p>
                {"고급·통합(30h) 이수. 멀티 도메인 아키텍처 설계와 팀 리딩까지 수행하는 전문가 단계입니다."}
              </p>
              <div className={"hr"}>
                {"VCE 상세보기 ↗"}
              </div>
            </div>
          </div>
          <p className={"note"} style={{"margin": "18px 0"}}>
            {"권장 학습 시간: 3급 40시간 · 2급 누적 70~76시간 · 1급 누적 100~106시간. (추가 트랙 이수 시 시간이 늘어납니다.)"}
          </p>
          <div className={"consult"} data-r={"consultant"}>
            <div>
              <h3>
                {"바이브코딩컨설턴트 "}
                <span className={"mono"} style={{"fontSize": "14px", "color": "var(--faint)", "fontWeight": "500"}}>
                  {"· 별도 트랙"}
                </span>
              </h3>
              <p>
                {"제작 역량 사다리와 별개로, 조직의 AI 도입 전략·조직 적용·리스크·거버넌스를 자문하는 전문가 자격입니다."}
              </p>
            </div>
            <a className={"b line sm"} data-r={"consultant"}>
              {"자세히 →"}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
