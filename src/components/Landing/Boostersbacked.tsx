"use client";
import boosterBackedBG from "@/src/Assets/Landing/booster_backed_bg.png";

export default function Boostersbacked() {
  return (
    <section
      className="w-full bg-center relative   min-h-[400px] md:min-h-[500px] flex items-center"
      style={{ backgroundImage: `url(${boosterBackedBG.src})` }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/80 bg-opacity-60"></div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 ">
            Boosting Services
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white drop-shadow-lg">
            Boosters backed by Auraboost
          </h1>
          <p className="text-lg mb-8 text-gray-200 drop-shadow">
            Auraboost cultivates a premium booster community, dedicated to
            top-rated veteran boosters, consistent communication, and a
            money-back guarantee. Enjoy fast and secure service supported by our
            carefully vetted boosters and a dedicated Customer Support Team.
          </p>
          <button className="btn-primary bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105">
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
}
