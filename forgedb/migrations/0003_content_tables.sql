-- ============================================================================
--  KVCF · ForgeDB 마이그레이션 0003 — 사이트 콘텐츠 테이블 + 시드
--  적용 도구: forgedb_sql 또는 콘솔 SQL Editor
--
--  목적:
--    admin 페이지에서 직접 수정할 수 있도록 사이트 콘텐츠를 DB화.
--    추가 테이블: site_hero(1행), site_banners, site_stats, officers, books
--    (notices / press / library_docs / certificates / exams / site_settings /
--     members / applications / issued_certificates / recruits 는 0001/0002에서
--     이미 만들어졌으므로 여기서는 시드만 보강)
--
--  RLS 정책:
--    - 모든 콘텐츠 테이블은 public (anon 포함) SELECT 허용
--    - INSERT / UPDATE / DELETE 는 is_admin() 만 허용
-- ============================================================================


-- ─── helpers (0001 에서 이미 생성됨 — 재정의 안전) ──────────────────────────
-- public.current_role() / public.is_admin() / public.is_member() 는 0001 에서
-- 만들어졌으므로 여기서는 별도 작업 없음.


-- ─── site_hero : 메인 히어로(슬로건) 1행 ────────────────────────────────────
create table if not exists public.site_hero (
  id            int          primary key default 1 check (id = 1),
  badge         text         not null default '',
  title         text         not null default '',
  description   text         not null default '',
  updated_by    uuid         references auth.users(id),
  updated_at    timestamptz  not null default now()
);

alter table public.site_hero enable row level security;

drop policy if exists site_hero_read_all on public.site_hero;
create policy site_hero_read_all on public.site_hero for select using (true);

drop policy if exists site_hero_admin_write on public.site_hero;
create policy site_hero_admin_write on public.site_hero
  for all using (public.is_admin()) with check (public.is_admin());

-- 시드 — 기존 메모리 SITE.hero 와 동일
insert into public.site_hero (id, badge, title, description) values (
  1,
  '민간자격 등록 진행 중 · 2026.06.09 출범',
  E'AI 강국을 넘어,\n<em>바이브코딩 강국 대한민국</em>을\n함께 만들어갑니다.',
  '한국바이브코딩협회(KVCF)는 인공지능(AI)과 대화하며 직관적이고 감성적으로 웹·앱 등 소프트웨어를 창작하는 ‘바이브 코딩’ 문화의 확산과 생태계 조성을 목표로 설립되었습니다. 초보자부터 전문가까지 누구나 자연어로 아이디어를 빠르게 구현할 수 있도록 교육·연구·네트워크를 제공합니다.'
) on conflict (id) do nothing;


-- ─── site_banners : 홈 우측 슬라이더 ───────────────────────────────────────
create table if not exists public.site_banners (
  id            uuid         primary key default gen_random_uuid(),
  tag           text         not null,
  title         text         not null,
  description   text         not null default '',
  route         text         not null default '',
  sort_order    int          not null default 0,
  active        boolean      not null default true,
  created_at    timestamptz  not null default now(),
  updated_at    timestamptz  not null default now()
);

alter table public.site_banners enable row level security;

drop policy if exists site_banners_read_all on public.site_banners;
create policy site_banners_read_all on public.site_banners for select using (true);

drop policy if exists site_banners_admin_write on public.site_banners;
create policy site_banners_admin_write on public.site_banners
  for all using (public.is_admin()) with check (public.is_admin());

insert into public.site_banners (tag, title, description, route, sort_order) values
  ('NOTICE', '말 한마디로 앱이 완성되는 곳!', '한국바이브코딩협회에서 코딩 없이 아이디어를 현실로', 'cert', 1),
  ('VISION', 'AI 시대, 코딩의 새로운 패러다임', '한국바이브코딩협회가 차세대 AI 융합 인재 양성에 앞장섭니다', 'about', 2),
  ('JOIN', '누구나 만드는 미래!', '지금 한국바이브코딩협회와 함께 바이브 코딩 생태계의 주인공이 되어보세요', 'join', 3),
  ('PRESS · 2026.06.29', '블루포지와 전략적 업무협약(MOU) 체결', '한국형 바이브코딩 생태계 구축 및 글로벌 진출 협력', 'press', 4);


-- ─── site_stats : 홈 중단 카운터 ────────────────────────────────────────────
create table if not exists public.site_stats (
  id            uuid         primary key default gen_random_uuid(),
  value         text         not null,
  label         text         not null,
  sort_order    int          not null default 0,
  created_at    timestamptz  not null default now(),
  updated_at    timestamptz  not null default now()
);

alter table public.site_stats enable row level security;

drop policy if exists site_stats_read_all on public.site_stats;
create policy site_stats_read_all on public.site_stats for select using (true);

drop policy if exists site_stats_admin_write on public.site_stats;
create policy site_stats_admin_write on public.site_stats
  for all using (public.is_admin()) with check (public.is_admin());

insert into public.site_stats (value, label, sort_order) values
  ('4',  '자격 종목',           1),
  ('4',  '분야별 심화 트랙',    2),
  ('42', '학습 모듈',           3),
  ('2026', '협회 출범',         4);


