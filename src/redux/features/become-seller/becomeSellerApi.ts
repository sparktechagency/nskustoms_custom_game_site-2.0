import { baseApi } from "@/src/redux/baseApi/baseApi";

const becomeSellerPostApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    applyBecomeSeller: builder.mutation({
      query: (becomeSeller) => ({
        url: "/become-seller/apply",
        method: "POST",
        body: becomeSeller,
      }),
      invalidatesTags: ["SellerApplication", "User"],
    }),
    deleteMySellerApplication: builder.mutation({
      query: () => ({
        url: "/become-seller/my-application",
        method: "DELETE",
      }),
      invalidatesTags: ["SellerApplication"],
    }),
    getMySellerApplication: builder.query({
      query: () => ({
        url: "/become-seller/my-application",
        method: "GET",
      }),
      providesTags: ["SellerApplication"],
    }),
    getTransactions: builder.query({
      query: () => ({
        url: "/transactions/my-transactions",
        method: "GET",
      }),
      providesTags: ["Transaction"],
    }),
    getTransactionsStats: builder.query({
      query: () => ({
        url: "/transactions/stats",
        method: "GET",
      }),
      providesTags: ["Transaction"],
    }),
    setTransactions: builder.mutation({
      query: (data) => ({
        url: "transactions",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Transaction"],
    }),
    setRefunds: builder.mutation({
      query: (data) => ({
        url: "/refunds",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Transaction", "Order"],
    }),
  }),
});

export const {
  useApplyBecomeSellerMutation,
  useDeleteMySellerApplicationMutation,
  useGetMySellerApplicationQuery,
  useGetTransactionsQuery,
  useGetTransactionsStatsQuery,
  useSetTransactionsMutation,
  useSetRefundsMutation,
} = becomeSellerPostApi;
