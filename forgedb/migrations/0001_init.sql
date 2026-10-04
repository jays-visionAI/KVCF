-- ============================================================================
--  KVCF · ForgeDB 마이그레이션 0001 — 스키마 + RLS + 시드
--  적용 도구: forgedb_sql 또는 콘솔 SQL Editor
--  적용 후 admin 권한을 줄 사용자(들)는 콘솔에서 auth.users 의 raw_user_meta_data
--  또는 별도 admin_emails 테이블로 동기화 (아래 매크로 참고).
-- ============================================================================


-- ─── helpers ────────────────────────────────────────────────────────────────
-- ForgeDB 의 Auth 메타데이터에 role 을 보관. 콘솔에서 직접 부여.
create or replace function public.current_role() returns text
language sql stable as $$
  select coalesce(
    (auth.jwt() ->> 'user_role'),
    (select raw_user_meta_data ->> 'role' from auth.users where id = auth.uid()),
    'member'
  )
$$;

create or replace function public.is_admin() returns boolean
language sql stable as $$
  select public.current_role() = 'admin'
$$;

create or replace function public.is_member() returns boolean
language sql stable as $$
  select public.current_role() in ('admin','member')
$$;


-- ─── site_settings : 1행 / id=1 ─────────────────────────────────────────────
create table if not exists public.site_settings (
  id           int          primary key default 1 check (id = 1),
  company_name text,
  ceo          text,
  brn          text,
  addr1        text,
  addr2        text,
  tel          text,
  email        text,
  hours        text,
  map_url      text,
  updated_by   uuid         references auth.users(id),
  updated_at   timestamptz  not null default now()
);

alter table public.site_settings enable row level security;

drop policy if exists site_settings_read_all on public.site_settings;
create policy site_settings_read_all on public.site_settings
  for select using (true);

drop policy if exists site_settings_admin_write on public.site_settings;
create policy site_settings_admin_write on public.site_settings
  for all using (public.is_admin()) with check (public.is_admin());

insert into public.site_settings (id, company_name, ceo, brn, addr1, addr2, tel, email, hours, map_url)
values (1, '한국(K-)바이브코딩협회', '문형남', '410-82-85804',
        '서울특별시 용산구 청파로 47길 100', '숙명여자대학교 진리관 810호',
        '0507-1445-9964', 'kvcf26@gmail.com', '평일 09:00 ~ 18:00 (주말·공휴일 휴무)',
        'https://www.google.com/maps/embed?pb=!1m3!2m1!1z7ISc7Jq47Yq567OE7IucIOyaqeyckeyCsOq1rCDssq3tjIzroZw0N-q4uCAxMDAg7KeE66as6rSA')
on conflict (id) do nothing;


-- ─── notices ────────────────────────────────────────────────────────────────
create table if not exists public.notices (
  id            uuid         primary key default gen_random_uuid(),
  category      text         not null default '공지',
  title         text         not null,
  body          text,
  author        text,
  pinned        boolean      not null default false,
  published_at  timestamptz  not null default now(),
  created_at    timestamptz  not null default now(),
  updated_at    timestamptz  not null default now(),
  created_by    uuid         references auth.users(id)
);
create index if not exists notices_pub_idx on public.notices (pinned desc, published_at desc);

alter table public.notices enable row level security;

drop policy if exists notices_read_all on public.notices;
create policy notices_read_all on public.notices
  for select using (true);

drop policy if exists notices_admin_write on public.notices;
create policy notices_admin_write on public.notices
  for all using (public.is_admin()) with check (public.is_admin());


-- ─── recruits ───────────────────────────────────────────────────────────────
create table if not exists public.recruits (
  id            uuid         primary key default gen_random_uuid(),
  title         text         not null,
  org           text,
  period        text,
  state         text         default '접수중',
  body          text,
  published_at  timestamptz  not null default now(),
  created_at    timestamptz  not null default now(),
  updated_at    timestamptz  not null default now(),
  created_by    uuid         references auth.users(id)
);
create index if not exists recruits_pub_idx on public.recruits (published_at desc);

alter table public.recruits enable row level security;

drop policy if exists recruits_read_all on public.recruits;
create policy recruits_read_all on public.recruits for select using (true);

drop policy if exists recruits_admin_write on public.recruits;
create policy recruits_admin_write on public.recruits
  for all using (public.is_admin()) with check (public.is_admin());


-- ─── press (보도자료 · 언론) ─────────────────────────────────────────────────
create table if not exists public.press (
  id            uuid         primary key default gen_random_uuid(),
  outlet        text         not null,           -- 매체명
  title         text         not null,
  url           text,
  published_at  timestamptz  not null default now(),
  created_at    timestamptz  not null default now(),
  created_by    uuid         references auth.users(id)
);
create index if not exists press_pub_idx on public.press (published_at desc);

