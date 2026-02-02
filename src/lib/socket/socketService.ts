import { io, Socket } from "socket.io-client";
import { store } from "@/src/redux/store/store";
import {
  connectionInitiated,
  connectionEstablished,
  connectionLost,
  connectionError,
  resetConnection,
  setOnlineUsers,
  userOnline,
  userOffline,
  addTypingUser,
  removeTypingUser,
  incrementUnreadMessages,
} from "@/src/redux/features/socket/socketSlice";
import { baseApi } from "@/src/redux/baseApi/baseApi";
import {
  SOCKET_CONFIG,
  SOCKET_CONNECTION_OPTIONS,
  getSocketUrl,
} from "./socketConfig";
import type {
  SocketResponse,
  SendMessagePayload,
  JoinConversationPayload,
  TypingPayload,
  MessagesResponse,
  CreateBoostingPostPayload,
} from "@/src/redux/features/socket/socket.types";

type EventCallback = (...args: unknown[]) => void;

class SocketService {
  private static instance: SocketService | null = null;
  private socket: Socket | null = null;
  private eventListeners: Map<string, Set<EventCallback>> = new Map();
  private reconnectTimer: NodeJS.Timeout | null = null;

  private constructor() {}

  // Singleton pattern
  public static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }
    return SocketService.instance;
  }

  // Get socket instance
  public getSocket(): Socket | null {
    return this.socket;
  }

  // Check if connected
  public isConnected(): boolean {
    return this.socket?.connected ?? false;
  }

  // Connect to socket server
  public connect(token: string): void {
    if (this.socket?.connected) {
      console.log("[Socket] Already connected");
      return;
    }

    // Disconnect existing socket if any
    this.disconnect();

    const socketUrl = getSocketUrl();
    store.dispatch(connectionInitiated());

    console.log("[Socket] Connecting to:", socketUrl);

    // Clean token (remove quotes if present)
    const cleanToken = token.replace(/['"]+/g, "");

    this.socket = io(socketUrl, {
      ...SOCKET_CONNECTION_OPTIONS,
      auth: { token: cleanToken },
      extraHeaders: { authorization: `Bearer ${cleanToken}` },
    });

    this.setupEventListeners();
    this.socket.connect();
  }

  // Disconnect from socket server
  public disconnect(): void {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }

    if (this.socket) {
      this.socket.removeAllListeners();
      this.socket.disconnect();
      this.socket = null;
    }

    store.dispatch(resetConnection());
    this.eventListeners.clear();
  }

  // Setup core event listeners
  private setupEventListeners(): void {
    if (!this.socket) return;

    const { events } = SOCKET_CONFIG;

    // Connection events
    this.socket.on(events.CONNECT, () => {
      console.log("[Socket] Connected:", this.socket?.id);
      store.dispatch(connectionEstablished());

      // Emit user online event
      const state = store.getState();
      const userId = state.auth.user?._id;
      if (userId) {
        this.socket?.emit(SOCKET_CONFIG.emits.USER_ONLINE, userId);
      }
    });

    this.socket.on(events.DISCONNECT, (reason) => {
      console.log("[Socket] Disconnected:", reason);
      store.dispatch(connectionLost());

      // Auto-reconnect for certain disconnect reasons
      if (reason === "io server disconnect") {
        this.scheduleReconnect();
      }
    });

    this.socket.on(events.CONNECT_ERROR, (error) => {
      console.error("[Socket] Connection error:", error.message);
      store.dispatch(connectionError(error.message));
    });

    this.socket.on(events.RECONNECT_ATTEMPT, (attemptNumber) => {
      console.log("[Socket] Reconnecting attempt:", attemptNumber);
      store.dispatch(connectionInitiated());
    });

    this.socket.on(events.RECONNECT_FAILED, () => {
      console.error("[Socket] Reconnection failed");
      store.dispatch(connectionError("Reconnection failed"));
    });

    // Presence events
    this.socket.on(events.ONLINE_USERS, (users: string[]) => {
      store.dispatch(setOnlineUsers(users));
    });

    this.socket.on(events.PRESENCE_ONLINE, (data: { userId: string }) => {
      store.dispatch(userOnline(data.userId));
    });

    this.socket.on(events.PRESENCE_OFFLINE, (data: { userId: string }) => {
      store.dispatch(userOffline(data.userId));
    });

    // Notification events
    this.socket.on(events.NOTIFICATION_MESSAGE, () => {
      store.dispatch(incrementUnreadMessages());
      // Invalidate notifications cache
      store.dispatch(baseApi.util.invalidateTags(["notification"]));
    });

    this.socket.on(events.NOTIFICATION_OFFER, () => {
      store.dispatch(baseApi.util.invalidateTags(["notification"]));
    });

    this.socket.on(events.NOTIFICATION_ORDER, () => {
      store.dispatch(baseApi.util.invalidateTags(["notification"]));
    });

    // Typing events
    this.socket.on(
      events.CONVERSATION_USER_TYPING,
      (data: { conversationId: string; userId: string; userName: string }) => {
        store.dispatch(addTypingUser(data));
      },
    );

    this.socket.on(
      events.CONVERSATION_USER_STOP_TYPING,
      (data: { conversationId: string; userId: string }) => {
        store.dispatch(removeTypingUser(data));
      },
    );
  }

  // Schedule reconnection
  private scheduleReconnect(): void {
    if (this.reconnectTimer) return;

    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = null;
      const state = store.getState();
      const token = state.auth.token;
      if (token) {
        this.connect(token);
      }
    }, SOCKET_CONNECTION_OPTIONS.reconnectionDelay);
  }

  // Subscribe to custom events
  public on(event: string, callback: EventCallback): () => void {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, new Set());
    }

    this.eventListeners.get(event)!.add(callback);
    this.socket?.on(event, callback);

    // Return unsubscribe function
    return () => {
      this.off(event, callback);
    };
  }

  // Unsubscribe from events
  public off(event: string, callback: EventCallback): void {
    this.eventListeners.get(event)?.delete(callback);
    this.socket?.off(event, callback);
  }

  // Emit events with callback support
  public emit<T = unknown>(
    event: string,
    data?: unknown,
    callback?: (response: SocketResponse<T>) => void,
  ): void {
    if (!this.socket?.connected) {
      console.warn("[Socket] Cannot emit - not connected");
      callback?.({ success: false, error: "Not connected" });
      return;
    }

    if (callback) {
      this.socket.emit(event, data, callback);
    } else {
      this.socket.emit(event, data);
    }
  }

  // ============ Conversation Methods ============

  public joinConversation(
    payload: JoinConversationPayload,
    callback?: (response: SocketResponse) => void,
  ): void {
    this.emit(
      SOCKET_CONFIG.emits.CONVERSATION_JOIN,
      payload.conversationId,
      callback,
    );
  }

  public leaveConversation(conversationId: string): void {
    this.emit(SOCKET_CONFIG.emits.CONVERSATION_LEAVE, conversationId);
  }

  public sendMessage(
    payload: SendMessagePayload,
    callback?: (response: SocketResponse) => void,
  ): void {
    this.emit(SOCKET_CONFIG.emits.CONVERSATION_SEND_MESSAGE, payload, callback);
  }

  public getMessages(
    conversationId: string,
    options?: { page?: number; limit?: number },
    callback?: (response: SocketResponse<MessagesResponse>) => void,
  ): void {
    this.emit(
      SOCKET_CONFIG.emits.CONVERSATION_GET_MESSAGES,
      { conversationId, ...options },
      callback,
    );
  }

  public markAsRead(conversationId: string): void {
    this.emit(SOCKET_CONFIG.emits.CONVERSATION_MARK_AS_READ, conversationId);
  }

  public startTyping(payload: TypingPayload): void {
    // Backend expects just the conversationId string
    this.emit(SOCKET_CONFIG.emits.CONVERSATION_TYPING, payload.conversationId);
  }

  public stopTyping(payload: TypingPayload): void {
    // Backend expects just the conversationId string
    this.emit(SOCKET_CONFIG.emits.CONVERSATION_STOP_TYPING, payload.conversationId);
  }

  // ============ Boosting Post Methods ============

  public createBoostingPost(
    payload: CreateBoostingPostPayload,
    callback?: (response: SocketResponse) => void,
  ): void {
    this.emit(SOCKET_CONFIG.emits.BOOSTING_POST_CREATE, payload, callback);
  }

  public updateBoostingPost(
    postId: string,
    payload: Partial<CreateBoostingPostPayload>,
    callback?: (response: SocketResponse) => void,
  ): void {
    this.emit(
      SOCKET_CONFIG.emits.BOOSTING_POST_UPDATE,
      { postId, ...payload },
      callback,
    );
  }

  public deleteBoostingPost(
    postId: string,
    callback?: (response: SocketResponse) => void,
  ): void {
    this.emit(SOCKET_CONFIG.emits.BOOSTING_POST_DELETE, postId, callback);
  }

  // ============ Offer Methods ============

  public createOffer(
    payload: { postId: string; message: string; price: number },
    callback?: (response: SocketResponse) => void,
  ): void {
    this.emit(SOCKET_CONFIG.emits.OFFER_CREATE, payload, callback);
  }

  public updateOfferStatus(
    offerId: string,
    status: "accepted" | "rejected",
    callback?: (response: SocketResponse) => void,
  ): void {
    this.emit(
      SOCKET_CONFIG.emits.OFFER_UPDATE_STATUS,
      { offerId, status },
      callback,
    );
  }
}

// Export singleton instance
export const socketService = SocketService.getInstance();
export default socketService;
