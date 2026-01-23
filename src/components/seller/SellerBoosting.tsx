"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGetBoostingPostsForSellerQuery } from "@/src/redux/features/boosting-post/boostingApi";
import { Loader2 } from "lucide-react";
import {
  BoostingPost,
  BrowseBoostingResponse,
  TabType,
} from "@/src/types/page.types";

const tabs: { id: TabType; label: string }[] = [
  { id: "waiting_for_offer", label: "Waiting for Offer" },
  { id: "offer_submitted", label: "Offer Submitted" },
  { id: "offer_accepted", label: "Offer Accepted" },
  { id: "offer_lost", label: "Offer Lost" },
];

// Format boosting type for display
const formatBoostingType = (type: string): string => {
  const typeMap: Record<string, string> = {
    rank_boost: "Rank Boost",
    placement_matches: "Placement Matches",
    net_wins: "Net Wins",
    custom_request: "Custom Request",
  };
  return typeMap[type] || type;
};

// Get boosting details based on type
const getBoostingDetails = (post: BoostingPost): string => {
  switch (post.boostingType) {
    case "rank_boost":
      return `${post.currentRank?.currentRank} → ${post.desiredRank?.desiredRank} (${post.desiredRank?.region})`;
    case "placement_matches":
      return `${post.placementMatches?.previousRank} - ${post.placementMatches?.numberOfGames} games (${post.placementMatches?.region})`;
    case "net_wins":
      return `${post.netWins?.currentRank} - ${post.netWins?.numberOfWins} wins (${post.netWins?.region})`;
    case "custom_request":
      return (
        post.customRequest?.requestDescription?.slice(0, 50) + "..." ||
        "Custom Request"
      );
    default:
      return "-";
  }
};

// Format date
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

const SellerBoosting = () => {
  const [activeTab, setActiveTab] = useState<TabType>("waiting_for_offer");

  const { data: browseBoosting, isLoading } = useGetBoostingPostsForSellerQuery(
    {
      page: 1,
      limit: 10,
      type: activeTab,
    },
  );

  const boostingData = browseBoosting as BrowseBoostingResponse | undefined;
  const posts = boostingData?.posts || [];

  return (
    <div className="">
      <div className="w-full">
        {/* Header Tabs */}
        <div className="flex flex-wrap gap-3 md:gap-2 mb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 border rounded text-sm font-medium transition-colors relative ${
                activeTab === tab.id
                  ? "text-white bg-[#282836] border-orange-500"
                  : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/50 border-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-[#282836] rounded-lg overflow-hidden border border-gray-700">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
              <p className="text-gray-400 mt-2">Loading...</p>
            </div>
          ) : posts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">
                      Buyer
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">
                      Type
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">
                      Details
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">
                      Created
                    </th>
                    <th className="text-right px-6 py-4 text-sm font-medium text-gray-400">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post, index) => (
                    <tr
                      key={post._id}
                      className={`border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors ${
                        index === posts.length - 1 ? "border-b-0" : ""
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center">
                            {post.userId.image ? (
                              <Image
                                src={post.userId.image}
                                alt={post.userId.name}
                                width={32}
                                height={32}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="text-xs font-bold text-white">
                                {post.userId.name.charAt(0).toUpperCase()}
                              </span>
                            )}
                          </div>
                          <div>
                            <span className="text-sm text-white block">
                              {post.userId.name}
                            </span>
                            <span className="text-xs text-gray-500">
                              {post.userId.email}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-orange-500/20 text-orange-400 text-xs rounded">
                          {formatBoostingType(post.boostingType)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300 max-w-xs truncate">
                        {getBoostingDetails(post)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {formatDate(post.createdAt)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          href={`/seller/boosting/${post._id}`}
                          className="text-sm text-blue-400 hover:text-blue-300 font-medium"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-20 h-20 mb-4 relative">
                <div className="w-16 h-16 bg-yellow-500 rounded-lg transform rotate-45"></div>
                <div className="absolute top-2 left-2 w-12 h-12 bg-yellow-600 rounded-lg"></div>
              </div>
              <p className="text-gray-400 text-lg">
                No boosting requests found
              </p>
              <p className="text-gray-500 text-sm mt-1">
                Check back later for new requests
              </p>
            </div>
          )}
        </div>

        {/* Pagination Info */}
        {boostingData && boostingData.total > 0 && (
          <div className="flex justify-between items-center mt-4 text-sm text-gray-400">
            <span>
              Showing {posts.length} of {boostingData.total} requests
            </span>
            <span>Page 1 of {boostingData.pages}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerBoosting;
