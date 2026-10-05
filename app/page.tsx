import HomePage from "./pages/home";
import AboutPage from "./pages/about";
import GreetingPage from "./pages/greeting";
import BooksPage from "./pages/books";
import OrgPage from "./pages/org";
import HistoryPage from "./pages/history";
import ContactPage from "./pages/contact";
import CertPage from "./pages/cert";
import VcaPage from "./pages/vca";
import VcpPage from "./pages/vcp";
import VcePage from "./pages/vce";
import ConsultantPage from "./pages/consultant";
import SchedulePage from "./pages/schedule";
import RulesPage from "./pages/rules";
import EduPage from "./pages/edu";
import PartnersPage from "./pages/partners";
import ApplyPage from "./pages/apply";
import VerifyPage from "./pages/verify";
import MemberPage from "./pages/member";
import JoinPage from "./pages/join";
import SignupPage from "./pages/signup";
import CompaniesPage from "./pages/companies";
import NoticePage from "./pages/notice";
import RecruitPage from "./pages/recruit";
import NoticeviewPage from "./pages/noticeview";
import PressPage from "./pages/press";
import LibraryPage from "./pages/library";
import FaqPage from "./pages/faq";
import InquiryPage from "./pages/inquiry";
import TermsPage from "./pages/terms";
import PrivacyPage from "./pages/privacy";
import NoemailPage from "./pages/noemail";
import LoginPage from "./pages/login";
import DashboardPage from "./pages/dashboard";
import ProfilePage from "./pages/profile";
import AdminPage from "./pages/admin";
import ShellVisibilityBridge from "./components/ShellVisibilityBridge";
import SiteShellRoot from "./components/SiteShellRoot";
import LegacyRuntime from "./LegacyRuntime";
import { UtilityBar, SiteHeader, ApplicationModal, MembershipCTA, SiteFooter } from "./components/SiteChrome";
export default function Home() {
  return <>
    {/*
      회원 사이트 셸 — UtilityBar(상단 유틸), SiteHeader(메인 네비/로고/로그인 버튼),
      MembershipCTA, SiteFooter 를 모두 한 영역으로 묶어 #admin 라우트에서 한꺼번에 숨겨집니다.
      어드민 페이지(#admin) 진입 시 회원 사이트의 어떤 셸 요소도 화면에 남지 않습니다.
    */}
    <SiteShellRoot>
      <UtilityBar />
      <SiteHeader />
      <main>
          <HomePage />
          <AboutPage />
          <GreetingPage />
          <BooksPage />
          <OrgPage />
          <HistoryPage />
          <ContactPage />
          <CertPage />
          <VcaPage />
          <VcpPage />
          <VcePage />
          <ConsultantPage />
          <SchedulePage />
          <RulesPage />
          <EduPage />
          <PartnersPage />
          <ApplyPage />
          <VerifyPage />
          <MemberPage />
          <JoinPage />
          <SignupPage />
          <CompaniesPage />
          <NoticePage />
          <RecruitPage />
          <NoticeviewPage />
          <PressPage />
          <LibraryPage />
          <FaqPage />
          <InquiryPage />
          <TermsPage />
          <PrivacyPage />
          <NoemailPage />
          <LoginPage />
          <DashboardPage />
          <ProfilePage />
        <ApplicationModal /><MembershipCTA />
      </main>
      <SiteFooter />
    </SiteShellRoot>
    {/*
      어드민 사이트 셸 — 회원 사이트와 완전히 분리된 별개 셸.
      회원 사이트 셸은 #admin 진입 시 hidden 처리되며, 어드민 셸은 #admin 일 때만 표시됩니다.
      어드민 셸 안에는 회원 사이트의 어떤 컴포넌트(UtilityBar / SiteHeader / SiteFooter / MembershipCTA / AdminEditor / ApplicationModal)도 마운트되지 않습니다.
      초기 hidden 속성은 SSR HTML 에만 잠깐 적용되고, ShellVisibilityBridge 가 즉시 해시 라우트에 맞춰 재적용합니다.
    */}
    <div className="admin-shell" id="adminShell">
      <AdminPage />
    </div>
    <ShellVisibilityBridge />
    <LegacyRuntime />
  </>;
}
