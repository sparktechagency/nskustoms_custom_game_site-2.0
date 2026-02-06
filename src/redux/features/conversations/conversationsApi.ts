import { baseApi } from "@/src/redux/baseApi/baseApi";

interface ConversationParams {
  page?: number;
  limit?: number;
  type?: "boosting" | "support";
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
  message: string;
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
      invalidatesTags: ["Conversation"],
    }),

    // Get my conversations
    getMyConversations: builder.query({
      query: (params?: ConversationParams) => ({
        url: "/conversations",
        method: "GET",
        params: params || { page: 1, limit: 100 },
      }),
      transformResponse: (res) => res.data,
      providesTags: (result) =>
        result?.conversations
          ? [
              ...result.conversations.map(({ _id }: { _id: string }) => ({
                type: "Conversation" as const,
                id: _id,
              })),
              "Conversation",
            ]
          : ["Conversation"],
    }),

    // Get all messages by conversation ID
    getMessagesByConversationId: builder.query({
      query: ({ id, params }: { id: string; params?: MessageParams }) => ({
        url: `/conversations/${id}/messages`,
        method: "GET",
        params: params,
      }),
      transformResponse: (res) => res.data,
      providesTags: (_result, _error, { id }) => [{ type: "Message", id }],
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
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Message", id },
        { type: "Conversation", id },
      ],
    }),

    // Get single conversation by ID
    getConversationById: builder.query({
      query: (id: string) => ({
        url: `/conversations/${id}`,
        method: "GET",
      }),
      transformResponse: (res) => res.data,
      providesTags: (_result, _error, id) => [{ type: "Conversation", id }],
    }),
  }),
});

export const {
  useCreateConversationMutation,
  useGetMyConversationsQuery,
  useGetMessagesByConversationIdQuery,
  useSendMessageMutation,
  useGetConversationByIdQuery,
} = conversationsApi;
