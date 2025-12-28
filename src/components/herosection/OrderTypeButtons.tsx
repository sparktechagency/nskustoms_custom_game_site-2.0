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
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-4">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setOrderType("rank-boost")}
          className={`px-3 py-2 rounded-t text-sm min-w-[100px] ${
            orderType === "rank-boost"
              ? "bg-[#AC2212]"
              : "bg-[#282836] hover:bg-[#282836]"
          }`}
        >
          Rank Boost
        </button>
        <button
          onClick={() => setOrderType("placement-matches")}
          className={`px-3 py-2 rounded-t text-sm min-w-[100px] ${
            orderType === "placement-matches"
              ? "bg-[#AC2212]"
              : "bg-[#282836] hover:bg-[#282836]"
          }`}
        >
          Placement Matches
        </button>
        <button
          onClick={() => setOrderType("net-wins")}
          className={`px-3 py-2 rounded-t text-sm min-w-[100px] ${
            orderType === "net-wins"
              ? "bg-[#AC2212]"
              : "bg-[#282836] hover:bg-[#282836]"
          }`}
        >
          Net Wins
        </button>
        <button
          onClick={() => setOrderType("custom-request")}
          className={`px-3 py-2 text-sm rounded-t min-w-[100px] ${
            orderType === "custom-request"
              ? "bg-[#AC2212]"
              : "bg-[#282836] hover:bg-[#282836]"
          }`}
        >
          Custom Request
        </button>
      </div>
      <div className="flex items-center gap-2 py-2 rounded  p-3">
        <Star className="w-8 h-8 fill-yellow-400 text-yellow-400" />
        <div className="text-xs sm:text-sm">
          <div className="font-semibold">Review Auraboost here</div>
          <div className="text-gray-400">and get 5% OFF orders</div>
        </div>
      </div>
    </div>
  );
};

export default OrderTypeButtons;