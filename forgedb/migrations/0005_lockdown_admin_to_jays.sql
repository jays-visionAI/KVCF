-- ============================================================================
--  KVCF · ForgeDB 마이그레이션 0005 — 어드민 권한 단일화 (jays 만)
--  적용 도구: forgedb_sql (allow_write=true) 또는 콘솔 SQL Editor
--
--  정책: 어드민은 단일 계정 [email protected] 만 가능.
--        raw_user_meta_data 의 role 키 변조로 어드민이 될 수 없도록
--        is_admin() 을 이메일 화이트리스트 단독으로 단순화.
--
--  ⚠️ 이 마이그레이션은 schema 를 변경합니다(함수 재정의).
--     기존 0001 의 is_admin 시그니처와 동일 (RETURNS boolean, STABLE).
-- ============================================================================


-- ─── 1) is_admin() 단순화: 이메일 화이트리스트 단독 ──────────────────────────
-- raw_user_meta_data->>'role' 검사를 제거.
-- → 누군가 어떤 계정의 role 을 'admin' 으로 바꾸어도 jays 만 true.
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
       and lower(email) = lower('[email protected]')
  );
$$;

-- 함수 실행 권한 명시 (anon / authenticated)
revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;


-- ─── 2) jays 메타데이터 보강 (표식 역할) ─────────────────────────────────────
-- is_admin() 자체는 이제 이메일만 보기 때문에 사실 필수가 아니지만,
-- 다른 코드에서 role 키를 참고할 가능성을 대비해 유지.
update auth.users
   set raw_user_meta_data = coalesce(raw_user_meta_data, '{}'::jsonb)
                            || jsonb_build_object('role','admin','name','운영자')
 where lower(email) = lower('[email protected]');


-- ─── 3) 검증 쿼리 (적용 후 결과 확인용) ─────────────────────────────────────
-- select email, raw_user_meta_data->>'role' as role
--   from auth.users
--  where raw_user_meta_data->>'role' is not null;
--
-- 기대 결과: jays@blueforge.space 만 role='admin'.
-- ============================================================================