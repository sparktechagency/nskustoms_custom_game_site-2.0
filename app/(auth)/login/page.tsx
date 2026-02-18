import type { Metadata } from "next";
import Login from "@/src/components/Auth/LoginPage";

export const metadata: Metadata = {
  title: "Sign In",
  description:
    "Sign in to your Auraboost account to access ELO boosting services, track your orders, and manage your profile.",
  openGraph: {
    title: "Sign In | Auraboost",
    description:
      "Sign in to your Auraboost account to access ELO boosting services, track your orders, and manage your profile.",
    url: "https://www.auraboost.gg/login",
    type: "website",
  },
};

function Auth() {
  return <Login />;
}

export default Auth;