-- ─── officers : 임원 명단 (조직 안내 페이지) ────────────────────────────────
create table if not exists public.officers (
  id            uuid         primary key default gen_random_uuid(),
  name          text         not null,
  role          text         not null,
  affiliation   text         not null default '',
  photo_url     text,
  sort_order    int          not null default 0,
  active        boolean      not null default true,
  created_at    timestamptz  not null default now(),
  updated_at    timestamptz  not null default now()
);

alter table public.officers enable row level security;

drop policy if exists officers_read_all on public.officers;
create policy officers_read_all on public.officers for select using (true);

drop policy if exists officers_admin_write on public.officers;
create policy officers_admin_write on public.officers
  for all using (public.is_admin()) with check (public.is_admin());

insert into public.officers (name, role, affiliation, photo_url, sort_order) values
  ('정현교', '명예회장',           '서울대 명예교수 · 한국AI교육협회 명예회장',   'assets/officer-jung-hyungyo-v8.jpeg', 1),
  ('문형남', '회장',               '숙명여대 한류국제대학 학장/교수 · 지속가능과학회 회장', NULL, 2),
  ('양성길', '수석부회장',         '인싸이트컨설팅 대표',                          'assets/officer-yang-seonggil-v8.jpeg', 3),
  ('류성국', '부회장 · 정책기획',  'Roze AI 나스닥 컨설팅',                        'assets/officer-ryu-seongguk.jpeg',    4),
  ('오승종', '부회장 · 교육자격',  '(주)에듀오 대표이사',                           'assets/officer-oh-seungjong.jpeg',    5);


-- ─── books : 도서 목록 ──────────────────────────────────────────────────────
create table if not exists public.books (
  id            uuid         primary key default gen_random_uuid(),
  title         text         not null,
  cover_url     text,
  url           text         not null,
  sort_order    int          not null default 0,
  active        boolean      not null default true,
  created_at    timestamptz  not null default now(),
  updated_at    timestamptz  not null default now()
);

alter table public.books enable row level security;

drop policy if exists books_read_all on public.books;
create policy books_read_all on public.books for select using (true);

drop policy if exists books_admin_write on public.books;
create policy books_admin_write on public.books
  for all using (public.is_admin()) with check (public.is_admin());

insert into public.books (title, cover_url, url, sort_order) values
  ('AI와 바이브코딩',                       'https://file.newswire.co.kr/data/datafile2/thumb_640/2026/07/3422339248_20260727192946_5701006697.png', 'https://product.kyobobook.co.kr/detail/S000220615499', 1),
  ('AI의 신(神)이 알려주는 AI 브랜딩 비법', 'https://contents.kyobobook.co.kr/sih/fit-in/400x0/pdt/1400001170907.jpg?t=2984641',                    'https://product.kyobobook.co.kr/detail/S000220931839', 2),
  ('AI와 청색기술',                         'https://file.newswire.co.kr/data/datafile2/thumb_640/2026/05/3422339248_20260521234621_3243833847.png', 'https://www.aladin.co.kr/shop/wproduct.aspx?ItemId=391945538', 3),
  ('한류 5.0: K-브랜드 대박 시대',           'https://contents.kyobobook.co.kr/sih/fit-in/400x0/pdt/1400001170815.jpg?t=2984644',                    'https://product.kyobobook.co.kr/detail/S000220931370', 4),
  ('바이브코딩 실전 바이블',                 'https://contents.kyobobook.co.kr/sih/fit-in/400x0/pdt/1400001183570.jpg?t=2984645',                    'https://product.kyobobook.co.kr/detail/S000221049477', 5),
  ('AI와 바이브코딩 (큰글자책)',              'https://image.yes24.com/goods/194199805/XL',                                                       'https://www.yes24.com/product/goods/194199805', 6),
  ('AI와 청색기술 (큰글자책)',                'https://image.yes24.com/goods/188921334/XL',                                                       'https://www.yes24.com/product/goods/188921334', 7);


-- ─── issued_certificates ↔ members 연결 (정확성 강화) ─────────────────────
-- 기존 0001 의 issued_certificates 는 holder_name 만 가지고 있어 동명이인
-- 충돌 가능성이 있음. user_id 컬럼을 nullable 로 추가하여 실제 회원일 때
-- 연결되도록 함 (기존 시드 데이터에는 영향 없음).
alter table public.issued_certificates
  add column if not exists user_id uuid references auth.users(id);

-- 본인 인증 본인 확인 정책 보강 — user_id 매칭도 허용
drop policy if exists issued_self_read on public.issued_certificates;
create policy issued_self_read on public.issued_certificates
  for select using (
    public.is_admin()
    or user_id = auth.uid()
    or holder_name = (select raw_user_meta_data ->> 'name' from auth.users where id = auth.uid())
  );

create index if not exists issued_user_idx on public.issued_certificates (user_id);


-- ─── recruits 테이블 보강 (0001에 이미 있음) ─────────────────────────────────
-- 시드 데이터는 0002 에서 들어감 — 별도 작업 없음.