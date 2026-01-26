import { Suspense } from "react";
import OtpVerification from "@/src/components/Auth/OtpVerificationPage";

function OtpVerificationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-900 flex items-center justify-center"><div className="text-white">Loading...</div></div>}>
      <OtpVerification />
    </Suspense>
  );
}

export default OtpVerificationPage;
