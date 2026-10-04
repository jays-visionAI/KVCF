export default function HistoryPage() {
  return (
    <div className="page" id="p-history" hidden={true}>
      <div className={"pagehead"}>
        <div className={"w"}>
          <div className={"crumb"}>
            {"HOME / 협회소개 / 연혁"}
          </div>
          <h1>
            {"연혁"}
          </h1>
        </div>
      </div>
      <section className={"sec"}>
        <div className={"w"}>
          <div className={"lbl"}>
            {"2026"}
          </div>
          <div className={"history-grid"}>
            <div>
              <h2 className={"h2"} style={{"marginBottom": "22px"}}>
                {"협회 주요 연혁"}
              </h2>
              <ul className={"tl"}>
                <li>
                  <div className={"yr"}>
                    {"2026.06.09"}
                  </div>
                  <div className={"ev"}>
                    <b>
                      {"한국바이브코딩협회(KVCF) 창립총회 개최"}
                    </b>
                    <br />
                    {"국내 최초 바이브코딩 전문 협회 출범, 제1대 회장 문형남 취임"}
                  </div>
                </li>
                <li>
                  <div className={"yr"}>
                    {"2026.06.12"}
                  </div>
                  <div className={"ev"}>
                    {"자격 체계 확정 — VCA(3급)·VCP(2급)·VCE(1급) 및 바이브코딩컨설턴트"}
                  </div>
                </li>
                <li>
                  <div className={"yr"}>
                    {"2026.06.29"}
                  </div>
                  <div className={"ev"}>
                    <b>
                      {"블루포지(BlueForge)와 업무협약(MOU) 체결"}
                    </b>
                    <br />
                    {"‘한국형 바이브코딩 생태계 구축 및 글로벌 진출’을 위한 전략적 업무협약"}
                  </div>
                </li>
                <li>
                  <div className={"yr"}>
                    {"2026.07.24"}
                  </div>
                  <div className={"ev"}>
                    {"협회 고유번호증 발급"}
                  </div>
                </li>
                <li>
                  <div className={"yr"}>
                    {"진행 중"}
                  </div>
                  <div className={"ev"}>
                    {"민간자격 등록 절차 / 인증 교육기관·강사 1기 모집"}
                  </div>
                </li>
              </ul>
            </div>
            <div className={"history-media"}>
              <figure className={"history-founding"} aria-label={"2026년 6월 9일 한국바이브코딩협회 창립총회 기념 그래픽"}>
                <div className={"founding-document"}>
                  <div className={"founding-document-bar"}>
                    {"FOUNDING ASSEMBLY"}
                  </div>
                  <div className={"founding-document-body"}>
                    <div className={"history-card-date"}>
                      {"2026 · 06 · 09"}
                    </div>
                    <span className={"founding-brand"}>
                      {"KVCF"}
                    </span>
                    <h3>
                      {"한국바이브코딩협회 창립총회"}
                    </h3>
                    <p>
                      {"AI 강국을 넘어, 바이브코딩 강국 대한민국으로."}
                    </p>
                    <div className={"founding-document-foot"}>
                      {"협회 출범 · 제1대 회장 문형남 취임"}
                    </div>
                  </div>
                </div>
                <figcaption>
                  {"새로운 창작의 시대, 함께 시작합니다."}
                </figcaption>
              </figure>
              <figure className={"history-mou"}>
                <img src={"assets/about/mou.png"} width={1790} height={1252} alt={"한국바이브코딩협회와 블루포지 업무협약 체결식"} loading={"lazy"} decoding={"async"} />
                <figcaption>
                  <span>
                    {"2026.06.29"}
                  </span>
                  <strong>
                    {"BlueForge와 업무협약 체결"}
                  </strong>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
