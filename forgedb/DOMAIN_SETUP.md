# KVCF 도메인 연결 — 가비아 DNS 설정 절차

도메인: `kvcf.kr` (가비아 / `ns.gabia.co.kr`)
ForgeDB 호스팅 대상: `kvcf-jt1bd3.forgedb.app`
결정: **`kvcf.kr` (apex) 을 메인 도메인으로 사용**

---

## 왜 TXT 만 넣으면 되는가

`kvcf.kr` 은 **apex(루트) 도메인**입니다. DNS 표준상 apex 에는 CNAME 레코드를
만들 수 없습니다(RFC 1912 §2.3.1 — apex 는 반드시 A/AAAA 를 가져야 함).
가비아도 apex CNAME(별칭)을 제공하지 않습니다.

그래서 CNAME 으로 안 되고, **TXT 검증 레코드 하나만** 넣으면 소유권이
확인되고 apex 용 SSL 이 자동 발급됩니다. `kvcf.kr` 로의 접속은
`https://www.kvcf.kr` 처럼 **도메인 그대로** 들어옵니다.

> ForgeDB 엣지(`157.180.84.28`)는 TCP 연결이 정상적으로 성립하고
> `*.forgedb.app` 인증서만 서빙합니다. apex 용 SSL 이 발급되면
> `kvcf.kr` 요청도 그대로 통과합니다(리다이렉트 불필요).

---

## 1. 가비아에서 추가할 레코드 (이것만 넣으세요)

메뉴: **도메인 관리 → DNS 설정**

| 유형 | 이름 | 값 | TTL |
|---|---|---|---|
| **TXT** | `_forgedb-verify` | `7447205a95528de6ef22b272d4c9ecec` | 기본값 |

가비아 DNS 설정에서 이름 칸에는 **`.kr` 을 빼고** 넣습니다 → `_forgedb-verify`

### ⚠️ 기존 레코드는 건드리지 마세요

- `kvcf.kr` → **A** 레코드(`121.254.178.253`): **그대로 두세요.**
  지금 그 IP 에 기존 서비스가 응답 중이라 건드리면 즉시 끊깁니다.
  TXT 는 apex A 레코드와 공존하므로 충돌하지 않습니다.
- `www.kvcf.kr` → **A** 레코드(`121.254.178.253`): **그대로 두세요.**
  메인은 apex 이므로 www 는 사용하지 않습니다.

> CNAME 을 만들지 않으므로 **A 레코드를 삭제할 것이 없습니다.**
> 이 도메인에서 필요한 작업은 TXT 한 줄뿐입니다.

---

## 2. 전파 확인

```bash
dig +short TXT _forgedb-verify.kvcf.kr @1.1.1.1
```

위 토큰이 조회되면 전파 완료입니다. 가비아 NS 기준 전파는 보통
10분~수 시간이며, ForgeDB 검증은 최대 48시간 걸릴 수 있습니다.

---

## 3. ForgeDB 소유권 검증 + SSL 발급

```bash
forgedb hosting domains verify kvcf.kr
```

성공 시 `Domain verified!` 가 출력되고 SSL 인증서가 자동 발급됩니다.
상태 확인:

```bash
forgedb hosting domains list
```

기대 출력:

```
kvcf.kr    DNS verified    SSL: active
```

SSL 이 `active` 가 되면 `https://kvcf.kr` 로 바로 접속됩니다.

---

## 4. apex 정규화 (리다이렉트 불필요)

`public/.well-known/forge-hosting.json` 에 apex → www 301 규칙은
**넣지 않았습니다.** 메인이 apex 이므로 `kvcf.kr` 이 곧 최종 주소이고,
www 로 넘기면 방문자가 주소가 바뀌는 것을 보게 됩니다.

`www.kvcf.kr` 도 ForgeDB 에 등록해 두었으므로 나중에 www 주소를
둘 다 쓰고 싶다면 그대로 동작합니다.

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
