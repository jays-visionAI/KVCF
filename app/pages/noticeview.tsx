export default function NoticeviewPage() {
  return (
    <div className="page" id="p-noticeview" hidden={true}>
      <div className={"pagehead"}>
        <div className={"w"}>
          <div className={"crumb"} id={"nvCrumb"}>
            {"HOME / 소식 / 공지사항"}
          </div>
          <h1 id={"nvHead"}>
            {"공지사항"}
          </h1>
        </div>
      </div>
      <section className={"sec"}>
        <div className={"w"}>
          <div className={"article"}>
            <div className={"ahead"}>
              <div className={"ameta"}>
                <span id={"nvCat"}></span>
                <span className={"adate"} id={"nvDate"}></span>
              </div>
              <h2 id={"nvTitle"}></h2>
            </div>
            <div id={"nvInfo"}></div>
            <div className={"abody"} id={"nvBody"}></div>
            <div className={"acta"} id={"nvCta"}></div>
            <div className={"anav"} id={"nvNav"}></div>
            <div className={"afoot"}>
              <button className={"b line"} data-r={"notice"}>
                {"목록으로"}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
