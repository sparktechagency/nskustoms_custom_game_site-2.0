"use client";

import { useState } from "react";
import OrderReviewModal from "@/src/components/Ratings/OrderReviewModal";
import { useCreateRatingMutation } from "@/src/redux/features/ratings/ratingsApi";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [giveRatings] = useCreateRatingMutation();

  // mutations body formats
  //   {
  //   "orderId": "64a1b2c3d4e5f6g7h8i9j0k1",
  //   "content": "Excellent service! Fast delivery and great communication throughout the process.",
  //   "rating": 5
  // }

  const handleReviewSubmit = (rating: number, review: string) => {
    console.log("Rating:", rating);
    console.log("Review:", review);
    // Handle submission logic here
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <OrderReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleReviewSubmit}
      />
    </div>
  );
}
