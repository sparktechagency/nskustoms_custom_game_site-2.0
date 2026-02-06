import { baseApi } from "@/src/redux/baseApi/baseApi";

interface CreateRatingBody {
  orderId: string;
  rating: number;
  content?: string;
  [key: string]: unknown;
}

interface UpdateRatingBody {
  rating?: number;
  comment?: string;
  [key: string]: unknown;
}

const ratingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create rating
    createRating: builder.mutation({
      query: (ratingBody: CreateRatingBody) => ({
        url: "/ratings",
        method: "POST",
        body: ratingBody,
      }),
      invalidatesTags: (_result, _error, { orderId }) => [
        "Rating",
        { type: "Order", id: orderId },
        "BoostingPost",
      ],
    }),

    // Get rating by order ID
    getRatingByOrderId: builder.query({
      query: (orderId: string) => ({
        url: `/ratings/order/${orderId}`,
        method: "GET",
      }),
      providesTags: (_result, _error, orderId) => [
        { type: "Rating", id: `ORDER_${orderId}` },
      ],
    }),

    // Get ratings for a seller
    getRatingsForSeller: builder.query({
      query: () => ({
        url: `/ratings/seller`,
        method: "GET",
      }),
      transformResponse: (res) => res?.data,
      providesTags: ["Rating"],
    }),
    // Get ratings for a seller
    getSellerRatingStats: builder.query({
      query: ({ params }) => ({
        url: `/ratings/seller/feedback-stats`,
        method: "GET",
        params: params || { page: 1, limit: 10 },
      }),
      providesTags: ["Rating"],
      transformResponse: (res) => res?.data,
    }),

    // Update rating by ID
    updateRating: builder.mutation({
      query: ({
        id,
        ratingBody,
      }: {
        id: string;
        ratingBody: UpdateRatingBody;
      }) => ({
        url: `/ratings/${id}`,
        method: "PUT",
        body: ratingBody,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Rating", id },
        "Rating",
      ],
    }),

    // Delete rating by ID
    deleteRating: builder.mutation({
      query: (id: string) => ({
        url: `/ratings/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Rating", id },
        "Rating",
      ],
    }),
  }),
});

export const {
  useCreateRatingMutation,
  useGetRatingByOrderIdQuery,
  useGetRatingsForSellerQuery,
  useUpdateRatingMutation,
  useDeleteRatingMutation,
  useLazyGetRatingByOrderIdQuery,
  useLazyGetRatingsForSellerQuery,
  useGetSellerRatingStatsQuery,
} = ratingsApi;
