"use client";

import Image from "next/image";
import {
  MessageCircle,
  Clock,
  DollarSign,
  CheckCircle,
  User,
  Star,
  ShoppingBag,
} from "lucide-react";
import { BoostingOffer } from "@/src/types/page.types";
import { Tooltip } from "antd";

interface OfferCardProps {
  offer: BoostingOffer;
  onChat: (sellerId: string) => void;
  onAccept: (offerId: string, offer: BoostingOffer) => void;
  isChatDisabled?: boolean;
  isAcceptDisabled?: boolean;
}

export default function OfferCard({
  offer,
  onChat,
  onAccept,
  isChatDisabled,
  isAcceptDisabled,
}: OfferCardProps) {
  const statusColor =
    offer.status === "pending"
      ? "text-yellow-400"
      : offer.status === "accepted"
        ? "text-green-400"
        : "text-red-400";

  return (
    <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-4 hover:border-gray-600 transition-colors">
      {/* Top: Avatar + Name + Status + Actions */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center flex-shrink-0">
            {offer.userId.image ? (
              <Image
                src={offer.userId.image}
                alt={offer.userId.name}
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-5 h-5 text-white" />
            )}
          </div>
          <div>
            <span className="text-white text-sm font-medium block">
              {offer.userId.name}
            </span>
            <span className={`text-xs ${statusColor}`}>
              {offer.status.charAt(0).toUpperCase() + offer.status.slice(1)}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <Tooltip title="Chat with seller">
            <button
              onClick={() => onChat(offer.userId._id)}
              disabled={isChatDisabled}
              className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              <MessageCircle className="w-3.5 h-3.5" />
            </button>
          </Tooltip>
          {offer.status === "pending" && (
            <Tooltip title="Accept order">
              <button
                onClick={() => onAccept(offer._id, offer)}
                disabled={isAcceptDisabled}
                className="p-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors disabled:opacity-50"
              >
                <CheckCircle className="w-3.5 h-3.5" />
              </button>
            </Tooltip>
          )}
        </div>
      </div>

      {/* Stats Row */}
      <div className="flex items-center gap-4 mb-3">
        <div className="flex items-center gap-1 text-yellow-400">
          <Star className="w-3.5 h-3.5 fill-yellow-400" />
          <span className="text-xs font-medium">
            {offer.sellerRating?.toFixed(1) || "N/A"}
          </span>
        </div>
        <div className="flex items-center gap-1 text-gray-400">
          <ShoppingBag className="w-3.5 h-3.5" />
          <span className="text-xs">
            {offer.sellerCompletedOrders ?? 0} orders
          </span>
        </div>
        <div className="flex items-center gap-1 text-green-400">
          <DollarSign className="w-3.5 h-3.5" />
          <span className="text-xs font-medium">{offer.price}</span>
        </div>
        <div className="flex items-center gap-1 text-gray-400">
          <Clock className="w-3.5 h-3.5" />
          <span className="text-xs">{offer.deliverTime}</span>
        </div>
      </div>

      {/* Message */}
      {offer.message && (
        <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">
          {offer.message}
        </p>
      )}
    </div>
  );
}
