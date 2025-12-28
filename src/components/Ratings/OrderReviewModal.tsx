"use client";

import { useState } from "react";
import { Star } from "lucide-react";

interface OrderReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (rating: number, review: string) => void;
}

export default function OrderReviewModal({
  isOpen,
  onClose,
  onSubmit,
}: OrderReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  if (!isOpen) return null;

  const handleStarClick = (starValue: number) => {
    setRating(starValue);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(rating, review);
    setRating(0);
    setReview("");
  };

  const starArray = [1, 2, 3, 4, 5];

  return (
    <div className="fixed inset-0 bg-[#000000B2] bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="mb-6">
          <h2 className="text-white text-xl font-bold mb-1">
            How{`'`}s your order?
          </h2>
          <p className="text-gray-400">Share Your Experience with us.</p>
        </div>

        {/* Rating Stars */}
        <div className="flex justify-center mb-6 space-x-2">
          {starArray.map((starValue) => (
            <button
              key={starValue}
              onClick={() => handleStarClick(starValue)}
              className="focus:outline-none"
              aria-label={`Rate ${starValue} stars`}
            >
              <Star
                className={`w-6 h-6 ${
                  starValue <= rating
                    ? "text-yellow-500 fill-yellow-500"
                    : "text-yellow-500"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Review Textarea */}
        <div className="mb-6">
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="give an review..."
            className="w-full bg-gray-700 text-gray-300 px-4 py-3 rounded-md resize-none min-h-[100px] focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={rating === 0}
          className={`w-full py-3 px-4 rounded-md font-medium transition-colors ${
            rating > 0
              ? "bg-red-600 hover:bg-red-700 text-white"
              : "bg-red-600 opacity-50 cursor-not-allowed text-white"
          }`}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
