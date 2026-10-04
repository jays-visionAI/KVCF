-- ============================================================================
--  KVCF · ForgeDB 마이그레이션 0007 — sangky94@gmail.com 단독 어드민 잠금
--  적용 도구: forgedb_sql (allow_write=true) 또는 콘솔 SQL Editor
--
--  정책: 어드민 화이트리스트를 sangky94@gmail.com 단독으로 좁힘.
--     jays@blueforge.space 의 admin 표식(role 메타데이터)은 박탈.
--     그 외 이메일은 여전히 false.
--
--  ⚠️ 이메일을 'local' || '@' || 'domain' 형태로 합성해서 쓰는 이유:
--     forgedb_sql 도구가 'sangky94@gmail.com' 같은 이메일 리터럴 내부의
--     '.' 을 placeholder 로 파싱하는 케이스가 있어 회피한다.
--     콘솔 SQL Editor 에서는 'sangky94@gmail.com' 으로 적어도 무방하다.
--
--  ⚠️ 이 마이그레이션은 schema 를 변경합니다(함수 재정의).
-- ============================================================================


-- ─── 1) is_admin() 화이트리스트 단일화: sangky94 만 ─────────────────────────
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
       and lower(email) = 'sangky94' || '@' || 'gmail.com'
  );
$$;

-- 함수 실행 권한 명시 (anon / authenticated)
revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;


-- ─── 2) sangky94 메타데이터 보강 + 이메일 인증 활성화 ───────────────────────
update auth.users
   set raw_user_meta_data = coalesce(raw_user_meta_data, '{}'::jsonb)
                            || jsonb_build_object('role','admin','name','운영자','member_type','individual'),
       email_verified = true
 where email like 'sangky94%@gmail.com';


-- ─── 3) jays 의 admin 표식 박탈 (메타데이터의 role 키 제거) ─────────────────
update auth.users
   set raw_user_meta_data = coalesce(raw_user_meta_data, '{}'::jsonb)
                            - 'role'
                            || jsonb_build_object('name','운영자')
 where email like 'jays%@blueforge.space';


-- ─── 4) members 표시명 정리 ────────────────────────────────────────────────
update public.members m
   set full_name = '운영자'
  from auth.users u
 where u.id = m.id
   and u.email like 'sangky94%@gmail.com';

update public.members m
   set full_name = '전임자'
  from auth.users u
 where u.id = m.id
   and u.email like 'jays%@blueforge.space';


-- ─── 5) 검증 쿼리 (적용 후 결과 확인용) ─────────────────────────────────────
-- select email, raw_user_meta_data->>'role' as role, email_verified
--   from auth.users
--  order by email;
--
-- 기대 결과:
--   sangky94@gmail.com    role=admin  verified=true
--   jays@blueforge.space  role=NULL   verified=true
-- ============================================================================