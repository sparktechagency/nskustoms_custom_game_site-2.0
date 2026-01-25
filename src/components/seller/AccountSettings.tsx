"use client";
import { useState } from "react";
import { Settings, Edit2, Loader2, X, Eye, EyeOff, User } from "lucide-react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/src/redux/features/auth/authSlice";
import { useChangePasswordMutation } from "@/src/redux/features/auth/authApi";
import { toast } from "sonner";
import Image from "next/image";
import { CustomError } from "@/src/types/page.types";

interface CurrentUser {
  _id: string;
  name: string;
  email: string;
  image?: string;
  role: string;
  isEmailVerified: boolean;
}

const AccountSettings = () => {
  const currentUser = useSelector(selectCurrentUser) as CurrentUser | null;
  const [updatePassword, { isLoading: isUpdatingPassword }] =
    useChangePasswordMutation();

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChangePassword = async () => {
    if (!oldPassword.trim()) {
      toast.error("Please enter your current password");
      return;
    }

    if (!newPassword.trim()) {
      toast.error("Please enter a new password");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await updatePassword({
        currentPassword: oldPassword,
        newPassword: newPassword,
      }).unwrap();

      toast.success("Password changed successfully!");
      setShowPasswordModal(false);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: CustomError) {
      // console.error("Failed to change password:", error);
      toast.error(
        error?.data?.message ||
          "Failed to change password. Please check your current password.",
      );
    }
  };

  const handleCloseModal = () => {
    setShowPasswordModal(false);
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

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
        <h2 className="text-lg font-medium text-white mb-4">Profile</h2>
        <div className="space-y-6 bg-[#282836] rounded-md p-6">
          {/* Profile Image */}
          <div className="flex items-start gap-6">
            <div className="relative">
              <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center overflow-hidden">
                {currentUser?.image ? (
                  <Image
                    src={currentUser.image}
                    alt={currentUser.name || "Profile"}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-8 h-8 text-white" />
                )}
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

          {/* Name Field */}
          <div>
            <label className="block text-white text-sm font-medium mb-3">
              Name:
            </label>
            <div className="relative">
              <input
                type="text"
                value={currentUser?.name || ""}
                readOnly
                className="w-full bg-gray-800/50 border border-gray-700 rounded px-4 py-3 text-gray-300 text-sm focus:outline-none focus:border-gray-600"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-400">
                <Edit2 className="w-4 h-4" />
              </button>
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
                value={currentUser?.email || ""}
                readOnly
                className="w-full bg-gray-800/50 border border-gray-700 rounded px-4 py-3 text-gray-300 text-sm focus:outline-none focus:border-gray-600"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                {currentUser?.isEmailVerified && (
                  <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded">
                    Verified
                  </span>
                )}
              </div>
            </div>
            <p className="text-gray-400 text-xs mt-2">
              This email is linked to your account. It is not visible to other
              users.
            </p>
          </div>

          {/* Role Field */}
          <div>
            <label className="block text-white text-sm font-medium mb-3">
              Role:
            </label>
            <div className="relative">
              <input
                type="text"
                value={
                  currentUser?.role
                    ? currentUser.role.charAt(0).toUpperCase() +
                      currentUser.role.slice(1)
                    : ""
                }
                readOnly
                className="w-full bg-gray-800/50 border border-gray-700 rounded px-4 py-3 text-gray-300 text-sm focus:outline-none focus:border-gray-600"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-white text-sm font-medium mb-3">
              Password:
            </label>
            <div>
              <button
                onClick={() => setShowPasswordModal(true)}
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded text-sm font-medium transition-colors"
              >
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

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#282836] rounded-lg p-6 max-w-md w-full border border-gray-700">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Change Password</h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              {/* Old Password */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showOldPassword ? "text" : "password"}
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    placeholder="Enter current password"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showOldPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500 pr-10"
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
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    className={`w-full bg-gray-800 border rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500 pr-10 ${
                      confirmPassword && confirmPassword !== newPassword
                        ? "border-red-500"
                        : "border-gray-700"
                    }`}
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
                  <p className="text-red-400 text-xs mt-1">
                    Passwords do not match
                  </p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleChangePassword}
                disabled={isUpdatingPassword}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {isUpdatingPassword && (
                  <Loader2 className="w-4 h-4 animate-spin" />
                )}
                Change Password
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountSettings;
