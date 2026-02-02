"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { FaUser } from "react-icons/fa";
import { Loader2, Send, MessageCircle } from "lucide-react";
import {
  useGetMyConversationsQuery,
  useGetMessagesByConversationIdQuery,
} from "@/src/redux/features/conversations/conversationsApi";
import { useAppSelector } from "@/src/redux/hooks";
import {
  Conversation,
  ConversationsResponse,
  ConversationType,
  MessagesResponse,
  Message as MessageType,
} from "@/src/types/page.types";
import { formatMessageTime, formatRelativeTime } from "@/src/utils/pageHealper";
import {
  useSocket,
  useIsUserOnline,
  useSocketEvent,
} from "@/src/hooks/useSocket";
import { SOCKET_CONFIG } from "@/src/lib/socket/socketConfig";
import socketService from "@/src/lib/socket/socketService";

const tabs: { id: ConversationType; label: string }[] = [
  { id: "boosting", label: "Boosting" },
  { id: "support", label: "Support" },
];

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
      className={`flex items-start gap-3 px-4 py-3 cursor-pointer hover:bg-gray-800/50 transition-colors border-b border-gray-700/50 ${
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

const Message: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedConversationId = searchParams.get("conversation");

  const [activeTab, setActiveTab] = useState<ConversationType>("boosting");
  const [messageInput, setMessageInput] = useState("");
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [realtimeMessages, setRealtimeMessages] = useState<MessageType[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [typingConversations, setTypingConversations] = useState<Set<string>>(new Set());
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const currentUser = useAppSelector((state) => state.auth.user);
  const { isConnected } = useSocket();

  const handleSelectConversation = (conversationId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("conversation", conversationId);
    router.push(`?${params.toString()}`);
  };

  const handleClearConversation = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("conversation");
    router.push(`?${params.toString()}`);
  };

  const { data: conversationsData, isLoading: isLoadingConversations } =
    useGetMyConversationsQuery({
      page: 1,
      limit: 100,
      type: activeTab,
    });

  const { data: messagesData, isLoading: isLoadingMessages } =
    useGetMessagesByConversationIdQuery(
      {
        id: selectedConversationId || "",
        params: { page: 1, limit: 50 },
      },
      { skip: !selectedConversationId },
    );

  const conversations =
    (conversationsData as ConversationsResponse)?.conversations || [];
  const messages = (messagesData as MessagesResponse)?.messages || [];

  const selectedConversation = conversations.find(
    (c) => c._id === selectedConversationId,
  );

  const getOtherParticipant = (conversation: Conversation) => {
    return (
      conversation.participants.find((p) => p._id !== currentUser?._id) ||
      conversation.participants[0]
    );
  };

  const scrollToBottom = (smooth = true) => {
    if (messagesContainerRef.current) {
      if (smooth) {
        messagesContainerRef.current.scrollTo({
          top: messagesContainerRef.current.scrollHeight,
          behavior: "smooth",
        });
      } else {
        messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
      }
    }
  };

  // Clear realtime messages and typing state when conversation changes
  // This is intentional - resetting state when switching conversations
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRealtimeMessages([]);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsTyping(false);
  }, [selectedConversationId]);

  // Join/leave conversation room
  useEffect(() => {
    if (!selectedConversationId || !isConnected) return;

    // Join the conversation room
    socketService.joinConversation(
      { conversationId: selectedConversationId },
      (response) => {
        if (response.success) {
          console.log("[Socket] Joined conversation:", selectedConversationId);
        }
      },
    );

    // Mark as read
    socketService.markAsRead(selectedConversationId);

    return () => {
      socketService.leaveConversation(selectedConversationId);
    };
  }, [selectedConversationId, isConnected]);

  // Listen for new messages
  useSocketEvent<{ conversationId: string; message: MessageType }>(
    SOCKET_CONFIG.events.CONVERSATION_MESSAGE,
    useCallback(
      (data) => {
        if (data.conversationId === selectedConversationId) {
          setRealtimeMessages((prev) => [...prev, data.message]);
        }
      },
      [selectedConversationId],
    ),
    [selectedConversationId],
  );

  // Listen for typing indicators (track across all conversations)
  useSocketEvent<{ conversationId: string; userId: string; userName: string }>(
    SOCKET_CONFIG.events.CONVERSATION_USER_TYPING,
    useCallback(
      (data) => {
        if (data.userId !== currentUser?._id) {
          // Update typing for selected conversation
          if (data.conversationId === selectedConversationId) {
            setIsTyping(true);
          }
          // Track typing across all conversations for the list
          setTypingConversations((prev) => new Set(prev).add(data.conversationId));
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
        // Update typing for selected conversation
        if (data.conversationId === selectedConversationId) {
          setIsTyping(false);
        }
        // Remove from typing conversations set
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

  // Combine API messages with realtime messages
  const allMessages = React.useMemo(() => {
    const apiMessages = [...messages].reverse();
    // Filter out duplicates from realtime messages
    const uniqueRealtimeMessages = realtimeMessages.filter(
      (rtMsg) => !apiMessages.some((apiMsg) => apiMsg._id === rtMsg._id),
    );
    return [...apiMessages, ...uniqueRealtimeMessages];
  }, [messages, realtimeMessages]);

  // Scroll to bottom when new messages arrive or typing indicator shows
  useEffect(() => {
    // Small delay to ensure DOM is updated
    const timer = setTimeout(() => {
      scrollToBottom(true);
    }, 100);
    return () => clearTimeout(timer);
  }, [allMessages.length, isTyping]);

  // Instant scroll on initial load or conversation change
  useEffect(() => {
    scrollToBottom(false);
  }, [selectedConversationId]);

  const handleTabChange = (tab: ConversationType) => {
    setActiveTab(tab);
    handleClearConversation();
  };

  const handleSendMessage = async () => {
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

    try {
      // Send via socket
      socketService.sendMessage(
        {
          conversationId: selectedConversationId,
          message: messageText,
        },
        (response) => {
          setIsSending(false);
          if (!response.success) {
            console.error("Failed to send message:", response.error);
            setMessageInput(messageText);
          }
        }
      );

      // Fallback timeout in case callback doesn't fire
      setTimeout(() => setIsSending(false), 5000);
    } catch (error) {
      console.error("Failed to send message:", error);
      setMessageInput(messageText);
      setIsSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

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

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section className="">
      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-3 md:gap-2 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`px-4 py-2 border rounded text-sm font-medium transition-colors relative ${
              activeTab === tab.id
                ? "text-white bg-[#282836] border-orange-500"
                : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/50 border-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex h-[600px] rounded-lg overflow-hidden border border-gray-700">
        {/* Sidebar - Conversations List */}
        <div className="w-72 bg-[#282836] border-r border-gray-700 flex flex-col">
          {/* Header */}
          <div className="bg-[#ac21128f] text-white px-4 py-3 text-sm font-medium border-b border-gray-700">
            Browse Messages
          </div>

          {/* Conversations List */}
          <div className="flex-1 overflow-y-auto">
            {isLoadingConversations ? (
              <div className="flex flex-col items-center justify-center py-10">
                <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
                <p className="text-gray-500 text-xs mt-2">Loading...</p>
              </div>
            ) : conversations.length > 0 ? (
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
              <div className="flex flex-col items-center justify-center py-10 px-4">
                <MessageCircle className="w-10 h-10 text-gray-600 mb-2" />
                <p className="text-gray-500 text-sm text-center">
                  No {activeTab} conversations
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col bg-gray-900">
          {selectedConversationId && selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="flex items-center gap-3 px-6 py-4 bg-[#282836] border-b border-gray-700">
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center">
                  {getOtherParticipant(selectedConversation)?.image ? (
                    <Image
                      src={getOtherParticipant(selectedConversation).image}
                      alt={getOtherParticipant(selectedConversation).name}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FaUser className="text-white" />
                  )}
                  <OnlineIndicator
                    userId={getOtherParticipant(selectedConversation)?._id}
                  />
                </div>
                <div>
                  <span className="text-sm font-medium text-white block">
                    {getOtherParticipant(selectedConversation)?.name ||
                      "Unknown"}
                  </span>
                  <ChatHeaderStatus
                    isActive={selectedConversation.isActive}
                    isTyping={isTyping}
                    userId={getOtherParticipant(selectedConversation)?._id}
                  />
                </div>
              </div>

              {/* Messages Area */}
              <div
                ref={messagesContainerRef}
                className="flex-1 overflow-y-auto px-6 py-6 space-y-4"
              >
                {isLoadingMessages ? (
                  <div className="flex flex-col items-center justify-center h-full">
                    <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
                    <p className="text-gray-500 text-sm mt-2">
                      Loading messages...
                    </p>
                  </div>
                ) : allMessages.length > 0 ? (
                  <>
                    {allMessages.map((msg) => {
                      const isCurrentUser = msg.author._id === currentUser?._id;
                      return (
                        <div
                          key={msg._id}
                          className={`flex items-start gap-3 ${isCurrentUser ? "flex-row-reverse" : ""}`}
                        >
                          {/* Only show profile image for other user's messages */}
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
                            className={`max-w-xs md:max-w-md ${isCurrentUser ? "text-right" : ""}`}
                          >
                            <div
                              className={`rounded-lg px-4 py-2 inline-block ${
                                isCurrentUser
                                  ? "bg-red-600 text-white"
                                  : "bg-[#282836] text-gray-200"
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
                        <div className="bg-[#282836] rounded-lg px-4 py-2">
                          <TypingIndicator />
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full">
                    <MessageCircle className="w-12 h-12 text-gray-600 mb-3" />
                    <p className="text-gray-500 text-sm">
                      No messages yet. Start the conversation!
                    </p>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="px-6 py-4 bg-[#282836] border-t border-gray-700">
                {selectedConversation.isActive ? (
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      value={messageInput}
                      onChange={handleInputChange}
                      onKeyPress={handleKeyPress}
                      disabled={isSending}
                      className="flex-1 bg-gray-700 rounded-lg px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50"
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={isSending || !messageInput.trim()}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
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
            /* No Conversation Selected */
            <div className="flex-1 flex flex-col items-center justify-center bg-[#282836]">
              <MessageCircle className="w-16 h-16 text-gray-600 mb-4" />
              <h3 className="text-gray-300 text-lg font-medium mb-2">
                Select a Conversation
              </h3>
              <p className="text-gray-500 text-sm text-center max-w-xs">
                Choose a conversation from the list to view messages
              </p>
            </div>
          )}
        </div>

        {/* Copy notification */}
        {copiedCode && (
          <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg text-sm">
            Code copied to clipboard!
          </div>
        )}
      </div>
    </section>
  );
};

export default Message;
