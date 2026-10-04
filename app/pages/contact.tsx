export default function ContactPage() {
  return (
    <div className="page" id="p-contact" hidden={true}>
      <div className={"pagehead"}>
        <div className={"w"}>
          <div className={"crumb"}>
            {"HOME / 협회소개 / 오시는 길"}
          </div>
          <h1>
            {"오시는 길"}
          </h1>
        </div>
      </div>
      <section className={"sec"}>
        <div className={"w"}>
          <div className={"g2"} style={{"gap": "44px", "alignItems": "start"}}>
            <div>
              <div className={"lbl"}>
                {"CONTACT"}
              </div>
              <h2 className={"h2"} style={{"marginBottom": "20px"}}>
                {"사무국 안내"}
              </h2>
              <div className={"table-scroll"} role={"region"} aria-label={"표 내용"} tabIndex={0}>
                <table className={"ptable"}>
                  <tbody id={"bContact"}></tbody>
                </table>
              </div>
            </div>
            <div className={"contact-map"}>
              <iframe src={"https://www.google.com/maps/embed?pb=!1m3!2m1!1z7ISc7Jq47Yq567OE7IucIOyaqeyCsOq1rCDssq3tjIzroZw0N-q4uCAxMDAg7KeE66as6rSA!5e0!3m2!1sko!2skr!4v1790683907177!5m2!1sko!2skr"} title={"한국바이브코딩협회 오시는 길 — 숙명여대 진리관"} width={600} height={450} style={{"border": "0"}} allowFullScreen={true} loading={"lazy"} referrerPolicy={"strict-origin-when-cross-origin"}></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
