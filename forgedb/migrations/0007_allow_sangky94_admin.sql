-- ============================================================================
--  KVCF · ForgeDB 마이그레이션 0007 — sangky94@gmail.com 어드민 추가
--  적용 도구: forgedb_sql (allow_write=true) 또는 콘솔 SQL Editor
--
--  정책: 어드민 화이트리스트를 [email protected] 외에 sangky94@gmail.com 까지 확장.
--     두 계정 모두 is_admin() = true 반환.
--     그 외 이메일은 여전히 false.
--
--  ⚠️ 이메일을 'local' || '@' || 'domain' 형태로 합성해서 쓰는 이유:
--     forgedb_sql 도구가 '[email protected]' 같은 이메일 리터럴 내부의
--     bracket 을 placeholder 로 파싱하는 케이스가 있어 회피한다.
--     콘솔 SQL Editor 에서는 '[email protected]', '[email protected]' 로
--     적어도 무방하다.
--
--  ⚠️ 이 마이그레이션은 schema 를 변경합니다(함수 재정의).
-- ============================================================================


-- ─── 1) is_admin() 화이트리스트 확장: jays + sangky94 ───────────────────────
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
       and (
         lower(email) = 'jays' || '@' || 'blueforge.space'
         or
         lower(email) = 'sangky94' || '@' || 'gmail.com'
       )
  );
$$;

-- 함수 실행 권한 명시 (anon / authenticated)
revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;


-- ─── 2) sangky94 메타데이터 보강 (role=admin 부착) ─────────────────────────
--     도구의 bracket 파싱 회피를 위해 LIKE 사용.
update auth.users
   set raw_user_meta_data = coalesce(raw_user_meta_data, '{}'::jsonb)
                            || jsonb_build_object('role','admin','name','운영자')
 where email like 'sangky94%@gmail.com';


-- ─── 3) 검증 쿼리 (적용 후 결과 확인용) ─────────────────────────────────────
-- select email, raw_user_meta_data->>'role' as role
--   from auth.users
--  where raw_user_meta_data->>'role' is not null;
--
-- 기대 결과:
--   sangky94@gmail.com    role=admin
--   jays@blueforge.space  role=admin
-- ============================================================================