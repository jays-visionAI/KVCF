# KVCF (한국(K-)바이브코딩협회) 포털

공식 포털의 소스 코드 저장소입니다. **Next.js 16 (정적 export) + React 19** 기반이며,
데이터/인증은 **ForgeDB** (Supabase 호환 BaaS, https://forgedb.cloud) 로 연결됩니다.
호스팅은 **ForgeDB Static Hosting** 으로, 도메인은 `kvcf.kr` (가비아, apex) 으로 연결됩니다.
도메인 연결 절차는 **[`forgedb/DOMAIN_SETUP.md`](forgedb/DOMAIN_SETUP.md)** 를 보세요.

> 본 저장소는 **새 GitHub 리포**에서 시작하는 마이그레이션 결과물입니다. 정적 HTML 프로토타입
> (`../faq-two-column-preview/index-typography-v40.html`) 을 시각 기준으로 사용해 주세요.

---

## 1. 로컬 개발

```sh
# 1) 의존성 복구 (node_modules 가 비어 있을 때 반드시)
npm ci

# 2) 환경 변수 (최초 1회)
cp .env.example .env
# .env 를 열어서 FORGEDB_URL / FORGEDB_PROJECT_ID / FORGEDB_ANON_KEY / FORGEDB_SERVICE_ROLE_KEY 채우기
# 값은 ForgeDB 콘솔 (https://forgedb.cloud) → 프로젝트 → Settings → API 에서 복사

# 3) dev 서버 (해시 라우팅 SPA)
npm run dev -- -p 4193 -H 127.0.0.1
# → http://127.0.0.1:4193/#home

# 4) 정적 export 빌드 (호스팅 배포용)
npm run build
# → out/ 디렉터리에 배포 산출물
```

> ⚠️ **시크릿은 절대 커밋하지 마세요.** `.env` 는 `.gitignore` 로 보호되어 있습니다.
> 실수 방지를 위해 `.env.example` 만 깃에 들어 있고, **빈 값이면 dev 서버는 anon key 가 없어
> public SELECT 만 가능**합니다 (쓰기·관리자 로그인 안 됨).

---

## 2. 새 리포 → ForgeDB → 호스팅 → 도메인 (배포 4단계)

이 저장소를 새 GitHub 리포에 올린 뒤 다음 4단계만 거치면 됩니다.

### 2-1. 새 GitHub 리포에 푸시

```sh
git init
git add .
git commit -m "KVCF portal — Next 16 + ForgeDB initial"
git branch -M main
git remote add origin git@github.com:<your-org>/kvcf-portal.git
git push -u origin main
```

푸시하면 `.github/workflows/deploy.yml` 이 자동 실행되어 `out/` 정적 산출물을 빌드·아티팩트로 업로드합니다.
**이 단계는 빌드 검증 + CI 용도**이며, 실제 호스팅은 2-3 단계에서 진행됩니다.

### 2-2. GitHub Secrets 등록 (CI 빌드용, 선택)

저장소 → Settings → Secrets and variables → Actions 에 다음을 등록하면 CI 가
실제 키로 빌드 검증을 수행합니다. **모두 Public anon key** 만 등록해도 빌드는 통과합니다.

| Secret 이름 | 어디서 복사 |
| --- | --- |
| `FORGEDB_URL` | ForgeDB 콘솔 → Settings → API → Project URL |
| `FORGEDB_PROJECT_ID` | 콘솔 → Settings → General → Project ID |
| `FORGEDB_ANON_KEY` | 콘솔 → Settings → API → anon public key |
| `FORGEDB_SITE_ROLE_KEY` | 콘솔 → Settings → API → service_role key (CI 빌드 검증용, 일반 anon key 만으로도 충분) |

> ⚠️ `service_role` 은 RLS 를 우회하는 관리 키입니다. **클라이언트 번들에 절대 포함하지 마세요.**
> 본 저장소는 `service_role` 을 클라이언트에서 import 하지 않습니다 (`FORGEDB_SERVICE_ROLE_KEY` 미사용).

### 2-3. ForgeDB 콘솔에서 GitHub 연결 + 호스팅 시작

1. https://forgedb.cloud 로그인 → **KVCF 프로젝트** 선택.
2. 좌측 **Hosting** 탭 → **Connect to GitHub** → 위에서 만든 리포 선택.
3. 빌드 설정은 저장소 루트의 `public/.well-known/forge-hosting.json` 이 자동 인식됩니다.
   - Build command: `npm run build`
   - Output directory: `out`
   - Branch: `main`
   - Node version: `20`
4. **Deploy** 클릭. 첫 배포는 1~2 분, 이후 push 마다 자동 재배포.

배포가 끝나면 `https://kvcf-jt1bd3.forgedb.app` (호스트 슬러그 기반) 로 즉시 접속됩니다.

### 2-4. 커스텀 도메인 연결 — `kvcf.kr` (apex)

`kvcf.kr` 은 apex(루트) 도메인이라 DNS 표준상 CNAME 을 걸 수 없습니다.
그래서 **TXT 검증 레코드 한 줄**로 소유권을 확인하면 apex 용 SSL 이 자동 발급됩니다.

1. ForgeDB 호스팅에 도메인 등록:
   ```bash
   forgedb hosting domains add kvcf.kr
   ```
2. 가비아 **도메인 관리 → DNS 설정** 에 아래 한 줄만 추가합니다 (이것이 유일한 필수 작업):
   ```
   TXT    _forgedb-verify   →   7447205a95528de6ef22b272d4c9ecec
   ```
   - 이름 칸에는 `.kr` 을 빼고 `_forgedb-verify` 만 입력합니다.
   - **기존 A 레코드는 삭제하지 마세요.** TXT 는 apex A 레코드와 공존합니다.
3. 전파 후 소유권 검증 + 자동 SSL 발급:
   ```bash
   dig +short TXT _forgedb-verify.kvcf.kr @1.1.1.1
   forgedb hosting domains verify kvcf.kr
   ```
4. `https://kvcf.kr` 로 바로 접속됩니다. `www.kvcf.kr` 도 함께 등록해 두었습니다.

메인 주소가 apex 이므로 apex → www 리다이렉트는 걸지 않습니다
(`public/.well-known/forge-hosting.json`). 도메인 관련 값들은 이미 실제 값으로 반영돼 있습니다:

- `public/CNAME`, `public/.well-known/forge-hosting.json` (`domain` / `NEXT_PUBLIC_SITE_DOMAIN`)
- `public/robots.txt` · `public/sitemap.xml` (15개 URL)
- `app/layout.tsx` 의 `metadataBase`

---

## 3. ForgeDB 마이그레이션 SQL

`forgedb/migrations/` 에 세 개의 SQL 파일이 들어 있습니다. **반드시 순서대로** ForgeDB 콘솔의
SQL Editor 에서 실행하세요 (또는 `forgedb_sql` 도구로 자동 적용).

### 3-1. `0001_init.sql` — 스키마 + RLS

- `notices`, `recruits`, `press_releases`, `library_docs`, `certificates`, `issued_certificates`,
  `exams`, `members`, `applications`, `site_settings`, `books` 11 개 테이블.
- **anon SELECT 정책** (공개 데이터): notices / recruits / press / library / certificates /
  exams / site_settings / books 모두 RLS 통과.
- **쓰기는 모두 `is_admin()` 매크로로 보호** — 관리자만 INSERT/UPDATE/DELETE 가능.
- `is_admin()` 은 이메일 화이트리스트(`jays@blueforge.space`) 단독으로 검사 —
  메타데이터의 `role` 키 조작 무력화 (3-3 참고).

적용 후 결과 검증:

```sql
select tablename, rowsecurity from pg_tables where schemaname='public' order by 1;
-- 모든 테이블에 rowsecurity = true 여야 함

select policyname from pg_policies where schemaname='public' order by 1;
-- 최소 11 개 정책 (테이블당 1~2 개)
```

### 3-2. `0002_seed_users.sql` — 시드 데이터 + 인증 사용자 안내

- 자격증(홍길동 VCA/VCP/VCE), 공지 3 건, 모집공고 2 건 자동 시드.
- **인증 사용자는 콘솔에서 직접 생성**해야 합니다 (비밀번호 해시는 SQL 로 생성 불가).
  - 콘솔 → Authentication → Users → Add user
  - 1) `[email protected]` / `kvcf-admin-2026` (role=admin, name=운영자)
  - 2) `[email protected]` / `kvcf-demo-2026` (role=member, name=데모회원)
  - 각 사용자의 `raw_user_meta_data` 에 role/name/member_type JSON 추가
  - SQL Editor 에서 `0002_seed_users.sql` 하단의 `update auth.users set raw_user_meta_data = ...` 두 줄 실행

