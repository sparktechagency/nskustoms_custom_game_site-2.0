"use client";

import { useState } from "react";
import Image from "next/image";
import logo from "@/src/Assets/Landing/logo.png";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForgetPasswordMutation } from "@/src/redux/features/auth/authApi";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const [forgetPassword, { isLoading: isSubmitting }] =
    useForgetPasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await forgetPassword({ email }).unwrap();
      router.push(
        `/opt-verifications?email=${encodeURIComponent(email)}&type=reset`,
      );
    } catch (err: unknown) {
      const error = err as {
        data?: { message?: string; error?: string };
        message?: string;
      };
      const errorMessage =
        error?.data?.message ||
        error?.data?.error ||
        error?.message ||
        "Something went wrong. Please try again.";
      setError(errorMessage);
    }
  };

  return (
    <div className="bg-[#282836F0] rounded-xl shadow-2xl w-full min-w-[30rem] max-w-md p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col items-center mb-8">
        <Link href="/" className="mb-4">
          <Image
            src={logo}
            width={150}
            height={60}
            alt="AuraBoost Logo"
            className="h-[60px] w-auto object-contain"
          />
        </Link>
        <h1 className="text-2xl font-bold text-white">Forgot Password</h1>
        <p className="text-gray-400 text-sm mt-1">
          Enter your email to receive a verification code
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-2 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="flex flex-col items-start space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-300"
          >
            Email address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError(null);
            }}
            placeholder="Enter your email"
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-xs text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2.5 px-4 rounded-lg font-medium text-white transition-all duration-200 ${
            isSubmitting
              ? "bg-red-600 opacity-80 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700 active:bg-red-800"
          }`}
        >
          {isSubmitting ? "Sending..." : "Send Verification Code"}
        </button>
      </form>

      {/* Footer */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-400">
          Remember your password?{" "}
          <Link
            href="/login"
            className="text-red-500 hover:text-blue-300 font-medium"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