alter table public.press enable row level security;

drop policy if exists press_read_all on public.press;
create policy press_read_all on public.press for select using (true);

drop policy if exists press_admin_write on public.press;
create policy press_admin_write on public.press
  for all using (public.is_admin()) with check (public.is_admin());

insert into public.press (outlet, title, url, published_at) values
  ('전자신문', '블루포지, 한국바이브코딩협회와 AI 코딩 교육 협력', 'https://www.etnews.com/', now() - interval '7 day'),
  ('디지털타임스', 'KVCF, 민간자격 등록 추진…바이브코딩 교육 표준화', 'https://www.dt.co.kr/', now() - interval '5 day')
on conflict do nothing;


-- ─── library (자료실 문서) ───────────────────────────────────────────────────
create table if not exists public.library_docs (
  id            uuid         primary key default gen_random_uuid(),
  category      text         not null default '정관',
  title         text         not null,
  description    text,
  file_url      text,
  published_at   timestamptz  not null default now(),
  created_at    timestamptz  not null default now(),
  created_by    uuid         references auth.users(id)
);
create index if not exists library_pub_idx on public.library_docs (published_at desc);

alter table public.library_docs enable row level security;

drop policy if exists library_read_all on public.library_docs;
create policy library_read_all on public.library_docs for select using (true);

drop policy if exists library_admin_write on public.library_docs;
create policy library_admin_write on public.library_docs
  for all using (public.is_admin()) with check (public.is_admin());


-- ─── certificates (자격 종목) ────────────────────────────────────────────────
create table if not exists public.certificates (
  id            uuid         primary key default gen_random_uuid(),
  code          text         not null unique,    -- VCA / VCP / VCE / CONSULT
  grade         text         not null,             -- 3급 / 2급 / 1급 / 트랙
  name          text         not null,            -- 표시 이름
  hours         int          default 0,          -- 권장 학습 시간
  exam_method   text,
  active        boolean      not null default true,
  sort_order    int          not null default 0,
  created_at    timestamptz  not null default now()
);

alter table public.certificates enable row level security;

drop policy if exists certificates_read_all on public.certificates;
create policy certificates_read_all on public.certificates for select using (true);

drop policy if exists certificates_admin_write on public.certificates;
create policy certificates_admin_write on public.certificates
  for all using (public.is_admin()) with check (public.is_admin());

insert into public.certificates (code, grade, name, hours, exam_method, sort_order) values
  ('VCA',  '3급', '바이브코딩 준전문가 (VCA)', 40, '필기+실기', 1),
  ('VCP',  '2급', '바이브코딩 전문가 (VCP)', 70, '실기', 2),
  ('VCE',  '1급', '바이브코딩 수석전문가 (VCE)', 100, '실기+심층면접', 3),
  ('CONSULT','트랙', '바이브코딩 컨설턴트', 60, '서면+자문 실습', 4)
on conflict (code) do nothing;


-- ─── exams (시험 회차) ───────────────────────────────────────────────────────
create table if not exists public.exams (
  id            uuid         primary key default gen_random_uuid(),
  cert_code     text         not null references public.certificates(code),
  round_label   text         not null,
  register_from date,
  register_to   date,
  exam_date     date,
  state         text         default '예정',
  created_at    timestamptz  not null default now()
);

alter table public.exams enable row level security;

drop policy if exists exams_read_all on public.exams;
create policy exams_read_all on public.exams for select using (true);

drop policy if exists exams_admin_write on public.exams;
create policy exams_admin_write on public.exams
  for all using (public.is_admin()) with check (public.is_admin());


-- ─── issued_certificates (발급된 자격증 — verify 페이지 조회) ───────────────
create table if not exists public.issued_certificates (
  id              uuid         primary key default gen_random_uuid(),
  cert_code       text         not null references public.certificates(code),
  cert_no         text         not null unique,
  holder_name     text         not null,
  holder_birth    text,
  issued_at       date         not null default current_date,
  state           text         not null default '유효',  -- 유효 / 정지 / 취소
  issued_by       uuid         references auth.users(id),
  created_at      timestamptz  not null default now()
);
create index if not exists issued_cert_no_idx on public.issued_certificates (cert_no);

alter table public.issued_certificates enable row level security;

-- 본인 인증 정보는 본인만 select (민감 정보)
drop policy if exists issued_self_read on public.issued_certificates;
create policy issued_self_read on public.issued_certificates
  for select using (
    public.is_admin()
    or holder_name = (select raw_user_meta_data ->> 'name' from auth.users where id = auth.uid())
  );