자세한 단계는 `0002_seed_users.sql` 의 주석에 들어 있습니다.

### 3-3. `0004_admin_lockdown.sql` — 어드민 단일 계정 잠금 (필수)

`jays@blueforge.space` **단 한 명만** admin 으로 인정되도록 잠그는 마이그레이션. **반드시 0001 적용 후 1회 실행** (idempotent — 재실행 안전).

- `is_admin()` 을 **이메일 화이트리스트 단독**으로 단순화 — 누군가 `raw_user_meta_data` 에 `role:admin` 을 넣어도 통과 못 한다.
- 다른 사용자의 `role:admin` 일괄 박탈 + `members.full_name` 동기화.
- 검증용 뷰 `public.v_admin_accounts` (admin 콘솔에서 조회).

```sql
-- 적용 후 jays 만 admin 으로 잡혀야 한다
select * from public.v_admin_accounts;
-- (1 row) jays@blueforge.space
```

---

## 4. 디렉터리 / 자산 맵

- `app/pages/`: **35 개** JSX 페이지 컴포넌트 (public / member / admin). React 로 직접 편집.
- `app/components/SiteChrome.tsx`: 공유 유틸 바, 헤더, 신청 모달, 멤버십 CTA, 푸터, 관리자 편집기 마크업.
- `app/page.tsx`: 공유 크롬 + 페이지 컴포넌트 마운트. **해시 라우팅** (`#home`, `#login` 등) 으로 페이지 hidden 토글.
- `app/layout.tsx`: 전역 스타일 + Kakao / Open Graph 메타.
- `app/LegacyRuntime.tsx`: 9 개 public 스크립트 순차 주입 + ForgeDB 사이트 설정 / 공지 / 모집 로드.
- `app/lib/forgedb.ts`: `@forgedb/client` (Supabase 호환) 싱글톤 + `applyFooterOrg` 헬퍼.
- `public/`: 누적된 프리뷰 CSS/JS (v3 ~ v40 버전 태그) + 호스팅 메타 (`CNAME`, `.well-known/forge-hosting.json`, `_redirects`).
- `public/assets/`: 페이지 미디어 (AE export `.webm`/`.mov`, 포스터, 임원 사진, MOU 사진 등).
- `forgedb/migrations/`: `0001_init.sql` (스키마 + RLS), `0002_seed_users.sql` (시드 + 사용자 안내), `0004_admin_lockdown.sql` (admin 단일 계정 잠금).

