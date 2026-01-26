"use client";

import { FaHome } from "react-icons/fa";
import SellerBoosting from "@/src/components/seller/SellerBoosting";

const SellerBoostingClient = () => {
  return (
    <div>
      {/* Content */}
      <div className="w-full mb-2 relative z-10 h-full flex items-center justify-between">
        {/* Left side - Title */}
        <div className="">
          <div className="flex items-center gap-3">
            <FaHome className="text-red-600 text-xl" />
            <h1 className="text-white text-base md:text-md xl:text-2xl font-semibold">
              My Request
            </h1>
          </div>
          <p className="bg-[#282836]  text-white px-5 py-2 rounded text-xs mt-0.5">
            League of Legends
          </p>
        </div>
      </div>

      <SellerBoosting />
    </div>
  );
};

export default SellerBoostingClient;
