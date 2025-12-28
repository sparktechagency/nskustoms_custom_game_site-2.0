"use client";

import { Offer } from "@/src/types/page.types";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface OfferSectionProps {
  offers: Offer[];
  selectedOffer: Offer | null;
  onSelectOffer: (offer: Offer) => void;
}

export default function OfferSection({
  offers,
  selectedOffer,
  onSelectOffer,
}: OfferSectionProps) {
  const [sortBy, setSortBy] = useState("newest");
  const [showAll, setShowAll] = useState(false);
  const router = useRouter();

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold flex items-center">
          <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
          Offers live feed
        </h2>
        <div className="flex space-x-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-gray-700 text-white text-sm rounded px-2 py-1"
          >
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Rating</option>
          </select>
          <button
            onClick={() => setShowAll(!showAll)}
            className="bg-gray-700 text-white text-sm rounded px-2 py-1"
          >
            {showAll ? "Show Less" : "Show All"}
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className={`p-3 rounded-lg border ${
              selectedOffer?.id === offer.id
                ? "border-blue-500 bg-gray-700"
                : "border-gray-700"
            } transition-colors`}
            onClick={() => onSelectOffer(offer)}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                  <span className="text-xs">{offer.seller.charAt(0)}</span>
                </div>
                <div>
                  <div className="font-semibold">{offer.seller}</div>
                  <div className="flex items-center space-x-1">
                    <span className="text-xs text-green-400">
                      {offer.rating}%
                    </span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-400">
                      {offer.reviews} reviews
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-400">
                Delivery time: {offer.deliveryTime}
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold">
                  ${offer.price.toFixed(2)}
                </span>
                <div className="flex space-x-1">
                  <button className="bg-gray-700 text-white text-xs px-2 py-1 rounded">
                    Chat +
                  </button>
                  <button
                    onClick={() => router.push("/payments")}
                    className="bg-yellow-600 hover:bg-yellow-700 text-black text-xs px-2 py-1 rounded"
                  >
                    Accept offers
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
