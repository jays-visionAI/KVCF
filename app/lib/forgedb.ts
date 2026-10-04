"use client";
import { createClient, type ForgeDBClient } from "@forgedb/client";

/**
 * ForgeDB 클라이언트 (browser singleton).
 *
 * - NEXT_PUBLIC_FORGEDB_URL: 콘솔 base URL (예: https://forgedb.cloud)
 * - NEXT_PUBLIC_FORGEDB_ANON_KEY: anon JWT
 * - NEXT_PUBLIC_FORGEDB_PROJECT_ID: 프로젝트 슬러그
 *
 * anon 키는 RLS 가 모든 권한을 통제하므로 클라이언트 노출이 안전합니다.
 * service_role 키는 서버 전용입니다 (이 코드 경로에는 등장하지 않음).
 */
const url = process.env.NEXT_PUBLIC_FORGEDB_URL ?? "";
const projectId = process.env.NEXT_PUBLIC_FORGEDB_PROJECT_ID ?? "";
const anonKey = process.env.NEXT_PUBLIC_FORGEDB_ANON_KEY ?? "";

let _client: ForgeDBClient | null = null;

export function client(): ForgeDBClient | null {
  if (_client) return _client;
  if (!url || !anonKey) return null;
  _client = createClient({ url, anonKey, projectId });
  return _client;
}

export function isForgeConfigured(): boolean {
  return Boolean(url && anonKey && projectId);
}


// ────────────────────────────────────────────────────────────────────────────
//  Site settings (조직 기본 정보 · 연락처)
// ────────────────────────────────────────────────────────────────────────────
export type SiteSettings = {
  company_name: string | null;
  ceo: string | null;
  brn: string | null;
  addr1: string | null;
  addr2: string | null;
  tel: string | null;
  email: string | null;
  hours: string | null;
  map_url: string | null;
  updated_at?: string | null;
};

export async function fetchSiteSettings(): Promise<SiteSettings | null> {
  const c = client();
  if (!c) return null;
  const { data, error } = await c
    .from("site_settings")
    .select("*")
    .eq("id", 1)
    .maybeSingle();
  if (error || !data) return null;
  return data as SiteSettings;
}

export function applyFooterOrg(s: SiteSettings | null) {
  if (!s) return;
  const c = document.getElementById("fvCompany");
  if (c && s.company_name) c.textContent = s.company_name;
  const b = document.getElementById("fvBrn");
  if (b && s.brn) b.textContent = "사업자등록번호: " + s.brn;
  const e = document.getElementById("fvCeo");
  if (e && s.ceo) e.textContent = s.ceo;
}

export function applyOrgForm(s: SiteSettings | null) {
  if (!s) return;
  const set = (id: string, val: string | null) => {
    const el = document.getElementById(id);
    if (el && val) (el as HTMLInputElement).value = val;
  };
  set("fCompany", s.company_name);
  set("fCeo", s.ceo);
  set("fBrn", s.brn);
  set("fAddr1", s.addr1);
  set("fAddr2", s.addr2);
  set("fTel", s.tel);
  set("fEmail", s.email);
  set("fHours", s.hours);
  set("fMapUrl", s.map_url);
}


// ────────────────────────────────────────────────────────────────────────────
//  Notices (공지사항)
// ────────────────────────────────────────────────────────────────────────────
export type Notice = {
  id: string;
  category: string;
  title: string;
  body: string | null;
  author: string | null;
  pinned: boolean | null;
  published_at: string;
  created_at: string;
};

export async function fetchNotices(limit = 20): Promise<Notice[] | null> {
  const c = client();
  if (!c) return null;
  const { data, error } = await c
    .from("notices")
    .select("*")
    .order("pinned", { ascending: false })
    .order("published_at", { ascending: false })
    .limit(limit);
  if (error || !data) return null;
  return data as Notice[];
}

export function renderHomeNotices(list: Notice[]) {
  const root = document.getElementById("bHomeNotice");
  if (!root || !list.length) return;
  root.innerHTML = list
    .slice(0, 3)
    .map(
      (n) =>
        '<a class="brow" href="#noticeview?post=' +
        encodeURIComponent(n.id) +
        '"><span class="tt">' +
        escHtml(n.title) +
        '</span><span class="d">' +
        escHtml((n.published_at || "").slice(5, 10)) +
        '</span></a>'
    )
    .join("");
}


