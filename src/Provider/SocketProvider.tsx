"use client";

import {
  useEffect,
  useCallback,
  createContext,
  useContext,
  useMemo,
} from "react";
import { useAppSelector } from "@/src/redux/hooks";
import {
  selectCurrentUser,
  selectToken,
} from "@/src/redux/features/auth/authSlice";
import {
  selectIsConnected,
  selectIsConnecting,
  selectSocketError,
  selectOnlineUsers,
  selectUnreadMessages,
} from "@/src/redux/features/socket/socketSlice";
import socketService from "@/src/lib/socket/socketService";
import { SOCKET_CONFIG } from "@/src/lib/socket/socketConfig";
import { toast } from "sonner";
import type {
  SocketResponse,
  SendMessagePayload,
} from "@/src/redux/features/socket/socket.types";

// Notification data type from socket
interface NotificationData {
  type: string;
  title?: string;
  message?: string;
  notification?: {
    _id: string;
    title: string;
    message: string;
    type: string;
  };
}

// Context type
interface SocketContextType {
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
  onlineUsers: string[];
  unreadMessages: number;
  connect: () => void;
  disconnect: () => void;
  joinConversation: (
    conversationId: string,
    callback?: (response: SocketResponse) => void,
  ) => void;
  leaveConversation: (conversationId: string) => void;
  sendMessage: (
    payload: SendMessagePayload,
    callback?: (response: SocketResponse) => void,
  ) => void;
  startTyping: (conversationId: string) => void;
  stopTyping: (conversationId: string) => void;
  markAsRead: (conversationId: string) => void;
  isUserOnline: (userId: string) => boolean;
}

// Create context
const SocketContext = createContext<SocketContextType | null>(null);

// Provider component
export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const user = useAppSelector(selectCurrentUser);
  const token = useAppSelector(selectToken);
  const isConnected = useAppSelector(selectIsConnected);
  const isConnecting = useAppSelector(selectIsConnecting);
  const error = useAppSelector(selectSocketError);
  const onlineUsers = useAppSelector(selectOnlineUsers);
  const unreadMessages = useAppSelector(selectUnreadMessages);

  // Connect to socket when authenticated
  useEffect(() => {
    if (user && token) {
      socketService.connect(token);
    }

    return () => {
      // Only disconnect on unmount if user is still authenticated
      // This prevents disconnection during re-renders
    };
  }, [user, token]);

  // Disconnect when user logs out
  useEffect(() => {
    if (!user && socketService.isConnected()) {
      socketService.disconnect();
    }
  }, [user]);

  // Listen for notification events and show toast
  useEffect(() => {
    if (!isConnected) return;

    // Handler for offer notifications
    const handleOfferNotification = (data: NotificationData) => {
      const title = data.notification?.title || data.title || "New Offer";
      const message =
        data.notification?.message || data.message || "You have a new offer!";
      console.log(title, message, "notifications");
      // toast.info(message, { description: title });
    };

    // Handler for message notifications
    const handleMessageNotification = (data: NotificationData) => {
      const title = data.notification?.title || data.title || "New Message";
      const message =
        data.notification?.message || data.message || "You have a new message!";
      toast.info(message, { description: title });
    };

    // Handler for order notifications
    const handleOrderNotification = (data: NotificationData) => {
      const title = data.notification?.title || data.title || "Order Update";
      const message =
        data.notification?.message ||
        data.message ||
        "Your order has been updated!";
      toast.info(message, { description: title });
    };

    // Subscribe to notification events
    const unsubOffer = socketService.on(
      SOCKET_CONFIG.events.NOTIFICATION_OFFER,
      handleOfferNotification as (...args: unknown[]) => void,
    );
    const unsubMessage = socketService.on(
      SOCKET_CONFIG.events.NOTIFICATION_MESSAGE,
      handleMessageNotification as (...args: unknown[]) => void,
    );
    const unsubOrder = socketService.on(
      SOCKET_CONFIG.events.NOTIFICATION_ORDER,
      handleOrderNotification as (...args: unknown[]) => void,
    );

    return () => {
      unsubOffer();
      unsubMessage();
      unsubOrder();
    };
  }, [isConnected]);

  // Manual connect
  const connect = useCallback(() => {
    if (token) {
      socketService.connect(token);
    }
  }, [token]);

  // Manual disconnect
  const disconnect = useCallback(() => {
    socketService.disconnect();
  }, []);

  // Join conversation
  const joinConversation = useCallback(
    (conversationId: string, callback?: (response: SocketResponse) => void) => {
      socketService.joinConversation({ conversationId }, callback);
    },
    [],
  );

  // Leave conversation
  const leaveConversation = useCallback((conversationId: string) => {
    socketService.leaveConversation(conversationId);
  }, []);

  // Send message
  const sendMessage = useCallback(
    (
      payload: SendMessagePayload,
      callback?: (response: SocketResponse) => void,
    ) => {
      socketService.sendMessage(payload, callback);
    },
    [],
  );

  // Start typing
  const startTyping = useCallback((conversationId: string) => {
    socketService.startTyping({ conversationId });
  }, []);

  // Stop typing
  const stopTyping = useCallback((conversationId: string) => {
    socketService.stopTyping({ conversationId });
  }, []);

  // Mark as read
  const markAsRead = useCallback((conversationId: string) => {
    socketService.markAsRead(conversationId);
  }, []);

  // Check if user is online
  const isUserOnline = useCallback(
    (userId: string) => onlineUsers.includes(userId),
    [onlineUsers],
  );

  // Memoize context value
  const contextValue = useMemo<SocketContextType>(
    () => ({
      isConnected,
      isConnecting,
      error,
      onlineUsers,
      unreadMessages,
      connect,
      disconnect,
      joinConversation,
      leaveConversation,
      sendMessage,
      startTyping,
      stopTyping,
      markAsRead,
      isUserOnline,
    }),
    [
      isConnected,
      isConnecting,
      error,
      onlineUsers,
      unreadMessages,
      connect,
      disconnect,
      joinConversation,
      leaveConversation,
      sendMessage,
      startTyping,
      stopTyping,
      markAsRead,
      isUserOnline,
    ],
  );

  return (
    <SocketContext.Provider value={contextValue}>
      {children}
    </SocketContext.Provider>
  );
};

// Custom hook to use socket context
export const useSocketContext = (): SocketContextType => {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error("useSocketContext must be used within a SocketProvider");
  }

  return context;
};

export default SocketProvider;
