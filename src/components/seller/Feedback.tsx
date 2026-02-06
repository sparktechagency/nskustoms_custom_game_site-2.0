"use client";
import React, { useState, useMemo } from "react";
import {
  ThumbsUp,
  ThumbsDown,
  Star,
  Package,
  XCircle,
  User,
  Loader2,
} from "lucide-react";
import notfund from "@/src/Assets/seller/goldie.png";
import Image from "next/image";
import {
  useGetRatingsForSellerQuery,
  useGetSellerRatingStatsQuery,
} from "@/src/redux/features/ratings/ratingsApi";
import { formatDate } from "@/src/utils/pageHealper";
import { SellerRatings, SellerRatingsStats } from "@/src/types/page.types";

const Feedback = () => {
  const [activeTab, setActiveTab] = useState("all");
  const { data: sellerRatingsStats, isLoading: isStatsLoading } =
    useGetSellerRatingStatsQuery({});
  const { data: sellerRatings, isLoading: isRatingsLoading } =
    useGetRatingsForSellerQuery({});

  const stats = sellerRatingsStats as SellerRatingsStats | undefined;
  const ratingsData = sellerRatings as SellerRatings | undefined;

  // Calculate positive and negative feedback counts
  const { positiveCount, negativeCount } = useMemo(() => {
    if (!ratingsData?.ratings) return { positiveCount: 0, negativeCount: 0 };
    const positive = ratingsData.ratings.filter((r) => r.rating >= 4).length;
    const negative = ratingsData.ratings.filter((r) => r.rating < 4).length;
    return { positiveCount: positive, negativeCount: negative };
  }, [ratingsData]);

  // Filter ratings based on active tab
  const filteredRatings = useMemo(() => {
    if (!ratingsData?.ratings) return [];
    switch (activeTab) {
      case "positive":
        return ratingsData.ratings.filter((r) => r.rating >= 4);
      case "negative":
        return ratingsData.ratings.filter((r) => r.rating < 4);
      default:
        return ratingsData.ratings;
    }
  }, [ratingsData, activeTab]);

  const statsData = [
    {
      icon: Package,
      label: "Completed orders",
      value: stats?.totalCompletedOrders ?? 0,
      color: "text-green-500",
    },
    {
      icon: ThumbsUp,
      label: "Positive feedback",
      value: positiveCount,
      color: "text-blue-500",
    },
    {
      icon: ThumbsDown,
      label: "Negative feedback",
      value: negativeCount,
      color: "text-orange-500",
    },
    {
      icon: XCircle,
      label: "Cancelled orders",
      value: stats?.totalCancelledOrders ?? 0,
      color: "text-red-500",
    },
  ];

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? "text-yellow-500 fill-yellow-500"
                : "text-gray-600"
            }`}
          />
        ))}
      </div>
    );
  };

  const isLoading = isStatsLoading || isRatingsLoading;

  return (
    <div className="">
      <div className="">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <span className="text-red-500 text-xl">📋</span>
            <h1 className="text-white text-2xl font-semibold">Feedback</h1>
          </div>
          {stats && (
            <div className="flex items-center gap-2 bg-gray-800/50 px-4 py-2 rounded-lg border border-gray-700/50">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <span className="text-white font-semibold">
                {stats.averageRating?.toFixed(1) || "0.0"}
              </span>
              <span className="text-gray-400 text-sm">
                ({stats.totalRatings || 0} reviews)
              </span>
            </div>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {statsData.map((stat, index) => (
            <div
              key={index}
              className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700/50 hover:border-gray-600/50 transition-colors"
            >
              <div className="flex items-center gap-3 mb-2">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                <span className="text-gray-400 text-sm">{stat.label}</span>
              </div>
              <div className="text-white text-2xl font-semibold">
                {isLoading ? (
                  <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
                ) : (
                  stat.value
                )}
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
            All ({ratingsData?.ratings?.length || 0})
          </button>
          <button
            onClick={() => setActiveTab("positive")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
              activeTab === "positive"
                ? "bg-red-500 text-white"
                : "bg-gray-800/50 text-gray-400 hover:bg-gray-700/50"
            }`}
          >
            Positive ({positiveCount})
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
            Negative ({negativeCount})
            <ThumbsDown className="w-4 h-4" />
          </button>
        </div>

        {/* Ratings List or Empty State */}
        {isLoading ? (
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg border border-gray-700/50 p-12 flex flex-col items-center justify-center min-h-[400px]">
            <Loader2 className="w-12 h-12 animate-spin text-red-500 mb-4" />
            <p className="text-gray-400 text-lg">Loading feedback...</p>
          </div>
        ) : filteredRatings.length > 0 ? (
          <div className="space-y-4">
            {filteredRatings.map((rating) => (
              <div
                key={rating._id}
                className="bg-gray-800/30 backdrop-blur-sm rounded-lg border border-gray-700/50 p-5 hover:border-gray-600/50 transition-colors"
              >
                <div className="flex items-start gap-4">
                  {/* User Avatar */}
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-teal-400 to-cyan-500 flex-shrink-0 flex items-center justify-center">
                    {rating.userId?.image ? (
                      <Image
                        src={rating.userId.image}
                        alt={rating.userId.name}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-6 h-6 text-white" />
                    )}
                  </div>

                  {/* Rating Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <div className="flex items-center gap-3">
                        <h3 className="text-white font-medium">
                          {rating.userId?.name || "Anonymous"}
                        </h3>
                        {renderStars(rating.rating)}
                      </div>
                      <span className="text-gray-500 text-sm flex-shrink-0">
                        {formatDate(rating.createdAt)}
                      </span>
                    </div>

                    {rating.content && (
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {rating.content}
                      </p>
                    )}

                    {/* Rating Badge */}
                    <div className="mt-3 flex items-center gap-2">
                      {rating.rating >= 4 ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                          <ThumbsUp className="w-3 h-3" />
                          Positive
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-orange-500/20 text-orange-400 text-xs rounded-full">
                          <ThumbsDown className="w-3 h-3" />
                          Needs Improvement
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-lg border border-gray-700/50 p-12 flex flex-col items-center justify-center min-h-[400px]">
            <div className="text-6xl mb-4">
              <Image src={notfund} alt="image" width={200} height={250} />
            </div>
            <p className="text-gray-400 text-lg">
              {activeTab === "all"
                ? "No feedback yet"
                : activeTab === "positive"
                  ? "No positive feedback yet"
                  : "No negative feedback yet"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Feedback;
