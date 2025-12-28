"use client";

import { useState } from "react";
import OrderReviewModal from "@/src/components/Ratings/OrderReviewModal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(true);

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
