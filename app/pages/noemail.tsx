export default function NoemailPage() {
  return (
    <div className="page" id="p-noemail" hidden={true}>
      <div className={"pagehead"}>
        <div className={"w"}>
          <div className={"crumb"}>
            {"HOME / 이용안내 / 이메일무단수집거부"}
          </div>
          <h1>
            {"이메일 무단수집 거부"}
          </h1>
        </div>
      </div>
      <section className={"sec"}>
        <div className={"w"}>
          <div className={"terms"} style={{"maxWidth": "800px"}}>
            <div className={"card2"}>
              <p style={{"fontSize": "15px", "lineHeight": "1.9"}}>
                {"본 웹사이트에 게시된 이메일 주소가 전자우편 수집 프로그램이나 그 밖의 기술적 장치를 이용하여 무단으로 수집되는 것을 거부하며, 이를 위반 시 "}
                <b>
                  {"정보통신망 이용촉진 및 정보보호 등에 관한 법률"}
                </b>
                {"에 의해 형사 처벌됨을 유념하시기 바랍니다."}
              </p>
              <p className={"note"} style={{"marginTop": "14px"}}>
                {"게시일 : 2026년"}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
