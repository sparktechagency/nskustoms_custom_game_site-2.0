"use client";

import { useState } from "react";
import { X, Loader2 } from "lucide-react";

interface CreateOfferModelProps {
  boostingPostId: string;
  onClose: () => void;
  onSubmit: (data: {
    boostingPostId: string;
    deliverTime: string;
    price: number;
    message: string;
  }) => Promise<void>;
  isLoading?: boolean;
}

function CreateOfferModel({
  boostingPostId,
  onClose,
  onSubmit,
  isLoading = false,
}: CreateOfferModelProps) {
  const [deliveryTime, setDeliveryTime] = useState("");
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async () => {
    setError(null);

    // Validation
    if (!deliveryTime.trim()) {
      setError("Please enter delivery time");
      return;
    }
    if (!price || isNaN(Number(price)) || Number(price) <= 0) {
      setError("Please enter a valid price");
      return;
    }
    if (!message.trim()) {
      setError("Please enter a message");
      return;
    }

    try {
      await onSubmit({
        boostingPostId,
        deliverTime: deliveryTime,
        price: Number(price),
        message: message,
      });
    } catch (err) {
      console.error("Failed to create offer:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#000000B2] bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <h2 className="text-white text-xl font-semibold mb-6">Create Offer</h2>

        {/* Error Message */}
        {error && (
          <div className="mb-4 bg-red-500/20 border border-red-500 text-red-400 px-3 py-2 rounded text-sm">
            {error}
          </div>
        )}

        {/* Delivery Time Input */}
        <div className="mb-4">
          <label className="text-white text-sm mb-2 block">Delivery Time</label>
          <select
            value={deliveryTime}
            onChange={(e) => setDeliveryTime(e.target.value)}
            className="w-full bg-gray-700 text-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-red-500"
          >
            <option value="">Select delivery time</option>
            <option value="1-2 days">1-2 days</option>
            <option value="3-5 days">3-5 days</option>
            <option value="1 week">1 week</option>
            <option value="2 weeks">2 weeks</option>
            <option value="3 weeks">3 weeks</option>
            <option value="1 month">1 month</option>
          </select>
        </div>

        {/* Price Input */}
        <div className="mb-4">
          <label className="text-white text-sm mb-2 block">Price ($)</label>
          <input
            type="number"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min="1"
            className="w-full bg-gray-700 text-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Message Input */}
        <div className="mb-6">
          <label className="text-white text-sm mb-2 block">Message</label>
          <textarea
            placeholder="Describe your offer and experience..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="w-full bg-gray-700 text-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-red-500 resize-none"
          />
        </div>

        {/* Modal Actions */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2.5 rounded-md font-medium transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={isLoading}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-md font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Offer"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateOfferModel;
