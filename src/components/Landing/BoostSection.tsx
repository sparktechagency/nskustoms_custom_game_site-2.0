"use client";
import BoostSectionBG from "@/src/Assets/Landing/boost_section_bg.png";

const BoostSection = () => {
  return (
    <div
      className="w-full   bg-center relative   md:min-h-[500px] flex items-center"
      style={{ backgroundImage: `url(${BoostSectionBG.src})` }}
    >
      <div className="absolute inset-0 bg-black/80 bg-opacity-60"></div>
      <div className="container mx-auto  z-20 w-full">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 text-yellow-400 drop-shadow-lg">
            Boost your rank with peace of mind—expert boosters, 24/7 support,
            and a guaranteed money-back promise.
          </h2>
          <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
            Get Offers Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoostSection;
