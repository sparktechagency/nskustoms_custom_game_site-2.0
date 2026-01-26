"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import appleLogo from "@/src/Assets/Auth/apple_logo.png";
import googleLogo from "@/src/Assets/Auth/google_logo.png";
import logo from "@/src/Assets/Landing/logo.png";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/src/redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "@/src/redux/features/auth/authSlice";

interface FormData {
  email: string;
  password: string;
}

export default function Login() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [login, { isLoading: isSubmitting }] = useLoginMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await login({
        email: formData.email,
        password: formData.password,
      }).unwrap();

      const { user, accessToken } = response.data;

      dispatch(
        setUser({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            image: user.image,
            role: user.role,
            dateOfBirth: user.dateOfBirth,
            isEmailVerified: user.isEmailVerified,
          },
          token: accessToken,
        }),
      );

      if (user.role === "seller") {
        router.push("/sellerboosting");
      } else {
        router.push("/boosting");
      }
    } catch (err: unknown) {
      const error = err as { data?: { message?: string }; message?: string };
      const errorMessage =
        error?.data?.message ||
        error?.message ||
        "Login failed. Please try again.";
      setError(errorMessage);
    }
  };

  const handleGoogleSignIn = () => {
    console.log("Sign in with Google");
    // Handle Google sign-in logic
  };

  const handleAppleSignIn = () => {
    console.log("Continue with Apple");
    // Handle Apple sign-in logic
  };

  return (
    <div className="bg-[#282836F0] rounded-xl shadow-2xl w-full max-w-md p-6 md:p-8">
      {/* Header */}
      <div className="flex justify-center space-x-3 items-center mb-6">
        <Link href={"/"}>
          {" "}
          <Image src={logo} width={100} height={400} alt="AuraBoost  Logo " />
        </Link>
        <h1 className="text-2xl font-bold text-white">Sign In</h1>
      </div>

      {/* Social Sign In */}
      <div className="mb-6">
        <h2 className="text-lg text-left font-semibold text-gray-300 mb-3">
          Or with other accounts
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center text-sm space-x-1 px-4 py-2.5 border border-gray-700 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors duration-200 text-white"
          >
            <Image src={googleLogo} width={19} height={10} alt="Google Logo " />
            <span> Sign in with Google</span>
          </button>
          <button
            onClick={handleAppleSignIn}
            className="flex items-center justify-center text-sm space-x-1 px-4 py-2.5 border border-gray-700 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors duration-200 text-white"
          >
            <Image src={appleLogo} width={19} height={10} alt="Apple Logo " />
            <span> Sign in with Apple</span>
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="flex items-center my-4">
        <div className="flex-1 border-t border-gray-700"></div>
        <span className="px-3 text-sm text-gray-400">or</span>
        <div className="flex-1 border-t border-gray-700"></div>
      </div>

      {/* Sign In Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Error Message */}
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
            value={formData.email}
            onChange={handleChange}
            placeholder="enter your email"
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600  rounded-xs text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div className="flex flex-col items-start space-y-2">
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-300"
          >
            Password
          </label>
          <div className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="enter your password"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600  rounded-xs text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
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
          {isSubmitting ? "Signing In..." : "Sign In"}
        </button>
      </form>

      {/* Footer */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-400">
          New User?{" "}
          <a
            href="/register"
            className="text-red-500 hover:text-blue-300 font-medium"
          >
            Create an account
          </a>
        </p>
      </div>
    </div>
  );
}
