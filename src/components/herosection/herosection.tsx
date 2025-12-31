import React from "react";
import hero_bg from "@/src/Assets/Landing/hero_bg.png";
import Image from "next/image";
import Herosectionfrom from "./herosectionfrom";

const Herosection = () => {
  return (
    <section className="relative  w-full flex  text-white">
      {/* Background Image */}
      <Image
        src={hero_bg}
        alt="Hero Background"
        fill // makes the image cover the parent section
        className="object-cover z-0"
        priority
      />

      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/80 z-10"></div>

      {/* Main Content */}
      <div className="relative z-20  md:container mx-auto md:px-5 mt-2 md:mt-5 px-2 ">
        <h1>
          Get amazing deals from professional boosters in under
          <span className="text-[#AC2212] pl-1">5 minutes</span>
        </h1>
        <Herosectionfrom />
      </div>
    </section>
  );
};

export default Herosection;
