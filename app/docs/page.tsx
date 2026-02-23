import { Metadata } from "next";
import DocumentationPage from "@/src/Page/DocumentationsPage";

export const metadata: Metadata = {
  title: "Help Center",
  description:
    "Auraboost Help Center — your complete guide to buying, selling, and using the platform. Find answers to common questions, learn about RankGuard protection, fees, refund policies, and more.",
  openGraph: {
    title: "Help Center | Auraboost",
    description:
      "Auraboost Help Center — guides, FAQs, and support documentation for buyers and sellers.",
    url: "https://www.auraboost.gg/docs",
    siteName: "Auraboost",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Help Center | Auraboost",
    description:
      "Auraboost Help Center — guides, FAQs, and support documentation for buyers and sellers.",
  },
  alternates: {
    canonical: "/docs",
  },
};

export default function Page() {
  return <DocumentationPage />;
}
