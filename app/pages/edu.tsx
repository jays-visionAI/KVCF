"use client";

export default function EduPage() {
  return (
    <div className="page" id="p-edu" hidden={true}>
      <div className={"pagehead"}>
        <div className={"w"}>
          <div className={"crumb"}>
            {"HOME / 교육"}
          </div>
          <h1>
            {"교육과정 안내"}
          </h1>
          <p>
            {"공통 기초 → 분야별 심화 → 고급·통합의 3계층 누적 설계. 이론 30% · 실습 70%로 구성되며, 모든 모듈은 검증 가능한 산출물로 귀결됩니다."}
          </p>
        </div>
      </div>
      <section className={"sec"}>
        <div className={"w"}>
          <div className={"lbl"}>
            {"STRUCTURE"}
          </div>
          <h2 className={"h2"} style={{"marginBottom": "20px"}}>
            {"3계층 교육 체계"}
          </h2>
          <div className={"eduflow"}>
            <div className={"efb"} data-r={"vca"}>
              <span className={"n"}>
                {"LAYER 1 · 40h → VCA 3급"}
              </span>
              <h4>
                {"공통 기초 (C1–C7)"}
              </h4>
              <p>
                {"모든 트랙의 토대가 되는 공통 소양. 명세·컨텍스트·검증·보안 기초를 다룹니다."}
              </p>
              <div className={"hr"}>
                {"공통 기초 7개 모듈"}
              </div>
            </div>
            <div className={"efb"} data-r={"vcp"}>
              <span className={"n"}>
                {"LAYER 2 · 30–36h → VCP 2급"}
              </span>
              <h4>
                {"분야별 심화 (택1 이상)"}
              </h4>
              <p>
                {"웹 서비스 · 모바일 앱 · 응용 프로그램 · 임베디드 중 하나 이상의 트랙 선택."}
              </p>
              <div className={"hr"}>
                {"4개 분야 중 택1 이상"}
              </div>
            </div>
            <div className={"efb"} data-r={"vce"}>
              <span className={"n"}>
                {"LAYER 3 · 30h → VCE 1급"}
              </span>
              <h4>
                {"고급·통합 (X1–X7)"}
              </h4>
              <p>
                {"아키텍처·오케스트레이션·보안 심화·통합 프로젝트로 도메인을 넘는 설계 역량 완성."}
              </p>
              <div className={"hr"}>
                {"고급·통합 7개 모듈"}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={"sec alt"}>
        <div className={"w"}>
          <p className={"note"} style={{"marginBottom": "24px"}}>
            {"트랙 1개 기준 누적 권장 학습 시간은 2급 70~76시간, 1급 100~106시간입니다. 여러 트랙을 선택하면 학습 시간이 추가됩니다."}
          </p>
          <div className={"lbl"}>
            {"MODULES"}
          </div>
          <h2 className={"h2"} style={{"marginBottom": "20px"}}>
            {"모듈 구성표 (42개)"}
          </h2>
          <div className={"faq"} style={{"background": "#fff", "border": "1px solid var(--line)", "borderRadius": "16px", "padding": "8px 22px"}}>
            <details open={true}>
              <summary>
                {"공통 기초 · C1–C7 (40h → VCA)"}
              </summary>
              <div className={"g2"} style={{"marginTop": "12px"}}>
                <div className={"card2"} style={{"padding": "14px"}}>
                  <b className={"mono"} style={{"color": "var(--blue)", "fontSize": "14px"}}>
                    {"C1"}
                  </b>
                  {" 바이브코딩 개론 · AI 협업 개발 개념"}
                </div>
                <div className={"card2"} style={{"padding": "14px"}}>
                  <b className={"mono"} style={{"color": "var(--blue)", "fontSize": "14px"}}>
                    {"C2"}
                  </b>
                  {" AI 코드생성 원리 · 프롬프트/컨텍스트 기초"}
                </div>
                <div className={"card2"} style={{"padding": "14px"}}>
                  <b className={"mono"} style={{"color": "var(--blue)", "fontSize": "14px"}}>
                    {"C3"}
                  </b>
                  {" 컨텍스트 엔지니어링 · 단일 기준(SSOT) 관리"}
                </div>
                <div className={"card2"} style={{"padding": "14px"}}>
                  <b className={"mono"} style={{"color": "var(--blue)", "fontSize": "14px"}}>
                    {"C4"}
                  </b>
                  {" 요구사항 명세 · 스펙 우선 설계"}
                </div>
                <div className={"card2"} style={{"padding": "14px"}}>
                  <b className={"mono"} style={{"color": "var(--blue)", "fontSize": "14px"}}>
                    {"C5"}
                  </b>
                  {" 표준 워크플로우 · 생성→검증 루프"}
                </div>
                <div className={"card2"} style={{"padding": "14px"}}>
                  <b className={"mono"} style={{"color": "var(--blue)", "fontSize": "14px"}}>
                    {"C6"}
                  </b>
                  {" 검증 · 디버깅 · 테스트 기초"}
                </div>
                <div className={"card2"} style={{"padding": "14px"}}>
                  <b className={"mono"} style={{"color": "var(--blue)", "fontSize": "14px"}}>
                    {"C7"}
                  </b>
                  {" 보안 기초 · 인증/권한/데이터 보호"}
                </div>
              </div>
            </details>
            <details>
              <summary>
                {"분야별 심화 · 택1 이상 (30–36h → VCP)"}
              </summary>
              <div className={"g2"} style={{"marginTop": "12px"}}>
                <div className={"card2"} style={{"padding": "14px"}}>
                  <b className={"mono"} style={{"color": "var(--blue)", "fontSize": "14px"}}>
                    {"웹"}
                  </b>
                  {" 프론트·백엔드 연동 · 인증 · 배포"}
                </div>
                <div className={"card2"} style={{"padding": "14px"}}>
                  <b className={"mono"} style={{"color": "var(--blue)", "fontSize": "14px"}}>
                    {"모바일"}
                  </b>
                  {" 앱 구조 · 스토어 배포 흐름"}
                </div>
                <div className={"card2"} style={{"padding": "14px"}}>
                  <b className={"mono"} style={{"color": "var(--blue)", "fontSize": "14px"}}>
                    {"응용"}
                  </b>
                  {" 데스크톱/자동화 · 외부 API 연동"}
                </div>
                <div className={"card2"} style={{"padding": "14px"}}>
                  <b className={"mono"} style={{"color": "var(--blue)", "fontSize": "14px"}}>
                    {"임베디드"}
                  </b>
                  {" 디바이스·펌웨어 연동 기초"}
                </div>
              </div>
              <p className={"note"}>
                {"트랙별 학습 시간: 웹·모바일·응용 30시간 / 임베디드 36시간."}
                <br />
                {"각 트랙 공통: 외부 연동 · 사용자 인증 · 데이터 보안 · 취약점 스캔 · 실배포까지 완성"}
              </p>
            </details>
            <details>
              <summary>
                {"고급 · 통합 · X1–X7 (30h → VCE)"}
              </summary>
              <div className={"g2"} style={{"marginTop": "12px"}}>
                <div className={"card2"} style={{"padding": "14px"}}>
                  <b className={"mono"} style={{"color": "var(--blue)", "fontSize": "14px"}}>
                    {"X1"}
                  </b>
                  {" 멀티에이전트 오케스트레이션"}
                </div>
                <div className={"card2"} style={{"padding": "14px"}}>
                  <b className={"mono"} style={{"color": "var(--blue)", "fontSize": "14px"}}>
                    {"X2"}
                  </b>
                  {" 시스템 아키텍처 설계"}
                </div>
                <div className={"card2"} style={{"padding": "14px"}}>
                  <b className={"mono"} style={{"color": "var(--blue)", "fontSize": "14px"}}>
                    {"X3"}
                  </b>
                  {" 보안 심화 · 위협 모델링"}
                </div>
                <div className={"card2"} style={{"padding": "14px"}}>
                  <b className={"mono"} style={{"color": "var(--blue)", "fontSize": "14px"}}>
                    {"X4"}
                  </b>
                  {" 병렬 · 세션 · 상태 관리"}
                </div>
                <div className={"card2"} style={{"padding": "14px"}}>
                  <b className={"mono"} style={{"color": "var(--blue)", "fontSize": "14px"}}>
                    {"X5"}
                  </b>
                  {" 배포 · 운영 · 관측(observability)"}
                </div>
                <div className={"card2"} style={{"padding": "14px"}}>
                  <b className={"mono"} style={{"color": "var(--blue)", "fontSize": "14px"}}>
                    {"X6"}
                  </b>
                  {" 리딩 · 멘토링 · 코드 리뷰"}
                </div>
                <div className={"card2"} style={{"padding": "14px"}}>
                  <b className={"mono"} style={{"color": "var(--blue)", "fontSize": "14px"}}>
                    {"X7"}
                  </b>
                  {" 멀티도메인 통합 프로젝트"}
                </div>
              </div>
            </details>
          </div>
        </div>
      </section>
      <section className={"sec"}>
        <div className={"w"}>
          <div className={"lbl"}>
            {"PRINCIPLES"}
          </div>
          <h2 className={"h2"} style={{"marginBottom": "20px"}}>
            {"설계 원칙 · 이론 3 : 실습 7"}
          </h2>
          <div className={"g3"}>
            <div className={"card2"}>
              <h3>
                {"명세 · 검증 우선"}
              </h3>
              <p>
                {"‘프롬프트를 잘 넣는 법’이 아니라 무엇을 만들지 정의하고, 만든 것이 맞는지 확인하는 능력을 중심에 둡니다."}
              </p>
            </div>
            <div className={"card2"}>
              <h3>
                {"보안 기본값"}
              </h3>
              <p>
                {"인증·권한·데이터 보호를 선택 심화가 아니라 전 트랙의 기본 소양으로 내장합니다."}
              </p>
            </div>
            <div className={"card2"}>
              <h3>
                {"‘만들 수 있는가’로 검정"}
              </h3>
              <p>
                {"이론 시험 비중을 최소화하고 실습 수행과 산출물로 평가합니다. 보안 취약점이 있으면 불합격입니다."}
              </p>
            </div>
          </div>
          <div className={"pf"} style={{"marginTop": "20px"}}>
            <div>
              <div className={"l"}>
                {"OFFICIAL PRACTICE & EXAM PLATFORM"}
              </div>
              <div className={"t"}>
                {"모든 실습·실기 검정은 "}
                <b>
                  {"BlueForge"}
                </b>
                {" 환경에서 진행됩니다"}
              </div>
            </div>
            <button onClick={() => window.open("http://blueforge.space", "_blank")}>
              {"플랫폼 알아보기"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
