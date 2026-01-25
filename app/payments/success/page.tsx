"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetVerifyPaymentsQuery } from "@/src/redux/features/orders/ordersApi";
import { CheckCircle, Loader2, XCircle } from "lucide-react";

export default function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [countdown, setCountdown] = useState(5);

  const {
    data: verifyData,
    isLoading,
    isError,
    isSuccess,
  } = useGetVerifyPaymentsQuery(sessionId!, {
    skip: !sessionId,
  });

  // Countdown and redirect after successful verification
  useEffect(() => {
    if (isSuccess && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }

    if (isSuccess && countdown === 0) {
      router.push("/boosting");
    }
  }, [isSuccess, countdown, router]);

  // No session ID provided
  if (!sessionId) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-[#282836] rounded-xl p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-500/20 flex items-center justify-center">
            <XCircle className="w-8 h-8 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-3">
            Invalid Payment Session
          </h1>
          <p className="text-gray-400 mb-6">
            No payment session ID was provided. Please try again.
          </p>
          <button
            onClick={() => router.push("/")}
            className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-[#282836] rounded-xl p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gray-700 flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-red-500 animate-spin" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-3">
            Verifying Payment
          </h1>
          <p className="text-gray-400">
            Please wait while we verify your payment...
          </p>
          <div className="mt-6 flex justify-center">
            <div className="flex space-x-2">
              <div
                className="w-2 h-2 bg-red-500 rounded-full animate-bounce"
                style={{ animationDelay: "0ms" }}
              ></div>
              <div
                className="w-2 h-2 bg-red-500 rounded-full animate-bounce"
                style={{ animationDelay: "150ms" }}
              ></div>
              <div
                className="w-2 h-2 bg-red-500 rounded-full animate-bounce"
                style={{ animationDelay: "300ms" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-[#282836] rounded-xl p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-500/20 flex items-center justify-center">
            <XCircle className="w-8 h-8 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-3">
            Payment Verification Failed
          </h1>
          <p className="text-gray-400 mb-6">
            We couldn&apos;t verify your payment. Please contact support if you
            believe this is an error.
          </p>
          <div className="space-y-3">
            <button
              onClick={() => router.push("/boosting-request")}
              className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
            >
              Go to Boosting
            </button>
            <button
              onClick={() => window.location.reload()}
              className="w-full py-3 px-4 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Success state
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-[#282836] rounded-xl p-8 text-center">
        {/* Success Icon with Animation */}
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center animate-pulse">
          <CheckCircle className="w-10 h-10 text-green-500" />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-white mb-3">
          Payment Successful!
        </h1>

        {/* Description */}
        <p className="text-gray-400 mb-6">
          Your payment has been verified successfully. Your boosting order is
          now being processed.
        </p>

        {/* Order Info Card */}
        <div className="bg-gray-700/50 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-center gap-2 text-green-400">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">Order Confirmed</span>
          </div>
        </div>

        {/* Countdown */}
        <p className="text-gray-500 text-sm mb-4">
          Redirecting to your boosting page in{" "}
          <span className="text-red-500 font-bold">{countdown}</span> seconds...
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-gray-700 rounded-full h-2 mb-6 overflow-hidden">
          <div
            className="bg-red-600 h-full rounded-full transition-all duration-1000 ease-linear"
            style={{ width: `${((5 - countdown) / 5) * 100}%` }}
          ></div>
        </div>

        {/* Manual Redirect Button */}
        <button
          onClick={() => router.push("/boosting-request")}
          className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
        >
          Go to Boosting Now
        </button>
      </div>
    </div>
  );
}
