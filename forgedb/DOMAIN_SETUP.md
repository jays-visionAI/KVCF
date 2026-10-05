# KVCF 도메인 연결 — 가비아 DNS 설정 절차

도메인: `kvcf.kr` (가비아 / `ns.gabia.co.kr`)
ForgeDB 호스팅 대상: `kvcf-jt1bd3.forgedb.app`
결정: **`www.kvcf.kr` 를 연결 — apex(`kvcf.kr`)는 DNS 만으로는 불가능**

> 아래 값은 `forgedb hosting domains add` CLI 가 **방금(2026-10-05) 출력한 실값**입니다.
> 이전 세션의 토큰이 아니라 지금 필요한 값입니다. 추가/삭제 후 값이 바뀌면
> CLI 를 다시 실행해 항상 실값을 기준으로 작업하세요.

---

## 왜 www 로만 되는가 (apex 는 왜 안 되는가) — 실측 근거

두 가지가 **독립적으로** apex 를 막습니다.

**1. apex 에는 CNAME 을 만들 수 없습니다** (DNS 표준, RFC 1912 §2.3.1)
가비아도 apex 별칭(CNAME)을 제공하지 않습니다. 즉 ForgeDB 가 요구하는
`CNAME kvcf.kr → kvcf-jt1bd3.forgedb.app` 을 **만들 수 없습니다.**

**2. A 레코드로 우회해도 SSL 이 없습니다** (실측 — 2026-10-05)
엣지 `157.180.84.28` 에 SNI 별로 접속해 인증서를 조회한 결과:

| SNI | 서버가 내보내는 인증서 |
|---|---|
| `kvcf-jt1bd3.forgedb.app` | `CN=*.forgedb.app` |
| `kvcf.kr` | `CN=*.forgedb.app` |
| `www.kvcf.kr` | `CN=*.forgedb.app` |

SAN 은 `*.forgedb.app, forgedb.app` 뿐이고 **`kvcf.kr` 가 없습니다.**
커스텀 도메인 인증서는 DNS 검증이 통과한 뒤에야 발급되므로,
TXT 통과 → 인증서 발급 → 이 표가 `kvcf.kr` 로 바뀝니다. 즉 2번은
**TXT를 넣으면 스스로 해결되고**, 막는 건 1번(DNS 표준)뿐입니다.

> 이전 세션에서 "apex 는 연결 자체가 거부된다"고 적었으나 사실과 달랐습니다.
> TCP/TLS 연결은 정상 성립하며(`curl: (60) SSL: no alternative certificate
> subject name matches target host name 'kvcf.kr'`), **인증서가 아직 없어서**
> 실패하는 것입니다. 검증 실패 ≠ 연결 거부입니다.

---

## 1. 가비아에서 추가할 레코드 (이것만 넣으세요)

메뉴: **도메인 관리 → DNS 설정**

| 유형 | 이름 | 값 | TTL |
|---|---|---|---|
| **CNAME** | `www` | `kvcf-jt1bd3.forgedb.app` | 기본값 |
| **TXT** | `_forgedb-verify.www` | `61c7fe8ef95147b1bfe3b2556cc43cac` | 기본값 |

가비아 DNS 설정에서 이름 칸에는 **`.kr` 을 빼고** 넣습니다 → `www`, `_forgedb-verify.www`

### ⚠️ 기존 레코드는 건드리지 마세요

- `kvcf.kr` → **A** 레코드(`121.254.178.253`): **그대로 두세요.**
  지금 그 IP 에 기존 서비스가 응답 중이라 건드리면 즉시 끊깁니다.
- `www.kvcf.kr` → **A** 레코드(`121.254.178.253`): **삭제하세요.**
  같은 이름에 A 와 CNAME 이 공존할 수 없어 DNS 오류가 납니다.

> apex(`kvcf.kr`)를 www 로 넘기는 것은 DNS 가 아닌 **호스팅 계층**
> (`forge-hosting.json` 의 `redirects`)에서 처리됩니다. apex 에 SSL 이
> 있어야 동작하므로, www 가 먼저 살아나야 합니다. 그때는 가비아의
> URL 포워딩(유료) 또는 기존 웹서버의 301 리다이렉트를 쓰면 됩니다.

---

## 2. 전파 확인

```bash
dig +short CNAME www.kvcf.kr @1.1.1.1
dig +short TXT   _forgedb-verify.www.kvcf.kr @1.1.1.1
```

둘 다 위 값으로 조회되면 전파 완료입니다. 가비아 NS 기준 전파는 보통
10분~수 시간이며, ForgeDB 검증은 최대 48시간 걸릴 수 있습니다.

---

## 3. ForgeDB 소유권 검증 + SSL 발급

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

SSL 이 `active` 가 되면 `https://www.kvcf.kr` 로 바로 접속됩니다.

---

## 4. apex 정규화 (호스팅 계층 리다이렉트)

`public/.well-known/forge-hosting.json` 에 이미 apex → www 301 규칙이
들어 있습니다. 이 규칙은 **apex 에 SSL 이 발급된 뒤에야** 동작합니다.
www 가 먼저 `active` 가 되고 apex 도 검증이 통과하면 함께 살아납니다.

> apex 도 ForgeDB 에 등록해 두었으므로, apex 용 인증서가 발급되면
> `https://kvcf.kr` 자체로도 접속됩니다.

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
