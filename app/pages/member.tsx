export default function MemberPage() {
  return (
    <div className="page" id="p-member" hidden={true}>
      <div className={"pagehead"}>
        <div className={"w"}>
          <div className={"crumb"}>
            {"HOME / 회원"}
          </div>
          <h1>
            {"회원 안내"}
          </h1>
          <p>
            {"협회 회원은 개인·기업(회원사)·교육기관·특별/명예 회원으로 구분됩니다."}
          </p>
        </div>
      </div>
      <section className={"sec"}>
        <div className={"w"}>
          <div className={"lbl"}>
            {"MEMBERSHIP"}
          </div>
          <h2 className={"h2"} style={{"marginBottom": "20px"}}>
            {"회원 구분 · 자격요건 · 혜택"}
          </h2>
          <div style={{"overflowX": "auto"}}>
            <div className={"table-scroll"} role={"region"} aria-label={"표 내용"} tabIndex={0}>
              <table className={"ptable"}>
                <thead>
                  <tr>
                    <th>
                      {"구분"}
                    </th>
                    <th>
                      {"개인 회원"}
                    </th>
                    <th>
                      {"기업 회원(회원사)"}
                    </th>
                    <th>
                      {"교육기관 회원"}
                    </th>
                    <th>
                      {"특별 · 명예"}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>
                      {"대상"}
                    </th>
                    <td>
                      {"개인 학습자·실무자"}
                    </td>
                    <td>
                      {"법인·기업·단체"}
                    </td>
                    <td>
                      {"인증 교육 운영기관"}
                    </td>
                    <td>
                      {"협회 발전 기여자"}
                    </td>
                  </tr>
                  <tr>
                    <th>
                      {"자격요건"}
                    </th>
                    <td>
                      {"만 14세 이상"}
                      <br />
                      {"(미성년자는 법정대리인 동의)"}
                    </td>
                    <td>
                      {"사업자등록 보유"}
                      <br />
                      {"입회 심사 통과"}
                    </td>
                    <td>
                      {"인증 교육기관 요건 충족"}
                    </td>
                    <td>
                      {"이사회 추천·회장 위촉"}
                    </td>
                  </tr>
                  <tr>
                    <th>
                      {"자격 사전등록"}
                    </th>
                    <td>
                      {"○"}
                    </td>
                    <td>
                      {"○ (단체)"}
                    </td>
                    <td>
                      {"○ (단체)"}
                    </td>
                    <td>
                      {"○"}
                    </td>
                  </tr>
                  <tr>
                    <th>
                      {"교육 혜택"}
                    </th>
                    <td>
                      {"회원 할인"}
                    </td>
                    <td>
                      {"단체 교육 설계"}
                    </td>
                    <td>
                      {"표준 커리큘럼 제공"}
                    </td>
                    <td>
                      {"—"}
                    </td>
                  </tr>
                  <tr>
                    <th>
                      {"BlueForge 크레딧"}
                    </th>
                    <td>
                      {"제공"}
                    </td>
                    <td>
                      {"단체 제공"}
                    </td>
                    <td>
                      {"교육용 제공"}
                    </td>
                    <td>
                      {"—"}
                    </td>
                  </tr>
                  <tr>
                    <th>
                      {"총회 의결권"}
                    </th>
                    <td>
                      {"정회원 ○"}
                    </td>
                    <td>
                      {"○"}
                    </td>
                    <td>
                      {"○"}
                    </td>
                    <td>
                      {"이사회 정함"}
                    </td>
                  </tr>
                  <tr>
                    <th>
                      {"입회비"}
                    </th>
                    <td className={"price"}>
                      {"[추후 공지]"}
                    </td>
                    <td className={"price"}>
                      {"[추후 공지]"}
                    </td>
                    <td className={"price"}>
                      {"[추후 공지]"}
                    </td>
                    <td className={"price"}>
                      {"면제"}
                    </td>
                  </tr>
                  <tr>
                    <th>
                      {"연회비"}
                    </th>
                    <td className={"price"}>
                      {"[추후 공지]"}
                    </td>
                    <td className={"price"}>
                      {"[추후 공지]"}
                    </td>
                    <td className={"price"}>
                      {"[추후 공지]"}
                    </td>
                    <td className={"price"}>
                      {"면제"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <p className={"note"}>
            {"※ 회비 금액은 이사회 의결 후 공고됩니다."}
          </p>
          <div className={"acts"} style={{"marginTop": "20px"}}>
            <a className={"b fill"} data-r={"join"}>
              {"회원 가입 신청"}
            </a>
            <a className={"b line"} data-r={"companies"}>
              {"회원사 소개"}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
