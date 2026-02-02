"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
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
import { useGetMessagesByConversationIdQuery } from "../redux/features/conversations/conversationsApi";
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
import { FaCircle, FaUser } from "react-icons/fa";
import { toast } from "sonner";
import {
  BoostingOffer,
  BoostingPost,
  Conversation,
  SortOptionBoostingPost,
  Message as MessageType,
} from "../types/page.types";
import {
  formatBoostingType,
  formatDate,
  formatMessageTime,
  formatRelativeTime,
  getCompletionMethod,
  sortOptions,
} from "../utils/pageHealper";
import { useSocket, useIsUserOnline, useSocketEvent } from "../hooks/useSocket";
import socketService from "../lib/socket/socketService";
import { SOCKET_CONFIG } from "../lib/socket/socketConfig";

// Online status indicator component
const OnlineIndicator: React.FC<{ userId: string | undefined }> = ({
  userId,
}) => {
  const isOnline = useIsUserOnline(userId);
  return (
    <span
      className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#282836] ${
        isOnline ? "bg-green-500" : "bg-gray-500"
      }`}
    />
  );
};

// Typing indicator component
const TypingIndicator: React.FC = () => (
  <div className="flex items-center gap-1 text-gray-400 text-sm">
    <span className="flex gap-1">
      <span
        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
        style={{ animationDelay: "0ms" }}
      />
      <span
        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
        style={{ animationDelay: "150ms" }}
      />
      <span
        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
        style={{ animationDelay: "300ms" }}
      />
    </span>
    <span className="ml-2">typing...</span>
  </div>
);

// Chat header status component
const ChatHeaderStatus: React.FC<{
  isActive: boolean;
  isTyping: boolean;
  userId: string | undefined;
}> = ({ isActive, isTyping, userId }) => {
  const isOnline = useIsUserOnline(userId);

  if (isTyping) {
    return (
      <span className="text-xs text-green-400 flex items-center gap-1">
        <span className="flex gap-0.5">
          <span
            className="w-1 h-1 bg-green-400 rounded-full animate-bounce"
            style={{ animationDelay: "0ms" }}
          />
          <span
            className="w-1 h-1 bg-green-400 rounded-full animate-bounce"
            style={{ animationDelay: "100ms" }}
          />
          <span
            className="w-1 h-1 bg-green-400 rounded-full animate-bounce"
            style={{ animationDelay: "200ms" }}
          />
        </span>
        typing...
      </span>
    );
  }

  if (!isActive) {
    return <span className="text-xs text-gray-500">Inactive</span>;
  }

  return (
    <span
      className={`text-xs ${isOnline ? "text-green-400" : "text-gray-500"}`}
    >
      {isOnline ? "Online" : "Offline"}
    </span>
  );
};

// Conversation list item with online/typing status
const ConversationListItem: React.FC<{
  otherUserId: string | undefined;
  otherUserName: string;
  otherUserImage: string | null;
  lastMessage: string | undefined;
  updatedAt: string;
  isSelected: boolean;
  isTyping: boolean;
  onClick: () => void;
}> = ({
  otherUserId,
  otherUserName,
  otherUserImage,
  lastMessage,
  updatedAt,
  isSelected,
  isTyping,
  onClick,
}) => {
  const isOnline = useIsUserOnline(otherUserId);

  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-800/50 transition-colors border-b border-gray-700/50 ${
        isSelected ? "bg-gray-800/50" : ""
      }`}
    >
      <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center flex-shrink-0">
        {otherUserImage ? (
          <Image
            src={otherUserImage}
            alt={otherUserName}
            width={40}
            height={40}
            className="w-full h-full object-cover"
          />
        ) : (
          <FaUser className="text-white text-sm" />
        )}
        <span
          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#282836] ${
            isOnline ? "bg-green-500" : "bg-gray-500"
          }`}
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-1">
          <span className="text-sm font-medium text-white truncate">
            {otherUserName || "Unknown"}
          </span>
          <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
            {formatRelativeTime(updatedAt)}
          </span>
        </div>
        {isTyping ? (
          <p className="text-xs text-green-400 flex items-center gap-1">
            <span className="flex gap-0.5">
              <span
                className="w-1 h-1 bg-green-400 rounded-full animate-bounce"
                style={{ animationDelay: "0ms" }}
              />
              <span
                className="w-1 h-1 bg-green-400 rounded-full animate-bounce"
                style={{ animationDelay: "100ms" }}
              />
              <span
                className="w-1 h-1 bg-green-400 rounded-full animate-bounce"
                style={{ animationDelay: "200ms" }}
              />
            </span>
            typing...
          </p>
        ) : (
          <p className="text-xs text-gray-400 truncate">
            {lastMessage || "No messages yet"}
          </p>
        )}
      </div>
    </div>
  );
};

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
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Socket-based state
  const [offers, setOffers] = useState<BoostingOffer[]>([]);
  const [isLoadingOffers, setIsLoadingOffers] = useState(true);
  const [realtimeMessages, setRealtimeMessages] = useState<MessageType[]>([]);
  const [realtimeConversations, setRealtimeConversations] = useState<
    Conversation[]
  >([]);
  const [updatedConversationIds, setUpdatedConversationIds] = useState<
    Set<string>
  >(new Set());
  const [isSending, setIsSending] = useState(false);
  const [isCreatingConversation, setIsCreatingConversation] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [typingConversations, setTypingConversations] = useState<Set<string>>(
    new Set(),
  );

  const currentUser = useAppSelector((state) => state.auth.user);
  const { isConnected } = useSocket();

  // API Queries (keeping for boosting details)
  const {
    data: boostingDetails,
    isLoading: isLoadingDetails,
    refetch: refetchDetails,
  } = useGetBoostingPostByIdQuery(boostingId!, { skip: !boostingId });

  // Get messages from API
  const { data: messagesData, isLoading: isLoadingMessagesApi } =
    useGetMessagesByConversationIdQuery(
      {
        id: selectedConversationId || "",
        params: { page: 1, limit: 50 },
      },
      { skip: !selectedConversationId },
    );

  // Mutations
  const [cancelBoosting, { isLoading: isCancelling }] =
    useMakeBoostingAsCancelledMutation();
  const [respondToOffer, { isLoading: isRespondingToOffer }] =
    useRespondToOfferMutation();

  const details = boostingDetails as BoostingPost | undefined;
  const apiMessages =
    (messagesData as { messages: MessageType[] })?.messages || [];

  // Combine API conversations with realtime conversations
  const conversations = React.useMemo(() => {
    const apiConversations = details?.conversations || [];

    // Merge: realtime first (newer), then API conversations (excluding duplicates)
    const allConvs = [...realtimeConversations];
    apiConversations.forEach((apiConv) => {
      if (!allConvs.some((c) => c._id === apiConv._id)) {
        allConvs.push(apiConv);
      }
    });

    // Sort by updatedAt (most recent first) and prioritize updated ones
    return allConvs.sort((a, b) => {
      const aUpdated = updatedConversationIds.has(a._id);
      const bUpdated = updatedConversationIds.has(b._id);
      if (aUpdated && !bUpdated) return -1;
      if (!aUpdated && bUpdated) return 1;
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
  }, [details?.conversations, realtimeConversations, updatedConversationIds]);

  // Combine API messages with realtime messages
  const allMessages = React.useMemo(() => {
    const reversed = [...apiMessages].reverse();
    // Filter out duplicates from realtime messages
    const uniqueRealtimeMessages = realtimeMessages.filter(
      (rtMsg) => !reversed.some((apiMsg) => apiMsg._id === rtMsg._id),
    );
    return [...reversed, ...uniqueRealtimeMessages];
  }, [apiMessages, realtimeMessages]);

  // Fetch offers via socket
  const fetchOffers = useCallback(() => {
    if (!boostingId || !isConnected) return;

    setIsLoadingOffers(true);
    socketService.getBoostingPostOffers<{ offers: BoostingOffer[] }>(
      boostingId,
      (response) => {
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

  // Initial fetch for offers
  useEffect(() => {
    if (isConnected && boostingId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- Intentional: fetch on connection
      fetchOffers();
    }
  }, [isConnected, boostingId, fetchOffers]);

  // Clear realtime messages and typing state when conversation changes
  // This intentional setState on dependency change to reset UI state when switching conversations
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRealtimeMessages([]);
     
    setIsTyping(false);
  }, [selectedConversationId]);

  // Join/leave conversation room
  useEffect(() => {
    if (!selectedConversationId || !isConnected) return;

    // Join the conversation room
    socketService.joinConversation({ conversationId: selectedConversationId });

    // Mark as read
    socketService.markAsRead(selectedConversationId);

    return () => {
      socketService.leaveConversation(selectedConversationId);
    };
  }, [selectedConversationId, isConnected]);

  // Listen for new offers in real-time (offer:new event)
  useSocketEvent<{ offer: BoostingOffer; message?: string }>(
    SOCKET_CONFIG.events.OFFER_NEW,
    useCallback((data) => {
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

  // Listen for offer notifications (notification:offer event - sent directly to post owner)
  useSocketEvent<{
    type: string;
    offer: BoostingOffer;
    message?: string;
  }>(
    SOCKET_CONFIG.events.NOTIFICATION_OFFER,
    useCallback(
      (data) => {
        if (!data.offer || data.type !== "new_offer") return;

        // Check if this offer is for the current boosting post
        // boostingPostId can be string or object with _id
        const postId = data.offer.boostingPostId as unknown;
        const offerPostId =
          typeof postId === "string" ? postId : (postId as { _id?: string })?._id;

        if (offerPostId === boostingId) {
          setOffers((prev) => {
            const exists = prev.some((o) => o._id === data.offer._id);
            if (exists) return prev;
            return [data.offer, ...prev];
          });
          toast.info(data.message || "New offer received!");
        }
      },
      [boostingId],
    ),
    [boostingId],
  );

  // Listen for new conversations
  useSocketEvent<{ conversation: Conversation; message: string }>(
    SOCKET_CONFIG.events.CONVERSATION_NEW,
    useCallback(
      (data) => {
        if (data.conversation) {
          setRealtimeConversations((prev) => {
            if (prev.some((c) => c._id === data.conversation._id)) {
              return prev;
            }
            return [data.conversation, ...prev];
          });
          refetchDetails();
        }
      },
      [refetchDetails],
    ),
    [refetchDetails],
  );

  // Listen for new messages in real-time
  useSocketEvent<{ conversationId: string; message: MessageType }>(
    SOCKET_CONFIG.events.CONVERSATION_MESSAGE,
    useCallback(
      (data) => {
        // Add message to realtime messages if in selected conversation
        if (data.conversationId === selectedConversationId) {
          setRealtimeMessages((prev) => [...prev, data.message]);
        }

        // Update conversation in the list
        setUpdatedConversationIds((prev) =>
          new Set(prev).add(data.conversationId),
        );

        // Update the conversation's lastMessage
        setRealtimeConversations((prev) => {
          const existingIndex = prev.findIndex(
            (c) => c._id === data.conversationId,
          );
          if (existingIndex >= 0) {
            const updated = [...prev];
            updated[existingIndex] = {
              ...updated[existingIndex],
              lastMessage: data.message.message,
              updatedAt: data.message.createdAt || new Date().toISOString(),
            };
            return updated;
          }
          return prev;
        });

        // Clear the updated flag after a short delay
        setTimeout(() => {
          setUpdatedConversationIds((prev) => {
            const next = new Set(prev);
            next.delete(data.conversationId);
            return next;
          });
        }, 3000);
      },
      [selectedConversationId],
    ),
    [selectedConversationId],
  );

  // Listen for conversation updates
  useSocketEvent<{ conversation: Conversation }>(
    SOCKET_CONFIG.events.CONVERSATION_UPDATED,
    useCallback((data) => {
      if (data.conversation) {
        setRealtimeConversations((prev) => {
          const existingIndex = prev.findIndex(
            (c) => c._id === data.conversation._id,
          );
          if (existingIndex >= 0) {
            const updated = [...prev];
            updated[existingIndex] = data.conversation;
            return updated;
          }
          return [data.conversation, ...prev];
        });
      }
    }, []),
    [],
  );

  // Listen for typing indicators
  useSocketEvent<{ conversationId: string; userId: string; userName: string }>(
    SOCKET_CONFIG.events.CONVERSATION_USER_TYPING,
    useCallback(
      (data) => {
        if (data.userId !== currentUser?._id) {
          if (data.conversationId === selectedConversationId) {
            setIsTyping(true);
          }
          setTypingConversations((prev) =>
            new Set(prev).add(data.conversationId),
          );
        }
      },
      [selectedConversationId, currentUser?._id],
    ),
    [selectedConversationId, currentUser?._id],
  );

  // Listen for stop typing
  useSocketEvent<{ conversationId: string; userId: string }>(
    SOCKET_CONFIG.events.CONVERSATION_USER_STOP_TYPING,
    useCallback(
      (data) => {
        if (data.conversationId === selectedConversationId) {
          setIsTyping(false);
        }
        setTypingConversations((prev) => {
          const next = new Set(prev);
          next.delete(data.conversationId);
          return next;
        });
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
    if (!messageInput.trim() || !selectedConversationId || isSending) return;

    const messageText = messageInput.trim();
    setMessageInput("");
    setIsSending(true);

    // Stop typing indicator
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }
    socketService.stopTyping({ conversationId: selectedConversationId });

    socketService.sendMessage(
      {
        conversationId: selectedConversationId,
        message: messageText,
      },
      (response) => {
        setIsSending(false);
        if (!response.success) {
          setMessageInput(messageText);
          toast.error(response.error || "Failed to send message");
        }
        // Focus input after sending
        inputRef.current?.focus();
      },
    );

    // Fallback timeout
    setTimeout(() => {
      setIsSending(false);
      inputRef.current?.focus();
    }, 2000);
  }, [messageInput, selectedConversationId, isSending]);

  // Handle typing indicator
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageInput(e.target.value);

    if (!selectedConversationId || !isConnected) return;

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Emit typing event
    socketService.startTyping({ conversationId: selectedConversationId });

    // Stop typing after 2 seconds of inactivity
    typingTimeoutRef.current = setTimeout(() => {
      socketService.stopTyping({ conversationId: selectedConversationId });
    }, 2000);
  };

  // Cleanup typing timeout on unmount
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

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
      if (smooth) {
        messagesContainerRef.current.scrollTo({
          top: messagesContainerRef.current.scrollHeight,
          behavior: "smooth",
        });
      } else {
        messagesContainerRef.current.scrollTop =
          messagesContainerRef.current.scrollHeight;
      }
    }
  }, []);

  // Scroll to bottom when new messages arrive or typing indicator shows
  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToBottom(true);
    }, 100);
    return () => clearTimeout(timer);
  }, [allMessages.length, isTyping, scrollToBottom]);

  // Instant scroll on conversation change
  useEffect(() => {
    scrollToBottom(false);
  }, [selectedConversationId, scrollToBottom]);

  // Handle key press for sending message
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Get selected conversation details
  const selectedConversation = conversations.find(
    (c) => c._id === selectedConversationId,
  );

  const getOtherParticipant = (conversation: Conversation) => {
    return (
      conversation.participants.find((p) => p._id !== currentUser?._id) ||
      conversation.participants[0]
    );
  };

  const handleSelectConversation = (conversationId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("conversation", conversationId);
    router.push(`?${params.toString()}`);
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
                  {conversations.length > 0 ? (
                    conversations.map((conv) => {
                      const otherUser = getOtherParticipant(conv);
                      return (
                        <ConversationListItem
                          key={conv._id}
                          otherUserId={otherUser?._id}
                          otherUserName={otherUser?.name || "Unknown"}
                          otherUserImage={otherUser?.image || null}
                          lastMessage={conv.lastMessage}
                          updatedAt={conv.updatedAt}
                          isSelected={selectedConversationId === conv._id}
                          isTyping={typingConversations.has(conv._id)}
                          onClick={() => handleSelectConversation(conv._id)}
                        />
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
                        <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center">
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
                            <FaUser className="text-white text-xs" />
                          )}
                          <OnlineIndicator
                            userId={
                              getOtherParticipant(selectedConversation)?._id
                            }
                          />
                        </div>
                        <div>
                          <span className="text-sm font-medium block">
                            {getOtherParticipant(selectedConversation)?.name}
                          </span>
                          <ChatHeaderStatus
                            isActive={selectedConversation.isActive}
                            isTyping={isTyping}
                            userId={
                              getOtherParticipant(selectedConversation)?._id
                            }
                          />
                        </div>
                      </div>

                      {/* Messages */}
                      <div
                        ref={messagesContainerRef}
                        className="flex-1 overflow-y-auto p-4 space-y-3"
                      >
                        {isLoadingMessagesApi ? (
                          <div className="flex items-center justify-center h-full">
                            <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
                          </div>
                        ) : allMessages.length > 0 ? (
                          <>
                            {allMessages.map((msg) => {
                              const isCurrentUser =
                                msg.author._id === currentUser?._id;
                              return (
                                <div
                                  key={msg._id}
                                  className={`flex items-start gap-3 ${isCurrentUser ? "flex-row-reverse" : ""}`}
                                >
                                  {!isCurrentUser && (
                                    <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center flex-shrink-0">
                                      {msg.author.image ? (
                                        <Image
                                          src={msg.author.image}
                                          alt={msg.author.name}
                                          width={32}
                                          height={32}
                                          className="w-full h-full object-cover"
                                        />
                                      ) : (
                                        <FaUser className="text-white text-xs" />
                                      )}
                                    </div>
                                  )}
                                  <div
                                    className={`max-w-[70%] ${isCurrentUser ? "text-right" : ""}`}
                                  >
                                    <div
                                      className={`rounded-lg px-3 py-2 inline-block ${
                                        isCurrentUser
                                          ? "bg-red-600 text-white"
                                          : "bg-gray-700 text-gray-200"
                                      }`}
                                    >
                                      <p className="text-sm whitespace-pre-wrap">
                                        {msg.message}
                                      </p>
                                    </div>
                                    <span className="text-xs text-gray-500 mt-1 block">
                                      {formatMessageTime(msg.createdAt)}
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                            {/* Typing indicator */}
                            {isTyping && (
                              <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center flex-shrink-0">
                                  <FaUser className="text-white text-xs" />
                                </div>
                                <div className="bg-gray-700 rounded-lg px-3 py-2">
                                  <TypingIndicator />
                                </div>
                              </div>
                            )}
                            <div ref={messagesEndRef} />
                          </>
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <MessageCircle className="w-12 h-12 text-gray-600 mb-3" />
                            <p className="text-gray-500 text-sm">
                              No messages yet. Start the conversation!
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Input */}
                      <div className="p-3 border-t border-gray-700">
                        {selectedConversation.isActive ? (
                          <div className="flex items-center gap-2">
                            <input
                              ref={inputRef}
                              type="text"
                              placeholder="Type a message..."
                              value={messageInput}
                              onChange={handleInputChange}
                              onKeyPress={handleKeyPress}
                              disabled={isSending}
                              className="flex-1 bg-gray-700 rounded px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50"
                            />
                            <button
                              onClick={handleSendMessage}
                              disabled={isSending || !messageInput.trim()}
                              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                              {isSending ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <Send className="w-4 h-4" />
                              )}
                              Send
                            </button>
                          </div>
                        ) : (
                          <div className="text-center py-2">
                            <p className="text-gray-500 text-sm">
                              This conversation is no longer active
                            </p>
                          </div>
                        )}
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
