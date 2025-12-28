import React from "react";
import Image from "next/image";
import whay from "@/src/Assets/Landing/Whay.png";
import checkBox from "@/src/Assets/Landing/checkbox.png";

const WhyTrustSection: React.FC = () => {
  return (
    <div
      className="w-full p-4 sm:p-6 bg-no-repeat bg-cover rounded-md relative border border-[#A3A3A380] mb-5"
      style={{ backgroundImage: `url(${whay.src})` }}
    >
      <h3 className="text-lg sm:text-lg md:text-2xl font-bold mb-4">
        Why trust Auraboost?
      </h3>
      <p className="text-xs sm:text-sm md:text-xl text-gray-400 mb-4">
        Your boosting experience is safe, reliable, and fully monitored.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-5">
        <div className="flex items-center gap-2 border-b border-[#A3A3A380] rounded-b-md pb-2">
          <div className="w-6 h-6">
            <Image
              src={checkBox}
              width={24}
              height={24}
              alt="Checkbox Image"
            />
          </div>
          <span className="text-xs sm:text-sm md:text-lg">
            Verified sellers
          </span>
        </div>
        <div className="flex items-center gap-2 border-b border-[#A3A3A380] rounded-b-md pb-2">
          <div className="w-6 h-6">
            <Image
              src={checkBox}
              width={24}
              height={24}
              alt="Checkbox Image"
            />
          </div>
          <span className="text-xs sm:text-sm md:text-lg">
            Quick delivery
          </span>
        </div>
        <div className="flex items-center gap-2 border-b border-[#A3A3A380] rounded-b-md pb-2">
          <div className="w-6 h-6">
            <Image
              src={checkBox}
              width={24}
              height={24}
              alt="Checkbox Image"
            />
          </div>
          <span className="text-xs sm:text-sm md:text-lg">
            Round -the -clock- support
          </span>
        </div>
        <div className="flex items-center gap-2 border-b border-[#A3A3A380] rounded-b-md pb-2">
          <div className="w-6 h-6">
            <Image
              src={checkBox}
              width={24}
              height={24}
              alt="Checkbox Image"
            />
          </div>
          <span className="text-xs sm:text-sm md:text-lg">
            Secure, immediate payments
          </span>
        </div>
        <div className="flex items-center gap-2 border-b border-[#A3A3A380] rounded-b-md pb-2">
          <div className="w-6 h-6">
            <Image
              src={checkBox}
              width={24}
              height={24}
              alt="Checkbox Image"
            />
          </div>
          <span className="text-xs sm:text-sm md:text-lg">
            Buyer protection included
          </span>
        </div>
        <div className="flex items-center gap-2 border-b border-[#A3A3A380] rounded-b-md pb-2">
          <div className="w-6 h-6">
            <Image
              src={checkBox}
              width={24}
              height={24}
              alt="Checkbox Image"
            />
          </div>
          <span className="text-xs sm:text-sm md:text-lg">
            Large selection of offers
          </span>
        </div>
      </div>
    </div>
  );
};

export default WhyTrustSection;