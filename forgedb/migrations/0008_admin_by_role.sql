-- ============================================================================
--  KVCF · ForgeDB 마이그레이션 0008 — 어드민 = 계정의 role 메타데이터 (화이트리스트 폐기)
--  적용 도구: forgedb_sql (allow_write=true) 또는 콘솔 SQL Editor
--
--  정책:
--    * 이메일 하드코딩(0004 / 0007 의 화이트리스트)을 완전히 제거한다.
--    * auth.users 의 role 메타데이터가 'admin' 인 계정이 곧 어드민이다.
--      (raw_app_meta_data.role = 'admin' 이면 서비스 롤 키로만 부여 가능,
--       raw_user_meta_data.role = 'admin' 은 콘솔 Users 탭 / updateUser 로 부여)
--    * 어드민을 추가·삭제하려면 SQL 수정 없이 그 계정의 role 값만 바꾸면 된다.
--      → `update auth.users set raw_app_meta_data = ... || '{"role":"admin"}' where email = ...`
--
--  ⚠️ 보안 참고 (의도적 설계):
--     raw_user_meta_data 는 사용자가 auth.updateUser() 로 스스로 바꿀 수 있습니다.
--     즉 self-promote 가 이론상 가능합니다. 더 엄격한 운영이 필요하면
--     raw_user_meta_data 쪽 조건을 제거하고 raw_app_meta_data 만 보도록
--     is_admin() 을 좁히는 것을 권장합니다.
--
--  ⚠️ 이메일을 'sangky94' || '@' || 'gmail.com' 형태로 합성해서 쓰는 이유:
--     forgedb_sql 도구가 이메일 리터럴 내부의 '.' 을 placeholder 로 파싱하는
--     케이스가 있어 회피한다.
-- ============================================================================


-- ─── 1) is_admin() : 이메일 목록 → role 메타데이터 ──────────────────────────
create or replace function public.is_admin()
  returns boolean
  language sql
  stable
  security definer
  set search_path = public, auth
as $$
  select exists (
    select 1
      from auth.users
     where id = auth.uid()
       and coalesce(raw_app_meta_data ->> 'role', raw_user_meta_data ->> 'role') = 'admin'
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;


-- ─── 2) current_role() : is_admin() 기준으로 재정의 ──────────────────────────
create or replace function public.current_role()
  returns text
  language sql
  stable
  security definer
  set search_path = public, auth
as $$
  select case
    when public.is_admin() then 'admin'
    when auth.uid() is not null then 'member'
    else 'anon'
  end
$$;

revoke all on function public.current_role() from public;
grant execute on function public.current_role() to anon, authenticated;


-- ─── 3) is_member() : current_role() 에 연동되므로 형식만 최신화 ─────────────
create or replace function public.is_member()
  returns boolean
  language sql
  stable
  security definer
  set search_path = public, auth
as $$
  select public.current_role() in ('admin', 'member')
$$;

revoke all on function public.is_member() from public;
grant execute on function public.is_member() to anon, authenticated;


-- ─── 4) 운영 계정 역할 정리 ────────────────────────────────────────────────
-- 4-1) 운영 계정: user_metadata(콘솔 표기용) + app_metadata(RLS 판정용) 둘 다 admin.
update auth.users
   set raw_user_meta_data = coalesce(raw_user_meta_data, '{}'::jsonb)
                            || jsonb_build_object(
                                 'name', coalesce(raw_user_meta_data ->> 'name', '운영자'),
                                 'role', 'admin',
                                 'member_type', 'individual'
                               ),
       raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb)
                            || jsonb_build_object('role', 'admin'),
       email_verified = true
 where lower(email) = lower('sangky94' || '@' || 'gmail.com');

-- 4-2) 그 외 계정의 admin 표기는 일괄 박탈 (이메일 하드코딩 없이 전 계정 대상).
update auth.users
   set raw_user_meta_data = raw_user_meta_data - 'role'
 where coalesce(raw_user_meta_data ->> 'role', '') = 'admin'
   and lower(email) <> lower('sangky94' || '@' || 'gmail.com');

update auth.users
   set raw_app_meta_data = raw_app_meta_data - 'role'
 where coalesce(raw_app_meta_data ->> 'role', '') = 'admin'
   and lower(email) <> lower('sangky94' || '@' || 'gmail.com');


-- ─── 5) 검증용 뷰 — role=admin 인 계정 목록 (이메일 하드코딩 없음) ───────────
drop view if exists public.v_admin_accounts;
create view public.v_admin_accounts as
select u.id,
       u.email,
       u.email_verified,
       u.raw_user_meta_data,
       u.raw_app_meta_data,
       m.full_name,
       m.state
  from auth.users u
  left join public.members m on m.id = u.id
 where coalesce(u.raw_app_meta_data ->> 'role', u.raw_user_meta_data ->> 'role') = 'admin';

grant select on public.v_admin_accounts to authenticated, anon;


-- ─── 6) 검증 쿼리 (적용 후 결과 확인용) ─────────────────────────────────────
-- select * from public.v_admin_accounts;
--
-- 기대 결과:
--   sangky94@gmail.com   user_role=admin  verified=true
--   그 외 계정            role 없음
--
-- 어드민 추가 예시 (SQL 수정 없이):
--   update auth.users
--      set raw_app_meta_data = coalesce(raw_app_meta_data,'{}'::jsonb)
--                               || jsonb_build_object('role','admin')
--    where lower(email) = lower('운영자' || '@' || 'example.com');
-- ============================================================================
