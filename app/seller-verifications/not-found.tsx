"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-8">
        {/* 404 Number */}
        <div className="relative">
          <h1 className="text-8xl md:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-orange-500">
            404
          </h1>
          <div className="absolute inset-0 text-8xl md:text-9xl font-extrabold text-gray-700 blur-sm -z-10">
            404
          </div>
        </div>

        {/* Title and Description */}
        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Oops! Page Not Found
          </h2>
          <p className="text-gray-300 text-base md:text-lg">
            The page you're looking for doesn't exist or has been moved. Don't worry, we'll help you get back on track.
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="flex items-center justify-center gap-3 text-3xl py-4">
          <span className="animate-bounce">🎮</span>
          <span className="animate-bounce delay-100">🏆</span>
          <span className="animate-bounce delay-200">🎯</span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => router.back()}
            className="px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Go Back
          </button>
          <Link href="/">
            <button className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-red-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              Return Home
            </button>
          </Link>
        </div>

        {/* Additional Info */}
        <div className="pt-6">
          <p className="text-gray-500 text-sm">
            Error Code: 404 | Page Does Not Exist
          </p>
          <p className="text-gray-600 text-sm mt-2">
            If you believe this is an error, please contact our support team.
          </p>
        </div>
      </div>
    </div>
  );
}