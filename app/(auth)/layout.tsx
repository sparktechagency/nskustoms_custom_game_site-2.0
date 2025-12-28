import hero_bg from "@/src/Assets/Landing/hero_bg.png";
import Image from "next/image";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center text-white">
      {/* Background Image */}
      <Image
        src={hero_bg}
        alt="Hero Background"
        fill // makes the image cover the parent section
        className="object-cover z-0"
        priority
      />

      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>

      {/* Main Content */}
      <div className="relative z-20 text-center px-4">{children}</div>
    </section>
  );
};

export default AuthLayout;
