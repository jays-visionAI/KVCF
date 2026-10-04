export default function VerifyPage() {
  return (
    <div className="page" id="p-verify" hidden={true}>
      <div className={"pagehead"}>
        <div className={"w"}>
          <div className={"crumb"}>
            {"HOME / 자격검증"}
          </div>
          <h1>
            {"자격 진위 확인"}
          </h1>
          <p>
            {"발급된 자격번호로 자격의 진위와 유효 상태를 조회할 수 있습니다. 개인정보는 최소한으로 표시됩니다."}
          </p>
        </div>
      </div>
      <section className={"sec"}>
        <div className={"w"}>
          <div className={"g2"} style={{"gap": "44px", "alignItems": "start"}}>
            <div className={"vbox"}>
              <div className={"vh"}>
                {"자격 진위 확인 / VERIFY"}
              </div>
              <div className={"vb"}>
                <div className={"vf"}>
                  <div className={"rowf"}>
                    <input id="qVName" placeholder={"성명"} />
                    <input id="qVBirth" placeholder={"생년월일 (YYMMDD)"} />
                  </div>
                  <input id="qVerify" placeholder={"자격번호  KVCF-□□□-2026-00000"} />
                  <button id="btnVerify">
                    {"조회하기"}
                  </button>
                </div>
                <div className={"vresult"}>
                  <div className={"sample"}>
                    {"— 조회 결과 예시 —"}
                  </div>
                  <div className={"vrow"}>
                    <span className={"k"}>
                      {"자격번호"}
                    </span>
                    <span className={"v"}>
                      {"KVCF-VCP-2026-00001"}
                    </span>
                  </div>
                  <div className={"vrow"}>
                    <span className={"k"}>
                      {"자격 종목"}
                    </span>
                    <span className={"v"}>
                      {"바이브코딩 전문가 (2급)"}
                    </span>
                  </div>
                  <div className={"vrow"}>
                    <span className={"k"}>
                      {"성명"}
                    </span>
                    <span className={"v"}>
                      {"홍○동"}
                    </span>
                  </div>
                  <div className={"vrow"}>
                    <span className={"k"}>
                      {"발급일"}
                    </span>
                    <span className={"v"}>
                      {"2026.—.—"}
                    </span>
                  </div>
                  <div className={"vrow"}>
                    <span className={"k"}>
                      {"상태"}
                    </span>
                    <span className={"status"}>
                      {"유효 / VALID"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className={"lbl"}>
                {"GUIDE"}
              </div>
              <h2 className={"h2"} style={{"fontSize": "22px", "marginBottom": "14px"}}>
                {"검증 안내"}
              </h2>
              <p className={"lead"}>
                {"성명·생년월일·자격번호를 입력하면 발급 사실과 유효 상태를 확인할 수 있습니다. 조회 결과는 자격 종목·발급일·유효 상태만 표시하며, 성명은 일부 마스킹 처리됩니다."}
              </p>
              <p className={"lead"} style={{"marginTop": "12px"}}>
                {"자격 발급은 민간자격 등록 완료 후 개시됩니다. 현재 화면은 조회 예시입니다."}
              </p>
              <div className={"legalbox"} style={{"marginTop": "18px"}}>
                <div className={"r"}>
                  <span className={"k"}>
                    {"자격관리기관"}
                  </span>
                  <span>
                    {"한국바이브코딩협회(KVCF)"}
                  </span>
                </div>
                <div className={"r"}>
                  <span className={"k"}>
                    {"검증 범위"}
                  </span>
                  <span>
                    {"발급 자격번호의 진위 및 유효 상태"}
                  </span>
                </div>
                <div className={"r"}>
                  <span className={"k"}>
                    {"문의"}
                  </span>
                  <span>
                    {"kvcf26@gmail.com · 0507-1445-9964"}
                  </span>
                </div>
                <div className={"warn"}>
                  {"※ 본 자격은 국가공인 자격이 아닌 등록(예정) 민간자격입니다."}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
