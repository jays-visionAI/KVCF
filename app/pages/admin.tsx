"use client";

import AdminLoginCard from "../components/AdminLoginCard";
import { useAdminAuth } from "../components/useAdminAuth";

export default function AdminPage() {
  const { isAdmin } = useAdminAuth();
  return (
    <div className="page" id="p-admin" hidden={true}>
      {!isAdmin ? <AdminLoginCard /> : null}
      <div className={"adm"} hidden={!isAdmin}>
        <aside className={"adm-side"}>
          <div className={"lg"}>
            <img src="/assets/kvcf-logo-white.png" alt="한국바이브코딩협회" />
          </div>
          <button className="adm-menu-toggle" id="admMenuToggle" type="button" aria-label="관리자 메뉴" aria-expanded="false" aria-controls="admMenu"><span className="adm-mobile-brand"><span className="adm-mobile-logo"><img src="/assets/kvcf-logo-white.png" alt="" /></span></span><span className="adm-mobile-controls"><span className="adm-mobile-role">ADMIN</span><span className="adm-menu-icon" aria-hidden="true">☰</span></span></button>
          <nav className="adm-menu" id="admMenu" aria-label="관리자 메뉴">
          <div className={"grp"}>
            {"OVERVIEW"}
          </div>
          <a className={"on"} data-am={"dash"}>
            {"대시보드"}
          </a>
          <div className={"grp"}>
            {"홈페이지 콘텐츠"}
          </div>
          <a data-am={"hero"}>
            {"메인 화면 · 슬로건"}
          </a>
          <a data-am={"banner"}>
            {"배너 · 슬라이더 "}
            <span className={"cnt"} id={"cBanner"}>
              {"0"}
            </span>
          </a>
          <a data-am={"stat"}>
            {"통계 카운터"}
          </a>
          <div className={"grp"}>
            {"협회 정보"}
          </div>
          <a data-am={"info"}>
            {"기본 정보 · 연락처"}
          </a>
          <a data-am={"officer"}>
            {"임원 관리 "}
            <span className={"cnt"} id={"cOfficer"}>
              {"0"}
            </span>
          </a>
          <a data-am={"book"}>
            {"도서 등록 "}
            <span className={"cnt"} id={"cBook"}>
              {"0"}
            </span>
          </a>
          <div className={"grp"}>
            {"자격 · 교육"}
          </div>
          <a data-am={"cert"}>
            {"자격 종목 관리 "}
            <span className={"cnt"} id={"cCert"}>
              {"0"}
            </span>
          </a>
          <a data-am={"exam"}>
            {"검정 회차 · 발급"}
          </a>
          <a data-am={"inst"}>
            {"교육기관 심사 "}
            <span className={"cnt"} id={"cInst"}>
              {"0"}
            </span>
          </a>
          <div className={"grp"}>
            {"회원 · 접수"}
          </div>
          <a data-am={"member"}>
            {"회원 관리 "}
            <span className={"cnt"} id={"cMember"}>
              {"0"}
            </span>
          </a>
          <a data-am={"appl"}>
            {"자격 신청 접수 "}
            <span className={"cnt"} id={"cAppl"}>
              {"0"}
            </span>
          </a>
          <a data-am={"inq"}>
            {"문의 관리 "}
            <span className={"cnt"} id={"cInq"}>
              {"0"}
            </span>
          </a>
          <div className={"grp"}>
            {"게시물"}
          </div>
          <a data-am={"notice"}>
            {"공지사항 "}
            <span className={"cnt"} id={"cNotice"}>
              {"0"}
            </span>
          </a>
          <a data-am={"press"}>
            {"보도자료 "}
            <span className={"cnt"} id={"cPress"}>
              {"0"}
            </span>
          </a>
          <a data-am={"lib"}>
            {"자료실 "}
            <span className={"cnt"} id={"cLib"}>
              {"0"}
            </span>
          </a>
          </nav>
        </aside>
        <div className={"adm-main"}>
          <div className={"adm-top"}>
            <h2 id={"amTitle"}>
              {"대시보드"}
            </h2>
            <div className={"rt"}>
              <span className={"adm-role-badge"}>ADMIN</span>
              <span id={"admUserName"}>
                {""}
              </span>
              <button className={"abtn sm"} data-r={"home"}>
                {"사이트 보기"}
              </button>
              <button className={"abtn sm"} id={"admLogout"}>
                {"로그아웃"}
              </button>
            </div>
          </div>
          <div className={"adm-body"}>
            <section className={"ampane on"} id={"am-dash"}>
              <div className={"akpis"}>
                <div className={"akpi"}>
                  <div className={"l"}>
                    {"전체 회원"}
                  </div>
                  <div className={"n"} id={"kMember"}>
                    {"0"}
                  </div>
                  <div className={"s"} id={"kMemberSub"}>
                    {"-"}
                  </div>
                </div>
                <button className={"akpi"} type="button" data-am-pending="">
                  <div className={"l"}>
                    {"승인 대기"}
                  </div>
                  <div className={"n"} id={"kWait"}>
                    {"0"}
                  </div>
                  <div className={"s"}>
                    {"회원 관리에서 승인하기 ↗"}
                  </div>
                </button>
                <div className={"akpi"}>
                  <div className={"l"}>
                    {"자격 신청 접수"}
                  </div>
                  <div className={"n"} id={"kAppl"}>
                    {"0"}
                  </div>
                  <div className={"s"}>
                    {"사전 관심등록 포함"}
                  </div>
                </div>
                <div className={"akpi"}>
                  <div className={"l"}>
                    {"미답변 문의"}
                  </div>
                  <div className={"n"} id={"kInq"}>
                    {"0"}
                  </div>
                  <div className={"s"}>
                    {"1:1 문의"}
                  </div>
                </div>
              </div>
              <div className={"acard"}>
                <h3>
                  {"최근 자격 신청"}
                </h3>
                <div className={"hint"}>
                  {"사이트에서 접수된 등록 신청입니다."}
                </div>
                <table className={"atable"}>
                  <thead>
                    <tr>
                      <th>
                        {"신청일"}
                      </th>
                      <th>
                        {"신청자"}
                      </th>
                      <th>
                        {"자격"}
                      </th>
                      <th>
                        {"상태"}
                      </th>
                    </tr>
                  </thead>
                  <tbody id={"dashAppl"}></tbody>
                </table>
              </div>
              <div className={"acard"}>
                <div className="rowbtn"><h3>{"최근 가입 회원"}</h3><button className="abtn sm" type="button" data-am-pending="">승인 대기 회원 보기 ↗</button></div>
                <table className={"atable"}>
                  <thead>
                    <tr>
                      <th>
                        {"가입일"}
                      </th>
                      <th>
                        {"회원"}
                      </th>
                      <th>
                        {"유형"}
                      </th>
                      <th>
                        {"상태"}
                      </th>
                    </tr>
                  </thead>
                  <tbody id={"dashMember"}></tbody>
                </table>
              </div>
            </section>
            <section className={"ampane"} id={"am-hero"}>
              <div className={"acard"}>
                <h3>
                  {"메인 화면 · 슬로건"}
                </h3>
                <div className={"hint"}>
                  {"홈 상단에 노출되는 배지·제목·소개문을 수정합니다. 저장 시 홈페이지에 즉시 반영됩니다."}
                </div>
                <div className={"af"}>
                  <div>
                    <label>
                      {"상단 배지"}
                    </label>
                    <input id={"fHeroBadge"} />
                  </div>
                  <div>
                    <label>
                      {"메인 제목 (줄바꿈은 Enter)"}
                    </label>
                    <textarea id={"fHeroTitle"} style={{"minHeight": "70px"}}></textarea>
                  </div>
                  <div>
                    <label>
                      {"소개문"}
                    </label>
                    <textarea id={"fHeroDesc"}></textarea>
                  </div>
                </div>
                <div className={"rowbtn"} style={{"margin": "16px 0 0"}}>
                  <span></span>
                  <span>
                    <span className={"saved"} id={"sHero"}>
                      {"저장되었습니다"}
                    </span>
                    <button className={"abtn pri"} id={"saveHero"}>
                      {"저장"}
                    </button>
                  </span>
                </div>
              </div>
            </section>
            <section className={"ampane"} id={"am-banner"}>
              <div className={"acard"}>
                <div className={"rowbtn"}>
                  <div>
                    <h3>
                      {"배너 · 슬라이더"}
                    </h3>
                    <div className={"hint"}>
                      {"홈 우측에서 자동 순환되는 배너입니다."}
                    </div>
                  </div>
                  <button className={"abtn pri"} id={"addBanner"}>
                    {"+ 배너 추가"}
                  </button>
                </div>
                <table className={"atable"}>
                  <thead>
                    <tr>
                      <th>
                        {"태그"}
                      </th>
                      <th>
                        {"제목"}
                      </th>
                      <th>
                        {"설명"}
                      </th>
                      <th>
                        {"연결"}
                      </th>
                      <th>
                        {"관리"}
                      </th>
                    </tr>
                  </thead>
                  <tbody id={"tBanner"}></tbody>
                </table>
              </div>
            </section>
            <section className={"ampane"} id={"am-stat"}>
              <div className={"acard"}>
                <h3>
                  {"통계 카운터"}
                </h3>
                <div className={"hint"}>
                  {"홈 중단 숫자 영역입니다."}
                </div>
                <table className={"atable"}>
                  <thead>
                    <tr>
                      <th>
                        {"숫자"}
                      </th>
                      <th>
                        {"설명"}
                      </th>
                      <th>
                        {"관리"}
                      </th>
                    </tr>
                  </thead>
                  <tbody id={"tStat"}></tbody>
                </table>
              </div>
            </section>
            <section className={"ampane"} id={"am-info"}>
              <div className={"acard"}>
                <h3>
                  {"기본 정보 · 연락처"}
                </h3>
                <div className={"hint"}>
                  {"오시는 길 페이지와 푸터에 함께 반영됩니다."}
                </div>
                <div className={"af two"}>
                  <div>
                    <label>
                      {"법인명"}
                    </label>
                    <input id={"fCompany"} />
                  </div>
                  <div>
                    <label>
                      {"대표자"}
                    </label>
                    <input id={"fCeo"} />
                  </div>
                  <div>
                    <label>
                      {"사업자등록번호"}
                    </label>
                    <input id={"fBrn"} />
                  </div>
                  <div>
                    <label>
                      {"대표전화"}
                    </label>
                    <input id={"fTel"} />
                  </div>
                  <div>
                    <label>
                      {"대표이메일"}
                    </label>
                    <input id={"fEmail"} />
                  </div>
                  <div>
                    <label>
                      {"운영시간"}
                    </label>
                    <input id={"fHours"} />
                  </div>
                  <div>
                    <label>
                      {"주소 (1행)"}
                    </label>
                    <input id={"fAddr1"} />
                  </div>
                  <div>
                    <label>
                      {"주소 (2행)"}
                    </label>
                    <input id={"fAddr2"} />
                  </div>
                  <div style={{"gridColumn": "1 / -1"}}>
                    <label>
                      {"교통편 안내 링크"}
                    </label>
                    <input id={"fMapUrl"} />
                  </div>
                </div>
                <div className={"hint"} style={{"marginTop": "12px"}}>
                  {"※ 저장 시 브라우저에 영속화되며 푸터·오시는 길·인증 정보에 즉시 반영됩니다."}
                </div>
                <div className={"rowbtn"} style={{"margin": "16px 0 0"}}>
                  <span></span>
                  <span>
                    <span className={"saved"} id={"sInfo"}>
                      {"저장되었습니다"}
                    </span>
                    <button className={"abtn pri"} id={"saveInfo"}>
                      {"저장"}
                    </button>
                  </span>
                </div>
              </div>
            </section>
            <section className={"ampane"} id={"am-officer"}>
              <div className={"acard"}>
                <div className={"rowbtn"}>
                  <div>
                    <h3>
                      {"임원 관리"}
                    </h3>
                    <div className={"hint"}>
                      {"조직안내 페이지의 임원 명단입니다."}
                    </div>
                  </div>
                  <button className={"abtn pri"} id={"addOfficer"}>
                    {"+ 임원 추가"}
                  </button>
                </div>
                <table className={"atable"}>
                  <thead>
                    <tr>
                      <th>
                        {"성명"}
                      </th>
                      <th>
                        {"직위"}
                      </th>
                      <th>
                        {"소속"}
                      </th>
                      <th>
                        {"관리"}
                      </th>
                    </tr>
                  </thead>
                  <tbody id={"tOfficer"}></tbody>
                </table>
              </div>
            </section>
            <section className={"ampane"} id={"am-book"}>
              <div className={"acard"}>
                <div className={"rowbtn"}>
                  <div>
                    <h3>
                      {"도서 등록"}
                    </h3>
                    <div className={"hint"}>
                      {"2026년 AI 관련 도서입니다. 앞의 3권은 회장 인사말에도 표시됩니다."}
                    </div>
                  </div>
                  <button className={"abtn pri"} id={"addBook"}>
                    {"+ 도서 추가"}
                  </button>
                </div>
                <table className={"atable"}>
                  <thead>
                    <tr>
                      <th>
                        {"표지"}
                      </th>
                      <th>
                        {"도서명"}
                      </th>
                      <th>
                        {"도서 링크"}
                      </th>
                      <th>
                        {"관리"}
                      </th>
                    </tr>
                  </thead>
                  <tbody id={"tBook"}></tbody>
                </table>
              </div>
            </section>
            <section className={"ampane"} id={"am-cert"}>
              <div className={"acard"}>
                <div className={"rowbtn"}>
                  <div>
                    <h3>
                      {"자격 종목 관리"}
                    </h3>
                    <div className={"hint"}>
                      {"홈·자격체계 페이지에 반영됩니다."}
                    </div>
                  </div>
                  <button className={"abtn pri"} id={"addCert"}>
                    {"+ 종목 추가"}
                  </button>
                </div>
                <table className={"atable"}>
                  <thead>
                    <tr>
                      <th>
                        {"코드"}
                      </th>
                      <th>
                        {"등급"}
                      </th>
                      <th>
                        {"명칭"}
                      </th>
                      <th>
                        {"누적 권장 학습 시간"}
                      </th>
                      <th>
                        {"검정방법"}
                      </th>
                      <th>
                        {"관리"}
                      </th>
                    </tr>
                  </thead>
                  <tbody id={"tCert"}></tbody>
                </table>
              </div>
            </section>
            <section className={"ampane"} id={"am-exam"}>
              <div className={"acard"}>
                <div className={"rowbtn"}>
                  <div>
                    <h3>
                      {"검정 회차"}
                    </h3>
                    <div className={"hint"}>
                      {"시험 접수·일정 페이지에 노출할 회차입니다."}
                    </div>
                  </div>
                  <button className={"abtn pri"} id={"addExam"}>
                    {"+ 회차 개설"}
                  </button>
                </div>
                <table className={"atable"}>
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
                        {"상태"}
                      </th>
                      <th>
                        {"관리"}
                      </th>
                    </tr>
                  </thead>
                  <tbody id={"tExam"}></tbody>
                </table>
              </div>
              <div className={"acard"}>
                <h3>
                  {"자격증 발급 · 진위"}
                </h3>
                <div className={"hint"}>
                  {"합격 처리 시 자격번호가 발급되며 진위확인에 등록됩니다."}
                </div>
                <div className={"afilter"}>
                  <input id={"amQVerify"} placeholder={"자격번호 조회 (KVCF-VCP-2026-00001)"} />
                  <button className={"abtn"} id={"amBtnVerify"}>
                    {"조회"}
                  </button>
                </div>
                <div id={"amVerifyOut"} style={{"fontSize": "13.5px", "color": "var(--sub)"}}>
                  {"자격번호를 입력해 조회하세요."}
                </div>
              </div>
            </section>
            <section className={"ampane"} id={"am-inst"}>
              <div className={"acard"}>
                <h3>
                  {"교육기관 심사"}
                </h3>
                <div className={"hint"}>
                  {"사이트의 교육기관 신청 폼으로 접수된 건입니다."}
                </div>
                <table className={"atable"}>
                  <thead>
                    <tr>
                      <th>
                        {"접수일"}
                      </th>
                      <th>
                        {"기관명"}
                      </th>
                      <th>
                        {"담당자"}
                      </th>
                      <th>
                        {"희망과정"}
                      </th>
                      <th>
                        {"상태"}
                      </th>
                      <th>
                        {"관리"}
                      </th>
                    </tr>
                  </thead>
                  <tbody id={"tInst"}></tbody>
                </table>
              </div>
            </section>
            <section className={"ampane"} id={"am-member"}>
              <div className={"acard"}>
                <div className={"rowbtn"}>
                  <div>
                    <h3>
                      {"회원 관리"}
                    </h3>
                    <div className={"hint"}>
                      {"회원 정보 조회·수정 및 가입 승인을 처리합니다."}
                    </div>
                  </div>
                  <button className={"abtn pri"} id={"addMember"}>
                    {"+ 회원 등록"}
                  </button>
                </div>
                <div className={"afilter"}>
                  <input id={"qMember"} placeholder={"이름 · 이메일 검색"} />
                  <select id={"fType"}>
                    <option value={""}>
                      {"전체 유형"}
                    </option>
                    <option>
                      {"개인"}
                    </option>
                    <option>
                      {"기업(회원사)"}
                    </option>
                    <option>
                      {"교육기관"}
                    </option>
                  </select>
                  <select id={"fStatus"}>
                    <option value={""}>
                      {"전체 상태"}
                    </option>
                    <option>
                      {"활성"}
                    </option>
                    <option>
                      {"승인대기"}
                    </option>
                    <option>
                      {"정지"}
                    </option>
                  </select>
                </div>
                <div className="adm-pending" id="admPending"></div>
                <table className={"atable"}>
                  <thead>
                    <tr>
                      <th>
                        {"회원번호"}
                      </th>
                      <th>
                        {"이름 / 기관"}
                      </th>
                      <th>
                        {"유형"}
                      </th>
                      <th>
                        {"연락처"}
                      </th>
                      <th>
                        {"가입일"}
                      </th>
                      <th>
                        {"보유자격"}
                      </th>
                      <th>
                        {"상태"}
                      </th>
                      <th>
                        {"관리"}
                      </th>
                    </tr>
                  </thead>
                  <tbody id={"tMember"}></tbody>
                </table>
              </div>
            </section>
            <section className={"ampane"} id={"am-appl"}>
              <div className={"acard"}>
                <h3>
                  {"자격 신청 접수"}
                </h3>
                <div className={"hint"}>
                  {"회원이 사이트에서 제출한 자격 등록 신청입니다."}
                </div>
                <table className={"atable"}>
                  <thead>
                    <tr>
                      <th>
                        {"신청일"}
                      </th>
                      <th>
                        {"신청자"}
                      </th>
                      <th>
                        {"자격"}
                      </th>
                      <th>
                        {"연락처"}
                      </th>
                      <th>
                        {"상태"}
                      </th>
                      <th>
                        {"관리"}
                      </th>
                    </tr>
                  </thead>
                  <tbody id={"tAppl"}></tbody>
                </table>
              </div>
            </section>
            <section className={"ampane"} id={"am-inq"}>
              <div className={"acard"}>
                <h3>
                  {"문의 관리"}
                </h3>
                <div className={"hint"}>
                  {"고객지원 문의 폼으로 접수된 건입니다."}
                </div>
                <table className={"atable"}>
                  <thead>
                    <tr>
                      <th>
                        {"접수일"}
                      </th>
                      <th>
                        {"유형"}
                      </th>
                      <th>
                        {"성명"}
                      </th>
                      <th>
                        {"이메일"}
                      </th>
                      <th>
                        {"내용"}
                      </th>
                      <th>
                        {"상태"}
                      </th>
                      <th>
                        {"관리"}
                      </th>
                    </tr>
                  </thead>
                  <tbody id={"tInq"}></tbody>
                </table>
              </div>
            </section>
            <section className={"ampane"} id={"am-notice"}>
              <div className={"acard"}>
                <div className={"rowbtn"}>
                  <div>
                    <h3>
                      {"공지사항"}
                    </h3>
                    <div className={"hint"}>
                      {"홈 게시판과 공지사항 페이지에 반영됩니다."}
                    </div>
                  </div>
                  <button className={"abtn pri"} id={"addNotice"}>
                    {"+ 공지 작성"}
                  </button>
                </div>
                <table className={"atable"}>
                  <thead>
                    <tr>
                      <th>
                        {"분류"}
                      </th>
                      <th>
                        {"제목"}
                      </th>
                      <th>
                        {"게시일"}
                      </th>
                      <th>
                        {"관리"}
                      </th>
                    </tr>
                  </thead>
                  <tbody id={"tNotice"}></tbody>
                </table>
              </div>
            </section>
            <section className={"ampane"} id={"am-press"}>
              <div className={"acard"}>
                <div className={"rowbtn"}>
                  <div>
                    <h3>
                      {"보도자료"}
                    </h3>
                    <div className={"hint"}>
                      {"홈 협회 소식과 보도자료 페이지의 언론 보도 목록에 반영됩니다."}
                    </div>
                  </div>
                  <button className={"abtn pri"} id={"addPress"}>
                    {"+ 보도 추가"}
                  </button>
                </div>
                <table className={"atable"}>
                  <thead>
                    <tr>
                      <th>
                        {"제목"}
                      </th>
                      <th>
                        {"매체"}
                      </th>
                      <th>
                        {"일자"}
                      </th>
                      <th>
                        {"링크"}
                      </th>
                      <th>
                        {"관리"}
                      </th>
                    </tr>
                  </thead>
                  <tbody id={"tPress"}></tbody>
                </table>
              </div>
            </section>
            <section className={"ampane"} id={"am-lib"}>
              <div className={"acard"}>
                <div className={"rowbtn"}>
                  <div>
                    <h3>
                      {"자료실"}
                    </h3>
                    <div className={"hint"}>
                      {"공개 문서 목록입니다."}
                    </div>
                  </div>
                  <button className={"abtn pri"} id={"addLib"}>
                    {"+ 자료 추가"}
                  </button>
                </div>
                <table className={"atable"}>
                  <thead>
                    <tr>
                      <th>
                        {"문서명"}
                      </th>
                      <th>
                        {"형식"}
                      </th>
                      <th>
                        {"상태"}
                      </th>
                      <th>
                        {"관리"}
                      </th>
                    </tr>
                  </thead>
                  <tbody id={"tLib"}></tbody>
                </table>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
