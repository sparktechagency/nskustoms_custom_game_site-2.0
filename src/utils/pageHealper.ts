import { BoostingPost } from "../types/page.types";

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