// ────────────────────────────────────────────────────────────────────────────
//  Recruits (모집공고)
// ────────────────────────────────────────────────────────────────────────────
export type Recruit = {
  id: string;
  title: string;
  org: string | null;
  period: string | null;
  state: string | null;
  body: string | null;
  published_at: string;
  created_at: string;
};

export async function fetchRecruits(limit = 20): Promise<Recruit[] | null> {
  const c = client();
  if (!c) return null;
  const { data, error } = await c
    .from("recruits")
    .select("*")
    .order("published_at", { ascending: false })
    .limit(limit);
  if (error || !data) return null;
  return data as Recruit[];
}

export function renderHomeRecruits(list: Recruit[]) {
  const root = document.getElementById("bHomeRecruit");
  if (!root || !list.length) return;
  root.innerHTML = list
    .slice(0, 2)
    .map(
      (r) =>
        '<a class="brow" href="#recruit"><span class="tt">' +
        escHtml(r.title) +
        '</span><span class="d">' +
        escHtml((r.period || "").slice(5, 10)) +
        '</span></a>'
    )
    .join("");
}


// ────────────────────────────────────────────────────────────────────────────
//  Press (보도자료)
// ────────────────────────────────────────────────────────────────────────────
export type Press = {
  id: string;
  outlet: string;
  title: string;
  url: string | null;
  published_at: string;
};

export async function fetchPress(limit = 50): Promise<Press[] | null> {
  const c = client();
  if (!c) return null;
  const { data, error } = await c
    .from("press")
    .select("*")
    .order("published_at", { ascending: false })
    .limit(limit);
  if (error || !data) return null;
  return data as Press[];
}


// ────────────────────────────────────────────────────────────────────────────
//  Library (자료실)
// ────────────────────────────────────────────────────────────────────────────
export type LibraryDoc = {
  id: string;
  category: string;
  title: string;
  description: string | null;
  file_url: string | null;
  published_at: string;
};

export async function fetchLibrary(limit = 50): Promise<LibraryDoc[] | null> {
  const c = client();
  if (!c) return null;
  const { data, error } = await c
    .from("library_docs")
    .select("*")
    .order("published_at", { ascending: false })
    .limit(limit);
  if (error || !data) return null;
  return data as LibraryDoc[];
}


// ────────────────────────────────────────────────────────────────────────────
//  Certificates & Exams
// ────────────────────────────────────────────────────────────────────────────
export type Certificate = {
  id: string;
  code: string;
  grade: string;
  name: string;
  hours: number | null;
  exam_method: string | null;
  active: boolean | null;
  sort_order: number | null;
};

export async function fetchCertificates(): Promise<Certificate[] | null> {
  const c = client();
  if (!c) return null;
  const { data, error } = await c
    .from("certificates")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error || !data) return null;
  return data as Certificate[];
}

export type Exam = {
  id: string;
  cert_code: string;
  round_label: string;
  register_from: string | null;
  register_to: string | null;
  exam_date: string | null;
  state: string | null;
};

export async function fetchExams(): Promise<Exam[] | null> {
  const c = client();
  if (!c) return null;
  const { data, error } = await c
    .from("exams")
    .select("*")
    .order("exam_date", { ascending: true });
  if (error || !data) return null;
  return data as Exam[];
}


// ────────────────────────────────────────────────────────────────────────────
//  Applications (자격 신청 · 교육기관 신청 · 문의)
//  anon 도 insert 가능합니다 (회수 전 inquiry/institute/cert 신청 허용).
// ────────────────────────────────────────────────────────────────────────────
export type ApplicationKind = "cert" | "institute" | "inquiry";

export type ApplicationPayload = {
  applicant_name: string;
  applicant_email: string;
  applicant_phone?: string;
  data: Record<string, unknown>;
};

export async function submitApplication(
  kind: ApplicationKind,
  payload: ApplicationPayload
): Promise<{ ok: boolean; error?: string }> {
  const c = client();
  if (!c) return { ok: false, error: "ForgeDB 미설정" };
  const { error } = await c.from("applications").insert({
    kind,
    applicant_name: payload.applicant_name,
    applicant_email: payload.applicant_email,
    applicant_phone: payload.applicant_phone ?? null,
    payload: payload.data,
    state: "접수",
  });
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}


