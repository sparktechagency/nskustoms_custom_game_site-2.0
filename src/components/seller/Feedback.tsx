"use client";
import React, { useState } from "react";
import { ThumbsUp, ThumbsDown, Star, Package } from "lucide-react";
import notfund from "@/src/Assets/seller/goldie.png";
import Image from "next/image";
import { useGetSellerRatingStatsQuery } from "@/src/redux/features/ratings/ratingsApi";
const Feedback = () => {
  const [activeTab, setActiveTab] = useState("all");
  const { data: sellerRatingsStats } = useGetSellerRatingStatsQuery({});
  console.log(sellerRatingsStats);

  const stats = [
    {
      icon: Package,
      label: "Completed orders",
      value: "0",
      color: "text-red-500",
    },
    {
      icon: ThumbsUp,
      label: "Positive feedback",
      value: "0",
      color: "text-blue-500",
    },
    {
      icon: ThumbsDown,
      label: "Negative feedback",
      value: "0",
      color: "text-blue-400",
    },
    {
      icon: Star,
      label: "Feedback score",
      value: "0",
      color: "text-yellow-500",
    },
  ];

  return (
    <div className="">
      <div className="">
        {/* Header */}
        <div className="flex items-center gap-2 mb-8">
          <span className="text-red-500 text-xl">📋</span>
          <h1 className="text-white text-2xl font-semibold">Feedback</h1>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700/50 hover:border-gray-600/50 transition-colors"
            >
              <div className="flex items-center gap-3 mb-2">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                <span className="text-gray-400 text-sm">{stat.label}</span>
              </div>
              <div className="text-white text-2xl font-semibold">
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "all"
                ? "bg-red-500 text-white"
                : "bg-gray-800/50 text-gray-400 hover:bg-gray-700/50"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveTab("positive")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
              activeTab === "positive"
                ? "bg-red-500 text-white"
                : "bg-gray-800/50 text-gray-400 hover:bg-gray-700/50"
            }`}
          >
            Positive
            <ThumbsUp className="w-4 h-4" />
          </button>
          <button
            onClick={() => setActiveTab("negative")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
              activeTab === "negative"
                ? "bg-red-500 text-white"
                : "bg-gray-800/50 text-gray-400 hover:bg-gray-700/50"
            }`}
          >
            Negative
            <ThumbsDown className="w-4 h-4" />
          </button>
        </div>

        {/* Empty State */}
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg border border-gray-700/50 p-12 flex flex-col items-center justify-center min-h-[400px]">
          <div className="text-6xl mb-4">
            <Image src={notfund} alt="image" />
          </div>
          <p className="text-gray-400 text-lg">Nothing found</p>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
