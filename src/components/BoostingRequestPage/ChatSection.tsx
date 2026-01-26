"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

interface LegacyMessage {
  id: number;
  message: string;
  timestamp: string;
  isSeller?: boolean;
  isSystem?: boolean;
  isLink?: boolean;
  sender?: string;
}

interface SelectedOffer {
  seller?: string;
  rating?: number;
  reviews?: number;
  price: number;
}

interface ChatSectionProps {
  messages: LegacyMessage[];
  newMessage: string;
  onMessageChange: (value: string) => void;
  onSendMessage: () => void;
  selectedOffer: SelectedOffer | null;
}

export default function ChatSection({
  messages,
  newMessage,
  onMessageChange,
  onSendMessage,
  selectedOffer,
}: ChatSectionProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold flex items-center">
          <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
          Live chat with seller
        </h2>
        {selectedOffer && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
              <span className="text-xs">{selectedOffer.seller?.charAt(0) || "?"}</span>
            </div>
            <div>
              <div className="font-semibold">{selectedOffer.seller || "Seller"}</div>
              <div className="flex items-center space-x-1">
                <span className="text-xs text-green-400">
                  {selectedOffer.rating || 0}%
                </span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs text-gray-400">
                  {selectedOffer.reviews || 0} reviews
                </span>
              </div>
            </div>
            <div className="ml-4 text-lg font-bold">
              ${selectedOffer.price.toFixed(2)}
            </div>
          </div>
        )}
      </div>

      <div className="bg-gray-900 rounded-lg p-4 mb-4 h-64 overflow-y-auto">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`mb-3 ${message.isSeller ? "text-right" : "text-left"}`}
          >
            <div
              className={`inline-block max-w-[80%] p-3 rounded-lg ${
                message.isSeller
                  ? "bg-gray-700 text-white"
                  : "bg-blue-600 text-white"
              }`}
            >
              {message.isSystem && (
                <div className="text-xs text-gray-400 mb-1">System message</div>
              )}
              {message.isLink ? (
                <Link
                  href={message.message}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-300 underline"
                >
                  {message.message}
                </Link>
              ) : (
                message.message
              )}
              <div className="text-xs text-gray-400 mt-1">
                {message.timestamp}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex space-x-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => onMessageChange(e.target.value)}
          placeholder="Say something..."
          className="flex-1 bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none"
          onKeyPress={(e) => e.key === "Enter" && onSendMessage()}
        />
        <button
          onClick={onSendMessage}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9-9.5L12 5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
