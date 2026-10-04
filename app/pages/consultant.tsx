export default function ConsultantPage() {
  return (
    <div className="page" id="p-consultant" hidden={true}>
      <div className={"pagehead"}>
        <div className={"w"}>
          <div className={"crumb"}>
            {"HOME / 자격검정 / 바이브코딩컨설턴트"}
          </div>
          <h1>
            {"바이브코딩컨설턴트"}
          </h1>
          <p>
            {"만드는 사람이 아니라, 조직에 바이브코딩을 어떻게 도입할지를 설계하고 자문하는 전문가 자격입니다."}
          </p>
        </div>
      </div>
      <section className={"sec"}>
        <div className={"w"}>
          <div className={"certblock"}>
            <div className={"top"}>
              <div>
                <span className={"g"}>
                  {"CONSULTANT"}
                </span>
                <h2>
                  {"바이브코딩컨설턴트"}
                </h2>
                <div className={"lv"}>
                  {"Vibe Coding Consultant · 별도 트랙"}
                </div>
                <p className={"desc"}>
                  {"기업·기관의 AI 도입 전략을 수립하고, 조직 적용 방안·리스크·거버넌스를 설계합니다. 제작 역량 사다리(VCA·VCP·VCE)와 별개로 운영되는 자문 전문가 트랙입니다."}
                </p>
              </div>
              <div className={"cst"}>
                <span className={"st"}>
                  {"민간자격 등록 진행 중"}
                </span>
                <span className={"cert-status-note"}>
                  {"검정 접수 일정은 추후 공지됩니다."}
                </span>
              </div>
            </div>
            <div className={"spec"}>
              <div className={"it"}>
                <div className={"k"}>
                  {"응시자격"}
                </div>
                <div className={"v"}>
                  {"실무 경력자 (VCP 권장)"}
                </div>
              </div>
              <div className={"it"}>
                <div className={"k"}>
                  {"검정방법"}
                </div>
                <div className={"v"}>
                  {"사례 서술 + 면접"}
                </div>
              </div>
              <div className={"it"}>
                <div className={"k"}>
                  {"합격기준"}
                </div>
                <div className={"v"}>
                  {"심사 기준 충족"}
                </div>
              </div>
              <div className={"it"}>
                <div className={"k"}>
                  {"교육"}
                </div>
                <div className={"v"}>
                  {"별도 과정"}
                </div>
              </div>
            </div>
            <div className={"table-scroll"} role={"region"} aria-label={"표 내용"} tabIndex={0}>
              <table className={"ptable"} style={{"marginTop": "18px"}}>
                <tbody>
                  <tr>
                    <th style={{"width": "150px"}}>
                      {"자격 정의"}
                    </th>
                    <td>
                      {"조직의 바이브코딩 도입을 진단·설계·자문하는 전문가"}
                    </td>
                  </tr>
                  <tr>
                    <th>
                      {"검정기준"}
                    </th>
                    <td>
                      {"도입 전략 수립 · 조직 역량 진단 · 업무 적용 설계 · 리스크 및 거버넌스 · 성과 측정"}
                    </td>
                  </tr>
                  <tr>
                    <th>
                      {"검정과목"}
                    </th>
                    <td>
                      {"AI 도입 전략 / 조직 적용 / 보안·거버넌스 / 사례 분석"}
                    </td>
                  </tr>
                  <tr>
                    <th>
                      {"응시료"}
                    </th>
                    <td className={"price"}>
                      {"추후 공지 (민간자격 등록 완료 후)"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className={"legalbox"}>
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
                  {"등록번호"}
                </span>
                <span>
                  {"민간자격 등록 진행 중 (등록 완료 후 표기)"}
                </span>
              </div>
              <div className={"warn"}>
                {"※ 본 자격은 국가공인 자격이 아닌 등록(예정) 민간자격입니다."}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
