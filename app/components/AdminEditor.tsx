"use client";

/**
 * 어드민 공용 CRUD 편집기 (추가/수정 모달).
 *
 * 회원 사이트 셸에는 더 이상 마운트되지 않습니다 — 오직 어드민 셸 안
 * (`app/pages/admin.tsx`) 에서만 렌더됩니다. 따라서 회원 페이지 화면에
 * 관리자 전용 마크업이 DOM 으로 남는 일이 없습니다.
 *
 * 조작은 `public/legacy-app.js` 의 `openEditor()` / `closeEditor()` 가
 * id 로 직접 채웁니다 (#aEditor · #aeTitle · #aeFields · #aeSave).
 */
export default function AdminEditor() {
  return (
    <div className={"aeditor"} id={"aEditor"} hidden={true}>
      <div className={"box"}>
        <button className={"x"} id={"aeX"}>
          {"×"}
        </button>
        <h3 id={"aeTitle"}>
          {"편집"}
        </h3>
        <div className={"af"} id={"aeFields"}></div>
        <div className={"foot"}>
          <button className={"abtn"} id={"aeCancel"}>
            {"취소"}
          </button>
          <button className={"abtn pri"} id={"aeSave"}>
            {"저장"}
          </button>
        </div>
      </div>
    </div>
  );
}
