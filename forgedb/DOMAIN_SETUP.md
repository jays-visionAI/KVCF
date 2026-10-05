# KVCF 도메인 연결 — 가비아 DNS 설정 절차

도메인: `kvcf.kr` (가비아 / `ns.gabia.co.kr`)
ForgeDB 호스팅 대상: `kvcf-jt1bd3.forgedb.app`

---

## 왜 `www.kvcf.kr` 로 연결하나요

`kvcf.kr` 은 **apex(루트) 도메인**입니다. DNS 표준상 apex 에는 CNAME 레코드를
만들 수 없습니다(RFC 1912 §2.3.1 — apex 는 반드시 A/AAAA 를 가져야 함).
가비아도 apex CNAME(별칭)을 제공하지 않습니다.

따라서 **CNAME 을 실제로 걸 수 있는 `www.kvcf.kr` 가 커스텀 도메인 경로**이며,
apex `kvcf.kr` 은 `www` 로 301 정규화하는 역할로 남깁니다.

> ForgeDB 엣지(`157.180.84.28`)는 TCP 연결이 정상적으로 성립하며
> `*.forgedb.app` 인증서만 서빙합니다. apex 를 A 레코드로 직접 연결해도
> apex 용 SSL 이 발급되기 전까지는 TLS 검증이 실패합니다.
> 즉 **SSL 이 발급된 `www` 경로가 유일하게 통과하는 경로**입니다.

---

## 1. 가비아에서 추가할 레코드

메뉴: **도메인 관리 → DNS 설정**

| 유형 | 이름 | 값 | TTL |
|---|---|---|---|
| **CNAME** | `www` | `kvcf-jt1bd3.forgedb.app` | 기본값 |
| **TXT** | `_forgedb-verify.www` | `61c7fe8ef95147b1bfe3b2556cc43cac` | 기본값 |

apex 소유권 검증(선택 — apex 를 리다이렉트로 쓸 경우):

| 유형 | 이름 | 값 | TTL |
|---|---|---|---|
| **TXT** | `_forgedb-verify` | `7447205a95528de6ef22b272d4c9ecec` | 기본값 |

### ⚠️ 기존 레코드 처리

- 기존 `www` → **A** 레코드(`121.254.178.253`)는 **삭제**해야 합니다.
  같은 이름에 A 와 CNAME 이 공존할 수 없어 DNS 오류가 납니다.
- 기존 `kvcf.kr` → **A** 레코드(`121.254.178.253`)는 **그대로 두세요.**
  apex 는 지금 기존 서비스가 응답 중이라 건드리면 즉시 끊깁니다.
  apex 는 어차피 CNAME 을 걸 수 없으므로 A 레코드가 남아 있어도 충돌하지 않습니다.

> 가비아 DNS 설정에서 이름 칸에는 **`.kr` 을 빼고** 넣습니다.
> `www` / `_forgedb-verify.www` / `_forgedb-verify` 만 입력합니다.

---

## 2. 전파 확인

```bash
dig +short CNAME www.kvcf.kr @1.1.1.1
dig +short TXT   _forgedb-verify.www.kvcf.kr @1.1.1.1
```

CNAME 이 `kvcf-jt1bd3.forgedb.app` 로, TXT 가 위 토큰으로 조회되면 전파 완료입니다.
가비아 NS 기준 전파는 보통 10분~수 시간, ForgeDB 검증은 최대 48시간 소요될 수 있습니다.

---

## 3. ForgeDB 소유권 검증

```bash
forgedb hosting domains verify www.kvcf.kr
```

성공 시 `Domain verified!` 가 출력되고 SSL 인증서가 자동 발급됩니다.
상태 확인:

```bash
forgedb hosting domains list
```

기대 출력:

```
www.kvcf.kr    DNS verified    SSL: active
```

---

## 4. apex 정규화

SSL 발급이 끝난 뒤 `public/.well-known/forge-hosting.json` 의 `redirects` 에
apex → www 301 규칙이 반영되어 apex 방문자가 www 로 안내됩니다
(이 규칙은 apex 로의 요청이 TLS 를 통과한 뒤에야 동작합니다).

apex 를 www 로 넘기는 더 확실한 방법은 가비아의 **URL 포워딩**(유료)을
`kvcf.kr` 에 거는 것입니다. 서버측 리다이렉트와 달리 apex CNAME 없이도
동작하며, apex A 레코드를 그대로 둔 채 http/https 만 받습니다.

---

## 5. 레포 상태 (이미 반영 완료)

| 파일 | 값 |
|---|---|
| `public/CNAME` | `kvcf.kr` |
| `public/robots.txt` | Sitemap `https://kvcf.kr/sitemap.xml` |
| `public/sitemap.xml` | 15개 URL 모두 `https://kvcf.kr` |
| `public/.well-known/forge-hosting.json` | `domain` / `NEXT_PUBLIC_SITE_DOMAIN` = `kvcf.kr` |
| `app/layout.tsx` | `metadataBase` = `https://kvcf.kr` |
| `.forgedb.json` | `projectSlug` = `kvcf-jt1bd3` |
| `.env.example` | `FORGE_HOST_SLUG` / `NEXT_PUBLIC_SITE_DOMAIN` 일치 |
