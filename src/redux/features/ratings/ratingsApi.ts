import { baseApi } from "@/src/redux/baseApi/baseApi";

interface SellerRatingsParams {
  page?: number;
  limit?: number;
  minRating?: number;
}

interface CreateRatingBody {
  orderId: string;
  sellerId: string;
  rating: number;
  comment?: string;
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
      invalidatesTags: (_result, _error, { orderId, sellerId }) => [
        "Rating",
        { type: "Order", id: orderId },
        { type: "Rating", id: `SELLER_${sellerId}` },
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
      query: ({
        sellerId,
        params,
      }: {
        sellerId: string;
        params?: SellerRatingsParams;
      }) => ({
        url: `/ratings/seller/${sellerId}`,
        method: "GET",
        params: params || { page: 1, limit: 10 },
      }),
      providesTags: (_result, _error, { sellerId }) => [
        { type: "Rating", id: `SELLER_${sellerId}` },
        "Rating",
      ],
    }),
    // Get ratings for a seller
    getSellerRatingStats: builder.query({
      query: ({ params }) => ({
        url: `/ratings/seller/feedback-stats`,
        method: "GET",
        params: params || { page: 1, limit: 10 },
      }),
      providesTags: ["Rating"],
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
