import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import ReduxProvider from "@/src/Provider/ReduxProvider";
import "aos/dist/aos.css";
import { Toaster } from "sonner";
import { GoogleTranslateScript } from "@/src/components/GoogleTranslateScript";

export const metadata: Metadata = {
  title: {
    default: "Auraboost - Affordable ELO & LoL Boosting | 24/7 Support",
    template: "%s | Auraboost",
  },
  // title: "Auraboost - Affordable ELO & LoL Boosting | 24/7 Support",
  description:
    "Upgrade your rank with elite ELO and LoL Boosting services designed for maximum security and total discretion. Experience top-tier performance, seamless service, and round-the-clock availability across every server.",
  keywords: [
    "ELO boosting",
    "LoL boosting",
    "League of Legends boost",
    "rank boosting",
    "game boosting",
    "Valorant boost",
    "affordable boosting",
    "fast ELO boost",
    "secure rank boost",
    "24/7 boosting service",
    "Auraboost",
    "Auraboost ELO boost",
    "Auraboost LoL boost",
    "Auraboost rank boost",
    "Auraboost game boost",
    "Auraboost Valorant boost",
    "auraboost gg",
  ],
  authors: [{ name: "Auraboost Team" }],
  creator: "Auraboost Team",
  publisher: "GWD Processing FZCO",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.auraboost.gg"),
  openGraph: {
    title: "Auraboost - Affordable ELO & LoL Boosting | 24/7 Support",
    description:
      "Upgrade your rank with elite ELO and LoL Boosting services designed for maximum security and total discretion. Top-tier performance and round-the-clock availability across every server.",
    url: "https://www.auraboost.gg",
    siteName: "Auraboost",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Auraboost - ELO & LoL Boosting Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Auraboost - Affordable ELO & LoL Boosting | 24/7 Support",
    description:
      "Upgrade your rank with elite ELO and LoL Boosting services. Maximum security, total discretion, and 24/7 availability.",
    images: ["/opengraph-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-4M16QYP5V5"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-4M16QYP5V5');
          `}
        </Script>
        {process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID && (
          <Script
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </head>
      <body className={`antialiased`}>
        <Script
          id="json-ld-organization"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Auraboost",
              url: "https://www.auraboost.gg",
              logo: "https://www.auraboost.gg/logo.png",
              sameAs: [],
              contactPoint: {
                "@type": "ContactPoint",
                email: "tg@auraboost.gg",
                contactType: "customer support",
                availableLanguage: ["English"],
              },
            }),
          }}
        />
        <Script
          id="json-ld-website"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Auraboost",
              url: "https://www.auraboost.gg",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://www.auraboost.gg/docs?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        <GoogleTranslateScript />
        <Toaster position="top-right" />
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
