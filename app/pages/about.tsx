export default function AboutPage() {
  return (
    <div className="page" id="p-about" hidden={true}>
      <div className={"pagehead"}>
        <div className={"w"}>
          <div className={"crumb"}>
            {"HOME / 협회소개"}
          </div>
          <h1>
            {"협회소개"}
          </h1>
          <p>
            {"한국바이브코딩협회(Korea Vibe Coding Federation, KVCF)는 AI와 대화하며 소프트웨어를 창작하는 ‘바이브 코딩’ 문화의 확산과 생태계 조성을 목표로 설립되었습니다."}
          </p>
        </div>
      </div>
      <section className={"sec"}>
        <div className={"w"}>
          <div className={"g2"} style={{"gap": "44px", "alignItems": "start"}}>
            <div>
              <div className={"lbl"}>
                {"ABOUT KVCF"}
              </div>
              <h2 className={"h2"} style={{"fontSize": "26px", "lineHeight": "1.4"}}>
                {"AI 강국을 넘어,"}
                <br />
                {"바이브코딩 강국 대한민국"}
              </h2>
              <p className={"lead"} style={{"marginTop": "14px"}}>
                {"한국바이브코딩협회는 누구나 AI와 대화하며 아이디어를 구현할 수 있도록 교육·자격, 연구·표준, 네트워크를 연결합니다."}
              </p>
              <p className={"lead"} style={{"marginTop": "14px"}}>
                {"3계층 42모듈 표준 커리큘럼과 VCA·VCP·VCE 자격 체계를 운영하며, 이론 30%·실습 70%의 교육으로 실제로 ‘만들 수 있는가’를 검정합니다."}
              </p>
              <p className={"lead"} style={{"marginTop": "14px"}}>
                {"K-바이브와 프롬프트·AI 기술 연구를 통해 한국형 바이브코딩 표준을 정립하고, 기업·교육기관·전문가를 연결해 산업 생태계의 성장과 글로벌 진출을 지원합니다."}
              </p>
              <div className={"acts"} style={{"marginTop": "24px"}}>
                <a className={"b line"} href={"#greeting"} data-r={"greeting"}>
                  {"회장 인사말 "}
                  <span aria-hidden={"true"}>
                    {"↗"}
                  </span>
                </a>
                <a className={"b line"} href={"#org"} data-r={"org"}>
                  {"조직안내 "}
                  <span aria-hidden={"true"}>
                    {"↗"}
                  </span>
                </a>
              </div>
            </div>
            <div className={"photo"} style={{"aspectRatio": "16/11", "borderRadius": "16px", "background": "transparent", "overflow": "hidden"}}>
              <img src={"/assets/about/mou.png"} width={1790} height={1252} alt={"한국바이브코딩협회와 블루포지의 업무협약(MOU) 체결식"} decoding={"async"} style={{"display": "block", "width": "100%", "height": "100%", "objectFit": "cover", "objectPosition": "center top"}} />
            </div>
          </div>
        </div>
      </section>
      <section className={"sec alt"}>
        <div className={"w"}>
          <div className={"lbl"}>
            {"KEY BUSINESS"}
          </div>
          <h2 className={"h2"} style={{"marginBottom": "22px"}}>
            {"주요 사업"}
          </h2>
          <div className={"g3 about-business-grid"}>
            <div className={"card2"}>
              <h3>
                {"한국 바이브코딩 생태계 구축"}
              </h3>
              <p>
                {"개발자와 창작자의 협업을 촉진하고,"}
                <br />
                {"한국형 바이브코딩의 활용을 넓힙니다."}
              </p>
            </div>
            <div className={"card2"}>
              <h3>
                {"플랫폼의 글로벌 확장 지원"}
              </h3>
              <p>
                {"국내 플랫폼의 해외 판로를 개척하고,"}
                <br />
                {"현지화와 글로벌 파트너 연계를 돕습니다."}
              </p>
            </div>
            <div className={"card2"}>
              <h3>
                {"교육 및 민간자격 등록·관리"}
              </h3>
              <p>
                {"체계적인 교육 프로그램을 운영하고, 신뢰성 있는 민간자격의 등록 및 관리 시스템을 구축합니다."}
              </p>
            </div>
            <div className={"card2"}>
              <h3>
                {"산학연 협력 및 네트워크 강화"}
              </h3>
              <p>
                {"기업·연구기관·대학과의 협력 체계를 구축하여 기술 교류와 인재 매칭을 활성화합니다."}
              </p>
            </div>
            <div className={"card2"}>
              <h3>
                {"연구 및 표준화"}
              </h3>
              <p>
                {"바이브코딩 관련 표준·윤리·정책을 연구하고 보급합니다."}
              </p>
            </div>
            <div className={"card2"}>
              <h3>
                {"회원 지원 및 교류"}
              </h3>
              <p>
                {"회원과 회원사를 위한 정보·교육·네트워킹 기회를 제공합니다."}
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className={"sec"}>
        <div className={"w"}>
          <div className={"lbl"}>
            {"FACTS"}
          </div>
          <h2 className={"h2"} style={{"marginBottom": "20px"}}>
            {"설립 개요"}
          </h2>
          <div className={"table-scroll"} role={"region"} aria-label={"표 내용"} tabIndex={0}>
            <table className={"ptable"}>
              <tbody>
                <tr>
                  <th style={{"width": "180px"}}>
                    {"명칭"}
                  </th>
                  <td>
                    {"한국바이브코딩협회 (Korea Vibe Coding Federation, KVCF)"}
                  </td>
                </tr>
                <tr>
                  <th>
                    {"창립총회"}
                  </th>
                  <td>
                    {"2026년 6월 9일 — 국내 최초 바이브코딩 전문 협회 출범"}
                  </td>
                </tr>
                <tr>
                  <th>
                    {"고유번호증 발급"}
                  </th>
                  <td>
                    {"2026년 7월 24일"}
                  </td>
                </tr>
                <tr>
                  <th>
                    {"회장"}
                  </th>
                  <td>
                    {"문형남 (숙명여자대학교 한류국제대학 학장)"}
                  </td>
                </tr>
                <tr>
                  <th>
                    {"사무국 소재지"}
                  </th>
                  <td>
                    {"서울특별시 용산구 청파로 47길 100, 숙명여자대학교 진리관 810호"}
                  </td>
                </tr>
                <tr>
                  <th>
                    {"대표전화 / 이메일"}
                  </th>
                  <td>
                    {"0507-1445-9964 / kvcf26@gmail.com"}
                  </td>
                </tr>
                <tr>
                  <th>
                    {"공식 실습·검정 플랫폼"}
                  </th>
                  <td>
                    {"블루포지(BlueForge) — 2026.06.29 업무협약 체결"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
