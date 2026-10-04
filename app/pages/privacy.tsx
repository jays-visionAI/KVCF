export default function PrivacyPage() {
  return (
    <div className="page" id="p-privacy" hidden={true}>
      <div className={"pagehead"}>
        <div className={"w"}>
          <div className={"crumb"}>
            {"HOME / 이용안내 / 개인정보처리방침"}
          </div>
          <h1>
            {"개인정보처리방침"}
          </h1>
        </div>
      </div>
      <section className={"sec"}>
        <div className={"w"}>
          <div className={"terms"} style={{"maxWidth": "860px"}}>
            <h3>
              {"1. 개인정보의 수집 목적"}
            </h3>
            <p>
              {"협회는 회원관리, 자격 검정·발급, 교육 운영, 고지·민원 처리를 위하여 개인정보를 수집·이용합니다."}
            </p>
            <h3>
              {"2. 수집 항목"}
            </h3>
            <p>
              {"성명, 생년월일, 연락처, 이메일, 소속, 결제·발급 정보 등 서비스 제공에 필요한 최소한의 항목"}
            </p>
            <h3>
              {"3. 보유 및 이용 기간"}
            </h3>
            <p>
              {"수집 목적의 범위에서 이용하며, 관계 법령에서 정한 기간 또는 회원 탈퇴·자격 관리 종료 시까지 보유한 후 지체 없이 파기합니다."}
            </p>
            <h3>
              {"4. 제3자 제공 및 처리위탁"}
            </h3>
            <p>
              {"법령에 근거하거나 정보주체의 동의가 있는 경우를 제외하고 개인정보를 제3자에게 제공하지 않습니다. 검정 플랫폼·결제 등 업무 처리를 위탁하는 경우 수탁자와 안전조치를 계약으로 정합니다."}
            </p>
            <h3>
              {"5. 정보주체의 권리"}
            </h3>
            <p>
              {"정보주체는 자신의 개인정보에 대한 열람·정정·삭제·처리정지를 요구할 수 있으며, 협회는 지체 없이 조치합니다."}
            </p>
            <h3>
              {"6. 안전성 확보 조치"}
            </h3>
            <p>
              {"협회는 접근통제, 암호화, 접속기록 보관 등 기술적·관리적 보호조치를 시행합니다."}
            </p>
            <h3>
              {"7. 개인정보 보호책임자"}
            </h3>
            <div className={"table-scroll"} role={"region"} aria-label={"표 내용"} tabIndex={0}>
              <table className={"ptable"} style={{"marginTop": "10px"}}>
                <tbody>
                  <tr>
                    <th style={{"width": "150px"}}>
                      {"성명 · 직함"}
                    </th>
                    <td>
                      {"[성명] · 사무국장"}
                    </td>
                  </tr>
                  <tr>
                    <th>
                      {"연락처"}
                    </th>
                    <td>
                      {"0507-1445-9964"}
                    </td>
                  </tr>
                  <tr>
                    <th>
                      {"이메일"}
                    </th>
                    <td>
                      {"kvcf26@gmail.com"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className={"note"} style={{"marginTop": "24px"}}>
              {"본 방침은 게시일부터 시행합니다. (최종본 등록 후 확정)"}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
