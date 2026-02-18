import type { Metadata } from "next";
import { Suspense } from "react";
import OtpVerification from "@/src/components/Auth/OtpVerificationPage";

export const metadata: Metadata = {
  title: "Verify Your Email",
  description:
    "Enter the verification code sent to your email to confirm your Auraboost account and get started with our boosting services.",
  openGraph: {
    title: "Verify Your Email | Auraboost",
    description:
      "Enter the verification code sent to your email to confirm your Auraboost account and get started with our boosting services.",
    url: "https://www.auraboost.gg/opt-verifications",
    type: "website",
  },
};

function OtpVerificationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-900 flex items-center justify-center"><div className="text-white">Loading...</div></div>}>
      <OtpVerification />
    </Suspense>
  );
}

export default OtpVerificationPage;
