import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/src/redux/store/store";
import { SocketState, TypingUser } from "./socket.types";

const initialState: SocketState = {
  isConnected: false,
  isConnecting: false,
  error: null,
  onlineUsers: [],
  currentConversationId: null,
  typingUsers: [],
  unreadMessages: 0,
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    // Connection state
    connectionInitiated: (state) => {
      state.isConnecting = true;
      state.error = null;
    },
    connectionEstablished: (state) => {
      state.isConnected = true;
      state.isConnecting = false;
      state.error = null;
    },
    connectionLost: (state) => {
      state.isConnected = false;
      state.isConnecting = false;
    },
    connectionError: (state, action: PayloadAction<string>) => {
      state.isConnected = false;
      state.isConnecting = false;
      state.error = action.payload;
    },
    resetConnection: (state) => {
      state.isConnected = false;
      state.isConnecting = false;
      state.error = null;
    },

    // Online users
    setOnlineUsers: (state, action: PayloadAction<string[]>) => {
      state.onlineUsers = action.payload;
    },
    userOnline: (state, action: PayloadAction<string>) => {
      if (!state.onlineUsers.includes(action.payload)) {
        state.onlineUsers.push(action.payload);
      }
    },
    userOffline: (state, action: PayloadAction<string>) => {
      state.onlineUsers = state.onlineUsers.filter((id) => id !== action.payload);
    },

    // Conversation
    setCurrentConversation: (state, action: PayloadAction<string | null>) => {
      state.currentConversationId = action.payload;
    },

    // Typing indicators
    addTypingUser: (state, action: PayloadAction<TypingUser>) => {
      const exists = state.typingUsers.some(
        (u) =>
          u.userId === action.payload.userId &&
          u.conversationId === action.payload.conversationId
      );
      if (!exists) {
        state.typingUsers.push(action.payload);
      }
    },
    removeTypingUser: (state, action: PayloadAction<{ conversationId: string; userId: string }>) => {
      state.typingUsers = state.typingUsers.filter(
        (u) =>
          !(u.userId === action.payload.userId &&
            u.conversationId === action.payload.conversationId)
      );
    },
    clearTypingUsers: (state, action: PayloadAction<string>) => {
      state.typingUsers = state.typingUsers.filter(
        (u) => u.conversationId !== action.payload
      );
    },

    // Unread messages
    incrementUnreadMessages: (state) => {
      state.unreadMessages += 1;
    },
    resetUnreadMessages: (state) => {
      state.unreadMessages = 0;
    },
    setUnreadMessages: (state, action: PayloadAction<number>) => {
      state.unreadMessages = action.payload;
    },
  },
});

export const {
  connectionInitiated,
  connectionEstablished,
  connectionLost,
  connectionError,
  resetConnection,
  setOnlineUsers,
  userOnline,
  userOffline,
  setCurrentConversation,
  addTypingUser,
  removeTypingUser,
  clearTypingUsers,
  incrementUnreadMessages,
  resetUnreadMessages,
  setUnreadMessages,
} = socketSlice.actions;

export default socketSlice.reducer;

// Selectors
export const selectSocketState = (state: RootState) => state.socket;
export const selectIsConnected = (state: RootState) => state.socket.isConnected;
export const selectIsConnecting = (state: RootState) => state.socket.isConnecting;
export const selectSocketError = (state: RootState) => state.socket.error;
export const selectOnlineUsers = (state: RootState) => state.socket.onlineUsers;
export const selectCurrentConversationId = (state: RootState) => state.socket.currentConversationId;
export const selectTypingUsers = (state: RootState) => state.socket.typingUsers;
export const selectUnreadMessages = (state: RootState) => state.socket.unreadMessages;

export const selectIsUserOnline = (userId: string) => (state: RootState) =>
  state.socket.onlineUsers.includes(userId);

export const selectTypingUsersInConversation = (conversationId: string) => (state: RootState) =>
  state.socket.typingUsers.filter((u) => u.conversationId === conversationId);
