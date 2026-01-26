import React, { useState } from "react";
import ChatSection from "../BoostingRequestPage/ChatSection";

interface LegacyMessage {
  id: number;
  message: string;
  timestamp: string;
  isSeller?: boolean;
  isSystem?: boolean;
  isLink?: boolean;
  sender?: string;
}

interface LegacyOffer {
  id: number;
  seller: string;
  rating?: number;
  reviews?: number;
  price: number;
}

interface Conversation {
  id: number;
  userImage: string;
  username: string;
  lastMessage: string;
  lastActive: string;
  unreadCount?: number;
  isActive: boolean;
}

interface ConversationsProps {
  offers: LegacyOffer[];
  messages: LegacyMessage[];
  newMessage: string;
  onMessageChange: (message: string) => void;
  onSendMessage: () => void;
  selectedOffer: LegacyOffer | null;
}

function Conversations({
  offers,
  messages,
  newMessage,
  onMessageChange,
  onSendMessage,
  selectedOffer,
}: ConversationsProps) {
  const [activeConversation, setActiveConversation] = useState<number | null>(
    offers[0]?.id || null
  );

  // Convert offers to conversation format
  const conversations: Conversation[] = offers.map((offer) => {
    // Find the last message from this seller
    const lastMessage = messages
      .filter((msg) => msg.sender === offer.seller)
      .sort((a, b) => b.id - a.id)[0];

    return {
      id: offer.id,
      userImage: `/placeholder-user-${offer.id}.jpg`, // Placeholder image
      username: offer.seller,
      lastMessage: lastMessage ? lastMessage.message : "No messages yet",
      lastActive: lastMessage ? lastMessage.timestamp : "Just now",
      isActive: activeConversation === offer.id,
    };
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left column - Conversations List */}
      <div className="lg:col-span-1 bg-gray-800 rounded-lg p-4">
        <h2 className="text-xl font-bold mb-4">Conversations</h2>
        <div className="space-y-3">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                conversation.isActive
                  ? "bg-gray-700"
                  : "bg-gray-750 hover:bg-gray-700"
              }`}
              onClick={() => setActiveConversation(conversation.id)}
            >
              <div className="flex-shrink-0 mr-3">
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                  <span className="text-xs">
                    {conversation.username.charAt(0)}
                  </span>
                </div>
                {/* <img
                  src={conversation.userImage}
                  alt={conversation.username}
                  className="w-12 h-12 rounded-full object-cover"
                /> */}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold truncate">
                    {conversation.username}
                  </h3>
                  <span className="text-xs text-gray-400">
                    {conversation.lastActive}
                  </span>
                </div>
                <p className="text-sm text-gray-400 truncate">
                  {conversation.lastMessage}
                </p>
              </div>
              {conversation.unreadCount && conversation.unreadCount > 0 && (
                <div className="ml-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {conversation.unreadCount}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Right column - Chat Area */}
      <div className="lg:col-span-2 space-y-6">
        <ChatSection
          messages={messages}
          newMessage={newMessage}
          onMessageChange={onMessageChange}
          onSendMessage={onSendMessage}
          selectedOffer={selectedOffer}
        />
      </div>
    </div>
  );
}

export default Conversations;
