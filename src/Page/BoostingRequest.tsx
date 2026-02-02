"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Header from "@/src/components/Landing/Header";
import Footer from "@/src/components/Landing/Footer";
import CancelBoostingRequestModal from "@/src/components/BoostingRequestPage/CancelBoostingRequestModal";
import EmptyBoostingRequest from "@/src/components/BoostingRequestPage/EmptyBoostingRequest";
import {
  useGetBoostingPostByIdQuery,
  useMakeBoostingAsCancelledMutation,
} from "../redux/features/boosting-post/boostingApi";
import { useRespondToOfferMutation } from "../redux/features/offers/offersApi";
import { useAppSelector } from "../redux/hooks";
import {
  Loader2,
  MessageCircle,
  Send,
  ChevronDown,
  Clock,
  DollarSign,
  CheckCircle,
  User,
} from "lucide-react";
import { FaCircle } from "react-icons/fa";
import { toast } from "sonner";
import {
  BoostingOffer,
  BoostingPost,
  Conversation,
  SortOptionBoostingPost,
} from "../types/page.types";
import {
  formatBoostingType,
  formatDate,
  formatMessageTime,
  getCompletionMethod,
  sortOptions,
} from "../utils/pageHealper";
import { useSocket, useSocketEvent } from "../hooks/useSocket";
import socketService from "../lib/socket/socketService";
import { SOCKET_CONFIG } from "../lib/socket/socketConfig";
import type { SocketMessage } from "../redux/features/socket/socket.types";

interface Message {
  _id: string;
  message: string;
  author: { _id: string; name: string; image?: string };
  createdAt: string;
}

