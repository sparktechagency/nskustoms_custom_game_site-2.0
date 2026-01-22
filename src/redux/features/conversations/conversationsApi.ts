import { baseApi } from "@/src/redux/baseApi/baseApi";

const conversationsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createConversations: builder.mutation({
      query: (conversationsBody) => ({
        url: "/conversations",
        method: "POST",
        body: conversationsBody,
      }),
    }),

    // Get my conversations
    // get request /conversations?page=1&limit=15

    //  get all messages by conversations id
    // get /conversations/:id/messages

    // Send message by conversation id
    // post  /conversations/:id/messages
  }),
});

export const { useCreateConversationsMutation } = conversationsApi;
