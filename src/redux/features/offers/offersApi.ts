import { baseApi } from "@/src/redux/baseApi/baseApi";

const offersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create a new order as buyer
    createOffersSeller: builder.mutation({
      query: (offersBody) => ({
        url: "/offers",
        method: "POST",
        body: offersBody,
      }),
    }),
    updateOffersSeller: builder.mutation({
      query: ({ offersBody, id }) => ({
        url: "/offers/${id}",
        method: "PUT",
        body: offersBody,
      }),
    }),

    // Get my offers as seller
    getMyOffersAsSeller: builder.query({
      query: (params) => ({
        url: "/offers/my-offers",
        method: "GET",
        params: params || { page: 1, limit: 10 },
      }),
    }),
    // Get Offers for a Post (Buyer)
    getMyOffersForBuyer: builder.query({
      query: (params, postId) => ({
        // offers/post/:postId?page=1&limit=10&status
        url: "/offers/post/${postId}?page=1&limit=10&status",
        method: "GET",
        params: params || { page: 1, limit: 10 },
      }),
    }),

    // Get single Offers by ID
    getOfferById: builder.query({
      query: (id: string) => ({
        url: `/offers/${id}`,
        method: "GET",
      }),
    }),
    // Respond to Offer (Buyer)
    respondToOfferBuyer: builder.mutation({
      query: (offersBody) => ({
        url: "/offers/respond",
        method: "POST",
        body: offersBody,
      }),
    }),
  }),
});

export const { useCreateOffersSellerMutation } = offersApi;
