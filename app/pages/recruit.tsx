export default function RecruitPage() {
  return (
    <div className="page" id="p-recruit" hidden={true}>
      <div className={"pagehead"}>
        <div className={"w"}>
          <div className={"crumb"}>
            {"HOME / 소식 / 모집공고"}
          </div>
          <h1>
            {"모집공고"}
          </h1>
          <p>
            {"인증 교육기관·강사 등 협회의 모집 공고입니다."}
          </p>
        </div>
      </div>
      <section className={"sec"}>
        <div className={"w"}>
          <div className={"ntabs"}>
            <a data-r={"notice"}>
              {"공지사항"}
            </a>
            <a className={"on"} data-r={"recruit"}>
              {"모집공고"}
            </a>
            <a data-r={"press"}>
              {"보도자료"}
            </a>
            <a data-r={"library"}>
              {"자료실"}
            </a>
          </div>
          <div className={"board"}>
            <div className={"listhead"}>
              <h3>
                {"모집공고"}
              </h3>
              <span className={"cnt2"} id={"cntRecruit"}></span>
            </div>
            <div id={"bRecruitList"}></div>
          </div>
        </div>
      </section>
    </div>
  );
}
