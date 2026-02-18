"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import logo from "@/src/Assets/Landing/logo.png";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useResetPasswordMutation } from "@/src/redux/features/auth/authApi";

export default function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const code = searchParams.get("code") || "";

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !code) {
      setError("Missing email or verification code. Please go back and try again.");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await resetPassword({
        email,
        newPassword,
        code,
      }).unwrap();

      router.push("/login");
    } catch (err: unknown) {
      const error = err as {
        data?: { message?: string; error?: string };
        message?: string;
      };
      const errorMessage =
        error?.data?.message ||
        error?.data?.error ||
        error?.message ||
        "Password reset failed. Please try again.";
      setError(errorMessage);
    }
  };

  const isFormDisabled =
    isLoading || !newPassword || newPassword !== confirmPassword;

  return (
    <div className="bg-[#282836F0] rounded-xl shadow-2xl w-full min-w-[30rem] max-w-md p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col justify-center space-y-3 items-center mb-6">
        <Link href="/">
          <Image src={logo} width={100} height={400} alt="AuraBoost Logo" />
        </Link>
        <h1 className="text-2xl font-bold text-white">Set New Password</h1>
        <p className="text-gray-400 text-sm mt-1">
          Create a new password for{" "}
          <span className="text-white font-medium">{email}</span>
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-2 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* New Password */}
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">
            New Password
          </label>
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                setError(null);
              }}
              placeholder="Enter new password"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              {showNewPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          <p className="text-gray-500 text-xs mt-1">
            Must be at least 6 characters
          </p>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-gray-300 text-sm font-medium mb-2">
            Confirm New Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setError(null);
              }}
              placeholder="Confirm new password"
              className={`w-full bg-gray-700 border rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10 ${
                confirmPassword && confirmPassword !== newPassword
                  ? "border-red-500"
                  : "border-gray-600"
              }`}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              {showConfirmPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {confirmPassword && confirmPassword !== newPassword && (
            <p className="text-red-400 text-xs mt-1">Passwords do not match</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isFormDisabled}
          className={`w-full py-2.5 px-4 rounded-lg font-medium text-white transition-all duration-200 ${
            isFormDisabled
              ? "bg-red-600 opacity-60 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700 active:bg-red-800"
          }`}
        >
          {isLoading ? "Resetting..." : "Reset Password"}
        </button>
      </form>

      {/* Footer */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-400">
          Back to{" "}
          <Link
            href="/login"
            className="text-red-500 hover:text-red-400 font-medium"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
