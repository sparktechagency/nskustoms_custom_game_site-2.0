"use client";

import { useState } from "react";
import { FaCircle } from "react-icons/fa";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import {
  useGetBoostingPostByIdQuery,
  useMakeBoostingAsCancelledMutation,
  useMakeBoostingAsCompletedMutation,
} from "@/src/redux/features/boosting-post/boostingApi";
import {
  Loader2,
  CheckCircle,
  XCircle,
  User,
  MessageSquare,
  ArrowLeft,
} from "lucide-react";
import { toast } from "sonner";
import { formatBoostingType, formatDate } from "@/src/utils/pageHealper";
import { BoostingPost } from "@/src/types/page.types";

const getCompletionMethod = (
  customizeOrder?: BoostingPost["customizeOrder"],
): string => {
  if (!customizeOrder) return "-";
  if (customizeOrder.duo) return "Duo";
  if (customizeOrder.solo) return "Solo";
  return "-";
};

const Page = () => {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const { data: boostingDetails, isLoading } = useGetBoostingPostByIdQuery(id);
  const [makeAsCancellBoosting, { isLoading: isCancelling }] =
    useMakeBoostingAsCancelledMutation();
  const [makeAsCompleteBoosting, { isLoading: isCompleting }] =
    useMakeBoostingAsCompletedMutation();

  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [showCompleteConfirm, setShowCompleteConfirm] = useState(false);

  const details = boostingDetails as BoostingPost | undefined;

  const handleMarkAsComplete = async () => {
    try {
      await makeAsCompleteBoosting(id).unwrap();
      toast.success("Boosting marked as completed!");
      setShowCompleteConfirm(false);
    } catch (error) {
      console.error("Failed to mark as complete:", error);
      toast.error("Failed to mark as complete");
    }
  };

  const handleCancel = async () => {
    try {
      await makeAsCancellBoosting(id).unwrap();
      toast.success("Boosting cancelled successfully!");
      setShowCancelConfirm(false);
    } catch (error) {
      console.error("Failed to cancel:", error);
      toast.error("Failed to cancel boosting");
    }
  };

  // Render boosting details based on type
  const renderBoostingDetails = () => {
    if (!details) return null;

    switch (details.boostingType) {
      case "rank_boost":
        return (
          <>
            <div className="flex justify-between items-center py-2 border-b border-gray-700">
              <span className="text-gray-400 text-sm">Current Rank</span>
              <span className="text-gray-200 text-sm font-medium">
                {details.currentRank?.currentRank || "-"}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-700">
              <span className="text-gray-400 text-sm">Current LP</span>
              <span className="text-gray-200 text-sm font-medium">
                {details.currentRank?.currentLp || "0"}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-700">
              <span className="text-gray-400 text-sm">Queue</span>
              <span className="text-gray-200 text-sm font-medium">
                {details.currentRank?.queue || "-"}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-700">
              <span className="text-gray-400 text-sm">Desired Rank</span>
              <span className="text-gray-200 text-sm font-medium">
                {details.desiredRank?.desiredRank || "-"}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-700">
              <span className="text-gray-400 text-sm">Region</span>
              <span className="text-gray-200 text-sm font-medium">
                {details.desiredRank?.region || "-"}
              </span>
            </div>
          </>
        );
      case "placement_matches":
        return (
          <>
            <div className="flex justify-between items-center py-2 border-b border-gray-700">
              <span className="text-gray-400 text-sm">Previous Rank</span>
              <span className="text-gray-200 text-sm font-medium">
                {details.placementMatches?.previousRank || "-"}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-700">
              <span className="text-gray-400 text-sm">Region</span>
              <span className="text-gray-200 text-sm font-medium">
                {details.placementMatches?.region || "-"}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-700">
              <span className="text-gray-400 text-sm">Queue</span>
              <span className="text-gray-200 text-sm font-medium">
                {details.placementMatches?.queue || "-"}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-700">
              <span className="text-gray-400 text-sm">Number of Games</span>
              <span className="text-gray-200 text-sm font-medium">
                {details.placementMatches?.numberOfGames || "-"}
              </span>
            </div>
          </>
        );
      case "net_wins":
        return (
          <>
            <div className="flex justify-between items-center py-2 border-b border-gray-700">
              <span className="text-gray-400 text-sm">Current Rank</span>
              <span className="text-gray-200 text-sm font-medium">
                {details.netWins?.currentRank || "-"}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-700">
              <span className="text-gray-400 text-sm">Region</span>
              <span className="text-gray-200 text-sm font-medium">
                {details.netWins?.region || "-"}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-700">
              <span className="text-gray-400 text-sm">Queue</span>
              <span className="text-gray-200 text-sm font-medium">
                {details.netWins?.queue || "-"}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-700">
              <span className="text-gray-400 text-sm">Number of Wins</span>
              <span className="text-gray-200 text-sm font-medium">
                {details.netWins?.numberOfWins || "-"}
              </span>
            </div>
          </>
        );
      case "custom_request":
        return (
          <>
            <div className="flex justify-between items-center py-2 border-b border-gray-700">
              <span className="text-gray-400 text-sm">Game Type</span>
              <span className="text-gray-200 text-sm font-medium">
                {details.customRequest?.gameType || "-"}
              </span>
            </div>
            <div className="py-2 border-b border-gray-700">
              <span className="text-gray-400 text-sm block mb-2">
                Request Description
              </span>
              <p className="text-gray-200 text-sm">
                {details.customRequest?.requestDescription || "-"}
              </p>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-red-500 animate-spin" />
        <p className="text-gray-400 mt-2">Loading...</p>
      </div>
    );
  }

  if (!details) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-gray-400">Boosting request not found</p>
        <button
          onClick={() => router.back()}
          className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="">
      <div className="space-y-6">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        {/* Request Details Section */}
        <div className="bg-[#282836] border border-gray-700 rounded-lg">
          <div className="p-6 border-b border-gray-700">
            {/* Header with Type, Status, and Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1.5 bg-orange-500/20 text-orange-400 text-sm rounded-lg">
                  {formatBoostingType(details.boostingType)}
                </span>
                <div className="flex items-center gap-2">
                  <FaCircle
                    className={`text-xs ${details.isActive ? "text-green-500" : "text-gray-500"}`}
                  />
                  <span className="text-gray-400 text-sm">
                    {details.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {details.isCancelled ? (
                  <span className="px-3 py-1.5 bg-red-500/20 text-red-400 text-sm rounded-lg">
                    Cancelled
                  </span>
                ) : details.isCompleted ? (
                  <span className="px-3 py-1.5 bg-green-500/20 text-green-400 text-sm rounded-lg">
                    Completed
                  </span>
                ) : (
                  <>
                    <button
                      onClick={() => setShowCompleteConfirm(true)}
                      disabled={isCompleting}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition-colors disabled:opacity-50"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Mark as Complete
                    </button>
                    <button
                      onClick={() => setShowCancelConfirm(true)}
                      disabled={isCancelling}
                      className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg transition-colors disabled:opacity-50"
                    >
                      <XCircle className="w-4 h-4" />
                      Cancel
                    </button>
                  </>
                )}
              </div>
            </div>

            <h2 className="text-gray-300 text-sm font-medium mb-4">
              Request Details
            </h2>
            <div className="space-y-2 text-sm">
              <div className="text-gray-400">
                Created:{" "}
                <span className="text-gray-300">
                  {formatDate(details.createdAt)}
                </span>
              </div>
              <div className="text-gray-400">
                Updated:{" "}
                <span className="text-gray-300">
                  {formatDate(details.updatedAt)}
                </span>
              </div>
            </div>
          </div>

          {/* User Info Section */}
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center">
                {details.userId?.image ? (
                  <Image
                    src={details.userId.image}
                    alt={details.userId.name}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-6 h-6 text-white" />
                )}
              </div>
              <div>
                <span className="text-gray-200 font-medium block">
                  {details.userId?.name || "Unknown User"}
                </span>
                <span className="text-gray-500 text-sm">
                  {details.userId?.email}
                </span>
              </div>
            </div>

            {/* Details Grid */}
            <div className="space-y-4">
              {renderBoostingDetails()}

              <div className="flex justify-between items-center py-2 border-b border-gray-700">
                <span className="text-gray-400 text-sm">Completion Method</span>
                <span className="text-gray-200 text-sm font-medium">
                  {getCompletionMethod(details.customizeOrder)}
                </span>
              </div>

              {/* Solo Options */}
              {details.customizeOrder?.solo && (
                <div className="py-2 border-b border-gray-700">
                  <span className="text-gray-400 text-sm block mb-2">
                    Solo Options
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {details.customizeOrder.solo.stream && (
                      <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded">
                        Stream
                      </span>
                    )}
                    {details.customizeOrder.solo.soloQueue && (
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">
                        Solo Queue
                      </span>
                    )}
                    {details.customizeOrder.solo.offlineMode && (
                      <span className="px-2 py-1 bg-gray-500/20 text-gray-400 text-xs rounded">
                        Offline Mode
                      </span>
                    )}
                    {!details.customizeOrder.solo.stream &&
                      !details.customizeOrder.solo.soloQueue &&
                      !details.customizeOrder.solo.offlineMode && (
                        <span className="text-gray-500 text-xs">
                          No options selected
                        </span>
                      )}
                  </div>
                </div>
              )}

              {/* Additional Info */}
              {details.additionInfo && (
                <div className="py-2">
                  <span className="text-gray-400 text-sm block mb-2">
                    Additional Info
                  </span>
                  <p className="text-gray-200 text-sm">
                    {details.additionInfo}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Conversations Section */}
        {details.conversations && details.conversations.length > 0 && (
          <div className="bg-[#282836] rounded-lg border border-gray-700">
            <div className="p-4 border-b border-gray-700">
              <h2 className="text-gray-300 font-medium flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Conversations ({details.conversations.length})
              </h2>
            </div>
            <div className="divide-y divide-gray-700/50">
              {details.conversations.map((conv) => {
                const otherParticipant = conv.participants.find(
                  (p) => p._id !== details.userId._id,
                );
                return (
                  <div
                    key={conv._id}
                    onClick={() =>
                      router.push(`/message?conversation=${conv._id}`)
                    }
                    className="p-4 hover:bg-gray-700/30 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center">
                        {otherParticipant?.image ? (
                          <Image
                            src={otherParticipant.image}
                            alt={otherParticipant.name}
                            width={40}
                            height={40}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <User className="w-5 h-5 text-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium text-sm">
                          {otherParticipant?.name || "Unknown"}
                        </p>
                        <p className="text-gray-500 text-xs truncate">
                          {conv.lastMessage || "No messages yet"}
                        </p>
                      </div>
                      <div className="text-right">
                        <span
                          className={`px-2 py-0.5 text-xs rounded ${
                            conv.isActive
                              ? "bg-green-500/20 text-green-400"
                              : "bg-gray-500/20 text-gray-400"
                          }`}
                        >
                          {conv.isActive ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Confirmation Modals */}
        {showCompleteConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-[#282836] rounded-lg p-6 max-w-md w-full border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">
                Mark as Complete?
              </h3>
              <p className="text-gray-400 mb-6">
                Are you sure you want to mark this boosting request as
                completed? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowCompleteConfirm(false)}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleMarkAsComplete}
                  disabled={isCompleting}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {isCompleting && <Loader2 className="w-4 h-4 animate-spin" />}
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}

        {showCancelConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-[#282836] rounded-lg p-6 max-w-md w-full border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">
                Cancel Boosting?
              </h3>
              <p className="text-gray-400 mb-6">
                Are you sure you want to cancel this boosting request? This
                action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowCancelConfirm(false)}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                >
                  Go Back
                </button>
                <button
                  onClick={handleCancel}
                  disabled={isCancelling}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {isCancelling && <Loader2 className="w-4 h-4 animate-spin" />}
                  Cancel Boosting
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
