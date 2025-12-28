"use client";

import { useState } from "react";
import Header from "@/src/components/Landing/Header";
import OfferSection from "@/src/components/BoostingRequestPage/OfferSection";
import ChatSection from "@/src/components/BoostingRequestPage/ChatSection";
import RequestDetailsSection from "@/src/components/BoostingRequestPage/RequestDetailsSection";
import Footer from "@/src/components/Landing/Footer";
import Conversations from "@/src/components/Conversations/Conversations";
import CancelBoostingRequestModal from "@/src/components/BoostingRequestPage/CancelBoostingRequestModal";
import EmptyBoostingRequest from "@/src/components/BoostingRequestPage/EmptyBoostingRequest";
import { Message, Offer } from "../types/page.types";

export default function BoostingRequestPage() {
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isRequestCanceled, setIsRequestCanceled] = useState(false);

  // Mock data for offers
  const mockOffers: Offer[] = [
    {
      id: 1,
      seller: "Polar_nuh007",
      rating: 100,
      reviews: 116,
      deliveryTime: "2 days",
      price: 30.0,
      status: "online",
    },
    {
      id: 2,
      seller: "Josh4007",
      rating: 100,
      reviews: 60,
      deliveryTime: "2 days",
      price: 10.0,
      status: "online",
    },
    {
      id: 3,
      seller: "miami80",
      rating: 95,
      reviews: 22,
      deliveryTime: "1 day",
      price: 12.0,
      status: "online",
    },
    {
      id: 4,
      seller: "rush007",
      rating: 100,
      reviews: 32,
      deliveryTime: "3 days",
      price: 27.0,
      status: "online",
    },
  ];

  // Mock data for chat messages
  const mockMessages: Message[] = [
    {
      id: 1,
      sender: "rush007",
      message: "Hi booster, can I start your order?",
      timestamp: "just now",
      isSeller: true,
    },
    {
      id: 2,
      sender: "rush007",
      message: "Boosting request chat started",
      timestamp: "2 min",
      isSeller: true,
      isSystem: true,
    },
    {
      id: 3,
      sender: "rush007",
      message:
        "450d801e830e7a0f7c8dcdfdd4d1a2048e-3-dorr www.ramenshopping.com",
      timestamp: "2 min",
      isSeller: true,
      isLink: true,
    },
    {
      id: 4,
      sender: "rush007",
      message: "Hi booster, can I start your order?",
      timestamp: "2 min",
      isSeller: true,
    },
  ];

  // Mock data for request details
  const requestDetails = {
    created: "Dec 15, 2025, 9:43AM",
    expires: "Dec 15, 2025, 9:43AM",
    currentRank: "Iron V",
    currentLP: 2,
    queue: "Solo/Duo",
    desiredRank: "Bronze IV",
    region: "North America",
    completionMethod: "Solo",
  };

  // Handle sending a new message
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: messages.length + 1,
        sender: "You",
        message: newMessage,
        timestamp: "just now",
        isSeller: false,
      };

      setMessages([...messages, message]);
      setNewMessage("");
    }
  };

  // Handle opening the cancel modal
  const handleOpenCancelModal = () => {
    setIsCancelModalOpen(true);
  };

  // Handle confirming the cancellation
  const handleConfirmCancel = () => {
    setIsCancelModalOpen(false);
    setIsRequestCanceled(true);
  };

  // Handle creating a new request after cancellation
  const handleCreateNewRequest = () => {
    setIsRequestCanceled(false);
    // Reset the state if needed for a new request
    setSelectedOffer(null);
    setMessages([]);
    setNewMessage("");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">League of Legends - Rank Boost</h1>
          <button
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm"
            onClick={handleOpenCancelModal}
          >
            Cancel Request
          </button>
        </div>

        {isRequestCanceled ? (
          <EmptyBoostingRequest
            isOpen={true}
            onCreateRequest={handleCreateNewRequest}
          />
        ) : (
          <>
            <div className="mb-6">
              <OfferSection
                offers={mockOffers}
                selectedOffer={selectedOffer}
                onSelectOffer={setSelectedOffer}
              />
            </div>
            {/* Conversations */}
            <div className="pb-8">
              <Conversations
                offers={mockOffers}
                messages={mockMessages}
                newMessage={newMessage}
                onMessageChange={setNewMessage}
                onSendMessage={handleSendMessage}
                selectedOffer={selectedOffer}
              />
            </div>
            <RequestDetailsSection details={requestDetails} />
          </>
        )}

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
