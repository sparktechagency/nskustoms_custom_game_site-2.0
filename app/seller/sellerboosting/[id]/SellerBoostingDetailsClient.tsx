"use client";

import { useState } from "react";
import { FaCircle } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useGetBoostingPostByIdForSellerQuery } from "@/src/redux/features/boosting-post/boostingApi";
import { Loader2, MessageCircle } from "lucide-react";
import { BoostingPost } from "@/src/types/page.types";
import {
  formatBoostingType,
  formatDate,
  getCompletionMethod,
} from "@/src/utils/pageHealper";
import { useCreateOfferSellerMutation } from "@/src/redux/features/offers/offersApi";
import CreateOfferModel from "@/src/components/seller/CreateofferModel";
import { useCreateConversationMutation } from "@/src/redux/features/conversations/conversationsApi";
import { toast } from "sonner";
import { CustomError } from "@/src/types/helper.types";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/src/redux/features/auth/authSlice";

const SellerBoostingDetailsClient = () => {
  const currentUser = useSelector(selectCurrentUser);
  console.log(currentUser);
  const { id } = useParams<{ id: string }>();
  const { data: boostingDetails, isLoading } =
    useGetBoostingPostByIdForSellerQuery(id);
  const [createOffers, { isLoading: isCreatingOffer }] =
    useCreateOfferSellerMutation();
  const [createConversations, { isLoading: isCreateConversations }] =
    useCreateConversationMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateOffer = async (data: {
    boostingPostId: string;
    deliverTime: string;
    price: number;
    message: string;
  }) => {
    try {
      await createOffers(data).unwrap();
      setIsModalOpen(false);
    } catch (error) {
      const customError = error as CustomError;
      toast.error(customError?.data?.message || "Failed to create offer");
      throw error;
    }
  };

  const details = boostingDetails as BoostingPost | undefined;

  console.log(details);

  const handleCreateConversation = async () => {
    if (!details) return;
    try {
      const converSationReqBody = {
        receiverId: details.userId._id,
        type: "boosting",
        referenceId: id,
      };
      await createConversations(converSationReqBody).unwrap();
    } catch (error) {
      console.error("Failed to create conversation:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
        <p className="text-gray-400 mt-2">Loading...</p>
      </div>
    );
  }

  if (!details) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-gray-400">Boosting request not found</p>
      </div>
    );
  }

  // Render details based on boosting type
  const renderBoostingDetails = () => {
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

  return (
    <div className="">
      <div className="space-y-6">
        <div className="bg-[#282836] border border-gray-700 rounded-lg">
          {/* Request Details Section */}
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-gray-300 text-sm font-medium">
                Request Details
              </h2>
              <span className="px-3 py-1 bg-orange-500/20 text-orange-400 text-xs rounded">
                {formatBoostingType(details.boostingType)}
              </span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="text-gray-400">
                Created:{" "}
                <span className="text-gray-300">
                  {formatDate(details.createdAt)}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                Status:
                {details.isActive &&
                  !details.isCompleted &&
                  !details.isCancelled && (
                    <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded">
                      Active
                    </span>
                  )}
                {details.isCompleted && (
                  <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs rounded">
                    Completed
                  </span>
                )}
                {details.isCancelled && (
                  <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-xs rounded">
                    Cancelled
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* User Info Section */}
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 md:w-12 md:h-12 h-10 rounded-full overflow-hidden bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center">
                {details.userId.image ? (
                  <Image
                    src={details.userId.image}
                    alt={details.userId.name}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-white font-bold">
                    {details.userId.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <div>
                <span className="text-gray-200 font-medium block">
                  {details.userId.name}
                </span>
                <span className="text-gray-500 text-sm">
                  {details.userId.email}
                </span>
              </div>
            </div>

            {/* Details Grid - Based on boosting type */}
            <div className="space-y-4">
              {renderBoostingDetails()}

              <div className="flex justify-between items-center py-2 border-b border-gray-700">
                <span className="text-gray-400 text-sm">Completion Method</span>
                <span className="text-gray-200 text-sm font-medium">
                  {getCompletionMethod(details.customizeOrder)}
                </span>
              </div>

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
                  </div>
                </div>
              )}

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

        {/* Status Section */}
        <div className="bg-[#282836] rounded-lg p-6 md:flex justify-between items-center shadow-xl border border-gray-700">
          <div className="flex items-center gap-2">
            <FaCircle
              className={`text-xs ${details.isActive ? "text-green-500" : "text-gray-500"}`}
            />
            <span className="text-gray-200 font-medium">
              {details.isActive ? "Active Request" : "Inactive Request"}
            </span>
          </div>
        </div>

        {/* Conversation Section */}
        <div className="bg-[#282836] rounded-lg p-6 shadow-xl border border-gray-700">
          <h3 className="text-gray-200 font-medium mb-4">Conversations</h3>

          {details.conversations && details.conversations.length > 0 ? (
            <div className="space-y-3">
              {details.conversations.map((conversation) => (
                <Link
                  key={conversation._id}
                  href={`/seller/messages/${conversation._id}`}
                  className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center">
                      {conversation.participants[0]?.image ? (
                        <Image
                          src={conversation.participants[0].image}
                          alt={conversation.participants[0].name}
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-white text-sm font-bold">
                          {conversation.participants[0]?.name
                            ?.charAt(0)
                            .toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="text-gray-200 text-sm font-medium">
                        {conversation.participants[0]?.name}
                      </p>
                      {conversation.lastMessage && (
                        <p className="text-gray-500 text-xs truncate max-w-xs">
                          {conversation.lastMessage}
                        </p>
                      )}
                    </div>
                  </div>
                  <MessageCircle className="w-5 h-5 text-gray-400" />
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <MessageCircle className="w-12 h-12 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400 mb-4">No conversations yet</p>
              <button
                onClick={handleCreateConversation}
                disabled={isCreateConversations}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded transition-colors duration-200 disabled:opacity-50 flex items-center gap-2 mx-auto"
              >
                {isCreateConversations ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Talk with the Buyer"
                )}
              </button>
            </div>
          )}
        </div>

        {/* Create Offer Section */}
        <div className="bg-[#282836] rounded-lg p-6 shadow-xl border border-gray-700">
          <div className="text-center py-8">
            <p className="text-gray-400 mb-4">Create your offer here.</p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded transition-colors duration-200"
            >
              Create an offer
            </button>
          </div>
        </div>
      </div>

      {/* Create Offer Modal */}
      {isModalOpen && (
        <CreateOfferModel
          boostingPostId={id}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCreateOffer}
          isLoading={isCreatingOffer}
        />
      )}
    </div>
  );
};

export default SellerBoostingDetailsClient;
