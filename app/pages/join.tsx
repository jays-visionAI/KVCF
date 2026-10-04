"use client";

import { useEffect, useState } from "react";
import { submitJoinApplication } from "../lib/forgedb";

/**
 * 협회회원가입(/join)
 *
 * 보안 정책:
 *   - 미인증 사용자는 폼 대신 로그인 안내 화면이 보입니다.
 *     (legacy-app.js 의 GUARD 도 동일하게 미인증 시 /#login 으로 리다이렉트)
 *   - 신청 데이터는 ForgeDB applications(kind='join') 에 저장되며,
 *     DB RLS 가 authenticated 사용자 + 본인 uid 만 insert 가능하도록 강제합니다.
 *     (forgedb/migrations/0006_join_requires_login.sql)
 */
type LegacyAuth = {
  role?: string | null;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  userId?: string | null;
};

type MemberType = "individual" | "company" | "institute";
type CertInterest = "VCA" | "VCP" | "VCE" | "CONSULT";

const MEMBER_TYPE_LABEL: Record<MemberType, string> = {
  individual: "개인 회원",
  company: "기업 회원(회원사)",
  institute: "교육기관 회원",
};

const CERT_INTEREST_LABEL: Record<CertInterest, string> = {
  VCA: "VCA (3급·입문)",
  VCP: "VCP (2급·실무)",
  VCE: "VCE (1급·전문)",
  CONSULT: "바이브코딩컨설턴트",
};

