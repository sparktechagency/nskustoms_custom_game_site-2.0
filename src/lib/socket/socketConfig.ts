// Socket Configuration

// Connection options (mutable for socket.io compatibility)
// Using polling first to send auth headers, then upgrade to websocket
export const SOCKET_CONNECTION_OPTIONS = {
  transports: ["polling", "websocket"] as string[],
  upgrade: true,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  timeout: 10000,
  autoConnect: false,
};

export const SOCKET_CONFIG = {
  // Event names - Server to Client
  events: {
    // Connection
    CONNECT: "connect",
    DISCONNECT: "disconnect",
    CONNECT_ERROR: "connect_error",
    RECONNECT: "reconnect",
    RECONNECT_ATTEMPT: "reconnect_attempt",
    RECONNECT_ERROR: "reconnect_error",
    RECONNECT_FAILED: "reconnect_failed",

    // Presence
    ONLINE_USERS: "online-users",
    PRESENCE_ONLINE: "presence:online",
    PRESENCE_OFFLINE: "presence:offline",

    // Notifications
    NOTIFICATION_OFFER: "notification:offer",
    NOTIFICATION_MESSAGE: "notification:message",
    NOTIFICATION_ORDER: "notification:order",

    // Boosting Posts
    BOOSTING_POST_NEW: "boostingPost:new",
    BOOSTING_POST_CREATED: "boostingPost:created",
    BOOSTING_POST_UPDATED: "boostingPost:updated",
    BOOSTING_POST_DELETED: "boostingPost:deleted",

    // Offers
    OFFER_STATUS_CHANGED: "offer:statusChanged",
    OFFER_NEW: "offer:new",

    // Conversations
    CONVERSATION_MESSAGE: "conversation:message",
    CONVERSATION_USER_TYPING: "conversation:userTyping",
    CONVERSATION_USER_STOP_TYPING: "conversation:userStoppedTyping",
    CONVERSATION_READ: "conversation:read",
    CONVERSATION_NEW: "conversation:new",
    CONVERSATION_CREATED: "conversation:created",
    CONVERSATION_UPDATED: "conversation:updated",
  },

  // Emit names - Client to Server
  emits: {
    // Presence
    USER_ONLINE: "user-online",

    // Conversations
    CONVERSATION_CREATE: "conversation:create",
    CONVERSATION_LIST: "conversation:list",
    CONVERSATION_JOIN: "conversation:join",
    CONVERSATION_LEAVE: "conversation:leave",
    CONVERSATION_SEND_MESSAGE: "conversation:sendMessage",
    CONVERSATION_GET_MESSAGES: "conversation:getMessages",
    CONVERSATION_MARK_AS_READ: "conversation:markAsRead",
    CONVERSATION_TYPING: "conversation:typing",
    CONVERSATION_STOP_TYPING: "conversation:stopTyping",

    // Boosting Posts
    BOOSTING_POST_CREATE: "boostingPost:create",
    BOOSTING_POST_BROWSE: "boostingPost:browse",
    BOOSTING_POST_GET_OFFERS: "boostingPost:getOffers",
    BOOSTING_POST_UPDATE: "boostingPost:update",
    BOOSTING_POST_DELETE: "boostingPost:delete",

    // Offers
    OFFER_CREATE: "offer:create",
    OFFER_UPDATE_STATUS: "offer:updateStatus",
    OFFER_GET_BY_ID: "offer:getById",
  },
} as const;

// Get socket URL from environment
export const getSocketUrl = (): string => {
  const url = process.env.NEXT_PUBLIC_BASE_URL_SOCKET;

  if (!url) {
    console.warn("NEXT_PUBLIC_BASE_URL_SOCKET is not defined, using default");
    return "ws://localhost:6100";
  }

  return url;
};

export type SocketEvents = typeof SOCKET_CONFIG.events;
export type SocketEmits = typeof SOCKET_CONFIG.emits;
export type SocketConnectionOptions = typeof SOCKET_CONNECTION_OPTIONS;
