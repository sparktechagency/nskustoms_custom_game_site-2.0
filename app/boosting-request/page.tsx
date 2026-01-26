import { Suspense } from "react";
import BoostingRequestPage from "@/src/Page/BoostingRequest";

export const dynamic = "force-dynamic";

function BoostingRequest() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
          <div className="text-white">Loading...</div>
        </div>
      }
    >
      <BoostingRequestPage />
    </Suspense>
  );
}

export default BoostingRequest;