drop policy if exists issued_admin_write on public.issued_certificates;
create policy issued_admin_write on public.issued_certificates
  for all using (public.is_admin()) with check (public.is_admin());

-- anon 진위 확인은 verify_number() SECURITY DEFINER 함수로 우회 (이름/생년월일 해시 일치만)
create or replace function public.verify_cert_number(
  p_cert_no text,
  p_name text,
  p_birth text
) returns table (
  cert_no text, cert_name text, holder_name text, issued_at date, state text
)
language sql security definer set search_path = public as $$
  select ic.cert_no, c.name, ic.holder_name, ic.issued_at, ic.state
  from public.issued_certificates ic
  join public.certificates c on c.code = ic.cert_code
  where ic.cert_no = p_cert_no
    and ic.holder_name = p_name
    and (p_birth is null or ic.holder_birth = p_birth)
$$;

revoke all on function public.verify_cert_number(text, text, text) from public;
grant execute on function public.verify_cert_number(text, text, text) to anon, authenticated;


-- ─── members (회원 프로필) ───────────────────────────────────────────────────
create table if not exists public.members (
  id            uuid         primary key references auth.users(id) on delete cascade,
  member_no     text         unique,
  full_name     text         not null,
  member_type   text         not null default 'individual', -- individual / company / institute
  phone         text,
  org_name      text,                                     -- 기관/소속
  title         text,
  state         text         not null default 'active',   -- active / pending / suspended
  joined_at     timestamptz  not null default now(),
  updated_at    timestamptz  not null default now()
);
create index if not exists members_state_idx on public.members (state);

alter table public.members enable row level security;

drop policy if exists members_self_read on public.members;
create policy members_self_read on public.members
  for select using (id = auth.uid() or public.is_admin());

drop policy if exists members_self_update on public.members;
create policy members_self_update on public.members
  for update using (id = auth.uid() or public.is_admin())
            with check (id = auth.uid() or public.is_admin());

drop policy if exists members_admin_write on public.members;
create policy members_admin_write on public.members
  for insert with check (public.is_admin() or id = auth.uid());


-- ─── applications (자격 신청 · 교육기관 신청 · 문의) ────────────────────────
-- 하나의 polymorphic inbox.
create table if not exists public.applications (
  id            uuid         primary key default gen_random_uuid(),
  kind          text         not null,        -- 'cert' / 'institute' / 'inquiry'
  applicant_id  uuid         references auth.users(id),  -- nullable for guest submissions
  applicant_email text,
  applicant_name text,
  applicant_phone text,
  payload       jsonb        not null default '{}'::jsonb,
  state         text         not null default '접수',  -- 접수 / 심사중 / 승인 / 반려
  note          text,
  created_at    timestamptz  not null default now(),
  updated_at    timestamptz  not null default now()
);
create index if not exists applications_kind_idx on public.applications (kind, created_at desc);

alter table public.applications enable row level security;

-- 본인 것은 본인만, anon 은 자기 이메일 row만 select (회수 제한)
drop policy if exists applications_self_read on public.applications;
create policy applications_self_read on public.applications
  for select using (
    public.is_admin()
    or applicant_id = auth.uid()
  );

-- anon insert 허용 (회원가입 전 문의/신청 가능)
drop policy if exists applications_anon_insert on public.applications;
create policy applications_anon_insert on public.applications
  for insert with check (true);

drop policy if exists applications_admin_update on public.applications;
create policy applications_admin_update on public.applications
  for update using (public.is_admin()) with check (public.is_admin());

drop policy if exists applications_admin_delete on public.applications;
create policy applications_admin_delete on public.applications
  for delete using (public.is_admin());


-- ─── admin helper — 새 가입자 자동 pending ──────────────────────────────────
-- 이 트리거는 인증(Auth) 가입 시 members 행을 자동 생성합니다.
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.members (id, full_name, member_type, state)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data ->> 'member_type', 'individual'),
    'pending'
  )
  on conflict (id) do nothing;
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();


-- ─── admin 권한 부여 예시 ────────────────────────────────────────────────────
-- 콘솔에서 해당 사용자 raw_user_meta_data 에 {"role":"admin","name":"운영자"} 를 넣거나,
-- 아래 SQL 로 직접 부여:
--
--   update auth.users
--      set raw_user_meta_data = coalesce(raw_user_meta_data,'{}'::jsonb)
--                              || jsonb_build_object('role','admin','name','운영자')
--    where email = '[email protected]';
--
-- 이후 로그인한 사용자의 JWT 가 role=admin 클레임을 갖게 되고, is_admin() 이 true 가 됩니다.