// ────────────────────────────────────────────────────────────────────────────
//  Join Application (협회회원가입) — 로그인한 회원 본인만 신청 가능
//  RLS 가 authenticated + applicant_id = auth.uid() + kind='join' 만 허용합니다.
//  (forgedb/migrations/0006_join_requires_login.sql 참고)
// ────────────────────────────────────────────────────────────────────────────
export type JoinPayload = {
  member_type: "individual" | "company" | "institute";
  id_or_brn?: string;
  affiliation?: string;
  title?: string;
  cert_interest: "VCA" | "VCP" | "VCE" | "CONSULT";
  agree_marketing?: boolean;
};

export async function submitJoinApplication(
  applicant: { id: string; email: string | null; name: string | null; phone: string | null },
  payload: JoinPayload
): Promise<{ ok: boolean; error?: string }> {
  const c = client();
  if (!c) return { ok: false, error: "ForgeDB 미설정" };
  if (!applicant.id) return { ok: false, error: "로그인이 필요합니다." };
  const { error } = await c.from("applications").insert({
    kind: "join",
    applicant_id: applicant.id,
    applicant_name: payload.member_type === "individual" ? applicant.name || "" : "",
    applicant_email: applicant.email || null,
    applicant_phone: applicant.phone || null,
    payload: payload as unknown as Record<string, unknown>,
    state: "접수",
  });
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}


// ────────────────────────────────────────────────────────────────────────────
//  Verify (자격 진위 확인) — SECURITY DEFINER RPC 사용
// ────────────────────────────────────────────────────────────────────────────
export type VerifyResult = {
  cert_no: string;
  cert_name: string;
  holder_name: string;
  issued_at: string;
  state: string;
};

export async function verifyCert(
  certNo: string,
  name: string,
  birth: string
): Promise<VerifyResult[] | null> {
  const c = client();
  if (!c) return null;
  const { data, error } = await c.rpc("verify_cert_number", {
    p_cert_no: certNo,
    p_name: name,
    p_birth: birth,
  });
  if (error || !data) return null;
  return data as VerifyResult[];
}


// ────────────────────────────────────────────────────────────────────────────
//  ADMIN CRUD — 콘텐츠·회원·신청 테이블 (RLS 가 admin 만 쓰기를 허용)
//  anon / authenticated 가 호출하면 RLS 가 거부합니다 — 반드시 admin 로그인
//  상태에서만 호출하세요. 실패해도 조용히 무시되도록 옵션.
// ────────────────────────────────────────────────────────────────────────────

// ─── site_hero (1행) ─────────────────────────────────────────────────────────
export type SiteHero = {
  badge: string | null;
  title: string | null;
  description: string | null;
};
export async function fetchSiteHero(): Promise<SiteHero | null> {
  const c = client();
  if (!c) return null;
  const { data, error } = await c.from("site_hero").select("*").eq("id", 1).maybeSingle();
  if (error || !data) return null;
  return data as SiteHero;
}
export async function updateSiteHero(
  patch: SiteHero
): Promise<{ ok: boolean; error?: string }> {
  const c = client();
  if (!c) return { ok: false, error: "ForgeDB 미설정" };
  const { error } = await c.from("site_hero").update({
    badge: patch.badge ?? "",
    title: patch.title ?? "",
    description: patch.description ?? "",
  }).eq("id", 1);
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}


