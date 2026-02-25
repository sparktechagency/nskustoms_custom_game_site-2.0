import React from "react";
import { Star } from "lucide-react";
import { OrderType } from "@/src/types/components.types";

interface OrderTypeButtonsProps {
  orderType: OrderType;
  setOrderType: (type: OrderType) => void;
}

const OrderTypeButtons: React.FC<OrderTypeButtonsProps> = ({ 
  orderType, 
  setOrderType 
}) => {
  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-4 gap-3 sm:gap-4">
      <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-1.5 sm:gap-2 w-full sm:w-auto">
        <button
          onClick={() => setOrderType("rank-boost")}
          className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded-t text-xs sm:text-sm sm:min-w-[100px] transition-colors ${
            orderType === "rank-boost"
              ? "bg-[#AC2212]"
              : "bg-[#282836] hover:bg-[#3a3a4a]"
          }`}
        >
          Rank Boost
        </button>
        <button
          onClick={() => setOrderType("placement-matches")}
          className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded-t text-xs sm:text-sm sm:min-w-[100px] transition-colors ${
            orderType === "placement-matches"
              ? "bg-[#AC2212]"
              : "bg-[#282836] hover:bg-[#3a3a4a]"
          }`}
        >
          Placement Matches
        </button>
        <button
          onClick={() => setOrderType("net-wins")}
          className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded-t text-xs sm:text-sm sm:min-w-[100px] transition-colors ${
            orderType === "net-wins"
              ? "bg-[#AC2212]"
              : "bg-[#282836] hover:bg-[#3a3a4a]"
          }`}
        >
          Net Wins
        </button>
        <button
          onClick={() => setOrderType("custom-request")}
          className={`px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm rounded-t sm:min-w-[100px] transition-colors ${
            orderType === "custom-request"
              ? "bg-[#AC2212]"
              : "bg-[#282836] hover:bg-[#3a3a4a]"
          }`}
        >
          Custom Request
        </button>
      </div>
      <div className="flex items-center gap-2 py-1.5 sm:py-2 rounded p-2 sm:p-3">
        <Star className="w-6 h-6 sm:w-8 sm:h-8 fill-yellow-400 text-yellow-400 shrink-0" />
        <div className="text-xs sm:text-sm">
          <div className="font-semibold">Review Auraboost here</div>
          <div className="text-gray-400">and get 5% OFF orders</div>
        </div>
      </div>
    </div>
  );
};

export default OrderTypeButtons;