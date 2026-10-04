-- ============================================================================
--  KVCF · ForgeDB 마이그레이션 0006 — 협회회원가입(join) 은 로그인 필수
--
--  정책 변경:
--    * 기존 applications_anon_insert 는 cert / institute / inquiry 만 허용
--      (기존 가입 플로우 호환 — 자격등록·교육기관신청·문의는 익명도 가능)
--    * kind = 'join' 은 authenticated 사용자만 insert 가능 (auth.uid() 필수)
--    * select 도 본인 신청 건만 가능하도록 self_read 그대로 유지
--
--  적용 도구: forgedb_sql (이 파일을 직접 실행해도 무방)
-- ============================================================================

-- ─── 1) 기존 anon-insert 정책 교체 ──────────────────────────────────────────
-- kind 가 cert / institute / inquiry 일 때만 anon 허용. join 은 차단.
drop policy if exists applications_anon_insert on public.applications;
create policy applications_anon_insert on public.applications
  for insert with check (
    kind in ('cert', 'institute', 'inquiry')
  );

-- ─── 2) 인증 사용자 join 신청 정책 ──────────────────────────────────────────
-- authenticated 가 kind='join' 으로 insert 할 때만 통과. applicant_id 는
-- 반드시 자기 uid 와 일치해야 함 (타인 명의 가입 방지).
drop policy if exists applications_member_join_insert on public.applications;
create policy applications_member_join_insert on public.applications
  for insert to authenticated
  with check (
    kind = 'join'
    and auth.uid() is not null
    and applicant_id = auth.uid()
  );

-- ─── 3) kind 체크 제약 (선택) ──────────────────────────────────────────────
-- 잘못된 값 차단. 기존 데이터 보존 위해 NOT VALID 로 추가 → 별도 VALIDATE 단계.
alter table public.applications
  drop constraint if exists applications_kind_check;
alter table public.applications
  add constraint applications_kind_check
  check (kind in ('cert','institute','inquiry','join')) not valid;
-- 즉시 검증 (소량 데이터라 부담 없음)
alter table public.applications validate constraint applications_kind_check;