// Types
// export interface Offer {
//   id: number;
//   seller: string;
//   rating: number;
//   reviews: number;
//   deliveryTime: string;
//   price: number;
//   status: string;
// }
/**====================== Custom Error =========== */

export interface ErrorData {
  code: number;
  status: string;
  message: string;
}
export interface CustomError {
  status: number;
  data: ErrorData;
}

/** ===================SellerBoosting.tsx file types */

export interface User {
  _id: string;
  name: string;
  email: string;
  image: string;
}

export interface BoostingPost {
  _id: string;
  userId: User;
  boostingType:
    | "rank_boost"
    | "placement_matches"
    | "net_wins"
    | "custom_request";
  currentRank?: {
    currentRank: string;
    queue: string;
    currentLp: string;
  };
  desiredRank?: {
    desiredRank: string;
    region: string;
  };
  placementMatches?: {
    previousRank: string;
    region: string;
    queue: string;
    numberOfGames: number;
  };
  netWins?: {
    currentRank: string;
    region: string;
    queue: string;
    numberOfWins: number;
  };
  customRequest?: {
    gameType: string;
    requestDescription: string;
  };
  customizeOrder?: {
    solo?: {
      stream: boolean;
      soloQueue: boolean;
      offlineMode: boolean;
    };
    duo: boolean;
  };
  isActive: boolean;
  isCompleted: boolean;
  isCancelled: boolean;
  additionInfo?: string;
  createdAt: string;
  updatedAt: string;
  offersCount?: number;
  conversations?: Conversation[];
}

export interface BrowseBoostingResponse {
  posts: BoostingPost[];
  total: number;
  pages: number;
}

export type TabType =
  | "waiting_for_offer"
  | "offer_accepted"
  | "offer_submitted"
  | "offer_lost";

/** =====================Offer page for buyers */
export type OfferStatus = "pending" | "accepted" | "declined";

export interface Offer {
  _id: string;
  userId: string;
  boostingPostId: BoostingPost;
  deliverTime: string;
  price: number;
  message: string;
  status: OfferStatus;
  createdAt: string;
  updatedAt: string;
}

export interface OffersResponse {
  offers: Offer[];
  total: number;
  pages: number;
}

/** ======================Conversations API  ============== */
export type ConversationType = "boosting" | "support";

export interface Participant {
  _id: string;
  name: string;
  image: string;
}

export interface Conversation {
  _id: string;
  participants: Participant[];
  type: string;
  referenceId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  lastMessage?: string;
}

export interface ConversationsResponse {
  conversations: Conversation[];
  total: number;
  pages: number;
}

export interface Message {
  _id: string;
  conversationId: string;
  author: {
    _id: string;
    name: string;
    image: string;
  };
  message: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MessagesResponse {
  messages: Message[];
  total: number;
  pages: number;
}

/** ============================Boosting Request Page ==================== */

export type SortOptionBoostingPost =
  | "newest"
  | "price_low"
  | "price_high"
  | "rating";

export interface OfferUser {
  _id: string;
  name: string;
  email: string;
  image: string;
}

export interface BoostingOffer {
  _id: string;
  userId: OfferUser;
  boostingPostId: string;
  deliverTime: string;
  price: number;
  message: string;
  status: "pending" | "accepted" | "declined";
  createdAt: string;
  updatedAt: string;
}

/**=====================Buyer Boosting page =========================== */

export type TabTypeBuyerBoosting =
  | "all"
  | "in_progress"
  | "completed"
  | "cancelled";

export interface BoostingResponse {
  posts: BoostingPost[];
  total: number;
  pages: number;
}

/**====================Ratings page =========================== */
export interface RatingUser {
  _id: string;
  name: string;
  image: string;
}

export interface Rating {
  _id: string;
  userId: RatingUser;
  sellerId: string;
  orderId: string;
  content: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export interface SellerRatings {
  ratings: Rating[];
  averageRating: number;
}

export interface SellerRatingsStats {
  averageRating: number;
  totalRatings: number;
  totalCompletedOrders: number;
  totalCancelledOrders: number;
}
