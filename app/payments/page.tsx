import { Suspense } from "react";
import CheckoutPage from "@/src/Page/Payments";

export const dynamic = "force-dynamic";

function Payments() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
          <div className="text-white">Loading...</div>
        </div>
      }
    >
      <CheckoutPage />
    </Suspense>
  );
}

export default Payments;
