import { baseApi } from "@/src/redux/baseApi/baseApi";

interface ConversationParams {
  page?: number;
  limit?: number;
}

interface MessageParams {
  page?: number;
  limit?: number;
}

interface CreateConversationBody {
  receiverId: string;
  type: string;
  referenceId: string;
}

interface SendMessageBody {
  content: string;
  type?: "text" | "image" | "file";
  [key: string]: unknown;
}

const conversationsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create conversation
    createConversation: builder.mutation({
      query: (conversationBody: CreateConversationBody) => ({
        url: "/conversations",
        method: "POST",
        body: conversationBody,
      }),
    }),

    // Get my conversations
    getMyConversations: builder.query({
      query: (params?: ConversationParams) => ({
        url: "/conversations",
        method: "GET",
        params: params || { page: 1, limit: 15 },
      }),
    }),

    // Get all messages by conversation ID
    getMessagesByConversationId: builder.query({
      query: ({ id, params }: { id: string; params?: MessageParams }) => ({
        url: `/conversations/${id}/messages`,
        method: "GET",
        params: params,
      }),
    }),

    // Send message by conversation ID
    sendMessage: builder.mutation({
      query: ({
        id,
        messageBody,
      }: {
        id: string;
        messageBody: SendMessageBody;
      }) => ({
        url: `/conversations/${id}/messages`,
        method: "POST",
        body: messageBody,
      }),
    }),

    // Get single conversation by ID
    getConversationById: builder.query({
      query: (id: string) => ({
        url: `/conversations/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateConversationMutation,
  useGetMyConversationsQuery,
  useGetMessagesByConversationIdQuery,
  useSendMessageMutation,
  useGetConversationByIdQuery,
  useLazyGetMyConversationsQuery,
  useLazyGetMessagesByConversationIdQuery,
  useLazyGetConversationByIdQuery,
} = conversationsApi;
