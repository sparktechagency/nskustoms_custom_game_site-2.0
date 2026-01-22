/* eslint-disable react/no-unescaped-entities */
import React from 'react';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <div className="text-center space-y-6 px-4">
        {/* Animated 404 */}
        <div className="relative">
          <h1 className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 animate-pulse">
            404
          </h1>
          <div className="absolute inset-0 text-9xl font-black text-purple-200 blur-sm -z-10">
            404
          </div>
        </div>

        {/* Message */}
        <div className="space-y-3">
          <h2 className="text-3xl font-bold text-gray-800">
            Oops! Page Not Found
          </h2>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            The page you're looking for seems to have wandered off into the digital void.
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="flex items-center justify-center gap-2 text-4xl">
          <span className="animate-bounce">🚀</span>
          <span className="animate-bounce delay-100">✨</span>
          <span className="animate-bounce delay-200">🌟</span>
        </div>

        {/* Action Button */}
        <button 
          onClick={() => window.location.href = '/'}
          className="mt-8 px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          Take Me Home
        </button>

        {/* Error Code */}
        <p className="text-sm text-gray-400 mt-6">
          Error Code: 404 | Page Does Not Exist
        </p>
      </div>
    </div>
  );
}

export default NotFoundPage;