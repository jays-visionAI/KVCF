# KVCF 도메인 연결 — 가비아 DNS 설정 절차

도메인: `kvcf.kr` (가비아 / `ns.gabia.co.kr`)
ForgeDB 호스팅 대상: `kvcf-jt1bd3.forgedb.app`
**현재 활성화 주소: `https://www.kvcf.kr`** — 검증·SSL 발급 완료, 200 응답

> 실측 (DoH cloudflare-dns.com 기준, dig 는 애매한 응답을 줘 DoH 로 교차 확인):
>
> | 쿼리 | 결과 |
> |---|---|
> | `A www.kvcf.kr` | `kvcf-jt1bd3.forgedb.app.` / `157.180.84.28` ✅ |
> | `TXT _forgedb-verify.www.kvcf.kr` | `61c7fe8ef95147b1bfe3b2556cc43cac` ✅ |
> | `A kvcf.kr` (apex) | **빈 응답** ❌ |
> | `TXT _forgedb-verify.kvcf.kr` | **빈 응답** ❌ |
> | `curl https://www.kvcf.kr/` | `200` ✅ |
> | `curl https://kvcf.kr/` | `000` (Could not resolve host) ❌ |
>
> 즉 **apex 는 DNS 에서 사라진 상태**입니다. 가비아에 apex A 레코드가
> 하나도 남아있지 않으며(기존 `121.254.178.253` 포함), 그 IP 의 서비스도
> 더 이상 도메인에서 닿지 않습니다.

---

## 지금 상태 — 왜 `www` 가 메인인가

사이트는 `www.kvcf.kr` 에서 **정상 서비스 중**이고, apex `kvcf.kr` 는
DNS 레코드가 없어 아예 열리지 않습니다. SEO 표면(정적 export 산출물의
sitemap / robots / `metadataBase` canonical / OG `url`)은 전부
**실제로 응답하는 도메인**을 가리켜야 하므로, 현재 `www.kvcf.kr` 로 통일돼 있습니다.

apex 를 메인으로 전환하려면 아래 §3 절차를 완료한 뒤 §4 의 파일 5곳을
`kvcf.kr` 로 되돌리면 됩니다.

---

## 1. 현재 가비아 레코드 (완료 — 추가 작업 불필요)

| 유형 | 이름 | 값 | 상태 |
|---|---|---|---|
| **CNAME** | `www` | `kvcf-jt1bd3.forgedb.app` | ✅ 검증·SSL 발급 완료 |
| **TXT** | `_forgedb-verify.www` | `61c7fe8ef95147b1bfe3b2556cc43cac` | ✅ 통과 |

`https://www.kvcf.kr` 는 접속되며, HTTP(80) 은 HTTPS 로 301 됩니다.
Let's Encrypt 인증서 `CN=www.kvcf.kr` (만료 2027-01-03) 정상 발급.

---

## 2. apex 와 www 의 기술적 차이 (실측 근거)

**apex 에는 CNAME 을 만들 수 없습니다** (DNS 표준, RFC 1912 §2.3.1).
가비아도 apex 별칭(CNAME)을 제공하지 않습니다. 그래서 apex 는
엣지 IP 로 **A 레코드**를 직접 걸어야 합니다.

**apex 용 인증서는 아직 없습니다** (실측 — 2026-10-06)
엣지 `157.180.84.28` 에 SNI 별로 접속해 인증서를 조회한 결과:

| SNI | 서버가 내보내는 인증서 |
|---|---|
| `kvcf-jt1bd3.forgedb.app` | `CN=*.forgedb.app` |
| `www.kvcf.kr` | `CN=*.forgedb.app` |
| `kvcf.kr` | `CN=*.forgedb.app` |

에지 응답 테이블:

| Host 헤더 | 80 포트 | 443 포트 (`-k`) |
|---|---|---|
| `www.kvcf.kr` | `301 → https://www.kvcf.kr/about` | **`200`** |
| `kvcf-jt1bd3.forgedb.app` | — | **`200`** |
| `kvcf.kr` (apex) | `000` (응답 없음) | `000` (응답 없음) |

www 와 슬러그 주소는 정상 응답하는 반면 **apex 만 무응답**입니다.
원인은 apex 용 vhost 와 인증서가 아직 발급되지 않았기 때문이며,
A 레코드 추가 → `verify` 통과 → 인증서 발급이 완료되면 같은 IP 에서
apex 도 200 이 됩니다. (www 가 같은 IP(`157.180.84.28`) 에서 200 인 점이 이를 뒷받침합니다.)

---

## 3. apex 를 메인으로 전환하려면 (선택)

아래 값은 `forgedb hosting domains add kvcf.kr` CLI 가 **출력한 실값**입니다.
토큰이 필요하면 CLI 를 다시 실행해 항상 실값을 기준으로 작업하세요.

### 가비아에서 추가할 레코드 (2줄)

메뉴: **도메인 관리 → DNS 설정**