// ─── site_banners ────────────────────────────────────────────────────────────
export type SiteBanner = {
  id: string;
  tag: string;
  title: string;
  description: string | null;
  route: string;
  sort_order: number | null;
  active: boolean | null;
};
export async function fetchSiteBanners(): Promise<SiteBanner[] | null> {
  const c = client();
  if (!c) return null;
  const { data, error } = await c.from("site_banners")
    .select("*").eq("active", true).order("sort_order", { ascending: true });
  if (error || !data) return null;
  return data as SiteBanner[];
}
export async function insertSiteBanner(
  row: Omit<SiteBanner, "id">
): Promise<{ ok: boolean; id?: string; error?: string }> {
  const c = client();
  if (!c) return { ok: false, error: "ForgeDB 미설정" };
  const { data, error } = await c.from("site_banners").insert(row).select("id").single();
  if (error) return { ok: false, error: error.message };
  return { ok: true, id: data?.id };
}
export async function updateSiteBanner(
  id: string,
  patch: Partial<Omit<SiteBanner, "id">>
): Promise<{ ok: boolean; error?: string }> {
  const c = client();
  if (!c) return { ok: false, error: "ForgeDB 미설정" };
  const { error } = await c.from("site_banners").update(patch).eq("id", id);
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}
export async function deleteSiteBanner(id: string): Promise<{ ok: boolean; error?: string }> {
  const c = client();
  if (!c) return { ok: false, error: "ForgeDB 미설정" };
  const { error } = await c.from("site_banners").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}


// ─── site_stats ──────────────────────────────────────────────────────────────
export type SiteStat = { id: string; value: string; label: string; sort_order: number | null };
export async function fetchSiteStats(): Promise<SiteStat[] | null> {
  const c = client();
  if (!c) return null;
  const { data, error } = await c.from("site_stats")
    .select("*").order("sort_order", { ascending: true });
  if (error || !data) return null;
  return data as SiteStat[];
}
export async function insertSiteStat(
  row: Omit<SiteStat, "id">
): Promise<{ ok: boolean; id?: string; error?: string }> {
  const c = client();
  if (!c) return { ok: false, error: "ForgeDB 미설정" };
  const { data, error } = await c.from("site_stats").insert(row).select("id").single();
  if (error) return { ok: false, error: error.message };
  return { ok: true, id: data?.id };
}
export async function updateSiteStat(
  id: string,
  patch: Partial<Omit<SiteStat, "id">>
): Promise<{ ok: boolean; error?: string }> {
  const c = client();
  if (!c) return { ok: false, error: "ForgeDB 미설정" };
  const { error } = await c.from("site_stats").update(patch).eq("id", id);
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}
export async function deleteSiteStat(id: string): Promise<{ ok: boolean; error?: string }> {
  const c = client();
  if (!c) return { ok: false, error: "ForgeDB 미설정" };
  const { error } = await c.from("site_stats").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}


// ─── officers (임원) ─────────────────────────────────────────────────────────
export type Officer = {
  id: string;
  name: string;
  role: string;
  affiliation: string | null;
  photo_url: string | null;
  sort_order: number | null;
  active: boolean | null;
};
export async function fetchOfficers(): Promise<Officer[] | null> {
  const c = client();
  if (!c) return null;
  const { data, error } = await c.from("officers")
    .select("*").order("sort_order", { ascending: true });
  if (error || !data) return null;
  return data as Officer[];
}
export async function insertOfficer(
  row: Omit<Officer, "id">
): Promise<{ ok: boolean; id?: string; error?: string }> {
  const c = client();
  if (!c) return { ok: false, error: "ForgeDB 미설정" };
  const { data, error } = await c.from("officers").insert(row).select("id").single();
  if (error) return { ok: false, error: error.message };
  return { ok: true, id: data?.id };
}
export async function updateOfficer(
  id: string,
  patch: Partial<Omit<Officer, "id">>
): Promise<{ ok: boolean; error?: string }> {
  const c = client();
  if (!c) return { ok: false, error: "ForgeDB 미설정" };
  const { error } = await c.from("officers").update(patch).eq("id", id);
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}
export async function deleteOfficer(id: string): Promise<{ ok: boolean; error?: string }> {
  const c = client();
  if (!c) return { ok: false, error: "ForgeDB 미설정" };
  const { error } = await c.from("officers").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}


