"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
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
        router.push("/seller/sellerboosting");
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
        <h1 className="text-2xl font-bold text-white">Sign In</h1>
        <p className="text-gray-400 text-sm mt-1">
          Welcome back! Please sign in to continue
        </p>
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
            placeholder="Enter your email"
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
              placeholder="Enter your password"
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