| 유형 | 이름 | 값 | 상태 |
|---|---|---|---|
| **A** | (비움 = apex) | `157.180.84.28` | ❗ 필수 — apex 가 엣지 IP 로 바로 붙습니다 |
| **TXT** | `_forgedb-verify` | `7447205a95528de6ef22b272d4c9ecec` | ❗ 필수 — 소유권 검증 |

가비아 이름 칸은 **빈칸(또는 `@`)** 이고, `_forgedb-verify` 는 `.kr` 을 빼고 입력합니다.
**`www` 의 CNAME·TXT 레코드는 절대 삭제하지 마세요.** apex 전환 후 www → apex
301 리다이렉트를 걸려면 www 가 DNS 에 남아있어야 합니다.

⚠️ **A 레코드가 꼭 있어야 합니다.** 이전 문서의 "TXT 한 줄이면 된다"는 설명은
틀렸습니다. 실측 결과:

```
A  레코드 없이 TXT 만 추가한 경우
  → dig A kvcf.kr          = (빈 응답)
  → https://kvcf.kr        = Could not resolve host   ← 사이트가 아예 안 열림
  → verify kvcf.kr         = DNS lookup failed
```

### 전파 확인

두 레코드가 **둘 다** 조회되어야 합니다:

```bash
dig +short A   kvcf.kr                   @1.1.1.1   # → 157.180.84.28
dig +short TXT _forgedb-verify.kvcf.kr   @1.1.1.1   # → 7447205a95528de6ef22b272d4c9ecec
```

A 레코드가 조회되면 사이트가 열립니다:

```bash
curl -I https://kvcf.kr    # → 200
```

가비아 NS 기준 전파는 보통 10분~수 시간이며, ForgeDB 검증은 최대 48시간 걸릴 수 있습니다.

### ForgeDB 소유권 검증 + SSL 발급

```bash
forgedb hosting domains verify kvcf.kr
forgedb hosting status
```

기대 출력:

```
kvcf.kr    DNS verified    SSL: active
```

---

## 4. apex 전환 시 되돌려야 할 파일 (5곳)

apex SSL 이 `active` 가 된 **다음에** 아래 파일을 `www.kvcf.kr` → `kvcf.kr` 로 바꾸고
재배포합니다. 그전에 바꾸면 SEO 표면이 또 죽은 도메인을 가리킵니다.

| 파일 | 항목 |
|---|---|
| `public/CNAME` | 파일 전체 |
| `public/robots.txt` | `Sitemap:` 줄 |
| `public/sitemap.xml` | 15개 `<loc>` 전부 |
| `public/.well-known/forge-hosting.json` | `domain` / `NEXT_PUBLIC_SITE_DOMAIN` |
| `app/layout.tsx` | `metadataBase` (6행) |
| `.env.example` | `NEXT_PUBLIC_SITE_DOMAIN` |

동시에 `forge-hosting.json` 의 `redirects` 에 www → apex 301 을 추가합니다:

```json
{ "from": "https://www.kvcf.kr/", "to": "https://kvcf.kr/" }
```

> apex 에 SSL 이 없어도 ForgeDB 엣지는 HTTP(80) 라서 301 을 처리하므로,
> apex 전환 완료 후 추가하는 것이 안전합니다.

---

## 4-1. clean path 자산 경로 (수정 완료)

`/about` 같은 clean path 로 진입하면 문서 기준 상대 경로(`assets/...`)가
`/about/assets/...` 로 해석되어 404 가 났습니다. 이 결함은 커밋 `d1cecb3` 에서
루트 절대 경로(`/assets/...`)로 전부 교체해 해결했습니다.
- `app/components/SiteChrome.tsx` (로고 2곳)
- `app/pages/home.tsx` (히어로 비디오 · 포스터)
- `app/pages/about.tsx`, `app/pages/history.tsx` (MOU 사진)
- `public/legacy-app.js` (임원 사진 4명), `public/forge-card.js` (iOS .mov)

CSS 의 `url("assets/...")` 은 **스타일시트 경로 기준**이라 정상 동작하므로
의도적으로 그대로 두었습니다. 신규 자산 추가 시 JS/TSX 는 절대 경로,
CSS 는 상대 경로를 쓰세요.

---

## 5. 레포 상태 (실측 반영 완료)

| 파일 | 값 |
|---|---|
| `public/CNAME` | `www.kvcf.kr` |
| `public/robots.txt` | Sitemap `https://www.kvcf.kr/sitemap.xml` |
| `public/sitemap.xml` | 15개 URL 모두 `https://www.kvcf.kr` |
| `public/.well-known/forge-hosting.json` | `domain` / `NEXT_PUBLIC_SITE_DOMAIN` = `www.kvcf.kr` |
| `app/layout.tsx` | `metadataBase` = `https://www.kvcf.kr` |
| `.forgedb.json` | `projectSlug` = `kvcf-jt1bd3` |
| `.env.example` | `FORGE_HOST_SLUG` / `NEXT_PUBLIC_SITE_DOMAIN` 일치 |