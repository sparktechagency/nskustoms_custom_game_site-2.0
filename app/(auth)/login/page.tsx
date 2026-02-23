import type { Metadata } from "next";
import Login from "@/src/components/Auth/LoginPage";

export const metadata: Metadata = {
  title: "Sign In",
  description:
    "Sign in to your Auraboost account to access ELO boosting services, track your orders in real time, manage your profile, and connect with verified boosters. Secure login with 24/7 support.",
  keywords: [
    "Auraboost login",
    "Auraboost sign in",
    "game boosting login",
    "ELO boost account",
    "LoL boosting sign in",
  ],
  openGraph: {
    title: "Sign In to Auraboost — Access Your Boosting Dashboard",
    description:
      "Log in to your Auraboost account to track active boosts, chat with your booster, manage orders, and access your wallet. Secure and fast sign-in.",
    url: "https://www.auraboost.gg/login",
    siteName: "Auraboost",
    type: "website",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Auraboost - Sign In",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sign In to Auraboost — Access Your Boosting Dashboard",
    description:
      "Log in to track your boosts, manage orders, and connect with verified boosters on Auraboost.",
    images: ["/opengraph-image.png"],
  },
  alternates: {
    canonical: "/login",
  },
};

export default function Auth() {
  return <Login />;
}
