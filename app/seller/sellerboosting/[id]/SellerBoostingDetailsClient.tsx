"use client";

import { useState, useCallback } from "react";
import { FaCircle } from "react-icons/fa";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useGetBoostingPostByIdForSellerQuery } from "@/src/redux/features/boosting-post/boostingApi";
import {
  Loader2,
  MessageCircle,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  User,
  Key,
  CreditCard,
} from "lucide-react";
import { BoostingPost, Conversation } from "@/src/types/page.types";
import {
  formatBoostingType,
  formatDate,
  getCompletionMethod,
} from "@/src/utils/pageHealper";
import { useCreateOfferSellerMutation } from "@/src/redux/features/offers/offersApi";
import CreateOfferModel from "@/src/components/seller/CreateofferModel";
import { toast } from "sonner";
import { CustomError } from "@/src/types/helper.types";
import { useSocket, useSocketEvent } from "@/src/hooks/useSocket";
import { SOCKET_CONFIG } from "@/src/lib/socket/socketConfig";
import socketService from "@/src/lib/socket/socketService";

const SellerBoostingDetailsClient = () => {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const {
    data: boostingDetails,
    isLoading,
    refetch,
  } = useGetBoostingPostByIdForSellerQuery(id);
  const [createOffers, { isLoading: isCreatingOffer }] =
    useCreateOfferSellerMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isCreatingConversation, setIsCreatingConversation] = useState(false);
  const [realtimeConversation, setRealtimeConversation] =
    useState<Conversation | null>(null);

  const { isConnected } = useSocket();

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

  // Extended type to include offer, order, and conversation
  interface SellerBoostingDetails extends BoostingPost {
    offer?: {
      _id: string;
      deliverTime: string;
      price: number;
      message: string;
      status: "pending" | "accepted" | "declined";
      createdAt: string;
    };
    order?: {
      _id: string;
      gameUsername: string;
      gamePassword: string;
      orderPrice: number;
      platformCharge: number;
      total: number;
      status: string;
      createdAt: string;
    };
    conversation?: {
      _id: string;
      participants: string[];
      type: string;
      referenceId: string;
      isActive: boolean;
      lastMessage?: string;
      participant: string;
      createdAt: string;
      updatedAt: string;
    };
  }

  const details = boostingDetails as SellerBoostingDetails | undefined;

  // Listen for new conversations (when conversation is created)
  useSocketEvent<{ conversation: Conversation; message?: string }>(
    SOCKET_CONFIG.events.CONVERSATION_NEW,
    useCallback(
      (data) => {
        if (data.conversation && data.conversation.referenceId === id) {
          setRealtimeConversation(data.conversation);
          toast.success("Conversation started!");
        }
      },
      [id],
    ),
    [id],
  );

  // Listen for conversation created response
  useSocketEvent<{ conversation: Conversation }>(
    SOCKET_CONFIG.events.CONVERSATION_CREATED,
    useCallback(
      (data) => {
        if (data.conversation && data.conversation.referenceId === id) {
          setRealtimeConversation(data.conversation);
        }
      },
      [id],
    ),
    [id],
  );

  // Listen for conversation updates
  useSocketEvent<{ conversation: Conversation }>(
    SOCKET_CONFIG.events.CONVERSATION_UPDATED,
    useCallback(
      (data) => {
        if (data.conversation && data.conversation.referenceId === id) {
          setRealtimeConversation(data.conversation);
        }
      },
      [id],
    ),
    [id],
  );

  const handleCreateConversation = async () => {
    if (!details || !isConnected) {
      toast.error("Not connected to server");
      return;
    }

    setIsCreatingConversation(true);

    try {
      socketService.createConversation(
        {
          receiverId: details.userId._id,
          type: "boosting",
          referenceId: id,
        },
        (response) => {
          setIsCreatingConversation(false);

          if (response.success && response.data) {
            const conversation = response.data as Conversation;
            setRealtimeConversation(conversation);
            toast.success("Conversation created successfully!");
            // Navigate to the conversation
            router.push(`/seller/message?conversation=${conversation._id}`);
          } else {
            // Check if it's "already exists" - still navigate
            if (response.message?.includes("Existing conversation")) {
              const conversation = response.data as Conversation;
              setRealtimeConversation(conversation);
              router.push(`/seller/message?conversation=${conversation._id}`);
            } else {
              toast.error(response.error || "Failed to create conversation");
            }
          }
        },
      );

      // Fallback timeout
      setTimeout(() => {
        setIsCreatingConversation(false);
      }, 10000);
    } catch (error) {
      console.error("Failed to create conversation:", error);
      toast.error("Failed to create conversation");
      setIsCreatingConversation(false);
    }
  };

  // Get the current conversation (from API or realtime)
  const currentConversation = realtimeConversation || details?.conversation;

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

        {/* Offer & Order Section - Two Column Layout */}
        {(details.offer || details.order) && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Offer Information */}
            {details.offer && (
              <div className="bg-[#282836] rounded-lg p-6 shadow-xl border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-200 font-medium flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-green-400" />
                    Your Offer
                  </h3>
                  <span
                    className={`px-3 py-1 text-xs rounded-full font-medium ${
                      details.offer.status === "accepted"
                        ? "bg-green-500/20 text-green-400"
                        : details.offer.status === "pending"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {details.offer.status === "accepted" && (
                      <CheckCircle className="w-3 h-3 inline mr-1" />
                    )}
                    {details.offer.status === "declined" && (
                      <XCircle className="w-3 h-3 inline mr-1" />
                    )}
                    {details.offer.status.charAt(0).toUpperCase() +
                      details.offer.status.slice(1)}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-700">
                    <span className="text-gray-400 text-sm flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      Price
                    </span>
                    <span className="text-green-400 text-lg font-bold">
                      ${details.offer.price}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b border-gray-700">
                    <span className="text-gray-400 text-sm flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Delivery Time
                    </span>
                    <span className="text-gray-200 text-sm font-medium">
                      {details.offer.deliverTime}
                    </span>
                  </div>

                  <div className="py-2">
                    <span className="text-gray-400 text-sm block mb-2">
                      Message
                    </span>
                    <p className="text-gray-300 text-sm bg-gray-800/50 rounded-lg p-3">
                      {details.offer.message}
                    </p>
                  </div>

                  <div className="text-xs text-gray-500 pt-2">
                    Submitted: {formatDate(details.offer.createdAt)}
                  </div>
                </div>
              </div>
            )}

            {/* Order & Game Credentials - Only if order is paid */}
            {details.order && details.order.status === "paid" && (
              <div className="bg-[#282836] rounded-lg p-6 shadow-xl border border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-200 font-medium flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-blue-400" />
                    Order Details
                  </h3>
                  <span className="px-3 py-1 text-xs rounded-full font-medium bg-green-500/20 text-green-400">
                    <CheckCircle className="w-3 h-3 inline mr-1" />
                    Paid
                  </span>
                </div>

                {/* Game Credentials */}
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-4 mb-4 border border-gray-600">
                  <h4 className="text-gray-300 text-sm font-medium mb-3 flex items-center gap-2">
                    <Key className="w-4 h-4 text-yellow-400" />
                    Game Credentials
                  </h4>

                  <div className="space-y-3">
                    <div>
                      <label className="text-gray-500 text-xs block mb-1">
                        Username
                      </label>
                      <div className="flex items-center gap-2 bg-gray-800 rounded px-3 py-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-200 text-sm font-mono">
                          {details.order.gameUsername}
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="text-gray-500 text-xs block mb-1">
                        Password
                      </label>
                      <div className="flex items-center gap-2 bg-gray-800 rounded px-3 py-2">
                        <Key className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-200 text-sm font-mono flex-1">
                          {showPassword
                            ? details.order.gamePassword
                            : "••••••••"}
                        </span>
                        <button
                          onClick={() => setShowPassword(!showPassword)}
                          className="text-gray-400 hover:text-gray-200 text-xs"
                        >
                          {showPassword ? "Hide" : "Show"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Summary */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center py-2 border-b border-gray-700">
                    <span className="text-gray-400 text-sm">Order Price</span>
                    <span className="text-gray-200 text-sm">
                      ${details.order.orderPrice}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-700">
                    <span className="text-gray-400 text-sm">
                      Platform Charge
                    </span>
                    <span className="text-gray-200 text-sm">
                      ${details.order.platformCharge}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-300 font-medium">Total</span>
                    <span className="text-green-400 font-bold text-lg">
                      ${details.order.total}
                    </span>
                  </div>
                </div>

                <div className="text-xs text-gray-500 pt-3 border-t border-gray-700 mt-3">
                  Paid on: {formatDate(details.order.createdAt)}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Status Section - Conditional Display */}
        <div className="bg-[#282836] rounded-lg p-6 shadow-xl border border-gray-700">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <FaCircle
                className={`text-xs ${
                  details.isCancelled
                    ? "text-red-500"
                    : details.isCompleted
                      ? "text-blue-500"
                      : details.isActive
                        ? "text-green-500"
                        : "text-gray-500"
                }`}
              />
              <span className="text-gray-200 font-medium">
                {details.isCancelled
                  ? "Request Cancelled"
                  : details.isCompleted
                    ? "Request Completed"
                    : details.isActive
                      ? "Active Request"
                      : "Inactive Request"}
              </span>
            </div>

            {/* Status badges */}
            <div className="flex flex-wrap gap-2">
              {details.offer && (
                <span
                  className={`px-2 py-1 text-xs rounded ${
                    details.offer.status === "accepted"
                      ? "bg-green-500/20 text-green-400"
                      : details.offer.status === "pending"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-red-500/20 text-red-400"
                  }`}
                >
                  Offer {details.offer.status}
                </span>
              )}
              {details.order && (
                <span
                  className={`px-2 py-1 text-xs rounded ${
                    details.order.status === "paid"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-yellow-500/20 text-yellow-400"
                  }`}
                >
                  Order {details.order.status}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Conversation Section */}
        <div className="bg-[#282836] rounded-lg p-6 shadow-xl border border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-200 font-medium flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Conversation with Buyer
            </h3>
            {isConnected && (
              <span className="flex items-center gap-1 text-xs text-green-400">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Live
              </span>
            )}
          </div>

          {currentConversation ? (
            <div
              onClick={() =>
                router.push(
                  `/seller/message?conversation=${currentConversation._id}`,
                )
              }
              className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center">
                  {details.userId?.image ? (
                    <Image
                      src={details.userId.image}
                      alt={details.userId.name}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-white text-sm font-bold">
                      {details.userId?.name?.charAt(0)?.toUpperCase() || "B"}
                    </span>
                  )}
                </div>
                <div>
                  <p className="text-gray-200 text-sm font-medium">
                    {details.userId?.name || "Buyer"}
                  </p>
                  {currentConversation.lastMessage && (
                    <p className="text-gray-500 text-xs truncate max-w-xs">
                      {currentConversation.lastMessage}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {currentConversation.isActive && (
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                )}
                <MessageCircle className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <MessageCircle className="w-12 h-12 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400 mb-4">No conversation yet</p>
              <button
                onClick={handleCreateConversation}
                disabled={isCreatingConversation || !isConnected}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded transition-colors duration-200 disabled:opacity-50 flex items-center gap-2 mx-auto"
              >
                {isCreatingConversation ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <MessageCircle className="w-4 h-4" />
                    Talk with the Buyer
                  </>
                )}
              </button>
              {!isConnected && (
                <p className="text-yellow-500 text-xs mt-2">
                  Connecting to server...
                </p>
              )}
            </div>
          )}
        </div>

        {/* Create Offer Section - Only show if no offer exists */}
        {!details.offer && (
          <div className="bg-[#282836] rounded-lg p-6 shadow-xl border border-gray-700">
            <div className="text-center py-8">
              <DollarSign className="w-12 h-12 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400 mb-4">
                Submit your offer for this boosting request
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded transition-colors duration-200"
              >
                Create an Offer
              </button>
            </div>
          </div>
        )}
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
