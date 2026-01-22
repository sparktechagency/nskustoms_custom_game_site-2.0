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
    }),

    // Get rating by order ID
    getRatingByOrderId: builder.query({
      query: (orderId: string) => ({
        url: `/ratings/order/${orderId}`,
        method: "GET",
      }),
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
    }),
    // Get ratings for a seller
    getSellerRatingStats: builder.query({
      query: ({ params }) => ({
        url: `/ratings/seller/feedback-stats`,
        method: "GET",
        params: params || { page: 1, limit: 10 },
      }),
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
    }),

    // Delete rating by ID
    deleteRating: builder.mutation({
      query: (id: string) => ({
        url: `/ratings/${id}`,
        method: "DELETE",
      }),
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
