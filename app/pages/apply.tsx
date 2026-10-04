"use client";

export default function ApplyPage() {
  return (
    <div className="page" id="p-apply" hidden={true}>
      <div className={"pagehead"}>
        <div className={"w"}>
          <div className={"crumb"}>
            {"HOME / 교육 / 교육기관 신청"}
          </div>
          <h1>
            {"교육기관 신청"}
          </h1>
          <p>
            {"협회 인증 교육기관 지정을 신청합니다. 접수 후 교육자격국 심사를 거쳐 지정 여부를 통보합니다."}
          </p>
        </div>
      </div>
      <section className={"sec"}>
        <div className={"w"}>
          <div className={"g2"} style={{"gap": "44px", "alignItems": "start"}}>
            <div>
              <div className={"lbl"}>
                {"REQUIREMENTS"}
              </div>
              <h2 className={"h2"} style={{"fontSize": "22px", "marginBottom": "16px"}}>
                {"지정 요건 · 제출서류"}
              </h2>
              <div className={"table-scroll"} role={"region"} aria-label={"표 내용"} tabIndex={0}>
                <table className={"ptable"}>
                  <tbody>
                    <tr>
                      <th style={{"width": "130px"}}>
                        {"지정 요건"}
                      </th>
                      <td>
                        {"교육 운영 실적 또는 계획 · 강의 인력 확보 · 실습 환경(온라인 가능) · 협회 표준 커리큘럼 운영 동의"}
                      </td>
                    </tr>
                    <tr>
                      <th>
                        {"제출서류"}
                      </th>
                      <td>
                        {"사업자등록증 사본 · 기관 소개서 · 교육 운영 계획서 · 강사 인력 현황 · 시설/실습 환경 자료"}
                      </td>
                    </tr>
                    <tr>
                      <th>
                        {"심사 절차"}
                      </th>
                      <td>
                        {"신청 접수 → 서류 검토 → 교육자격국 심사 → 지정 통보 → 협약 체결"}
                      </td>
                    </tr>
                    <tr>
                      <th>
                        {"심사 기간"}
                      </th>
                      <td>
                        {"접수 후 약 2~4주 (서류 보완 시 연장될 수 있음)"}
                      </td>
                    </tr>
                    <tr>
                      <th>
                        {"접수 담당"}
                      </th>
                      <td>
                        {"kvcf26@gmail.com (사무국)"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <form className={"form"} onSubmit={(event) => event.preventDefault()}>
              <div>
                <label>
                  {"기관명"}
                </label>
                <input placeholder={"기관명"} />
              </div>
              <div>
                <label>
                  {"대표자명"}
                </label>
                <input placeholder={"대표자명"} />
              </div>
              <div>
                <label>
                  {"담당자명 / 직위"}
                </label>
                <input placeholder={"담당자명 / 직위"} />
              </div>
              <div>
                <label>
                  {"연락처"}
                </label>
                <input placeholder={"010-0000-0000"} />
              </div>
              <div>
                <label>
                  {"이메일"}
                </label>
                <input type={"email"} placeholder={"email@example.com"} />
              </div>
              <div>
                <label>
                  {"지역"}
                </label>
                <input placeholder={"예) 서울 용산구"} />
              </div>
              <div>
                <label>
                  {"운영 희망 과정"}
                </label>
                <select>
                  <option>
                    {"VCA 대비 과정"}
                  </option>
                  <option>
                    {"VCP 대비 과정"}
                  </option>
                  <option>
                    {"VCE 대비 과정"}
                  </option>
                  <option>
                    {"컨설턴트 과정"}
                  </option>
                </select>
              </div>
              <div>
                <label>
                  {"기관 소개 / 운영 계획"}
                </label>
                <textarea placeholder={"교육 운영 실적, 강사 인력, 실습 환경 등을 기재해 주세요"}></textarea>
              </div>
              <div className={"agree"}>
                <label>
                  <input type={"checkbox"} />
                  <span>
                    {"개인정보 수집·이용 및 심사 목적 활용에 동의합니다."}
                  </span>
                </label>
              </div>
              <button className={"b fill"} type={"button"} id={"sendInst"}>
                {"신청서 제출"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
