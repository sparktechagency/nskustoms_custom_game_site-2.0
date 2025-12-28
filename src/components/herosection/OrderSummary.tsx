import React from "react";
import Image from "next/image";
import Link from "next/link";
import Vector from "@/src/Assets/Landing/Vector.png";

interface OrderSummaryProps {
  orderMode: "solo" | "duo";
  setOrderMode: (mode: "solo" | "duo") => void;
  stream: boolean;
  setStream: (stream: boolean) => void;
  appearOffline: boolean;
  setAppearOffline: (appearOffline: boolean) => void;
  offlineMode: boolean;
  setOfflineMode: (offlineMode: boolean) => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  orderMode,
  setOrderMode,
  stream,
  setStream,
  appearOffline,
  setAppearOffline,
  offlineMode,
  setOfflineMode,
}) => {
  return (
    <div className="space-y-2">
      <div className="bg-[#282836] bg-opacity-50 backdrop-blur rounded-lg p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-bold mb-2">CUSTOMIZE ORDER</h3>
        <div className="bg-[#000000] p-3 sm:p-4 rounded-md">
          {/* Solo/Duo Toggle */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setOrderMode("solo")}
              className={`flex-1 py-2 rounded text-sm ${
                orderMode === "solo"
                  ? "border border-[#FAB504]"
                  : "bg-[#282836] hover:bg-gray-600"
              }`}
            >
              Solo
            </button>
            <button
              onClick={() => setOrderMode("duo")}
              className={`flex-1 py-2 rounded text-sm ${
                orderMode === "duo"
                  ? "border border-[#FAB504]"
                  : "bg-[#282836] hover:bg-gray-600"
              }`}
            >
              Duo
            </button>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm">Stream</span>
              <button
                onClick={() => setStream(!stream)}
                className={`w-10 h-5 rounded-full transition-colors ${
                  stream ? "bg-blue-600" : "bg-gray-600"
                }`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full transition-transform ${
                    stream ? "translate-x-5" : "translate-x-1"
                  }`}
                ></div>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm">Appear offline</span>
              <button
                onClick={() => setAppearOffline(!appearOffline)}
                className={`w-10 h-5 rounded-full transition-colors ${
                  appearOffline ? "bg-blue-600" : "bg-gray-600"
                }`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full transition-transform ${
                    appearOffline ? "translate-x-5" : "translate-x-1"
                  }`}
                ></div>
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm">Offline mode</span>
              <button
                onClick={() => setOfflineMode(!offlineMode)}
                className={`w-10 h-5 rounded-full transition-colors ${
                  offlineMode ? "bg-blue-600" : "bg-gray-600"
                }`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full transition-transform ${
                    offlineMode ? "translate-x-5" : "translate-x-1"
                  }`}
                ></div>
              </button>
            </div>
          </div>

          {/* Get Offers Button */}
          <Link href="/boosting-request">
            <button className="w-full bg-[#AC2212] hover:bg-red-700 text-white font-bold py-3 rounded mb-3 text-sm">
              Get offers now
            </button>
          </Link>

          <div className="text-center text-xs sm:text-sm text-gray-400">
            🔒 Powered by <span className="text-yellow-400">Trustpilot</span>
          </div>
        </div>
      </div>

      {/* Savings Info */}
      <div className="p-4 sm:p-6 border border-[#A3A3A380] rounded-md">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <div className="flex flex-wrap justify-center sm:justify-start gap-2">
              <div className="text-sm sm:text-md">Save up to</div>
              <div className="text-sm sm:text-md text-black font-bold bg-[#FAB504] rounded-bl-lg rounded-tr-lg p-[3px]">
                40%
              </div>
              <div className="text-sm sm:text-md">on boosting</div>
            </div>
            <div className="text-xs sm:text-sm mt-2">
              Lowest prices from boosters. So you pay only for what{`'`}s worth
              paying for
            </div>
          </div>
          <Image
            src={Vector}
            alt="image"
            className="w-12 h-12 md:w-16 md:h-16"
          />
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