// ─── books (도서) ────────────────────────────────────────────────────────────
export type Book = {
  id: string;
  title: string;
  cover_url: string | null;
  url: string;
  sort_order: number | null;
  active: boolean | null;
};
export async function fetchBooks(): Promise<Book[] | null> {
  const c = client();
  if (!c) return null;
  const { data, error } = await c.from("books")
    .select("*").order("sort_order", { ascending: true });
  if (error || !data) return null;
  return data as Book[];
}
export async function insertBook(
  row: Omit<Book, "id">
): Promise<{ ok: boolean; id?: string; error?: string }> {
  const c = client();
  if (!c) return { ok: false, error: "ForgeDB 미설정" };
  const { data, error } = await c.from("books").insert(row).select("id").single();
  if (error) return { ok: false, error: error.message };
  return { ok: true, id: data?.id };
}
export async function updateBook(
  id: string,
  patch: Partial<Omit<Book, "id">>
): Promise<{ ok: boolean; error?: string }> {
  const c = client();
  if (!c) return { ok: false, error: "ForgeDB 미설정" };
  const { error } = await c.from("books").update(patch).eq("id", id);
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}
export async function deleteBook(id: string): Promise<{ ok: boolean; error?: string }> {
  const c = client();
  if (!c) return { ok: false, error: "ForgeDB 미설정" };
  const { error } = await c.from("books").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}


// ─── notices admin CRUD ─────────────────────────────────────────────────────
export async function insertNotice(
  row: { category: string; title: string; body?: string; author?: string; pinned?: boolean }
): Promise<{ ok: boolean; id?: string; error?: string }> {
  const c = client();
  if (!c) return { ok: false, error: "ForgeDB 미설정" };
  const { data, error } = await c.from("notices").insert({
    category: row.category,
    title: row.title,
    body: row.body ?? null,
    author: row.author ?? "사무국",
    pinned: row.pinned ?? false,
  }).select("id").single();
  if (error) return { ok: false, error: error.message };
  return { ok: true, id: data?.id };
}
export async function updateNotice(
  id: string,
  patch: { category?: string; title?: string; body?: string; pinned?: boolean }
): Promise<{ ok: boolean; error?: string }> {
  const c = client();
  if (!c) return { ok: false, error: "ForgeDB 미설정" };
  const { error } = await c.from("notices").update(patch).eq("id", id);
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}
export async function deleteNotice(id: string): Promise<{ ok: boolean; error?: string }> {
  const c = client();
  if (!c) return { ok: false, error: "ForgeDB 미설정" };
  const { error } = await c.from("notices").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}


// ─── press admin CRUD ───────────────────────────────────────────────────────
export async function insertPress(
  row: { outlet: string; title: string; url?: string }
): Promise<{ ok: boolean; id?: string; error?: string }> {
  const c = client();
  if (!c) return { ok: false, error: "ForgeDB 미설정" };
  const { data, error } = await c.from("press").insert(row).select("id").single();
  if (error) return { ok: false, error: error.message };
  return { ok: true, id: data?.id };
}
export async function updatePress(
  id: string,
  patch: { outlet?: string; title?: string; url?: string }
): Promise<{ ok: boolean; error?: string }> {
  const c = client();
  if (!c) return { ok: false, error: "ForgeDB 미설정" };
  const { error } = await c.from("press").update(patch).eq("id", id);
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}
export async function deletePress(id: string): Promise<{ ok: boolean; error?: string }> {
  const c = client();
  if (!c) return { ok: false, error: "ForgeDB 미설정" };
  const { error } = await c.from("press").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}


// ─── library admin CRUD ─────────────────────────────────────────────────────
export async function insertLibrary(
  row: { category: string; title: string; description?: string; file_url?: string }
): Promise<{ ok: boolean; id?: string; error?: string }> {
  const c = client();
  if (!c) return { ok: false, error: "ForgeDB 미설정" };
  const { data, error } = await c.from("library_docs").insert(row).select("id").single();
  if (error) return { ok: false, error: error.message };
  return { ok: true, id: data?.id };
}
export async function updateLibrary(
  id: string,
  patch: { category?: string; title?: string; description?: string; file_url?: string }
): Promise<{ ok: boolean; error?: string }> {
  const c = client();
  if (!c) return { ok: false, error: "ForgeDB 미설정" };
  const { error } = await c.from("library_docs").update(patch).eq("id", id);
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}
export async function deleteLibrary(id: string): Promise<{ ok: boolean; error?: string }> {
  const c = client();
  if (!c) return { ok: false, error: "ForgeDB 미설정" };
  const { error } = await c.from("library_docs").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}


