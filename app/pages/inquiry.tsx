"use client";

export default function InquiryPage() {
  return (
    <div className="page" id="p-inquiry" hidden={true}>
      <div className={"pagehead"}>
        <div className={"w"}>
          <div className={"crumb"}>
            {"HOME / 고객지원 / 문의하기"}
          </div>
          <h1>
            {"문의하기"}
          </h1>
          <p>
            {"문의 접수 후 영업일 기준 2~3일 이내에 답변드립니다."}
          </p>
        </div>
      </div>
      <section className={"sec"}>
        <div className={"w"}>
          <div className={"g2"} style={{"gap": "44px", "alignItems": "start"}}>
            <form className={"form"} onSubmit={(event) => event.preventDefault()}>
              <div>
                <label>
                  {"문의 유형"}
                </label>
                <select>
                  <option>
                    {"자격 · 응시"}
                  </option>
                  <option>
                    {"교육 · 인증기관"}
                  </option>
                  <option>
                    {"회원 · 가입"}
                  </option>
                  <option>
                    {"결제 · 환불"}
                  </option>
                  <option>
                    {"제휴 · 협력"}
                  </option>
                  <option>
                    {"기타"}
                  </option>
                </select>
              </div>
              <div>
                <label>
                  {"성명 / 기관명"}
                </label>
                <input placeholder={"성명 또는 기관명"} />
              </div>
              <div>
                <label>
                  {"이메일"}
                </label>
                <input type={"email"} placeholder={"email@example.com"} />
              </div>
              <div>
                <label>
                  {"연락처"}
                </label>
                <input placeholder={"010-0000-0000"} />
              </div>
              <div>
                <label>
                  {"문의 내용"}
                </label>
                <textarea placeholder={"문의 내용을 입력해 주세요"}></textarea>
              </div>
              <div className={"agree"}>
                <label>
                  <input type={"checkbox"} />
                  <span>
                    {"개인정보 수집·이용(문의 응대 목적)에 동의합니다."}
                  </span>
                </label>
              </div>
              <button className={"b fill"} type={"button"} id={"sendInq"}>
                {"문의 보내기"}
              </button>
            </form>
            <div>
              <div className={"lbl"}>
                {"CONTACT"}
              </div>
              <h2 className={"h2"} style={{"fontSize": "22px", "marginBottom": "16px"}}>
                {"사무국 연락처"}
              </h2>
              <div className={"table-scroll"} role={"region"} aria-label={"표 내용"} tabIndex={0}>
                <table className={"ptable"}>
                  <tbody>
                    <tr>
                      <th style={{"width": "120px"}}>
                        {"이메일"}
                      </th>
                      <td>
                        {"kvcf26@gmail.com"}
                      </td>
                    </tr>
                    <tr>
                      <th>
                        {"대표전화"}
                      </th>
                      <td>
                        {"0507-1445-9964"}
                      </td>
                    </tr>
                    <tr>
                      <th>
                        {"운영시간"}
                      </th>
                      <td>
                        {"평일 09:00 ~ 18:00 (주말·공휴일 휴무)"}
                      </td>
                    </tr>
                    <tr>
                      <th>
                        {"주소"}
                      </th>
                      <td>
                        {"서울특별시 용산구 청파로 47길 100"}
                        <br />
                        {"숙명여자대학교 진리관 810호"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className={"card2"} style={{"marginTop": "16px"}}>
                <h3 style={{"fontSize": "15px"}}>
                  {"자동 회신 안내"}
                </h3>
                <p style={{"fontSize": "14px"}}>
                  {"문의가 접수되면 등록하신 이메일로 접수 확인 메일이 자동 발송됩니다. 답변은 운영시간 기준 영업일 2~3일 이내에 드립니다."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
