"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGetMyBoostingPostsQuery } from "@/src/redux/features/boosting-post/boostingApi";
import {
  Loader2,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
} from "lucide-react";
import {
  BoostingPost,
  BoostingResponse,
  TabTypeBuyerBoosting,
} from "@/src/types/page.types";
import {
  formatBoostingType,
  formatDate,
  getBoostingDetails,
} from "@/src/utils/pageHealper";

const ITEMS_PER_PAGE = 10;

const tabs: { id: TabTypeBuyerBoosting; label: string }[] = [
  { id: "all", label: "All Requests" },
  { id: "in_progress", label: "In Progress" },
  { id: "completed", label: "Completed" },
  { id: "cancelled", label: "Cancelled" },
];

const getStatusBadge = (post: BoostingPost) => {
  if (post.isCancelled) {
    return (
      <span className="px-2 py-1 text-xs rounded bg-red-500/20 text-red-400">
        Cancelled
      </span>
    );
  }
  if (post.isCompleted) {
    return (
      <span className="px-2 py-1 text-xs rounded bg-green-500/20 text-green-400">
        Completed
      </span>
    );
  }
  if (post.isActive) {
    return (
      <span className="px-2 py-1 text-xs rounded bg-yellow-500/20 text-yellow-400">
        Active
      </span>
    );
  }
  return (
    <span className="px-2 py-1 text-xs rounded bg-gray-500/20 text-gray-400">
      Inactive
    </span>
  );
};

const BuyerBoosting = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabTypeBuyerBoosting>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useGetMyBoostingPostsQuery({
    page: currentPage,
    limit: ITEMS_PER_PAGE,
    type: activeTab,
  });

  const boostingData = data as BoostingResponse | undefined;
  const posts = boostingData?.posts || [];
  const totalPages = boostingData?.pages || 1;
  const total = boostingData?.total || 0;

  const handleTabChange = (tab: TabTypeBuyerBoosting) => {
    setActiveTab(tab);
    setCurrentPage(1); // Reset to first page when changing tabs
  };

  const handleViewPost = (postId: string) => {
    router.push(`/boosting/${postId}`);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="">
      <div className="w-full">
        {/* Header Tabs */}
        <div className="flex flex-wrap gap-3 md:gap-2 mb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`px-4 py-2 border rounded text-sm font-medium transition-colors relative ${
                activeTab === tab.id
                  ? "text-white bg-[#282836] border-red-500"
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
              <Loader2 className="w-8 h-8 text-red-500 animate-spin" />
              <p className="text-gray-400 mt-2">Loading...</p>
            </div>
          ) : posts.length > 0 ? (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">
                        Type
                      </th>
                      <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">
                        Details
                      </th>
                      <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">
                        Region
                      </th>
                      <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">
                        Created
                      </th>
                      <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">
                        Offers
                      </th>
                      <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">
                        Status
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
                            <span className="text-sm text-white font-medium">
                              {formatBoostingType(post.boostingType)}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-300">
                          {getBoostingDetails(post)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-300">
                          {post.desiredRank?.region ||
                            post.placementMatches?.region ||
                            post.netWins?.region ||
                            "-"}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-300">
                          {formatDate(post.createdAt)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1 text-sm">
                            <MessageSquare className="w-4 h-4 text-gray-400" />
                            <span
                              className={`font-medium ${
                                (post?.offersCount ?? 0) > 0
                                  ? "text-green-400"
                                  : "text-gray-400"
                              }`}
                            >
                              {post.offersCount ?? 0}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">{getStatusBadge(post)}</td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => handleViewPost(post._id)}
                            className="inline-flex items-center underline cursor-pointer text-white text-sm rounded transition-colors"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between px-6 py-4 border-t border-gray-700">
                  <div className="text-sm text-gray-400">
                    Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
                    {Math.min(currentPage * ITEMS_PER_PAGE, total)} of {total}{" "}
                    results
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Previous Button */}
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`p-2 rounded transition-colors ${
                        currentPage === 1
                          ? "text-gray-600 cursor-not-allowed"
                          : "text-gray-400 hover:text-white hover:bg-gray-700"
                      }`}
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    {/* Page Numbers */}
                    {getPageNumbers().map((page, index) =>
                      typeof page === "number" ? (
                        <button
                          key={index}
                          onClick={() => handlePageChange(page)}
                          className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                            currentPage === page
                              ? "bg-red-600 text-white"
                              : "text-gray-400 hover:text-white hover:bg-gray-700"
                          }`}
                        >
                          {page}
                        </button>
                      ) : (
                        <span key={index} className="text-gray-500 px-2">
                          {page}
                        </span>
                      ),
                    )}

                    {/* Next Button */}
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`p-2 rounded transition-colors ${
                        currentPage === totalPages
                          ? "text-gray-600 cursor-not-allowed"
                          : "text-gray-400 hover:text-white hover:bg-gray-700"
                      }`}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-20 h-20 mb-4 relative">
                <div className="w-16 h-16 bg-gray-700 rounded-lg transform rotate-12 absolute"></div>
                <div className="w-16 h-16 bg-gray-600 rounded-lg absolute top-2 left-2"></div>
              </div>
              <p className="text-gray-400 text-lg">
                No boosting requests found
              </p>
              <p className="text-gray-500 text-sm mt-1">
                {activeTab === "all"
                  ? "Create your first boosting request to get started"
                  : `No ${activeTab.replace("_", " ")} requests`}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuyerBoosting;
