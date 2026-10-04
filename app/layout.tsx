import type { Metadata } from "next";
import Script from "next/script";
export const metadata: Metadata = {
  title: "한국바이브코딩협회 (KVCF)",
  description: "한국바이브코딩협회 공식 사이트. 바이브코딩 교육, 자격, 연구와 교류를 통해 누구나 만들고 함께 성장하는 미래를 만들어갑니다.",
  metadataBase: new URL("https://kvcf-public-preview.vercel.app"),
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "한국바이브코딩협회",
    title: "한국바이브코딩협회 (KVCF)",
    description: "누구나 만들고, 함께 성장하는 바이브코딩의 미래",
    url: "/",
    images: [{ url: "/assets/kvcf-share-card.png?v=1", width: 1200, height: 630, alt: "한국바이브코딩협회 로고와 슬로건" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "한국바이브코딩협회 (KVCF)",
    description: "누구나 만들고, 함께 성장하는 바이브코딩의 미래",
    images: ["/assets/kvcf-share-card.png?v=1"],
  },
};
export default function RootLayout({children}:{children:React.ReactNode}) {
 return <html lang="ko" suppressHydrationWarning><head>
        <link rel="icon" type="image/svg+xml" href="/assets/kvcf-symbol-favicon.svg?v=1" />
        <link rel="stylesheet" href="/legacy-base.css?v=10" />
        <link rel="stylesheet" href="/fonts/stable-fonts.css?v=22" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@28,400,0,0&icon_names=person_add,school,verified&display=block" />
        <link rel="stylesheet" href="/site-system.css?v=apply-mobile-9" />
        <link rel="stylesheet" href="/home-modern-v37.css?v=6" />
        <link rel="stylesheet" href="/hero-atmosphere.css?v=hero-only-4" />
        <link rel="stylesheet" href="/scroll-scene.css?v=48" />
        <link rel="stylesheet" href="/forge-card.css?v=79" />
        <link rel="stylesheet" href="/typography-preview-v2.css?v=1" />
        <link rel="stylesheet" href="/header-hero-preview-v3.css?v=1" />
        <link rel="stylesheet" href="/quick-access-preview-v4.css?v=1" />
        <link rel="stylesheet" href="/faq-divider-preview-v4.css?v=1" />
        <link rel="stylesheet" href="/hero-gradient-preview-v5.css?v=1" />
        <link rel="stylesheet" href="/hero-gradient-preview-v6.css?v=1" />
        <link rel="stylesheet" href="/hero-copy-logo-preview-v6.css?v=1" />
        <link rel="stylesheet" href="/mobile-header-now-preview-v7.css?v=4" />
        <link rel="stylesheet" href="/officers-preview-v8.css?v=1" />
        <link rel="stylesheet" href="/logo-transparent-preview-v9.css?v=1" />
        <link rel="stylesheet" href="/officers-layout-preview-v10.css?v=1" />
        <link rel="stylesheet" href="/mobile-auth-preview-v11.css?v=1" />
        <link rel="stylesheet" href="/hero-logo-alignment-preview-v12.css?v=1" />
        <link rel="stylesheet" href="/hero-colour-field-preview-v13.css?v=1" />
        <link rel="stylesheet" href="/hero-edge-colours-preview-v14.css?v=1" />
        <link rel="stylesheet" href="/utility-colour-preview-v15.css?v=1" />
        <link rel="stylesheet" href="/header-light-preview-v16.css?v=1" />
        <link rel="stylesheet" href="/hero-type-preview-v17.css?v=1" />
        <link rel="stylesheet" href="/globe-guides-preview-v18.css?v=1" />
        <link rel="stylesheet" href="/hero-refinements-preview-v19.css?v=1" />
        <link rel="stylesheet" href="/responsive-refinements-preview-v20.css?v=1" />
        <link rel="stylesheet" href="/home-readability-preview-v22.css?v=1" />
        <link rel="stylesheet" href="/hero-control-preview-v24.css?v=1" />
        <link rel="stylesheet" href="/membership-cta-preview-v38.css?v=1" />
        <link rel="stylesheet" href="/brand-login-preview-v39.css?v=1" />
        <link rel="stylesheet" href="/org-motion-preview-v40.css?v=46" />
        <link rel="stylesheet" href="/legacy-post.css" />
        <link rel="stylesheet" href="/member-ui-v129.css" />
  <Script src="/legacy-head.js" strategy="beforeInteractive" />
 </head><body className="site-modern home-modern" suppressHydrationWarning>{children}</body></html>;
}
