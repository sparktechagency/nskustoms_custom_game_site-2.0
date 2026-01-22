import { baseApi } from "@/src/redux/baseApi/baseApi";

const becomeSellerPostApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    applyBecomeSeller: builder.mutation({
      query: (becomeSeller) => ({
        url: "/become-seller/apply",
        method: "POST",
        body: becomeSeller,
      }),
    }),
    deleteMySellerApplication: builder.mutation({
      query: () => ({
        url: "/become-seller/my-application",
        method: "DELETE",
      }),
    }),
    getMySellerApplication: builder.query({
      query: () => ({
        url: "/become-seller/my-application",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useApplyBecomeSellerMutation,
  useDeleteMySellerApplicationMutation,
  useGetMySellerApplicationQuery,
} = becomeSellerPostApi;