export default function JoinPage() {
  const [authReady, setAuthReady] = useState(false);
  const [auth, setAuth] = useState<LegacyAuth | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);

  // legacy 의 글로벌 auth 객체를 폴링해서 가입 페이지에 반영합니다.
  // legacy 가 window.__kvcfAuth 같은 이벤트를 노출하지 않으므로 짧은 간격으로 동기화.
  useEffect(() => {
    const sync = () => {
      const w = window as Window & { auth?: LegacyAuth };
      const a = w.auth;
      if (a && a.role) {
        setAuth(a);
        setAuthReady(true);
      } else {
        setAuth(null);
        setAuthReady(true);
      }
    };
    sync();
    const id = window.setInterval(sync, 600);
    // join 페이지에 진입하면 한 번 더 즉시 동기화
    const onHash = () => sync();
    window.addEventListener("hashchange", onHash);
    return () => {
      window.clearInterval(id);
      window.removeEventListener("hashchange", onHash);
    };
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult(null);

    // 1) 클라이언트 측 인증 재확인 (RLS 만 믿지 않기 위해)
    const w = window as Window & {
      auth?: LegacyAuth;
      kvcfClient?: () => ReturnType<typeof import("../lib/forgedb").client> | null;
    };
    const a = w.auth;
    if (!a || !a.role || !a.userId) {
      setResult({ ok: false, message: "로그인이 필요합니다. 로그인 페이지로 이동합니다." });
      window.setTimeout(() => {
        const nav = window as Window & { setRoute?: (r: string) => void; show?: (r: string) => void };
        if (typeof nav.setRoute === "function") nav.setRoute("login");
        if (typeof nav.show === "function") nav.show("login");
        else window.location.hash = "login";
      });
      return;
    }

    const form = event.currentTarget;
    const data = new FormData(form);
    const memberType = (data.get("memberType") as MemberType) || "individual";
    const fullName = String(data.get("fullName") || "").trim();
    const idOrBrn = String(data.get("idOrBrn") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const affiliation = String(data.get("affiliation") || "").trim();
    const title = String(data.get("title") || "").trim();
    const certInterest = (data.get("certInterest") as CertInterest) || "VCA";
    const agreeTerms = data.get("agreeTerms") === "on";
    const agreePrivacy = data.get("agreePrivacy") === "on";
    const agreeMarketing = data.get("agreeMarketing") === "on";

    if (!fullName) {
      setResult({ ok: false, message: "성명 / 기관명을 입력해 주세요." });
      return;
    }
    if (!agreeTerms || !agreePrivacy) {
      setResult({ ok: false, message: "필수 동의 항목에 체크해 주세요." });
      return;
    }

    setSubmitting(true);
    try {
      const result = await submitJoinApplication(
        { id: a.userId, email: a.email || null, name: a.name || null, phone: a.phone || null },
        {
          member_type: memberType,
          id_or_brn: idOrBrn || undefined,
          affiliation: affiliation || undefined,
          title: title || undefined,
          cert_interest: certInterest,
          agree_marketing: agreeMarketing,
        }
      );
      if (!result.ok) {
        setResult({ ok: false, message: "신청 저장 실패: " + (result.error || "권한 또는 연결 오류") });
        return;
      }
      setResult({
        ok: true,
        message:
          memberType === "individual"
            ? "가입 신청이 접수되었습니다. 별도 심사 없이 회비 납부 확인 메일이 발송되면 가입이 완료됩니다."
            : "가입 신청이 접수되었습니다. 기업·교육기관 회원은 입회 심사 후 승인 메일이 발송됩니다.",
      });
      form.reset();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "알 수 없는 오류";
      setResult({ ok: false, message: "신청 중 오류: " + msg });
    } finally {
      setSubmitting(false);
    }
  };

  // ─── 인증 게이트 ────────────────────────────────────────────────────────
  // 로그인하지 않은 사용자에게는 폼 대신 안내 카드를 보여줍니다.
  // (legacy-app.js 의 GUARD 가 미인증 시 /#login 으로 보내지만,
  //  직접 진입·뒤로가기·JS 비활성 등 모든 경로에서 안전하도록 페이지 자체도 잠급니다.)
  if (!authReady) {
    return (
      <div className="page" id="p-join" hidden={true}>
        <div className={"pagehead"}>
          <div className={"w"}>
            <div className={"crumb"}>{"HOME / 회원 / 협회회원가입"}</div>
            <h1>{"협회회원가입"}</h1>
          </div>
        </div>
        <section className={"sec"}>
          <div className={"w"}>
            <p>{"로그인 상태를 확인하는 중입니다..."}</p>
          </div>
        </section>
      </div>
    );
  }

  if (!auth || !auth.role) {
    return (
      <div className="page" id="p-join" hidden={true}>
        <div className={"pagehead"}>
          <div className={"w"}>
            <div className={"crumb"}>{"HOME / 회원 / 협회회원가입"}</div>
            <h1>{"협회회원가입"}</h1>
            <p>
              {
                "협회회원가입은 회원께 한정된 절차입니다. 먼저 무료 계정을 생성하고 로그인한 뒤 아래 가입 신청을 이어 주세요."
              }
            </p>
          </div>
        </div>
        <section className={"sec"}>
          <div className={"w"}>
            <div
              className={"legalbox"}
              style={{"maxWidth": "640px", "margin": "0 auto", "padding": "32px"}}
            >
              <div className={"lbl"}>{"LOGIN REQUIRED"}</div>
              <h2 className={"h2"} style={{"fontSize": "22px", "marginBottom": "12px"}}>
                {"로그인한 회원만 가입 신청할 수 있습니다."}
              </h2>
              <p style={{"color": "var(--sub)", "lineHeight": "1.8"}}>
                {
                  "본인 확인과 가입 내역 추적을 위해 협회회원가입은 로그인한 사용자 본인만 신청할 수 있습니다. 아직 계정이 없으시면 먼저 무료 계정을 만들어 주세요."
                }
              </p>
              <div style={{"display": "flex", "gap": "10px", "marginTop": "20px", "flexWrap": "wrap"}}>
                <button
                  className={"b fill"}
                  type={"button"}
                  onClick={() => {
                    const nav = window as Window & { setRoute?: (r: string) => void; show?: (r: string) => void };
                    if (typeof nav.setRoute === "function") nav.setRoute("signup");
                    if (typeof nav.show === "function") nav.show("signup");
                    else window.location.hash = "signup";
                  }}
                >
                  {"계정생성 (무료)"}
                </button>
                <button
                  className={"b line"}
                  type={"button"}
                  onClick={() => {
                    const nav = window as Window & { setRoute?: (r: string) => void; show?: (r: string) => void };
                    if (typeof nav.setRoute === "function") nav.setRoute("login");
                    if (typeof nav.show === "function") nav.show("login");
                    else window.location.hash = "login";
                  }}
                >
                  {"로그인"}
                </button>
              </div>
              <div className={"warn"} style={{"marginTop": "16px"}}>
                {"※ 이미 회원 가입 절차를 마쳤다면 로그인 후 다시 이 페이지로 돌아와 주세요."}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // ─── 인증된 사용자에게는 원래의 가입 폼 ────────────────────────────────
  return (
    <div className="page" id="p-join" hidden={true}>
      <div className={"pagehead"}>
        <div className={"w"}>
          <div className={"crumb"}>
            {"HOME / 회원 / 협회회원가입"}
          </div>
          <h1>
            {"협회회원가입"}
          </h1>
          <p>
            {"개인·기업·교육기관 회원의 유료 가입 절차입니다. 계정생성(/#signup)과 별도이며, 심사(기업·교육기관) 및 회비 납부 확인 후 가입이 완료됩니다."}
          </p>
        </div>
      </div>
      <section className={"sec"}>
        <div className={"w"}>
          <div className={"g2"} style={{"gap": "44px", "alignItems": "start"}}>
            <form className={"form"} onSubmit={handleSubmit}>
              <div>
                <label>
                  {"회원 유형"}
                </label>
                <select name={"memberType"} defaultValue={"individual"}>
                  <option value={"individual"}>
                    {"개인 회원"}
                  </option>
                  <option value={"company"}>
                    {"기업 회원(회원사)"}
                  </option>
                  <option value={"institute"}>
                    {"교육기관 회원"}
                  </option>
                </select>
              </div>
              <div>
                <label>
                  {"성명 / 기관명"}
                </label>
                <input name={"fullName"} placeholder={"성명 또는 기관명"} defaultValue={auth.name || ""} required={true} />
              </div>
              <div>
                <label>
                  {"생년월일 / 사업자등록번호"}
                </label>
                <input name={"idOrBrn"} placeholder={"YYMMDD 또는 000-00-00000"} />
              </div>
              <div>
                <label>
                  {"연락처"}
                </label>
                <input name={"phone"} placeholder={"010-0000-0000"} defaultValue={auth.phone || ""} />
              </div>
              <div>
                <label>
                  {"소속 / 직위"}
                </label>
                <input name={"affiliation"} placeholder={"소속 / 직위"} />
              </div>
              <input type={"hidden"} name={"title"} defaultValue={""} />
              <div>
                <label>
                  {"관심 자격"}
                </label>
                <select name={"certInterest"} defaultValue={"VCA"}>
                  <option value={"VCA"}>
                    {"VCA (3급·입문)"}
                  </option>
                  <option value={"VCP"}>
                    {"VCP (2급·실무)"}
                  </option>
                  <option value={"VCE"}>
                    {"VCE (1급·전문)"}
                  </option>
                  <option value={"CONSULT"}>
                    {"바이브코딩컨설턴트"}
                  </option>
                </select>
              </div>
              <div className={"agree"}>
                <label>
                  <input type={"checkbox"} name={"agreeTerms"} required={true} />
                  <span>
                    <b>
                      {"[필수]"}
                    </b>
                    {" 협회 이용약관에 동의합니다."}
                  </span>
                </label>
                <label>
                  <input type={"checkbox"} name={"agreePrivacy"} required={true} />
                  <span>
                    <b>
                      {"[필수]"}
                    </b>
                    {" 개인정보 수집·이용에 동의합니다. (수집항목: 성명·연락처·소속 / 목적: 회원관리·자격 안내 / 보유: 탈퇴 시까지)"}
                  </span>
                </label>
                <label>
                  <input type={"checkbox"} name={"agreeMarketing"} />
                  <span>
                    <b>
                      {"[선택]"}
                    </b>
                    {" 협회 소식·교육 정보 수신에 동의합니다."}
                  </span>
                </label>
              </div>
              <button className={"b fill"} type={"submit"} disabled={submitting}>
                {submitting ? "신청 처리 중..." : "가입 신청"}
              </button>
              <div
                style={{
                  "fontSize": "14px",
                  "color": "var(--sub)",
                  "marginTop": "12px",
                }}
              >
                {"로그인 계정: "}
                <b>{auth.email || "(이메일 없음)"}</b>
                {" · 이름 "}
                  <b>{auth.name || "(미등록)"}</b>
              </div>
              {result ? (
                <div
                  role={"status"}
                  style={{
                    "marginTop": "12px",
                    "padding": "12px 14px",
                    "borderRadius": "10px",
                    "fontSize": "14px",
                    "lineHeight": "1.6",
                    "background": result.ok ? "#e8f5ee" : "#fdecea",
                    "color": result.ok ? "#186a3b" : "#922b21",
                    "border": "1px solid " + (result.ok ? "#a9d6b6" : "#f1b3ac"),
                  }}
                >
                  {result.message}
                </div>
              ) : null}
            </form>
            <div>
              <div className={"lbl"}>
                {"PROCESS"}
              </div>
              <h2 className={"h2"} style={{"fontSize": "22px", "marginBottom": "16px"}}>
                {"심사 절차 · 회비 납부"}
              </h2>
              <div className={"table-scroll"} role={"region"} aria-label={"표 내용"} tabIndex={0}>
                <table className={"ptable"}>
                  <tbody>
                    <tr>
                      <th style={{"width": "120px"}}>
                        {"절차"}
                      </th>
                      <td>
                        {"신청 접수 → (기업·교육기관) 입회 심사 → 승인 통보 → 회비 납부 → 가입 완료"}
                      </td>
                    </tr>
                    <tr>
                      <th>
                        {"개인 회원"}
                      </th>
                      <td>
                        {"별도 심사 없이 회비 납부 확인 시 가입 완료"}
                      </td>
                    </tr>
                    <tr>
                      <th>
                        {"회비 납부"}
                      </th>
                      <td>
                        {"계좌 정보는 승인 통보 이메일로 안내합니다."}
                        <br />
                        <span style={{"color": "var(--faint)"}}>
                          {"[예금주 / 은행 / 계좌번호 — 확정 후 표기]"}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        {"문의"}
                      </th>
                      <td>
                        {"kvcf26@gmail.com · 0507-1445-9964 (평일 09:00~18:00)"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className={"legalbox"} style={{"marginTop": "16px"}}>
                <div className={"r"}>
                  <span className={"k"}>
                    {"현재 상태"}
                  </span>
                  <span>
                    {"유료 가입 절차 별도 설계 중 (보류)"}
                  </span>
                </div>
                <div className={"warn"}>
                  {"※ 가입 신청서 접수는 받지만, 회비 납부·승인 흐름은 추후 공지 후 운영됩니다."}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}