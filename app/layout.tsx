import type { Metadata } from "next";
import "./globals.css";
import ReduxProvider from "@/src/Provider/ReduxProvider";
import "aos/dist/aos.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: {
    default: "Auraboost - Best Platform for Game Rank Boosting",
    template: " AuraboostGame Boosting",
  },
  description:
    "Auraboost is the premier platform for game rank boosting services. Professional boosting for Valorant, League of Legends, CS:GO, and more. Fast, secure, and reliable ranking solutions.",
  keywords: [
    "game boosting",
    "rank boosting",
    "Valorant boost",
    "League of Legends boost",
    "CS:GO boost",
    "gaming services",
    "rank increase",
    "professional gaming",
    "competitive gaming",
    "MMR boost",
    "ELO boost",
  ],
  authors: [{ name: "Auraboost Team" }],
  creator: "Auraboost Team",
  publisher: "Auraboost",
  generator: "Next.js",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.auraboost.com"),
  openGraph: {
    title: "Auraboost - Best Platform for Game Rank Boosting",
    description:
      "Professional game rank boosting services for Valorant, League of Legends, CS:GO, and more. Fast, secure, and reliable ranking solutions.",
    url: "https://www.auraboost.com",
    siteName: "Auraboost",
    images: [
      {
        url: "/og-image.jpg", // Add your og image
        width: 1200,
        height: 630,
        alt: "Auraboost - Game Rank Boosting Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Auraboost - Best Platform for Game Rank Boosting",
    description:
      "Professional game rank boosting services for Valorant, League of Legends, CS:GO, and more.",
    // images: ["/twitter-image.jpg"], // Add your twitter image
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
  verification: {
    google: "google-site-verification-token", // Add your verification token
    yandex: "yandex-verification-token", // Add your verification token
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://www.Auraboost.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Toaster position="top-right" />
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