export default function BoostingRequestPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const boostingId = searchParams.get("boostingId");
  const selectedConversationId = searchParams.get("conversation");

  const [sortBy, setSortBy] = useState<SortOptionBoostingPost>("newest");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [messageInput, setMessageInput] = useState("");
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Socket-based state
  const [offers, setOffers] = useState<BoostingOffer[]>([]);
  const [isLoadingOffers, setIsLoadingOffers] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isCreatingConversation, setIsCreatingConversation] = useState(false);

  const currentUser = useAppSelector((state) => state.auth.user);
  const { isConnected } = useSocket();

  // API Queries (keeping for boosting details)
  const {
    data: boostingDetails,
    isLoading: isLoadingDetails,
    refetch: refetchDetails,
  } = useGetBoostingPostByIdQuery(boostingId!, { skip: !boostingId });

  // Mutations
  const [cancelBoosting, { isLoading: isCancelling }] =
    useMakeBoostingAsCancelledMutation();
  const [respondToOffer, { isLoading: isRespondingToOffer }] =
    useRespondToOfferMutation();

  const details = boostingDetails as BoostingPost | undefined;

  // Fetch offers via socket
  const fetchOffers = useCallback(() => {
    if (!boostingId || !isConnected) return;

    setIsLoadingOffers(true);
    socketService.getBoostingPostOffers<{ offers: BoostingOffer[] }>(
      boostingId,
      (response) => {
        console.log(response, "offers response");

        setIsLoadingOffers(false);
        if (response.success && response.data?.offers) {
          setOffers(response.data.offers);
        }
      },
    );

    // Fallback timeout
    setTimeout(() => {
      setIsLoadingOffers((prev) => (prev ? false : prev));
    }, 10000);
  }, [boostingId, isConnected]);

  // Fetch messages via socket
  const fetchMessages = useCallback(() => {
    if (!selectedConversationId || !isConnected) return;

    setIsLoadingMessages(true);
    socketService.getMessages(
      selectedConversationId,
      { page: 1, limit: 50 },
      (response) => {
        setIsLoadingMessages(false);
        if (response.success && response.data?.messages) {
          setMessages(response.data.messages as unknown as Message[]);
        }
      },
    );
  }, [selectedConversationId, isConnected]);

  // Initial fetch for offers
  useEffect(() => {
    if (isConnected && boostingId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- Intentional: fetch on connection
      fetchOffers();
    }
  }, [isConnected, boostingId, fetchOffers]);

  // Fetch messages when conversation changes
  useEffect(() => {
    if (isConnected && selectedConversationId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- Intentional: fetch on selection
      fetchMessages();
      // Join conversation room
      socketService.joinConversation({
        conversationId: selectedConversationId,
      });
    }

    return () => {
      if (selectedConversationId) {
        socketService.leaveConversation(selectedConversationId);
      }
    };
  }, [isConnected, selectedConversationId, fetchMessages]);

  // Listen for new offers in real-time
  useSocketEvent<{ offer: BoostingOffer; message?: string }>(
    SOCKET_CONFIG.events.OFFER_NEW,
    useCallback((data) => {
      console.log(data, "new offer data");
      if (data.offer) {
        setOffers((prev) => {
          const exists = prev.some((o) => o._id === data.offer._id);
          if (exists) return prev;
          return [data.offer, ...prev];
        });
        toast.info("New offer received!");
      }
    }, []),
    [boostingId],
  );

  // Listen for new messages in real-time
  useSocketEvent<SocketMessage>(
    SOCKET_CONFIG.events.CONVERSATION_MESSAGE,
    useCallback(
      (data) => {
        console.log(data, "new conversation message data");
        if (data.conversationId === selectedConversationId) {
          const newMessage: Message = {
            _id: data._id,
            message: data.content,
            author: {
              _id: data.senderId,
              name: data.senderName,
            },
            createdAt: data.createdAt,
          };

          setMessages((prev) => {
            const exists = prev.some((m) => m._id === newMessage._id);
            if (exists) return prev;
            return [...prev, newMessage];
          });
        }
      },
      [selectedConversationId],
    ),
    [selectedConversationId],
  );

  // Sort offers
  const sortedOffers = [...offers].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "price_low":
        return a.price - b.price;
      case "price_high":
        return b.price - a.price;
      case "rating":
        // Since we don't have rating in the offer data, sort by newest as fallback
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      default:
        return 0;
    }
  });

  // Handle chat with seller via socket
  const handleChatWithSeller = useCallback(
    (sellerId: string) => {
      // Find existing conversation with a seller
      const existingConversation = details?.conversations?.find((conv) =>
        conv.participants.some((p) => p._id === sellerId),
      );
      if (existingConversation) {
        // Select existing conversation
        const params = new URLSearchParams(searchParams.toString());
        params.set("conversation", existingConversation._id);
        router.push(`?${params.toString()}`);
      } else {
        if (!isConnected) {
          toast.error("Not connected to server");
          return;
        }

        setIsCreatingConversation(true);

        // Create new conversation via socket
        socketService.createConversation(
          {
            receiverId: sellerId,
            type: "boosting",
            referenceId: boostingId!,
          },
          (response) => {
            setIsCreatingConversation(false);

            if (response.success && response.data) {
              const conversation = response.data as Conversation;
              const params = new URLSearchParams(searchParams.toString());
              params.set("conversation", conversation._id);
              router.push(`?${params.toString()}`);
              toast.success("Conversation started!");
              refetchDetails(); // Refresh to get updated conversations
            } else if (response.message?.includes("Existing conversation")) {
              const conversation = response.data as Conversation;
              const params = new URLSearchParams(searchParams.toString());
              params.set("conversation", conversation._id);
              router.push(`?${params.toString()}`);
            } else {
              toast.error(response.error || "Failed to start conversation");
            }
          },
        );

        // Fallback timeout
        setTimeout(() => {
          setIsCreatingConversation(false);
        }, 10000);
      }
    },
    [details, searchParams, router, boostingId, isConnected, refetchDetails],
  );

  // Handle send message via socket
  const handleSendMessage = useCallback(() => {
    if (!messageInput.trim() || !selectedConversationId || !isConnected) return;

    setIsSending(true);

    socketService.sendMessage(
      {
        conversationId: selectedConversationId,
        message: messageInput.trim(),
      },
      (response) => {
        setIsSending(false);

        if (response.success) {
          setMessageInput("");
          // Message will be added via the socket listener
        } else {
          toast.error(response.error || "Failed to send message");
        }
      },
    );

    // Fallback timeout
    setTimeout(() => {
      setIsSending(false);
    }, 10000);
  }, [messageInput, selectedConversationId, isConnected]);

  // Handle cancel request
  const handleConfirmCancel = async () => {
    if (!boostingId) return;
    try {
      await cancelBoosting(boostingId).unwrap();
      setIsCancelModalOpen(false);
      toast.success("Request cancelled successfully");
    } catch (error) {
      console.error("Failed to cancel request:", error);
      toast.error("Failed to cancel request");
    }
  };

  // Handle respond to offer
  const handleRespondToOffer = async (
    offerId: string,
    offer: BoostingOffer,
  ) => {
    try {
      await respondToOffer({ offerId, status: "accepted" }).unwrap();
      toast.success("Offer accepted!");

      // Redirect to payments page with offer details
      const paymentParams = new URLSearchParams({
        offer_id: offerId,
        price: offer.price.toString(),
        seller_id: offer.userId._id,
        seller_name: offer.userId.name,
        boosting_id: boostingId || "",
        delivery_time: offer.deliverTime || "",
      });
      router.push(`/payments?${paymentParams.toString()}`);
    } catch (error) {
      console.error("Failed to respond to offer:", error);
      toast.error("Failed to respond to offer");
    }
  };

  // Scroll to bottom of messages within container
  const scrollToBottom = useCallback((smooth = true) => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: smooth ? "smooth" : "auto",
      });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Handle key press for sending message
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Get selected conversation details
  const selectedConversation = details?.conversations?.find(
    (c) => c._id === selectedConversationId,
  );

  const getOtherParticipant = (conversation: Conversation) => {
    return (
      conversation.participants.find((p) => p._id !== currentUser?._id) ||
      conversation.participants[0]
    );
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

  // Loading state
  if (isLoadingDetails) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
            <p className="text-gray-400 mt-2">Loading...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // No boosting request found
  if (!details) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <EmptyBoostingRequest
            isOpen={true}
            onCreateRequest={() => router.push("/")}
          />
        </main>
        <Footer />
      </div>
    );
  }

  // Cancelled state
  if (details.isCancelled) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <EmptyBoostingRequest
            isOpen={true}
            onCreateRequest={() => router.push("/")}
          />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">
              League of Legends - {formatBoostingType(details.boostingType)}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <FaCircle
                className={`text-xs ${details.isActive ? "text-green-500" : "text-gray-500"}`}
              />
              <span className="text-gray-400 text-sm">
                {details.isActive ? "Active" : "Inactive"}
              </span>
            </div>
          </div>
          <button
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm disabled:opacity-50"
            onClick={() => setIsCancelModalOpen(true)}
            disabled={isCancelling}
          >
            {isCancelling ? "Cancelling..." : "Cancel Request"}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Offers */}
          <div className="lg:col-span-2 space-y-6">
            {/* Offers Section */}
            <div className="bg-[#282836] rounded-lg border border-gray-700">
              <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-semibold">
                    Offers ({offers.length})
                  </h2>
                  {isConnected && (
                    <span className="flex items-center gap-1 text-xs text-green-400">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      Live
                    </span>
                  )}
                </div>
                {/* Sort Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowSortDropdown(!showSortDropdown)}
                    className="flex items-center gap-2 px-3 py-2 bg-gray-700 rounded text-sm hover:bg-gray-600 transition-colors"
                  >
                    {sortOptions.find((s) => s.id === sortBy)?.label}
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  {showSortDropdown && (
                    <div className="absolute right-0 mt-1 w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-700 z-10">
                      {sortOptions.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => {
                            setSortBy(option.id);
                            setShowSortDropdown(false);
                          }}
                          className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-700 transition-colors ${
                            sortBy === option.id
                              ? "text-orange-400"
                              : "text-gray-300"
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {isLoadingOffers ? (
                <div className="flex flex-col items-center justify-center py-10">
                  <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
                  <p className="text-gray-500 text-sm mt-2">
                    Loading offers...
                  </p>
                </div>
              ) : sortedOffers.length > 0 ? (
                <div className="divide-y divide-gray-700/50">
                  {sortedOffers.map((offer) => (
                    <div
                      key={offer._id}
                      className="p-4 hover:bg-gray-800/30 transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        {/* Seller Avatar */}
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center flex-shrink-0">
                          {offer.userId.image ? (
                            <Image
                              src={offer.userId.image}
                              alt={offer.userId.name}
                              width={48}
                              height={48}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <User className="w-6 h-6 text-white" />
                          )}
                        </div>

                        {/* Offer Details */}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-white font-medium">
                              {offer.userId.name}
                            </span>
                            <span
                              className={`px-2 py-0.5 text-xs rounded ${
                                offer.status === "pending"
                                  ? "bg-yellow-500/20 text-yellow-400"
                                  : offer.status === "accepted"
                                    ? "bg-green-500/20 text-green-400"
                                    : "bg-red-500/20 text-red-400"
                              }`}
                            >
                              {offer.status}
                            </span>
                          </div>

                          <p className="text-gray-400 text-sm mb-2 line-clamp-2">
                            {offer.message}
                          </p>

                          <div className="flex flex-wrap items-center gap-4 text-sm">
                            <div className="flex items-center gap-1 text-green-400">
                              <DollarSign className="w-4 h-4" />
                              <span className="font-medium">
                                ${offer.price}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 text-gray-400">
                              <Clock className="w-4 h-4" />
                              <span>{offer.deliverTime}</span>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() =>
                              handleChatWithSeller(offer.userId._id)
                            }
                            disabled={isCreatingConversation}
                            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded transition-colors disabled:opacity-50 flex items-center gap-1"
                          >
                            <MessageCircle className="w-3 h-3" />
                            Chat
                          </button>
                          {offer.status === "pending" && (
                            <button
                              onClick={() =>
                                handleRespondToOffer(offer._id, offer)
                              }
                              disabled={isRespondingToOffer}
                              className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs rounded transition-colors disabled:opacity-50 flex items-center gap-1"
                            >
                              <CheckCircle className="w-3 h-3" />
                              Accept
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-10">
                  <MessageCircle className="w-12 h-12 text-gray-600 mb-3" />
                  <p className="text-gray-400">No offers yet</p>
                  <p className="text-gray-500 text-sm">
                    Sellers will send you offers soon
                  </p>
                </div>
              )}
            </div>

            {/* Conversations Section */}
            <div className="bg-[#282836] rounded-lg border border-gray-700">
              <div className="p-4 border-b border-gray-700 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Conversations</h2>
                {isConnected && (
                  <span className="flex items-center gap-1 text-xs text-green-400">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    Live
                  </span>
                )}
              </div>

              <div className="flex h-[400px]">
                {/* Conversation List */}
                <div className="w-1/3 border-r border-gray-700 overflow-y-auto">
                  {details.conversations && details.conversations.length > 0 ? (
                    details.conversations.map((conv) => {
                      const otherUser = getOtherParticipant(conv);
                      return (
                        <div
                          key={conv._id}
                          onClick={() => {
                            const params = new URLSearchParams(
                              searchParams.toString(),
                            );
                            params.set("conversation", conv._id);
                            router.push(`?${params.toString()}`);
                          }}
                          className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-800/50 transition-colors border-b border-gray-700/50 ${
                            selectedConversationId === conv._id
                              ? "bg-gray-800/50"
                              : ""
                          }`}
                        >
                          <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center flex-shrink-0">
                            {otherUser?.image ? (
                              <Image
                                src={otherUser.image}
                                alt={otherUser.name}
                                width={40}
                                height={40}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <User className="w-5 h-5 text-white" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">
                              {otherUser?.name || "Unknown"}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {conv.lastMessage || "No messages"}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full p-4">
                      <MessageCircle className="w-8 h-8 text-gray-600 mb-2" />
                      <p className="text-gray-500 text-sm text-center">
                        No conversations yet
                      </p>
                    </div>
                  )}
                </div>

                {/* Messages Area */}
                <div className="flex-1 flex flex-col">
                  {selectedConversationId && selectedConversation ? (
                    <>
                      {/* Chat Header */}
                      <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-700">
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center">
                          {getOtherParticipant(selectedConversation)?.image ? (
                            <Image
                              src={
                                getOtherParticipant(selectedConversation).image
                              }
                              alt={
                                getOtherParticipant(selectedConversation).name
                              }
                              width={32}
                              height={32}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <User className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <span className="text-sm font-medium">
                          {getOtherParticipant(selectedConversation)?.name}
                        </span>
                      </div>

                      {/* Messages */}
                      <div
                        ref={messagesContainerRef}
                        className="flex-1 overflow-y-auto p-4 space-y-3"
                      >
                        {isLoadingMessages ? (
                          <div className="flex items-center justify-center h-full">
                            <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
                          </div>
                        ) : messages.length > 0 ? (
                          <>
                            {[...messages].reverse().map((msg) => {
                              const isCurrentUser =
                                msg.author._id === currentUser?._id;
                              return (
                                <div
                                  key={msg._id}
                                  className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}
                                >
                                  <div
                                    className={`max-w-[70%] rounded-lg px-3 py-2 ${
                                      isCurrentUser
                                        ? "bg-red-600 text-white"
                                        : "bg-gray-700 text-gray-200"
                                    }`}
                                  >
                                    <p className="text-sm">{msg.message}</p>
                                    <span className="text-xs opacity-70 mt-1 block">
                                      {formatMessageTime(msg.createdAt)}
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                            <div ref={messagesEndRef} />
                          </>
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <p className="text-gray-500 text-sm">
                              No messages yet
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Input */}
                      <div className="p-3 border-t border-gray-700">
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            placeholder="Type a message..."
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            disabled={isSending}
                            className="flex-1 bg-gray-700 rounded px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                          />
                          <button
                            onClick={handleSendMessage}
                            disabled={isSending || !messageInput.trim()}
                            className="p-2 bg-red-600 hover:bg-red-700 rounded transition-colors disabled:opacity-50"
                          >
                            {isSending ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Send className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex-1 flex items-center justify-center">
                      <div className="text-center">
                        <MessageCircle className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                        <p className="text-gray-400">Select a conversation</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Request Details */}
          <div className="space-y-6">
            {/* Request Details */}
            <div className="bg-[#282836] rounded-lg border border-gray-700">
              <div className="p-4 border-b border-gray-700 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Request Details</h2>
                <span className="px-3 py-1 bg-orange-500/20 text-orange-400 text-xs rounded">
                  {formatBoostingType(details.boostingType)}
                </span>
              </div>

              <div className="p-4 space-y-2">
                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span className="text-gray-400 text-sm">Created</span>
                  <span className="text-gray-200 text-sm">
                    {formatDate(details.createdAt)}
                  </span>
                </div>

                {renderBoostingDetails()}

                <div className="flex justify-between items-center py-2 border-b border-gray-700">
                  <span className="text-gray-400 text-sm">
                    Completion Method
                  </span>
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
        </div>

        {/* Cancel Modal */}
        <CancelBoostingRequestModal
          isOpen={isCancelModalOpen}
          onClose={() => setIsCancelModalOpen(false)}
          onConfirm={handleConfirmCancel}
        />
      </main>
      <Footer />
    </div>
  );
}
