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
    getTransactions: builder.query({
      query: () => ({
        url: "/transactions/my-transactions",
        method: "GET",
      }),
    }),
    getTransactionsStats: builder.query({
      query: () => ({
        url: "/transactions/stats",
        method: "GET",
      }),
    }),
    setTransactions: builder.mutation({
      query: (data) => ({
        url: "transactions",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useApplyBecomeSellerMutation,
  useDeleteMySellerApplicationMutation,
  useGetMySellerApplicationQuery,
  useGetTransactionsQuery,
  useGetTransactionsStatsQuery,
  useSetTransactionsMutation
} = becomeSellerPostApi;
