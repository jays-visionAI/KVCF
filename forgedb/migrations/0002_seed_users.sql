-- ============================================================================
--  KVCF · ForgeDB 마이그레이션 0002 — 시드 사용자 + 시드 자격증
--  적용 도구: forgedb_sql 또는 콘솔 SQL Editor
--
--  ⚠️ Auth 사용자는 ForgeDB 콘솔의 Authentication → Users 탭에서 직접 생성해야
--   합니다 (이메일 + 비밀번호). 그 다음 아래 UPDATE 로 메타데이터에 role 을
--   붙이세요. 또는 콘솔에서 새 사용자를 만들 때 raw_user_meta_data 에
--   {"role":"admin","name":"운영자"} 를 직접 넣어주세요.
--
--   create auth.users 절차는 콘솔 UI 가 가장 안전합니다. (해시된 비밀번호는
--   콘솔이 생성해 저장합니다 — SQL 로는 만들 수 없습니다.)
-- ============================================================================

-- 1) 자격증 시드 — 진위 확인 / 예시 row
insert into public.issued_certificates (cert_code, cert_no, holder_name, holder_birth, issued_at, state)
select c.code, a.no, a.name, a.birth, current_date - 30, '유효'
from public.certificates c
cross join (values
  ('KVCF-VCA-2026-00001','홍길동','860101'),
  ('KVCF-VCP-2026-00001','Hong Gildong','860101'),
  ('KVCF-VCE-2026-00001','Hong G.Dong','860101')
) as a(no, name, birth)
where c.code in ('VCA','VCP','VCE')
on conflict (cert_no) do nothing;

-- 2) 공지사항 시드
insert into public.notices (category, title, body, author, pinned, published_at) values
('공지','[공지] 2026 상반기 자격 등록(예정) 안내',
 '협회 출범과 함께 VCA·VCP·VCE 자격 등록을 진행합니다. 자세한 일정과 절차는 자격검정 페이지를 확인하세요.',
 '사무국', true, now() - interval '14 day'),
('공지','[공지] 민간자격 등록 추진 현황',
 '협회는 「민간자격 등록管理办法」에 따라 자격등록을 추진 중이며, 등록 완료 시 사전등록 회원에게 우선 안내합니다.',
 '사무국', false, now() - interval '7 day'),
('모집','[모집] 2026 인증 교육기관 모집',
 'VCA·VCP 대비 과정을 운영할 인증 교육기관을 모집합니다. 접수 마감: 2026-09-30.',
 '교육자격국', false, now() - interval '3 day')
on conflict do nothing;

-- 3) 모집공고 시드
insert into public.recruits (title, org, period, state, body)
values
('2026 인증 교육기관 모집','협회 교육자격국','2026-07-01 ~ 2026-09-30','접수중',
 'VCA·VCP 대비 과정을 운영할 인증 교육기관을 모집합니다. 신청은 교육 → 교육기관 신청 페이지에서 접수하세요.'),
('임원 추가 공모(2026 하반기)','협회 사무국','2026-08-01 ~ 2026-08-31','예정',
 '회원사의 추천을 받아 이사회·자문위원회 임원을 추가 공모합니다.')
on conflict do nothing;


-- ─── 인증 이메일 (Account Confirmation) 설정 ───────────────────────────────
-- 회원가입 시 인증 메일이 자동 발송되도록 콘솔에서 활성화해야 합니다.
--
--   콘솔(https://forgedb.cloud) → KVCF 프로젝트 → Authentication → Providers
--     → Email → "Confirm email" = ON
--     → Secure mail 발신 호스트 = noreply@forgedb.cloud (기본 제공)
--
-- 운영 도메인 화이트리스트 (수신자 측 메일 서버에서):
--   * 발신 도메인: @forgedb.cloud
--   * SPF/DKIM: 콘솔의 Authentication → Domains 에서 확인 후 DNS 레코드 등록
--   * 사용자에게 안내할 도메인: noreply@forgedb.cloud
--
-- 인증 메일 미수신 시 사용자 안내 (#signup 페이지 hint):
--   1) 스팸함 확인
--   2) 메일함 용량 점검
--   3) 메일 서비스의 화이트리스트에 @forgedb.cloud 도메인 추가
--   4) 5분 정도 대기 후 재시도 (큐잉/재시도 큐는 콘솔 Authentication → Logs 에서 확인)
-- ───────────────────────────────────────────────────────────────────────────

-- ─── 인증 사용자 시드는 콘솔에서 ────────────────────────────────────────────
-- 1. 콘솔(https://forgedb.cloud) → 프로젝트 → Authentication → Users → "Add user"
--    두 명을 만든다:
--
--      email                 name           role  member_type  password
--      ───────────────────    ────────────   ──── ───────────  ─────────────────
--      [email protected]    데모회원        member individual   kvcf-demo-2026
--      [email protected]   운영자          admin  individual   kvcf-admin-2026
--
-- 2. 사용자 생성 직후 raw_user_meta_data 를 업데이트 한다 (이 한 줄을 두 사용자
--    각각에 한 번씩 실행):
--
--    update auth.users
--       set raw_user_meta_data = jsonb_build_object(
--             'role','admin',
--             'name','운영자',
--             'member_type','individual')
--     where email = '[email protected]';
--
--    update auth.users
--       set raw_user_meta_data = jsonb_build_object(
--             'role','member',
--             'name','데모회원',
--             'member_type','individual')
--     where email = '[email protected]';
--
-- 3. 이후 로그인한 사용자의 JWT 가 role 클레임을 갖고, is_admin() / is_member()
--    가 RLS 정책에 따라 true 를 반환한다. 시드 사용자가 members 행에 자동으로
--    생성되는 건 0001 에서 만든 handle_new_user 트리거 덕이다.