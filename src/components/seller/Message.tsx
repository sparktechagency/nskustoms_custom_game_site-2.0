"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { FaUser } from "react-icons/fa";
import { Loader2, Send, MessageCircle } from "lucide-react";
import {
  useGetMyConversationsQuery,
  useGetMessagesByConversationIdQuery,
  useSendMessageMutation,
} from "@/src/redux/features/conversations/conversationsApi";
import { useAppSelector } from "@/src/redux/hooks";
import {
  Conversation,
  ConversationsResponse,
  ConversationType,
  MessagesResponse,
} from "@/src/types/page.types";
import { formatMessageTime, formatRelativeTime } from "@/src/utils/pageHealper";

const tabs: { id: ConversationType; label: string }[] = [
  { id: "boosting", label: "Boosting" },
  { id: "support", label: "Support" },
];

const Message: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedConversationId = searchParams.get("conversation");

  const [activeTab, setActiveTab] = useState<ConversationType>("boosting");
  const [messageInput, setMessageInput] = useState("");
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentUser = useAppSelector((state) => state.auth.user);

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

  const {
    data: messagesData,
    isLoading: isLoadingMessages,
    refetch: refetchMessages,
  } = useGetMessagesByConversationIdQuery(
    {
      id: selectedConversationId || "",
      params: { page: 1, limit: 50 },
    },
    { skip: !selectedConversationId },
  );

  console.log(messagesData);

  const [sendMessage, { isLoading: isSending }] = useSendMessageMutation();

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

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleTabChange = (tab: ConversationType) => {
    setActiveTab(tab);
    handleClearConversation();
  };

  const handleSendMessage = async () => {
    if (!messageInput.trim() || !selectedConversationId) return;

    try {
      await sendMessage({
        id: selectedConversationId,
        messageBody: {
          message: messageInput.trim(),
        },
      }).unwrap();
      setMessageInput("");
      refetchMessages();
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

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
                  <div
                    key={conv._id}
                    onClick={() => handleSelectConversation(conv._id)}
                    className={`flex items-start gap-3 px-4 py-3 cursor-pointer hover:bg-gray-800/50 transition-colors border-b border-gray-700/50 ${
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
                        <FaUser className="text-white text-sm" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-sm font-medium text-white truncate">
                          {otherUser?.name || "Unknown"}
                        </span>
                        <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                          {formatRelativeTime(conv.updatedAt)}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 truncate">
                        {conv.lastMessage || "No messages yet"}
                      </p>
                    </div>
                  </div>
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
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center">
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
                </div>
                <div>
                  <span className="text-sm font-medium text-white block">
                    {getOtherParticipant(selectedConversation)?.name ||
                      "Unknown"}
                  </span>
                  <span
                    className={`text-xs ${selectedConversation.isActive ? "text-green-400" : "text-gray-500"}`}
                  >
                    {selectedConversation.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
                {isLoadingMessages ? (
                  <div className="flex flex-col items-center justify-center h-full">
                    <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
                    <p className="text-gray-500 text-sm mt-2">
                      Loading messages...
                    </p>
                  </div>
                ) : messages.length > 0 ? (
                  <>
                    {[...messages].reverse().map((msg) => {
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
                    <div ref={messagesEndRef} />
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
                      onChange={(e) => setMessageInput(e.target.value)}
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
