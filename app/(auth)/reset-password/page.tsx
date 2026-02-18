import type { Metadata } from "next";
import ResetPassword from "@/src/components/Auth/ResetPassword";

export const metadata: Metadata = {
  title: "Reset Password",
  description:
    "Set a new password for your Auraboost account. Choose a strong password to keep your account secure.",
  openGraph: {
    title: "Reset Password | Auraboost",
    description:
      "Set a new password for your Auraboost account. Choose a strong password to keep your account secure.",
    url: "https://www.auraboost.gg/reset-password",
    type: "website",
  },
};

function ResetPasswordPage() {
  return <ResetPassword />;
}

export default ResetPasswordPage;
