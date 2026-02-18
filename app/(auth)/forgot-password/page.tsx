import type { Metadata } from "next";
import ForgotPassword from "@/src/components/Auth/ForgotPassword";

export const metadata: Metadata = {
  title: "Forgot Password",
  description:
    "Reset your Auraboost account password. Enter your email to receive a verification code and regain access to your account.",
  openGraph: {
    title: "Forgot Password | Auraboost",
    description:
      "Reset your Auraboost account password. Enter your email to receive a verification code and regain access to your account.",
    url: "https://www.auraboost.gg/forgot-password",
    type: "website",
  },
};

function ForgotPasswordPage() {
  return <ForgotPassword />;
}

export default ForgotPasswordPage;
