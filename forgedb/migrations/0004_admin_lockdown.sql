-- ============================================================================
--  KVCF · ForgeDB 마이그레이션 0004 — 어드민 권한 단일 계정 잠금
--
--  정책: 어드민은 jays@blueforge.space 한 명만 허용한다.
--  화이트리스트(이메일)만 검사하므로 raw_user_meta_data->>'role' 키 조작
--  여부와 무관하게 동일하게 동작한다. (방어선 1: 함수 단순화)
--
--  적용 도구: forgedb_sql (이 파일을 직접 실행해도 무방)
-- ============================================================================


-- ─── 1) is_admin() 단순화: 이메일 화이트리스트 단독 검사 ────────────────────
-- raw_user_meta_data->>'role' 키에 의존하지 않고 이메일이 화이트리스트에
-- 포함되는지로만 판단한다. 누군가 role 키를 임의로 넣어도 통과 못 한다.
create or replace function public.is_admin() returns boolean
language sql stable as $$
  select exists (
    select 1 from auth.users
     where id = auth.uid()
       and lower(email) = lower('[email protected]')
  )
$$;

-- (보조 호환) current_role 도 동일 정책으로 — 다른 정책에서 직접 참조할 경우.
create or replace function public.current_role() returns text
language sql stable as $$
  select case
    when public.is_admin() then 'admin'
    when auth.uid() is not null then 'member'
    else 'anon'
  end
$$;


-- ─── 2) 다른 admin 후보들 권한 박탈 (idempotent) ──────────────────────────
-- admin@kvcf-portal.test: role 제거 + 이름 정리 (이미 적용된 경우 no-op)
update auth.users
   set raw_user_meta_data = coalesce(raw_user_meta_data, '{}'::jsonb)
                           - 'role'
                           - 'member_type'
                           || jsonb_build_object('name', '관리자(구 어드민)')
 where lower(email) = lower('admin@kvcf-portal.test')
   and lower(email) <> lower('[email protected]');

-- 만약을 위해 다른 이메일이 admin role 을 갖고 있다면 일괄 박탈
update auth.users
   set raw_user_meta_data = raw_user_meta_data - 'role'
 where lower(email) <> lower('[email protected]')
   and coalesce(raw_user_meta_data ->> 'role', '') = 'admin';


-- ─── 3) jays 메타데이터 안전망 — role:admin 표식 보존 ──────────────────────
-- 함수 자체는 이메일만 보기 때문에 role 키는 사실 필수가 아니지만,
-- 시드/외부 코드가 role 키를 직접 읽는 경우가 있어 안전하게 넣어 둔다.
update auth.users
   set raw_user_meta_data = coalesce(raw_user_meta_data, '{}'::jsonb)
                           || jsonb_build_object(
                                'name', 'jays',
                                'role', 'admin',
                                'member_type', 'individual'
                              )
 where lower(email) = lower('[email protected]')
   and coalesce(raw_user_meta_data ->> 'role', '') <> 'admin';


-- ─── 4) members 테이블 일관성 정리 ──────────────────────────────────────────
-- admin 외 사용자의 full_name 은 auth.users 메타데이터와 동기화.
update public.members m
   set full_name = coalesce(
         (select u.raw_user_meta_data ->> 'name' from auth.users u where u.id = m.id),
         m.full_name
       ),
       state = 'active'
 where m.id in (
   select u.id from auth.users u
    where lower(u.email) <> lower('[email protected]')
 );


-- ─── 5) 검증용 뷰 — 현재 admin 으로 인정되는 사용자 목록 ───────────────────
-- 어드민 콘솔에서 "누가 관리자인가" 를 한눈에 보기 위함.
-- auth.uid() 의존 없이 항상 화이트리스트 1 행을 반환하므로 anon 으로도
-- 점검 가능하다 (members 가 없어도 LEFT JOIN 으로 보이게).
create or replace view public.v_admin_accounts as
select u.id, u.email, u.raw_user_meta_data, m.full_name, m.state
  from auth.users u
  left join public.members m on m.id = u.id
 where lower(u.email) = lower('[email protected]');

grant select on public.v_admin_accounts to authenticated, anon;
