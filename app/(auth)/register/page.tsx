import type { Metadata } from "next";
import Register from "@/src/components/Auth/Register";

export const metadata: Metadata = {
  title: "Create Account",
  description:
    "Create your free Auraboost account and start boosting your rank today. Join thousands of gamers using fast, secure, and affordable ELO boosting services with RankGuard protection and 24/7 support.",
  keywords: [
    "Auraboost register",
    "Auraboost sign up",
    "create boosting account",
    "game boosting register",
    "ELO boost sign up",
    "LoL boosting account",
  ],
  openGraph: {
    title: "Create Your Auraboost Account — Start Boosting Today",
    description:
      "Sign up for Auraboost in seconds. Get access to verified professional boosters, real-time order tracking, RankGuard buyer protection, and 24/7 support.",
    url: "https://www.auraboost.gg/register",
    siteName: "Auraboost",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Auraboost - Create Account",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Create Your Auraboost Account — Start Boosting Today",
    description:
      "Join Auraboost for free. Access verified boosters, secure transactions, and rank up fast with RankGuard protection.",
    images: ["/opengraph-image.png"],
  },
  alternates: {
    canonical: "/register",
  },
};

export default function Auth() {
  return <Register />;
}
