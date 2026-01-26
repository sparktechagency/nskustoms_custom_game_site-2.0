"use client";

import { useState } from "react";
import { IoIosSend } from "react-icons/io";
import goldie from "@/src/Assets/seller/goldie.png";
import Image from "next/image";
import Link from "next/link";
import { useGetMyOffersAsSellerQuery } from "@/src/redux/features/offers/offersApi";
import { Loader2, Clock, DollarSign } from "lucide-react";
import { OffersResponse, OfferStatus } from "@/src/types/page.types";
import {
  formatBoostingType,
  formatDate,
  getBoostingDetails,
  getStatusColor,
} from "@/src/utils/pageHealper";

const tabs: { id: OfferStatus; label: string }[] = [
  { id: "pending", label: "Pending" },
  { id: "accepted", label: "Accepted" },
  { id: "declined", label: "Declined" },
];

const OffersClient = () => {
  const [activeTab, setActiveTab] = useState<OfferStatus>("pending");

  const { data: offersData, isLoading } = useGetMyOffersAsSellerQuery({
    page: 1,
    limit: 10,
    status: activeTab,
  });

  const data = offersData as OffersResponse | undefined;
  const offers = data?.offers || [];

  return (
    <div className="">
      {/* Header */}
      <div className="flex items-center gap-1 mb-6">
        <IoIosSend size={28} className="text-red-500 text-xs" />
        <h1 className="text-white text-xl font-semibold">Offers</h1>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-3 md:gap-2 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
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

      {/* Content */}
      <div className="bg-[#282836] rounded-lg overflow-hidden border border-gray-700">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
            <p className="text-gray-400 mt-2">Loading...</p>
          </div>
        ) : offers.length > 0 ? (
          <div className="divide-y divide-gray-700/50">
            {offers.map((offer) => (
              <div
                key={offer._id}
                className="p-4 md:p-6 hover:bg-gray-800/30 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Offer Details */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-orange-500/20 text-orange-400 text-xs rounded">
                        {formatBoostingType(offer.boostingPostId.boostingType)}
                      </span>
                      <span
                        className={`px-2 py-1 text-xs rounded capitalize ${getStatusColor(offer.status)}`}
                      >
                        {offer.status}
                      </span>
                    </div>

                    <p className="text-gray-200 text-sm mb-2">
                      {getBoostingDetails(offer.boostingPostId)}
                    </p>

                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                      {offer.message}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      <div className="flex items-center gap-1 text-green-400">
                        <DollarSign className="w-4 h-4" />
                        <span className="font-medium">${offer.price}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span>{offer.deliverTime}</span>
                      </div>
                      <span className="text-gray-500">
                        {formatDate(offer.createdAt)}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/seller/sellerboosting/${offer.boostingPostId._id}`}
                      className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded transition-colors"
                    >
                      View Post
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-32 h-24 mb-4 flex items-center justify-center">
              <Image src={goldie} alt="" />
            </div>
            <p className="text-gray-300 text-lg mb-2">
              No {activeTab} offers found
            </p>
            <p className="text-gray-500 text-sm">
              {activeTab === "pending"
                ? "Your pending offers will appear here"
                : activeTab === "accepted"
                  ? "Your accepted offers will appear here"
                  : "Your declined offers will appear here"}
            </p>
          </div>
        )}
      </div>

      {/* Pagination Info */}
      {data && data.total > 0 && (
        <div className="flex justify-between items-center mt-4 text-sm text-gray-400">
          <span>
            Showing {offers.length} of {data.total} offers
          </span>
          <span>Page 1 of {data.pages}</span>
        </div>
      )}
    </div>
  );
};

export default OffersClient;
