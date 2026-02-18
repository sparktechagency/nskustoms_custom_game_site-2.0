import type { Metadata } from "next";
import Register from "@/src/components/Auth/Register";

export const metadata: Metadata = {
  title: "Create Account",
  description:
    "Create your Auraboost account and start boosting your rank today. Fast, secure, and affordable ELO boosting services.",
  openGraph: {
    title: "Create Account | Auraboost",
    description:
      "Create your Auraboost account and start boosting your rank today. Fast, secure, and affordable ELO boosting services.",
    url: "https://www.auraboost.gg/register",
    type: "website",
  },
};

function Auth() {
  return <Register />;
}

export default Auth;
