// Socket State Types
export interface SocketState {
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
  onlineUsers: string[];
  currentConversationId: string | null;
  typingUsers: TypingUser[];
  unreadMessages: number;
}

export interface TypingUser {
  conversationId: string;
  userId: string;
  userName: string;
}

// Socket Event Payloads
export interface SocketMessage {
  _id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  content: string;
  createdAt: string;
}

export interface BoostingPostPayload {
  postId: string;
  title: string;
  game: string;
  price: number;
}

export interface OfferPayload {
  offerId: string;
  postId: string;
  message: string;
  status: "pending" | "accepted" | "rejected";
}

export interface NotificationPayload {
  _id: string;
  type: "offer" | "message" | "order" | "system";
  message: string;
  data?: Record<string, unknown>;
  createdAt: string;
}

export interface PresencePayload {
  userId: string;
  status: "online" | "offline";
}

// Socket Emit Payloads
export interface SendMessagePayload {
  conversationId: string;
  message: string;
}

export interface JoinConversationPayload {
  conversationId: string;
}

export interface TypingPayload {
  conversationId: string;
}

export interface CreateConversationPayload {
  receiverId: string;
  type?: "boosting" | "support";
  referenceId?: string;
}

export interface ConversationListQuery {
  page?: number;
  limit?: number;
  type?: "boosting" | "support";
}

export interface ConversationListResponse {
  conversations: unknown[];
  total: number;
  pages: number;
}

export interface CreateBoostingPostPayload {
  game: string;
  currentRank: string;
  desiredRank: string;
  price: number;
  description: string;
}

// Socket Response Types
export interface SocketResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface MessagesResponse {
  messages: SocketMessage[];
  hasMore: boolean;
  total: number;
}
