"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import logo from "@/src/Assets/Landing/logo.png";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useVerifyEmailMutation,
  useResendVerificationMutation,
} from "@/src/redux/features/auth/authApi";

// url -> &type=reset

export default function OtpVerification() {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const type = searchParams.get("type") || "";
  console.log(type);

  const [verifyEmail, { isLoading: isSubmitting }] = useVerifyEmailMutation();
  const [resendVerification, { isLoading: isResending }] =
    useResendVerificationMutation();

  // Countdown timer for resend OTP
  useEffect(() => {
    if (resendTimer <= 0) return;

    const timer = setTimeout(() => {
      const newValue = resendTimer - 1;
      setResendTimer(newValue);
      if (newValue === 0) {
        setCanResend(true);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [resendTimer]);

  const handleChange = (index: number, value: string) => {
    // Only allow digits
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError(null);
    setSuccessMessage(null);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split("").forEach((char, index) => {
      if (index < 6) newOtp[index] = char;
    });
    setOtp(newOtp);

    // Focus the next empty input or the last one
    const nextEmptyIndex = newOtp.findIndex((val) => !val);
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex]?.focus();
    } else {
      inputRefs.current[5]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join("");
    setError(null);
    setSuccessMessage(null);

    if (otpCode.length !== 6) {
      setError("Please enter the complete 6-digit OTP");
      return;
    }

    if (!email) {
      setError("Email not found. Please go back to registration.");
      return;
    }

    try {
      await verifyEmail({
        email: email,
        code: otpCode,
      }).unwrap();

      router.push("/login");
    } catch (err: unknown) {
      const error = err as { data?: { message?: string }; message?: string };
      const errorMessage =
        error?.data?.message ||
        error?.message ||
        "OTP verification failed. Please try again.";
      setError(errorMessage);
    }
  };

  const handleResendOtp = async () => {
    if (!canResend || isResending) return;
    setError(null);
    setSuccessMessage(null);

    if (!email) {
      setError("Email not found. Please go back to registration.");
      return;
    }

    try {
      await resendVerification({ email }).unwrap();

      // Reset timer and OTP
      setResendTimer(60);
      setCanResend(false);
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
      setSuccessMessage("OTP sent successfully!");
    } catch (err: unknown) {
      const error = err as { data?: { message?: string }; message?: string };
      const errorMessage =
        error?.data?.message ||
        error?.message ||
        "Failed to resend OTP. Please try again.";
      setError(errorMessage);
    }
  };

  return (
    <div className="bg-[#282836F0] rounded-xl shadow-2xl w-full max-w-md p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col  justify-center space-y-3 items-center mb-6">
        <Link href={"/"}>
          <Image src={logo} width={100} height={400} alt="AuraBoost Logo" />
        </Link>
        <h1 className="text-2xl font-bold text-white">Verify OTP</h1>
      </div>

      {/* Description */}
      <div className="mb-6 text-center">
        <p className="text-gray-300 text-sm">
          We have sent a 6-digit verification code to{" "}
          {email ? (
            <span className="text-white font-medium">{email}</span>
          ) : (
            "your email address"
          )}
          . Please enter the code below.
        </p>
      </div>

      {/* OTP Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Error Message */}
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-2 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Success Message */}
        {successMessage && (
          <div className="bg-green-500/20 border border-green-500 text-green-400 px-4 py-2 rounded-lg text-sm">
            {successMessage}
          </div>
        )}

        {/* OTP Input Fields */}
        <div className="flex justify-center gap-2 md:gap-3">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className="w-10 h-12 md:w-12 md:h-14 text-center text-xl font-semibold bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              required
            />
          ))}
        </div>

        {/* Timer and Resend */}
        <div className="text-center">
          {canResend ? (
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={isResending}
              className={`font-medium text-sm transition-colors duration-200 ${
                isResending
                  ? "text-gray-500 cursor-not-allowed"
                  : "text-red-500 hover:text-red-400"
              }`}
            >
              {isResending ? "Sending..." : "Resend OTP"}
            </button>
          ) : (
            <p className="text-sm text-gray-400 underline">
              Resend OTP in{" "}
              <span className="text-white font-medium">{resendTimer}s</span>
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || otp.some((digit) => !digit)}
          className={`w-full py-2.5 px-4 rounded-lg font-medium text-white transition-all duration-200 ${
            isSubmitting || otp.some((digit) => !digit)
              ? "bg-red-600 opacity-60 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700 active:bg-red-800"
          }`}
        >
          {isSubmitting ? "Verifying..." : "Verify OTP"}
        </button>
      </form>

      {/* Footer */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-400">
          Didn&apos;t receive the code?{" "}
          <Link
            href="/login"
            className="text-red-500 hover:text-red-400 font-medium"
          >
            Go back to login
          </Link>
        </p>
      </div>
    </div>
  );
}
