import { BoostingPost, OfferStatus } from "../types/page.types";

/** ===============================Boosting page as a seller============================== */

// Format date
export const formatDate = (dateString: string): string => {
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

// Format boosting type
export const formatBoostingType = (type: string): string => {
  const typeMap: Record<string, string> = {
    rank_boost: "Rank Boost",
    placement_matches: "Placement Matches",
    net_wins: "Net Wins",
    custom_request: "Custom Request",
  };
  return typeMap[type] || type;
};

// Get completion method
export const getCompletionMethod = (
  customizeOrder?: BoostingPost["customizeOrder"],
): string => {
  if (!customizeOrder) return "-";
  if (customizeOrder.duo) return "Duo";
  if (customizeOrder.solo) return "Solo";
  return "-";
};

/** ====================== offer page for seller section===================== */
// get offer color status
export const getStatusColor = (status: OfferStatus) => {
  switch (status) {
    case "pending":
      return "bg-yellow-500/20 text-yellow-400";
    case "accepted":
      return "bg-green-500/20 text-green-400";
    case "declined":
      return "bg-red-500/20 text-red-400";
    default:
      return "bg-gray-500/20 text-gray-400";
  }
};

export const getBoostingDetails = (post: BoostingPost): string => {
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
