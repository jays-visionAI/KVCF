export default function NoticePage() {
  return (
    <div className="page" id="p-notice" hidden={true}>
      <div className={"pagehead"}>
        <div className={"w"}>
          <div className={"crumb"}>
            {"HOME / 소식 / 공지사항"}
          </div>
          <h1>
            {"공지사항"}
          </h1>
          <p>
            {"협회 운영 및 자격·교육 관련 안내 사항입니다."}
          </p>
        </div>
      </div>
      <section className={"sec"}>
        <div className={"w"}>
          <div className={"ntabs"}>
            <a className={"on"} data-r={"notice"}>
              {"공지사항"}
            </a>
            <a data-r={"recruit"}>
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
                {"공지사항"}
              </h3>
              <span className={"cnt2"} id={"cntNotice"}></span>
            </div>
            <div id={"bNoticeList"}></div>
          </div>
        </div>
      </section>
    </div>
  );
}
