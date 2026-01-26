import { Suspense } from "react";
import PaymentSuccessClient from "./PaymentSuccessClient";
import { Loader2 } from "lucide-react";

export const dynamic = "force-dynamic";

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
          <div className="max-w-md w-full bg-[#282836] rounded-xl p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gray-700 flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-red-500 animate-spin" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-3">Loading...</h1>
          </div>
        </div>
      }
    >
      <PaymentSuccessClient />
    </Suspense>
  );
}
