export default function FaqPage() {
  return (
    <div className="page" id="p-faq" hidden={true}>
      <div className={"pagehead"}>
        <div className={"w"}>
          <div className={"crumb"}>
            {"HOME / 고객지원 / 자주 묻는 질문"}
          </div>
          <h1>
            {"자주 묻는 질문"}
          </h1>
          <p>
            {"자격·교육·회원·결제 관련 문의를 모았습니다."}
          </p>
        </div>
      </div>
      <section className={"sec"}>
        <div className={"w"}>
          <div className={"faq-layout"}>
            <div className={"faq-grid"}>
              <div className={"faq-group"}>
                <div className={"faqcat"}>
                  {"자격 · 검정"}
                </div>
                <div className={"faq"}>
                  <details open={true}>
                    <summary>
                      {"지금 자격증을 발급받을 수 있나요?"}
                    </summary>
                    <p>
                      {"현재 민간자격 등록 절차가 진행 중입니다. 등록 완료 후 검정 접수와 발급이 개시되며, 그 전에는 사전 관심등록(waitlist)을 받습니다."}
                    </p>
                  </details>
                  <details>
                    <summary>
                      {"국가공인 자격인가요?"}
                    </summary>
                    <p>
                      {"아니요. 본 자격은 자격기본법에 따라 등록(예정)되는 민간자격이며, 국가공인 자격이 아닙니다. NCS 연계·국가공인은 협회의 목표이며 현 시점의 지위가 아닙니다."}
                    </p>
                  </details>
                  <details>
                    <summary>
                      {"비전공자도 응시할 수 있나요?"}
                    </summary>
                    <p>
                      {"네. VCA(3급·입문)는 응시자격 제한이 없습니다. 학생·직장인·소상공인 등 누구나 시작할 수 있도록 설계되었습니다."}
                    </p>
                  </details>
                  <details>
                    <summary>
                      {"실기는 어떻게 검정하나요?"}
                    </summary>
                    <p>
                      {"BlueForge 환경에서 실제 프로젝트를 수행하고, 산출물의 빌드·테스트·취약점 스캔 통과 여부와 실배포 결과로 채점합니다."}
                    </p>
                  </details>
                  <details>
                    <summary>
                      {"3급을 건너뛰고 2급에 바로 응시할 수 있나요?"}
                    </summary>
                    <p>
                      {"VCP(2급)는 3급 취득 또는 동등 역량을 응시자격으로 합니다. 동등 역량 인정 기준은 검정 시행공고에서 안내합니다."}
                    </p>
                  </details>
                </div>
              </div>
              <div className={"faq-group"}>
                <div className={"faqcat"}>
                  {"교육"}
                </div>
                <div className={"faq"}>
                  <details>
                    <summary>
                      {"교육을 반드시 이수해야 응시할 수 있나요?"}
                    </summary>
                    <p>
                      {"교육 이수는 권장 사항이며, 응시 자체를 제한하지 않습니다. 다만 검정은 실습 수행 중심이므로 표준 커리큘럼 이수를 권장합니다."}
                    </p>
                  </details>
                  <details>
                    <summary>
                      {"인증 교육기관으로 신청하려면?"}
                    </summary>
                    <p>
                      {"현재 1기 인증 교육기관을 모집하고 있습니다. [교육 > 교육기관 신청]에서 접수하실 수 있습니다."}
                    </p>
                  </details>
                  <details>
                    <summary>
                      {"강사가 되려면 어떻게 해야 하나요?"}
                    </summary>
                    <p>
                      {"VCE(1급) 취득 후 강의 시연 및 교안 심사를 거쳐 협회 인증 강사로 지정됩니다. 현재 1기 강사를 모집 중입니다."}
                    </p>
                  </details>
                </div>
              </div>
              <div className={"faq-group"}>
                <div className={"faqcat"}>
                  {"회원"}
                </div>
                <div className={"faq"}>
                  <details>
                    <summary>
                      {"회원 가입은 어떻게 하나요?"}
                    </summary>
                    <p>
                      {"[회원 > 회원 가입 신청]에서 신청서를 제출하시면 됩니다. 기업·교육기관 회원은 입회 심사를 거칩니다."}
                    </p>
                  </details>
                  <details>
                    <summary>
                      {"회비는 얼마인가요?"}
                    </summary>
                    <p>
                      {"입회비·연회비 금액은 이사회 의결 후 공고됩니다. 확정 시 회원 안내 페이지에 게시됩니다."}
                    </p>
                  </details>
                  <details>
                    <summary>
                      {"회원이 아니어도 응시할 수 있나요?"}
                    </summary>
                    <p>
                      {"네, 응시 자체는 회원 여부와 무관합니다. 다만 회원은 교육 할인 등 혜택을 받으실 수 있습니다."}
                    </p>
                  </details>
                </div>
              </div>
              <div className={"faq-group"}>
                <div className={"faqcat"}>
                  {"결제 · 환불"}
                </div>
                <div className={"faq"}>
                  <details>
                    <summary>
                      {"응시료 환불은 어떻게 되나요?"}
                    </summary>
                    <p>
                      {"자격기본법 시행령에 따른 환불 규정이 적용됩니다. 접수 마감 전 취소는 전액 환불이며, 세부 기준은 [검정 규정·환불]에서 확인하실 수 있습니다."}
                    </p>
                  </details>
                  <details>
                    <summary>
                      {"결제는 언제부터 가능한가요?"}
                    </summary>
                    <p>
                      {"민간자격 등록 완료 후 검정 접수와 함께 개방됩니다."}
                    </p>
                  </details>
                  <details>
                    <summary>
                      {"자격증을 분실했습니다."}
                    </summary>
                    <p>
                      {"재발급 신청이 가능합니다. 소정의 수수료가 발생하며 자격번호는 변경되지 않습니다."}
                    </p>
                  </details>
                </div>
              </div>
            </div>
            <div className={"acts"} style={{"marginTop": "24px"}}>
              <a className={"b line"} data-r={"inquiry"}>
                {"해결되지 않으셨나요? 1:1 문의하기"}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
