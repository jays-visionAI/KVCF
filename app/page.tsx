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
import LegacyRuntime from "./LegacyRuntime";
import { UtilityBar, SiteHeader, AdminEditor, ApplicationModal, MembershipCTA, SiteFooter } from "./components/SiteChrome";
export default function Home() {
  return <>
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
        <AdminPage />
      <AdminEditor />
    </main>
    <ApplicationModal /><MembershipCTA /><SiteFooter />
    <LegacyRuntime />
  </>;
}
