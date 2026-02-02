"use client";

import { useCallback, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/src/redux/hooks";
import { selectCurrentUser, selectToken } from "@/src/redux/features/auth/authSlice";
import {
  selectIsConnected,
  selectIsConnecting,
  selectSocketError,
  selectOnlineUsers,
  selectTypingUsersInConversation,
  selectUnreadMessages,
  setCurrentConversation,
  clearTypingUsers,
  resetUnreadMessages,
} from "@/src/redux/features/socket/socketSlice";
import { SOCKET_CONFIG } from "@/src/lib/socket/socketConfig";
import socketService from "@/src/lib/socket/socketService";
import type {
  SocketMessage,
  SocketResponse,
  SendMessagePayload,
  MessagesResponse,
} from "@/src/redux/features/socket/socket.types";

// Main socket hook
export const useSocket = () => {
  const isConnected = useAppSelector(selectIsConnected);
  const isConnecting = useAppSelector(selectIsConnecting);
  const error = useAppSelector(selectSocketError);
  const onlineUsers = useAppSelector(selectOnlineUsers);
  const unreadMessages = useAppSelector(selectUnreadMessages);

  return {
    isConnected,
    isConnecting,
    error,
    onlineUsers,
    unreadMessages,
    socket: socketService,
  };
};

// Hook for checking if a user is online
export const useIsUserOnline = (userId: string | undefined): boolean => {
  const onlineUsers = useAppSelector(selectOnlineUsers);
  return userId ? onlineUsers.includes(userId) : false;
};

// Hook for conversation management
export const useConversation = (conversationId: string | null) => {
  const dispatch = useAppDispatch();
  const isConnected = useAppSelector(selectIsConnected);
  const typingUsers = useAppSelector(
    conversationId ? selectTypingUsersInConversation(conversationId) : () => []
  );

  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isTypingRef = useRef(false);

  // Join conversation on mount
  useEffect(() => {
    if (!conversationId || !isConnected) return;

    dispatch(setCurrentConversation(conversationId));

    socketService.joinConversation(
      { conversationId },
      (response) => {
        if (!response.success) {
          console.error("[Socket] Failed to join conversation:", response.error);
        }
      }
    );

    // Mark as read when joining
    socketService.markAsRead(conversationId);

    return () => {
      dispatch(setCurrentConversation(null));
      dispatch(clearTypingUsers(conversationId));
      socketService.leaveConversation(conversationId);
    };
  }, [conversationId, isConnected, dispatch]);

  // Send message
  const sendMessage = useCallback(
    (message: string, callback?: (response: SocketResponse) => void) => {
      if (!conversationId) return;

      const payload: SendMessagePayload = {
        conversationId,
        message,
      };

      socketService.sendMessage(payload, callback);

      // Stop typing indicator when sending
      if (isTypingRef.current) {
        socketService.stopTyping({ conversationId });
        isTypingRef.current = false;
      }
    },
    [conversationId]
  );

  // Get messages
  const getMessages = useCallback(
    (
      options?: { page?: number; limit?: number },
      callback?: (response: SocketResponse<MessagesResponse>) => void
    ) => {
      if (!conversationId) return;
      socketService.getMessages(conversationId, options, callback);
    },
    [conversationId]
  );

  // Handle typing indicator
  const handleTyping = useCallback(() => {
    if (!conversationId) return;

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Start typing if not already
    if (!isTypingRef.current) {
      socketService.startTyping({ conversationId });
      isTypingRef.current = true;
    }

    // Stop typing after 2 seconds of inactivity
    typingTimeoutRef.current = setTimeout(() => {
      if (isTypingRef.current && conversationId) {
        socketService.stopTyping({ conversationId });
        isTypingRef.current = false;
      }
    }, 2000);
  }, [conversationId]);

  // Mark as read
  const markAsRead = useCallback(() => {
    if (!conversationId) return;
    socketService.markAsRead(conversationId);
    dispatch(resetUnreadMessages());
  }, [conversationId, dispatch]);

  // Cleanup typing timeout on unmount
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  return {
    typingUsers,
    sendMessage,
    getMessages,
    handleTyping,
    markAsRead,
  };
};

// Hook for listening to socket events
export const useSocketEvent = <T = unknown>(
  event: string,
  callback: (data: T) => void,
  deps: React.DependencyList = []
) => {
  const isConnected = useAppSelector(selectIsConnected);

  useEffect(() => {
    if (!isConnected) return;

    const unsubscribe = socketService.on(event, callback as (data: unknown) => void);

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, event, ...deps]);
};

// Hook for listening to new messages in a conversation
export const useMessageListener = (
  conversationId: string | null,
  onMessage: (message: SocketMessage) => void
) => {
  useSocketEvent<{ conversationId: string; message: SocketMessage }>(
    SOCKET_CONFIG.events.CONVERSATION_MESSAGE,
    (data) => {
      if (data.conversationId === conversationId) {
        onMessage(data.message);
      }
    },
    [conversationId, onMessage]
  );
};

// Hook for boosting post notifications
export const useBoostingPostNotifications = (callbacks: {
  onNew?: (data: unknown) => void;
  onUpdated?: (data: unknown) => void;
  onDeleted?: (data: unknown) => void;
}) => {
  const { events } = SOCKET_CONFIG;

  useSocketEvent(events.BOOSTING_POST_NEW, callbacks.onNew ?? (() => {}), [
    callbacks.onNew,
  ]);
  useSocketEvent(events.BOOSTING_POST_UPDATED, callbacks.onUpdated ?? (() => {}), [
    callbacks.onUpdated,
  ]);
  useSocketEvent(events.BOOSTING_POST_DELETED, callbacks.onDeleted ?? (() => {}), [
    callbacks.onDeleted,
  ]);
};

// Hook for offer notifications
export const useOfferNotifications = (callbacks: {
  onNew?: (data: unknown) => void;
  onStatusChanged?: (data: unknown) => void;
}) => {
  const { events } = SOCKET_CONFIG;

  useSocketEvent(events.OFFER_NEW, callbacks.onNew ?? (() => {}), [callbacks.onNew]);
  useSocketEvent(events.OFFER_STATUS_CHANGED, callbacks.onStatusChanged ?? (() => {}), [
    callbacks.onStatusChanged,
  ]);
};

// Hook for initializing socket connection
export const useSocketConnection = () => {
  const user = useAppSelector(selectCurrentUser);
  const token = useAppSelector(selectToken);
  const isConnected = useAppSelector(selectIsConnected);

  useEffect(() => {
    // Connect when user is authenticated
    if (user && token && !isConnected) {
      socketService.connect(token);
    }

    // Disconnect when user logs out
    if (!user && isConnected) {
      socketService.disconnect();
    }

    // Cleanup on unmount
    return () => {
      // Don't disconnect on unmount - let the provider handle lifecycle
    };
  }, [user, token, isConnected]);

  return { isConnected };
};