---

## 5. 운영 노트

- **dev 서버는 4193 포트 고정** — 다른 프로젝트와 충돌 피하려고. CI/호스팅과 무관.
- **Hydration mismatch** 는 `app/layout.tsx` 의 `<html suppressHydrationWarning>` 으로 1 차 차단.
  `legacy-head.js` 가 `<html>` 루트에 인라인 style 을 즉시 추가하기 때문이며, 본질적 fix 가 아닌
  알려진 warning suppress. (실제 렌더에는 영향 없음.)
- **관리자 폼의 조직 설정(법인명/대표/사업자번호)** 은 ForgeDB `site_settings` 테이블에 저장되며,
  모든 방문자가 같은 값을 봅니다. 푸터 (`SiteChrome.tsx`) 와 동기화는 `LegacyRuntime` 의
  `applyFooterOrg()` 가 담당.
- **시드 데모 폼** (apply / join / contact / recruit) 은 현재 메모리 기반. 실제 운영 전환 시
  `applications` / `members` / `inquiries` / `recruit_applications` 테이블에 INSERT 하는
  ForgeDB Edge Function 으로 교체 필요 (후속 마일스톤).
- **비밀번호 변경 후** `.env` 와 GitHub Secrets 양쪽 동기화 필수.
- **`service_role` 키는 절대 클라이언트 번들에 포함하지 마세요.** 본 저장소는
  `NEXT_PUBLIC_FORGEDB_SERVICE_ROLE_KEY` 같은 노출 변수를 두지 않습니다.

---

## 6. 알려진 제약 (현 단계)

- 해시 라우팅을 그대로 사용 중 (`/login` 같은 정적 경로가 아닌 `/#login`). 호스팅의
  `spa_fallback: "index.html"` + `clean_urls: true` 설정으로 새 정적 경로 추가 시 그대로 동작.
- 신청/회원/문의 폼은 데모용 — 실제 운영 데이터로 취급하지 마세요.
- `legacy-app.js` (한 줄 압축) 가 인증·관리자 핸들러를 들고 있어, 신규 코드는 가급적
  `app/` 트리에 React 컴포넌트 단위로 추가하고 `LegacyRuntime` 의 import 목록으로 주입하는 것을 권장.
- BlueForge 비주얼(글로브, 섹션 모션, 히어로 모션) 은 `public/*.js` 의 버전된 스크립트가
  그대로 재생합니다. AE 원본은 필요하지 않음.
