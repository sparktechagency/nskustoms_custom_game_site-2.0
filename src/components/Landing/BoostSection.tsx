"use client";
import BoostSectionBG from "@/src/Assets/Landing/boost_section_bg.png";

const BoostSection = () => {
  return (
    <div
      className="w-full bg-center bg-cover relative min-h-[280px] sm:min-h-[350px] md:min-h-[500px] flex items-center py-10 sm:py-14 md:py-0"
      style={{ backgroundImage: `url(${BoostSectionBG.src})` }}
    >
      <div className="absolute inset-0 bg-[#2A2929B2] bg-opacity-60"></div>
      <div className="container mx-auto z-20 w-full px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 md:mb-8 text-white drop-shadow-lg leading-snug sm:leading-snug">
            Boost your rank with peace of mind{" "}
            <span className="text-yellow-400">
              —expert boosters, 24/7 support,{" "}
            </span>
            and a{" "}
            <span className="text-yellow-400">
              {" "}
              guaranteed money-back promise.{" "}
            </span>
          </h2>
          <button className="bg-[#AC2212] hover:bg-[#8a1b0e] text-white text-sm sm:text-base font-bold cursor-pointer py-2 px-5 sm:py-3 sm:px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
            Get Offers Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoostSection;
