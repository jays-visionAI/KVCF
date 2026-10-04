export default function PressPage() {
  return (
    <div className="page" id="p-press" hidden={true}>
      <div className={"pagehead"}>
        <div className={"w"}>
          <div className={"crumb"}>
            {"HOME / 소식 / 보도자료·언론"}
          </div>
          <h1>
            {"보도자료 · 언론"}
          </h1>
          <p>
            {"협회 관련 언론 보도입니다. 제목을 클릭하면 원문으로 이동합니다."}
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
            <a className={"on"} data-r={"press"}>
              {"보도자료"}
            </a>
            <a data-r={"library"}>
              {"자료실"}
            </a>
          </div>
          <div className={"sech"}>
            <h2>
              {"언론 보도 (블루포지 MOU 관련)"}
            </h2>
            <span className={"mono"} style={{"fontSize": "14px", "color": "var(--faint)"}}>
              {"총 12건"}
            </span>
          </div>
          <div className={"presslist"} id={"bPressList"}></div>
        </div>
      </section>
    </div>
  );
}
