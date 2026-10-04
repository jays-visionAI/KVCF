export default function BooksPage() {
  return (
    <div className="page" id="p-books" hidden={true}>
      <div className={"pagehead"}>
        <div className={"w"}>
          <div className={"crumb"}>
            {"HOME / 협회소개 / 회장 저서"}
          </div>
          <h1>
            {"회장 저서"}
          </h1>
          <p>
            {"2026년에 발간된 문형남 회장의 AI 관련 도서입니다."}
          </p>
        </div>
      </div>
      <section className={"sec"}>
        <div className={"w"}>
          <div className={"lbl"}>
            {"PUBLICATIONS"}
          </div>
          <h2 className={"h2"}>
            {"저서 목록"}
          </h2>
          <ol className={"book-list book-list-all"} id={"allBookList"}></ol>
        </div>
      </section>
    </div>
  );
}
