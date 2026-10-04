export default function LibraryPage() {
  return (
    <div className="page" id="p-library" hidden={true}>
      <div className={"pagehead"}>
        <div className={"w"}>
          <div className={"crumb"}>
            {"HOME / 소식 / 자료실"}
          </div>
          <h1>
            {"자료실"}
          </h1>
          <p>
            {"협회 정관·제규정·서식 등 공개 문서를 제공합니다."}
          </p>
        </div>
      </div>
      <section className={"sec"}>
        <div className={"w"}>
          <div className={"ntabs"}>
            <a data-r={"notice"}>
              {"공지사항"}
            </a>
            <a data-r={"recruit"}>
              {"모집공고"}
            </a>
            <a data-r={"press"}>
              {"보도자료"}
            </a>
            <a className={"on"} data-r={"library"}>
              {"자료실"}
            </a>
          </div>
          <div className={"doclist"} id={"bLibrary"}></div>
          <p className={"note"}>
            {"※ 문서 최종본 등록 후 다운로드가 활성화됩니다. (담당: 류성국)"}
          </p>
        </div>
      </section>
    </div>
  );
}
