import { baseApi } from "@/src/redux/baseApi/baseApi";

const ratingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createRatings: builder.mutation({
      query: (createRatings) => ({
        url: "/ratings",
        method: "POST",
        body: createRatings,
      }),
    }),

    // Get Rating By Order
    // get request /ratings/order/:orderId

    //  Get Ratings for a Seller
    // get /ratings/seller/:sellerId?page=1&limit=10&minRating=3

    // update ratings by id
    // put  /ratings/:id

    // delete ratings by id
    // DEL  /ratings/:id
  }),
});

export const { useCreateRatingsMutation } = ratingsApi;
