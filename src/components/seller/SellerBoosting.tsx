"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { BoostingPost, TabType } from "@/src/types/page.types";
import {
  formatBoostingType,
  formatDate,
  getBoostingDetails,
} from "@/src/utils/pageHealper";
import { useSelector } from "react-redux";
import { selectIsConnected } from "@/src/redux/features/socket/socketSlice";
import socketService from "@/src/lib/socket/socketService";
import { SOCKET_CONFIG } from "@/src/lib/socket/socketConfig";

interface BrowseBoostingSocketResponse {
  posts: BoostingPost[];
  total: number;
  pages: number;
  currentPage: number;
}

const tabs: { id: TabType; label: string }[] = [
  { id: "waiting_for_offer", label: "Waiting for Offer" },
  { id: "offer_submitted", label: "Offer Submitted" },
  { id: "offer_accepted", label: "Offer Accepted" },
  { id: "offer_lost", label: "Offer Lost" },
];

const SellerBoosting = () => {
  const [activeTab, setActiveTab] = useState<TabType>("waiting_for_offer");
  const [posts, setPosts] = useState<BoostingPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pagination, setPagination] = useState({
    total: 0,
    pages: 1,
    currentPage: 1,
  });
  const isSocketConnected = useSelector(selectIsConnected);
  const hasInitialFetch = useRef(false);

  // Fetch boosting posts via socket
  const fetchBoostingPosts = useCallback(
    (page = 1, limit = 10) => {
      if (!isSocketConnected) {
        console.log("[SellerBoosting] Socket not connected, waiting...");
        return;
      }

      setIsLoading(true);
      console.log("[SellerBoosting] Fetching posts for tab:", activeTab);

      socketService.browseBoostingPosts<BrowseBoostingSocketResponse>(
        { page, limit, type: activeTab },
        (response) => {
          setIsLoading(false);

          if (response.success && response.data) {
            console.log("[SellerBoosting] Posts received:", response.data);
            setPosts(response.data.posts || []);
            setPagination({
              total: response.data.total || 0,
              pages: response.data.pages || 1,
              currentPage: response.data.currentPage || 1,
            });
          } else {
            console.error(
              "[SellerBoosting] Failed to fetch posts:",
              response.error,
            );
            setPosts([]);
          }
        },
      );

      // Fallback timeout
      setTimeout(() => {
        setIsLoading((prev) => {
          if (prev) {
            console.warn("[SellerBoosting] Request timed out");
            return false;
          }
          return prev;
        });
      }, 10000);
    },
    [isSocketConnected, activeTab],
  );

  // Initial fetch and refetch on tab change
  useEffect(() => {
    if (isSocketConnected) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- Intentional: fetch data on connection/tab change
      fetchBoostingPosts();
      hasInitialFetch.current = true;
    }
  }, [isSocketConnected, activeTab, fetchBoostingPosts]);

  // Listen for real-time new boosting posts (only for waiting_for_offer tab)
  useEffect(() => {
    if (!isSocketConnected || activeTab !== "waiting_for_offer") return;

    const handleNewBoostingPost = (newPost: { post: BoostingPost }) => {
      console.log("[SellerBoosting] New boosting post received:", newPost);

      // Add new post to the top of the list
      setPosts((prevPosts) => {
        // Check if post already exists
        const exists = prevPosts.some((p) => p._id === newPost?.post._id);
        if (exists) return prevPosts;

        return [newPost.post, ...prevPosts];
      });

      // Update total count
      setPagination((prev) => ({
        ...prev,
        total: prev.total + 1,
      }));
    };

    // Subscribe to new boosting posts
    const unsubscribe = socketService.on(
      SOCKET_CONFIG.events.BOOSTING_POST_NEW,
      handleNewBoostingPost as (...args: unknown[]) => void,
    );

    return () => {
      unsubscribe();
    };
  }, [isSocketConnected, activeTab]);

  // Listen for boosting post updates
  useEffect(() => {
    if (!isSocketConnected) return;

    const handlePostUpdated = (updatedPost: BoostingPost) => {
      console.log("[SellerBoosting] Boosting post updated:", updatedPost);

      setPosts((prevPosts) =>
        prevPosts.map((p) => (p._id === updatedPost._id ? updatedPost : p)),
      );
    };

    const handlePostDeleted = (data: { postId: string }) => {
      console.log("[SellerBoosting] Boosting post deleted:", data.postId);

      setPosts((prevPosts) => prevPosts.filter((p) => p._id !== data.postId));
      setPagination((prev) => ({
        ...prev,
        total: Math.max(0, prev.total - 1),
      }));
    };

    const unsubscribeUpdated = socketService.on(
      SOCKET_CONFIG.events.BOOSTING_POST_UPDATED,
      handlePostUpdated as (...args: unknown[]) => void,
    );
    const unsubscribeDeleted = socketService.on(
      SOCKET_CONFIG.events.BOOSTING_POST_DELETED,
      handlePostDeleted as (...args: unknown[]) => void,
    );

    return () => {
      unsubscribeUpdated();
      unsubscribeDeleted();
    };
  }, [isSocketConnected]);

  const boostingData = {
    posts,
    total: pagination.total,
    pages: pagination.pages,
  };
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
          {!isSocketConnected ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-orange-400 animate-spin" />
              <p className="text-gray-400 mt-2">Connecting to server...</p>
            </div>
          ) : isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
              <p className="text-gray-400 mt-2">Loading boosting posts...</p>
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
                            {post?.userId?.image ? (
                              <Image
                                src={post.userId.image}
                                alt={post.userId?.name || "Buyer"}
                                width={32}
                                height={32}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="text-xs font-bold text-white">
                                {post?.userId?.name?.charAt(0)?.toUpperCase() ||
                                  "B"}
                              </span>
                            )}
                          </div>
                          <div>
                            <span className="text-sm text-white block">
                              {post?.userId?.name || "Buyer"}
                            </span>
                            <span className="text-xs text-gray-500">
                              {post?.userId?.email ||
                                "View details for more info"}
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
                          href={`/seller/sellerboosting/${post._id}`}
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
