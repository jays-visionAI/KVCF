export default function HomePage() {
  return (
    <div className="page" id="p-home" hidden={false}>
      <section className={"nh-hero"}>
        <div className={"nh-hero-background"} aria-hidden={"true"}>
          <canvas id={"nh-hero-atmosphere"}></canvas>
        </div>
        <canvas id={"nh-pointer-field"} aria-hidden={"true"}></canvas>
        <div className={"nh-wrap nh-hero-grid"}>
          <div className={"nh-intro"}>
            <div className={"nh-eyebrow"}>
              <span></span>
              {" IDEAS INTO REALITY · KVCF"}
            </div>
            <h1 id={"bHeroTitle"}></h1>
            <p id={"bHeroDesc"}></p>
            <div className={"nh-actions"}>
              <a className={"nh-btn primary"} data-r={"edu"}>
                {"배움의 시작, 교육과정"}
              </a>
            </div>
            <div className={"nh-status"} id={"bHeroBadge"}></div>
          </div>
          <div className={"nh-art"} role={"group"} aria-label={"점과 기호가 모여 회전하는 구형 네트워크 그래픽"}>
            <div className={"nh-globe-guides"} aria-hidden={"true"}>
              <span className={"nh-guide-tl"}></span>
              <span className={"nh-guide-tr"}></span>
              <span className={"nh-guide-bl"}></span>
              <span className={"nh-guide-br"}></span>
            </div>
            <canvas id={"nh-particle-globe"} width={560} height={560} aria-hidden={"true"}></canvas>
            <button className={"nh-motion-toggle"} type={"button"} aria-label={"그래픽 모션 일시 정지"} aria-pressed={"false"}>
              {"Ⅱ"}
            </button>
          </div>
        </div>
        <div className={"nh-wrap nh-hero-foot nh-services"}>
          <span className={"nh-service-label"}>
            {"QUICK ACCESS"}
          </span>
          <div className={"nh-service-links"}>
            <a href={"#verify"} data-r={"verify"}>
              <span>
                {"발급 자격의 진위·유효 상태 조회"}
              </span>
              <strong>
                {"자격 진위 확인 "}
                <b>
                  {"↗"}
                </b>
              </strong>
            </a>
            <a href={"http://blueforge.space"} target={"_blank"} rel={"noopener"}>
              <span>
                {"공식 실습·실기 검정 플랫폼"}
              </span>
              <strong>
                {"BlueForge 바로가기 "}
                <b>
                  {"↗"}
                </b>
              </strong>
            </a>
          </div>
        </div>
      </section>
      <section className={"nh-announcement"}>
        <div className={"nh-wrap"}>
          <span className={"nh-live"}>
            {"KVCF NOW"}
          </span>
          <button id={"featOv"} className={"nh-banner"}>
            <span id={"featTag"} hidden={true}></span>
            <strong id={"featTitle"}></strong>
            <span id={"featDate"}></span>
            <b aria-hidden={"true"}>
              {"↗"}
            </b>
          </button>
          <div id={"featDots"} hidden={true}></div>
        </div>
      </section>
      <section className={"nh-section nh-about"}>
        <div className={"nh-wrap"}>
          <div id={"bStats"} className={"nh-stats"}></div>
          <div className={"nh-about-message"}>
            <p className={"nh-about-english"}>
              {"A NEW ERA OF CREATION, TOGETHER."}
            </p>
            <h2>
              {"새로운 창작의 시대,"}
              <br />
              {"누구나 만들고, 함께 성장하는"}
              <br />
              {"바이브코딩의 미래를 함께합니다."}
            </h2>
            <p>
              {"한국바이브코딩협회는 교육, 자격, 연구와 교류를 통해"}
              <br />
              {"대한민국의 바이브코딩 생태계를 함께 만들어갑니다."}
            </p>
          </div>
        </div>
      </section>
      <section className={"nh-section nh-news"}>
        <div className={"nh-wrap"}>
          <div className={"nh-heading"}>
            <div>
              <div className={"nh-kicker"}>
                {"NEWS"}
              </div>
              <h2>
                {"협회 소식"}
              </h2>
            </div>
          </div>
          <div className={"nh-news-grid"}>
            <div className={"nh-news-column"}>
              <div className={"nh-news-column-head"}>
                <h3>
                  {"공지사항"}
                </h3>
                <a href={"#notice"} data-r={"notice"} aria-label={"공지사항 전체 보기"}>
                  {"전체 보기 ↗"}
                </a>
              </div>
              <div id={"bHomeNotice"}></div>
              <div className={"nh-news-recruit"}>
                <div className={"nh-news-column-head"}>
                  <h3>
                    {"모집공고"}
                  </h3>
                  <a href={"#recruit"} data-r={"recruit"} aria-label={"모집공고 전체 보기"}>
                    {"전체 보기 ↗"}
                  </a>
                </div>
                <div id={"bHomeRecruit"}></div>
              </div>
            </div>
            <div className={"nh-news-column"}>
              <div className={"nh-news-column-head"}>
                <h3>
                  {"보도자료"}
                </h3>
                <a href={"#press"} data-r={"press"} aria-label={"보도자료 전체 보기"}>
                  {"전체 보기 ↗"}
                </a>
              </div>
              <div id={"bHomePress"}></div>
            </div>
          </div>
        </div>
      </section>
      <section className={"nh-cert nh-section"}>
        <div className={"nh-wrap"}>
          <div className={"nh-heading"}>
            <div>
              <div className={"nh-kicker"}>
                {"01 / CERTIFICATION"}
              </div>
              <h2>
                {"자격체계,"}
                <br />
                {"역량으로 구분하는 세 단계."}
              </h2>
            </div>
            <a className={"nh-textlink"} data-r={"cert"}>
              {"전체 자격 안내 ↗"}
            </a>
          </div>
          <div className={"tiers"} id={"bHomeTiers"}></div>
          <p className={"nh-cert-hours-note"}>
            {"누적 권장 학습 시간은 트랙 1개 기준입니다. 선택 트랙에 따라 달라지며, 추가 트랙 이수 시 시간이 늘어납니다."}
          </p>
          <a className={"nh-consult"} data-r={"consultant"}>
            <div className={"nh-consult-heading"}>
              <span>
                {"별도 전문 트랙"}
              </span>
              <h3>
                {"바이브코딩컨설턴트"}
              </h3>
            </div>
            <p>
              {"조직의 AI 도입 전략과 적용을 설계하는 전문가"}
            </p>
            <b>
              {"↗"}
            </b>
          </a>
        </div>
      </section>
      <section className={"nh-section nh-learning"} aria-labelledby={"nh-learning-title"}>
        <div className={"nh-wrap"}>
          <div className={"nh-heading"}>
            <div>
              <span className={"nh-kicker"}>
                {"02 / CURRICULUM"}
              </span>
              <h2 id={"nh-learning-title"}>
                {"커리큘럼,"}
                <br />
                {"3계층 누적 설계."}
              </h2>
            </div>
            <div>
              <p>
                {"공통 기초 위에 분야별 심화, 고급·통합을 쌓습니다."}
                <br />
                {"이론 30%, 실습 70%로 배우는 단계별 교육."}
              </p>
              <a className={"nh-textlink"} href={"#edu"} data-r={"edu"}>
                {"전체 교육과정 살펴보기 ↗"}
              </a>
            </div>
          </div>
          <div className={"nh-learning-grid"}>
            <ol className={"nh-learning-steps"}>
              <li>
                <span className={"nh-step-no"}>
                  {"01"}
                </span>
                <div>
                  <span className={"nh-step-meta"}>
                    {"VCA · 3급 / 바이브코딩 공통 소양"}
                  </span>
                  <h3>
                    {"공통 기초 (C1–C7)"}
                  </h3>
                  <p>
                    {"AI에게 요청하는 방법부터 결과 검증과 안전한 활용까지."}
                    <br />
                    {"코딩 경험 없이도 일상 비유와 실습으로 시작하며, 모든 트랙의 토대를 쌓습니다."}
                  </p>
                </div>
              </li>
              <li>
                <span className={"nh-step-no"}>
                  {"02"}
                </span>
                <div>
                  <span className={"nh-step-meta"}>
                    {"VCP · 2급 / 4개 트랙"}
                  </span>
                  <h3>
                    {"분야별 심화 (택1 이상)"}
                  </h3>
                  <p>
                    {"웹·모바일·응용·임베디드 중 하나 이상의 트랙을 선택합니다."}
                    <br />
                    {"분야별 표준 워크플로우를 익히고, 실습을 통해 실서비스 수준의 결과물을 완성합니다."}
                  </p>
                </div>
              </li>
              <li>
                <span className={"nh-step-no"}>
                  {"03"}
                </span>
                <div>
                  <span className={"nh-step-meta"}>
                    {"VCE · 1급 / 도메인을 넘는 설계"}
                  </span>
                  <h3>
                    {"고급·통합 (X1–X7)"}
                  </h3>
                  <p>
                    {"아키텍처·오케스트레이션·보안 심화를 통합 프로젝트로 연결합니다."}
                    <br />
                    {"트랙을 넘는 시스템 설계와 조직의 기술 리딩 역량을 기릅니다."}
                  </p>
                </div>
              </li>
            </ol>
            <aside className={"nh-forge"}>
              <span className={"nh-kicker"}>
                {"OFFICIAL PRACTICE & EXAM PLATFORM"}
              </span>
              <div className={"bf-motion-slot"}>
                <div className={"bf-scene"} aria-label={"BlueForge 시스템 구성 개념도"}>
                  <video className={"bf-video"} muted={true} playsInline={true} preload={"metadata"} aria-hidden={"true"} src={"assets/blueforge/system-alpha-v7.webm"}></video>
                  <img className={"bf-poster"} src={"assets/blueforge/system-alpha-poster-v7.png"} alt={""} aria-hidden={"true"} />
                  <div className={"bf-code-intro"} aria-hidden={"true"}>
                    <div className={"bf-code-bar"}>
                      <i></i>
                      <i></i>
                      <i></i>
                      <span>
                        {"blueforge terminal"}
                      </span>
                    </div>
                    <div className={"bf-code-lines"}>
                      <span style={{"--i": "0"} as React.CSSProperties}>
                        {"> \"Build a SaaS dashboard with auth and payments\""}
                      </span>
                      <span style={{"--i": "1"} as React.CSSProperties}>
                        {"◆ Analyzing intent..."}
                      </span>
                      <span style={{"--i": "2"} as React.CSSProperties}>
                        {"◆ Generating blueprint..."}
                      </span>
                      <span style={{"--i": "3"} as React.CSSProperties}>
                        {"├─ schema.sql (6 tables, RLS)"}
                      </span>
                      <span style={{"--i": "4"} as React.CSSProperties}>
                        {"├─ api/routes.ts (18 endpoints)"}
                      </span>
                      <span style={{"--i": "5"} as React.CSSProperties}>
                        {"├─ auth/config.ts (OAuth + JWT)"}
                      </span>
                      <span style={{"--i": "6"} as React.CSSProperties}>
                        {"├─ payments/stripe.ts (webhooks)"}
                      </span>
                      <span style={{"--i": "7"} as React.CSSProperties}>
                        {"├─ app/dashboard.tsx (3 views)"}
                      </span>
                      <span style={{"--i": "8"} as React.CSSProperties}>
                        {"└─ deploy.config.ts (Edge)"}
                      </span>
                      <span style={{"--i": "9"} as React.CSSProperties}>
                        {"✓ Blueprint complete. Deploying..."}
                      </span>
                      <span style={{"--i": "10"} as React.CSSProperties}>
                        {"✓ Live → my-app.blueforge.app"}
                      </span>
                      <span style={{"--i": "11"} as React.CSSProperties}>
                        {"▌"}
                      </span>
                    </div>
                  </div>
                  <button type={"button"} className={"bf-node"} tabIndex={-1} disabled={true} aria-label={"AI 설계: 모델과 블루프린트"}></button>
                  <button type={"button"} className={"bf-node"} tabIndex={-1} disabled={true} aria-label={"화면과 앱: 인터페이스 구성"}></button>
                  <button type={"button"} className={"bf-node"} tabIndex={-1} disabled={true} aria-label={"데이터와 인증: ForgeDB 연결"}></button>
                  <button type={"button"} className={"bf-node"} tabIndex={-1} disabled={true} aria-label={"연동과 배포: 외부 서비스 연결"}></button>
                  <p className={"bf-caption"}></p>
                </div>
              </div>
              <div className={"nh-forge-copy"}>
                <span className={"nh-forge-name"}>
                  {"BlueForge"}
                </span>
                <h3>
                  {"배운 것을 만들고,"}
                  <br />
                  {"만든 것으로 증명합니다."}
                </h3>
                <div className={"nh-forge-footer"}>
                  <p>
                    {"모든 실습·실기 검정은 "}
                    <strong>
                      {"BlueForge 환경"}
                    </strong>
                    {"에서 진행됩니다."}
                    <span className={"nh-forge-en"} lang={"en"}>
                      {"Practice & exams on BlueForge."}
                    </span>
                  </p>
                  <a href={"http://blueforge.space"} target={"_blank"} rel={"noopener"}>
                    {"공식 플랫폼 알아보기 "}
                    <span>
                      {"↗"}
                    </span>
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
      <section className={"nh-section"} id={"nh-paths"}>
        <div className={"nh-wrap"}>
          <div className={"nh-heading"}>
            <div>
              <div className={"nh-kicker"}>
                {"03 / YOUR NEXT STEP"}
              </div>
              <h2>
                {"가능성을 배우고,"}
                <br />
                {"실력으로 증명하세요."}
              </h2>
            </div>
            <p>
              {"처음 시작하는 호기심부터 전문적인 역량까지."}
              <br />
              {"당신의 다음 단계를 함께 만듭니다."}
            </p>
          </div>
          <div className={"nh-paths"}>
            <a data-r={"edu"} className={"nh-path"}>
              <span className={"nh-index"}>
                {"01 — LEARN"}
              </span>
              <h3>
                {"아이디어가"}
                <br />
                {"결과물이 되는 배움"}
              </h3>
              <p>
                {"공통 기초부터 분야별 심화까지,"}
                <br />
                {"실습 중심의 바이브코딩 교육."}
              </p>
              <span className={"nh-path-link"}>
                {"교육과정 둘러보기 "}
                <b>
                  {"↗"}
                </b>
              </span>
            </a>
            <a data-r={"cert"} className={"nh-path"}>
              <span className={"nh-index"}>
                {"02 — PROVE"}
              </span>
              <h3>
                {"만드는 역량을"}
                <br />
                {"보여주는 자격"}
              </h3>
              <p>
                {"VCA · VCP · VCE 그리고 컨설턴트."}
                <br />
                {"나의 성장 단계에 맞는 자격을 확인하세요."}
              </p>
              <span className={"nh-path-link"}>
                {"자격 체계 알아보기 "}
                <b>
                  {"↗"}
                </b>
              </span>
            </a>
            <a data-r={"join"} className={"nh-path"}>
              <span className={"nh-index"}>
                {"03 — CONNECT"}
              </span>
              <h3>
                {"함께 만들고,"}
                <br />
                {"더 넓게 연결되다"}
              </h3>
              <p>
                {"개인, 기업, 교육기관이 함께하는"}
                <br />
                {"바이브코딩 생태계에 참여하세요."}
              </p>
              <span className={"nh-path-link"}>
                {"회원으로 함께하기 "}
                <b>
                  {"↗"}
                </b>
              </span>
            </a>
          </div>
        </div>
      </section>
      <section className={"nh-partners"}>
        <div className={"nh-wrap"}>
          <span className={"nh-kicker"}>
            {"CONNECTED TOGETHER"}
          </span>
          <div>
            <a href={"https://hallyu.sookmyung.ac.kr/hallyu/index.do"} target={"_blank"} rel={"noopener"}>
              <span>
                {"숙명여자대학교 "}
                <small>
                  {"한류국제대학"}
                </small>
              </span>
              <span className={"nh-partner-arrow"} aria-hidden={"true"}>
                {"↗"}
              </span>
            </a>
            <a href={"https://kaiea.kr/"} target={"_blank"} rel={"noopener"}>
              {"한국AI교육협회 "}
              <span className={"nh-partner-arrow"} aria-hidden={"true"}>
                {"↗"}
              </span>
            </a>
            <a href={"http://blueforge.space"} target={"_blank"} rel={"noopener"}>
              {"BlueForge "}
              <span className={"nh-partner-arrow"} aria-hidden={"true"}>
                {"↗"}
              </span>
            </a>
            <a href={"https://bananaboots.space/"} target={"_blank"} rel={"noopener"}>
              {"BANANABOOTS "}
              <span className={"nh-partner-arrow"} aria-hidden={"true"}>
                {"↗"}
              </span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
