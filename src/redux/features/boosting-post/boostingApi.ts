import { baseApi } from "@/src/redux/baseApi/baseApi";

interface BoostingPostParams {
  page?: number;
  limit?: number;
  type?: "all" | "in_progress" | "completed" | "cancelled";
}

interface SellerBrowseParams {
  page?: number;
  limit?: number;
  type?:
    | "waiting_for_offer"
    | "offer_accepted"
    | "offer_submitted"
    | "offer_lost";
}

const boostingPostApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create boosting post
    createBoostingPost: builder.mutation({
      query: (boostingBody) => ({
        url: "/boosting-posts",
        method: "POST",
        body: boostingBody,
      }),
      invalidatesTags: ["BoostingPost"],
    }),

    // Mark boosting as completed
    makeBoostingAsCompleted: builder.mutation({
      query: (id: string) => ({
        url: `/boosting-posts/${id}/complete`,
        method: "PATCH",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "BoostingPost", id },
        "BoostingPost",
        "Order",
      ],
    }),

    // Mark boosting as cancelled
    makeBoostingAsCancelled: builder.mutation({
      query: (id: string) => ({
        url: `/boosting-posts/${id}/cancel`,
        method: "PATCH",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "BoostingPost", id },
        "BoostingPost",
        "Order",
      ],
    }),

    // Delete boosting post
    deleteBoostingPost: builder.mutation({
      query: (id: string) => ({
        url: `/boosting-posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["BoostingPost"],
    }),

    // Get my boosting posts (as buyer)
    getMyBoostingPosts: builder.query({
      query: (params?: BoostingPostParams) => ({
        url: "/boosting-posts/my-posts",
        method: "GET",
        params: params,
      }),
      transformResponse: (res) => res?.data,
      providesTags: (result) =>
        result?.boostingPosts
          ? [
              ...result.boostingPosts.map(({ _id }: { _id: string }) => ({
                type: "BoostingPost" as const,
                id: _id,
              })),
              "BoostingPost",
            ]
          : ["BoostingPost"],
    }),

    // Get single boosting post by ID
    getBoostingPostById: builder.query({
      query: (id: string) => ({
        url: `/boosting-posts/${id}`,
        method: "GET",
      }),
      transformResponse: (res) => res.data,
      providesTags: (_result, _error, id) => [{ type: "BoostingPost", id }],
    }),
    // Get single boosting post by ID for seller
    getBoostingPostByIdForSeller: builder.query({
      query: (id: string) => ({
        url: `/boosting-posts/${id}/seller`,
        method: "GET",
      }),
      transformResponse: (res) => res.data,
      providesTags: (_result, _error, id) => [{ type: "BoostingPost", id }],
    }),

    // Get all boosting posts for seller to browse
    getBoostingPostsForSeller: builder.query({
      query: (params?: SellerBrowseParams) => ({
        url: "/boosting-posts/seller/browse",
        method: "GET",
        params: params || { page: 1, limit: 10 },
      }),
      transformResponse: (res) => res?.data,
      providesTags: (result) =>
        result?.boostingPosts
          ? [
              ...result.boostingPosts.map(({ _id }: { _id: string }) => ({
                type: "BoostingPost" as const,
                id: _id,
              })),
              "BoostingPost",
            ]
          : ["BoostingPost"],
    }),
  }),
});

export const {
  useCreateBoostingPostMutation,
  useMakeBoostingAsCompletedMutation,
  useMakeBoostingAsCancelledMutation,
  useDeleteBoostingPostMutation,
  useGetMyBoostingPostsQuery,
  useGetBoostingPostByIdQuery,
  useGetBoostingPostsForSellerQuery,
  useLazyGetMyBoostingPostsQuery,
  useLazyGetBoostingPostByIdQuery,
  useLazyGetBoostingPostsForSellerQuery,
  useGetBoostingPostByIdForSellerQuery,
} = boostingPostApi;
