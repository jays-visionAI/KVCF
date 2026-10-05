# KVCF 도메인 연결 — 가비아 DNS 설정 절차

도메인: `kvcf.kr` (가비아 / `ns.gabia.co.kr`)
ForgeDB 호스팅 대상: `kvcf-jt1bd3.forgedb.app`
결정: **`www.kvcf.kr` 를 먼저 연결** — apex(`kvcf.kr`)는 CNAME 이 불가능

> 아래 값은 `forgedb hosting domains add` CLI 가 **방금(2026-10-05) 출력한 실값**입니다.
> 이전 세션의 토큰이 아니라 지금 필요한 값입니다. 추가/삭제 후 값이 바뀌면
> CLI 를 다시 실행해 항상 실값을 기준으로 작업하세요.

---

## apex 와 www 의 차이 — 실측 근거

**apex 에는 CNAME 을 만들 수 없습니다** (DNS 표준, RFC 1912 §2.3.1)
가비아도 apex 별칭(CNAME)을 제공하지 않습니다. 즉 ForgeDB 가 apex 에
요구하는 `CNAME kvcf.kr → kvcf-jt1bd3.forgedb.app` 은 **만들 수 없습니다.**

**apex 용 인증서는 아직 없습니다** (실측 — 2026-10-05)
엣지 `157.180.84.28` 에 SNI 별로 접속해 인증서를 조회한 결과:

| SNI | 서버가 내보내는 인증서 |
|---|---|
| `kvcf-jt1bd3.forgedb.app` | `CN=*.forgedb.app` |
| `kvcf.kr` | `CN=*.forgedb.app` |
| `www.kvcf.kr` | `CN=*.forgedb.app` |

SAN 이 `*.forgedb.app, forgedb.app` 뿐이라 지금은 `kvcf.kr` 로의 접속이
인증서 이름 불일치로 실패합니다(`curl: (60) SSL: no alternative
certificate subject name matches target host name 'kvcf.kr'`).

> **이건 "apex 는 불가능하다"는 뜻이 아닙니다.** 커스텀 도메인 인증서는
> DNS 검증이 통과한 뒤 발급되므로, apex 의 TXT 검증이 통과하면
> `kvcf.kr` 용 인증서가 발급됩니다. TCP/TLS 연결 자체는 정상 성립합니다.
> 이전 세션의 "연결 거부" 진단은 오진이었습니다(인증서 미발급 ≠ 연결 거부).

**그래서 순서대로만 하면 됩니다:** www 의 CNAME+TXT 를 넣고 검증·SSL 을
확보한 다음, apex TXT 를 넣고 같은 과정을 반복합니다. apex 쪽에서
A 레코드를 바꿀 필요는 없습니다.

---

## 1. 가비아에서 추가할 레코드 (이것만 넣으세요)

메뉴: **도메인 관리 → DNS 설정**

| 유형 | 이름 | 값 | TTL |
|---|---|---|---|
| **CNAME** | `www` | `kvcf-jt1bd3.forgedb.app` | 기본값 |
| **TXT** | `_forgedb-verify.www` | `61c7fe8ef95147b1bfe3b2556cc43cac` | 기본값 |

가비아 DNS 설정에서 이름 칸에는 **`.kr` 을 빼고** 넣습니다 → `www`, `_forgedb-verify.www`

### ⚠️ 기존 레코드 처리

- `www.kvcf.kr` → **A** 레코드(`121.254.178.253`): **삭제하세요.**
  같은 이름에 A 와 CNAME 이 공존할 수 없어 DNS 오류가 납니다.
- `kvcf.kr` → **A** 레코드(`121.254.178.253`): **그대로 두세요.**
  지금 그 IP 에 기존 서비스가 응답 중이라 건드리면 즉시 끊깁니다.
  www 작업과는 무관하므로 건드리지 않습니다.

### 2단계 (www 가 살아난 뒤)

apex 도 www 와 같은 방식으로 붙일 수 있습니다. apex 는 CNAME 이 불가능하므로
**TXT 하나만** 추가합니다(가비아 DNS 화면의 이름 칸에 `_forgedb-verify`):

| 유형 | 이름 | 값 |
|---|---|---|
| **TXT** | `_forgedb-verify` | `7447205a95528de6ef22b272d4c9ecec` |

TXT 는 apex A 레코드와 공존하므로 충돌하지 않습니다. 이 레코드가 들어가면
`forgedb hosting domains verify kvcf.kr` 로 apex 인증서도 발급됩니다.
**www 를 먼저 붙이는 이유는:** apex 는 CNAME 이 없어 www 보다 SSL 발급이
늦고, www 가 먼저 확보돼야 site 가 확실히 동작한다고 알 수 있기 때문입니다.

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

## 4. apex 정규화 — 아직 설정하지 않음

`public/.well-known/forge-hosting.json` 의 `redirects` 에는 현재
`/home → /`, `/index.html → /` 두 개만 있고 **apex → www 301 규칙은 없습니다.**
(커밋 `0a6bbd4` 에서 apex 를 메인으로 정하면서 제거됐습니다.)

넣어야 하는 시점은 **apex 에 SSL 이 발급된 뒤**입니다. apex 용 인증서가 없으면
TLS 검증 단계에서 요청이 끝나므로 301 리다이렉트까지 도달하지 않습니다.

어느 주소로 고정할지는 apex 검증 결과를 본 뒤 결정하면 됩니다:
- apex 검증 성공 → apex 를 메인으로 유지하고 리다이렉트 불필요 (권장)
- apex 검증 실패 → 위 리다이렉트를 추가하고 www 를 메인으로

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
