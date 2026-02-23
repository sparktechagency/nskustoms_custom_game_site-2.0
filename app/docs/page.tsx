import { Metadata } from "next";
import DocumentationPage from "@/src/Page/DocumentationsPage";

export const metadata: Metadata = {
  title: "Help Center & Documentation",
  description:
    "Auraboost Help Center — your complete documentation hub for everything on the platform. Learn how to buy and sell boosting services, understand RankGuard buyer and seller protection, manage deposits and withdrawals, read our refund policy, seller rules, fee structure, and get answers to frequently asked questions.",
  keywords: [
    "Auraboost help center",
    "Auraboost documentation",
    "Auraboost docs",
    "how to buy boost",
    "how to sell boost",
    "RankGuard protection",
    "Auraboost refund policy",
    "Auraboost fees",
    "Auraboost seller rules",
    "game boosting guide",
    "ELO boosting help",
    "Auraboost FAQ",
    "Auraboost support",
    "boosting deposit withdrawal",
  ],
  openGraph: {
    title: "Help Center & Documentation — Auraboost",
    description:
      "Everything you need to know about Auraboost. Guides for buyers and sellers, RankGuard protection, fees, refund policy, FAQs, and more.",
    url: "https://www.auraboost.gg/docs",
    siteName: "Auraboost",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Auraboost Help Center & Documentation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Help Center & Documentation — Auraboost",
    description:
      "Everything you need to know about Auraboost. Guides for buyers and sellers, RankGuard protection, fees, refund policy, FAQs, and more.",
    images: ["/opengraph-image.png"],
  },
  alternates: {
    canonical: "/docs",
  },
};

export default function Page() {
  return <DocumentationPage />;
}
