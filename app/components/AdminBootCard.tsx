"use client";

/**
 * 어드민 셸에서 인증 상태 확인 중일 때 잠깐 표시되는 카드.
 *
 * 흐름:
 *   1) 사용자가 `/#admin` 으로 들어옴.
 *   2) `useAdminAuth` 가 `window.auth` 폴링 시작 → authReady=false.
 *   3) admin 셸 안에서 AdminBootCard 가 잠깐 보임 (≈100~300ms).
 *   4) admin 으로 확인되면 Admin 콘솔, 아니면 AdminLoginCard 로 교체.
 *
 * 회원 사이트의 어떤 컴포넌트와도 공유하지 않으며, 어드민 셸 안에서만
 * 마운트됩니다.
 */
export default function AdminBootCard() {
  return (
    <div className="adm-login-shell">
      <div className="adm-login-card">
        <div className="adm-login-tag">{"RESTRICTED · ADMIN ONLY"}</div>
        <div className="adm-login-head">
          <img src="/assets/kvcf-logo-white.png" alt="" aria-hidden="true" />
          <div>
            <h1>{"관리자 콘솔 로그인"}</h1>
            <div className="sub">{"ADMIN CONSOLE · KVCF"}</div>
          </div>
        </div>
        <div className="adm-login-magic-msg">
          {"관리자 인증 상태를 확인하고 있습니다. 잠시만 기다려 주세요."}
        </div>
      </div>
    </div>
  );
}