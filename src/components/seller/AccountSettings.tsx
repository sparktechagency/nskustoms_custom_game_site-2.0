"use client";
import { useState } from "react";
import { Settings, Edit2 } from "lucide-react";

const AccountSettings = () => {
  const [email] = useState("se.manik.js@gmail.com");
  const [username] = useState("HeroManik-XOx7");

  return (
    <div className=" ">
      <div className="">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Settings className="w-6 h-6 text-red-500" />
          <h1 className="text-2xl font-semibold text-white">
            Account Settings
          </h1>
        </div>

        {/* Profile Section */}
        <h2 className="text-lg font-medium text-white">Profile</h2>
        <div className="space-y-6 bg-[#282836] rounded-md p-6">
          {/* Upload Image */}
          <div className="flex items-start gap-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-red-900 to-purple-900 flex items-center justify-center overflow-hidden">
                <div className="text-white text-xs text-center px-2">
                  Update image
                </div>
              </div>
            </div>
            <div>
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors">
                Upload image
              </button>
              <p className="text-gray-400 text-xs mt-2">
                Must be JPEG, PNG or HEIC and cannot exceed 10MB.
              </p>
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-white text-sm font-medium mb-3">
              Email:
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                readOnly
                className="w-full bg-gray-800/50 border border-gray-700 rounded px-4 py-3 text-gray-300 text-sm focus:outline-none focus:border-gray-600"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-400">
                <Edit2 className="w-4 h-4" />
              </button>
            </div>
            <p className="text-gray-400 text-xs mt-2">
              This email is linked to your account. It is not visible to other
              users.
            </p>
          </div>

          {/* Username Field */}
          <div>
            <label className="block text-white text-sm font-medium mb-3">
              Username:
            </label>
            <div className="relative">
              <input
                type="text"
                value={username}
                readOnly
                className="w-full bg-gray-800/50 border border-gray-700 rounded px-4 py-3 text-gray-300 text-sm focus:outline-none focus:border-gray-600"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-400">
                <Edit2 className="w-4 h-4" />
              </button>
            </div>
            <p className="text-gray-400 text-xs mt-2">
              Name that is visible to other Auraboost users. You can change your
              username once every 90 days.
            </p>
          </div>

          {/* Description Field */}
          <div>
            <label className="block text-white text-sm font-medium mb-3">
              Description:
            </label>
            <div className="relative">
              <textarea
                placeholder="Type here..."
                rows={3}
                className="w-full bg-gray-800/50 border border-gray-700 rounded px-4 py-3 text-gray-300 text-sm placeholder-gray-500 focus:outline-none focus:border-gray-600 resize-none"
              />
              <button className="absolute right-3 top-3 text-red-500 hover:text-red-400">
                <Edit2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-white text-sm font-medium mb-3">
              Password:
            </label>
            <div>
              <button className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded text-sm font-medium transition-colors">
                Change Password
              </button>
              <p className="text-gray-400 text-xs mt-2">
                Password can only be changed if you are using the email password
                login flow
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
