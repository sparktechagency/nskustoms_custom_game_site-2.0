import { baseApi } from "@/src/redux/baseApi/baseApi";

interface OfferParams {
  page?: number;
  limit?: number;
  status?: string;
}

interface CreateOfferBody {
  boostingPostId: string;
  price: number;
  message?: string;
  [key: string]: unknown;
}

interface UpdateOfferBody {
  price?: number;
  message?: string;
  [key: string]: unknown;
}

interface RespondToOfferBody {
  offerId: string;
  status: "accepted" | "declined";
}

const offersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create a new offer as seller
    createOfferSeller: builder.mutation({
      query: (offersBody: CreateOfferBody) => ({
        url: "/offers",
        method: "POST",
        body: offersBody,
      }),
      invalidatesTags: (_result, _error, { boostingPostId }) => [
        "Offer",
        { type: "BoostingPost", id: boostingPostId },
      ],
    }),

    // Update offer as seller
    updateOfferSeller: builder.mutation({
      query: ({
        id,
        offersBody,
      }: {
        id: string;
        offersBody: UpdateOfferBody;
      }) => ({
        url: `/offers/${id}`,
        method: "PUT",
        body: offersBody,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Offer", id },
        "Offer",
      ],
    }),

    // Get my offers as seller
    getMyOffersAsSeller: builder.query({
      query: (params?: OfferParams) => ({
        url: "/offers/my-offers",
        method: "GET",
        params: params || { page: 1, limit: 10 },
      }),
      transformResponse: (r) => r.data,
      providesTags: (result) =>
        result?.offers
          ? [
              ...result.offers.map(({ _id }: { _id: string }) => ({
                type: "Offer" as const,
                id: _id,
              })),
              "Offer",
            ]
          : ["Offer"],
    }),

    // Get offers for a post (Buyer)
    getOffersForPost: builder.query({
      query: ({
        postId,
        params,
      }: {
        postId: string;
        params?: OfferParams;
      }) => ({
        url: `/offers/post/${postId}`,
        method: "GET",
        params: params || { page: 1, limit: 1000 },
      }),
      transformResponse: (res) => res?.data?.offers,
      providesTags: (result, _error, { postId }) =>
        result
          ? [
              ...result.map(({ _id }: { _id: string }) => ({
                type: "Offer" as const,
                id: _id,
              })),
              { type: "Offer", id: `POST_${postId}` },
            ]
          : [{ type: "Offer", id: `POST_${postId}` }],
    }),

    // Get single offer by ID
    getOfferById: builder.query({
      query: (id: string) => ({
        url: `/offers/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Offer", id }],
    }),

    // Respond to offer (Buyer) - accept/reject
    respondToOffer: builder.mutation({
      query: (offersBody: RespondToOfferBody) => ({
        url: "/offers/respond",
        method: "POST",
        body: offersBody,
      }),
      invalidatesTags: (_result, _error, { offerId }) => [
        { type: "Offer", id: offerId },
        "Offer",
        "BoostingPost",
        "Order",
      ],
    }),

    // Delete offer
    deleteOffer: builder.mutation({
      query: (id: string) => ({
        url: `/offers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Offer", id },
        "Offer",
      ],
    }),
  }),
});

export const {
  useCreateOfferSellerMutation,
  useUpdateOfferSellerMutation,
  useGetMyOffersAsSellerQuery,
  useGetOffersForPostQuery,
  useGetOfferByIdQuery,
  useRespondToOfferMutation,
  useDeleteOfferMutation,
  useLazyGetMyOffersAsSellerQuery,
  useLazyGetOffersForPostQuery,
  useLazyGetOfferByIdQuery,
} = offersApi;