// ─── certificates admin CRUD ────────────────────────────────────────────────
export async function insertCertificate(
  row: { code: string; grade: string; name: string; hours?: number; exam_method?: string; sort_order?: number }
): Promise<{ ok: boolean; id?: string; error?: string }> {
  const c = client();
  if (!c) return { ok: false, error: "ForgeDB 미설정" };
  const { data, error } = await c.from("certificates").insert(row).select("id").single();
  if (error) return { ok: false, error: error.message };
  return { ok: true, id: data?.id };
}
export async function updateCertificate(
  id: string,
  patch: Partial<{ grade: string; name: string; hours: number; exam_method: string; sort_order: number; active: boolean }>
): Promise<{ ok: boolean; error?: string }> {
  const c = client();
  if (!c) return { ok: false, error: "ForgeDB 미설정" };
  const { error } = await c.from("certificates").update(patch).eq("id", id);
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}
export async function deleteCertificate(id: string): Promise<{ ok: boolean; error?: string }> {
  const c = client();
  if (!c) return { ok: false, error: "ForgeDB 미설정" };
  const { error } = await c.from("certificates").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}


// ─── exams admin CRUD ───────────────────────────────────────────────────────
export async function insertExam(
  row: { cert_code: string; round_label: string; register_from?: string; register_to?: string; exam_date?: string; state?: string }
): Promise<{ ok: boolean; id?: string; error?: string }> {
  const c = client();
  if (!c) return { ok: false, error: "ForgeDB 미설정" };
  const { data, error } = await c.from("exams").insert(row).select("id").single();
  if (error) return { ok: false, error: error.message };
  return { ok: true, id: data?.id };
}
export async function updateExam(
  id: string,
  patch: Partial<{ round_label: string; register_from: string; register_to: string; exam_date: string; state: string }>
): Promise<{ ok: boolean; error?: string }> {
  const c = client();
  if (!c) return { ok: false, error: "ForgeDB 미설정" };
  const { error } = await c.from("exams").update(patch).eq("id", id);
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}
export async function deleteExam(id: string): Promise<{ ok: boolean; error?: string }> {
  const c = client();
  if (!c) return { ok: false, error: "ForgeDB 미설정" };
  const { error } = await c.from("exams").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}


// ─── members admin CRUD ─────────────────────────────────────────────────────
export type MemberRow = {
  id: string;
  member_no: string | null;
  full_name: string;
  member_type: string;
  phone: string | null;
  org_name: string | null;
  title: string | null;
  state: string;
  joined_at: string;
  updated_at: string;
};
export async function fetchMembers(): Promise<MemberRow[] | null> {
  const c = client();
  if (!c) return null;
  const { data, error } = await c.from("members")
    .select("*").order("joined_at", { ascending: false });
  if (error || !data) return null;
  return data as MemberRow[];
}
export async function updateMemberState(
  id: string,
  state: "active" | "pending" | "suspended"
): Promise<{ ok: boolean; error?: string }> {
  const c = client();
  if (!c) return { ok: false, error: "ForgeDB 미설정" };
  const { error } = await c.from("members").update({ state }).eq("id", id);
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}


// ─── applications admin CRUD ────────────────────────────────────────────────
export type ApplicationRow = {
  id: string;
  kind: "cert" | "institute" | "inquiry";
  applicant_id: string | null;
  applicant_email: string | null;
  applicant_name: string | null;
  applicant_phone: string | null;
  payload: Record<string, unknown>;
  state: string;
  created_at: string;
};
export async function fetchApplications(kind?: "cert" | "institute" | "inquiry"): Promise<ApplicationRow[] | null> {
  const c = client();
  if (!c) return null;
  let q = c.from("applications").select("*").order("created_at", { ascending: false });
  if (kind) q = q.eq("kind", kind);
  const { data, error } = await q;
  if (error || !data) return null;
  return data as ApplicationRow[];
}
export async function updateApplicationState(
  id: string,
  state: string
): Promise<{ ok: boolean; error?: string }> {
  const c = client();
  if (!c) return { ok: false, error: "ForgeDB 미설정" };
  const { error } = await c.from("applications").update({ state }).eq("id", id);
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}
export async function deleteApplication(id: string): Promise<{ ok: boolean; error?: string }> {
  const c = client();
  if (!c) return { ok: false, error: "ForgeDB 미설정" };
  const { error } = await c.from("applications").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}


// ────────────────────────────────────────────────────────────────────────────
//  utils
// ────────────────────────────────────────────────────────────────────────────
function escHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}