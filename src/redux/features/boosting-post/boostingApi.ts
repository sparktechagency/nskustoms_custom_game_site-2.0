import { baseApi } from "@/src/redux/baseApi/baseApi";

interface BoostingPostParams {
  page?: number;
  limit?: number;
  type?: "all" | "in_progress" | "completed" | "cancelled";
}

interface ApiResponse<T> {
  data: T;
  message?: string;
}

const boostingPostApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBoostingPost: builder.mutation({
      query: (boostingBody) => ({
        url: "/boosting-posts",
        method: "POST",
        body: boostingBody,
      }),
    }),

    makeBoostingAsCompleted: builder.mutation({
      query: (id: string) => ({
        url: `/boosting-posts/${id}/complete`,
        method: "PATCH",
      }),
    }),

    makeBoostingAsCancelled: builder.mutation({
      query: (id: string) => ({
        url: `/boosting-posts/${id}/cancel`,
        method: "PATCH",
      }),
    }),

    makeBoostingDeleted: builder.mutation({
      query: (id: string) => ({
        url: `/boosting-posts/${id}`,
        method: "DELETE",
      }),
    }),

    getMyBoostingPost: builder.query({
      query: (params?: BoostingPostParams) => ({
        url: "/boosting-posts/my-post",
        method: "GET",
        params: params,
      }),
      transformResponse: (res: ApiResponse<unknown>) => res.data,
    }),

    getSingleBoostingPost: builder.query({
      query: (id: string) => ({
        url: `/boosting-posts/${id}`,
        method: "GET",
      }),
      transformResponse: (res: ApiResponse<unknown>) => res.data,
    }),
  }),
});

export const {
  useCreateBoostingPostMutation,
  useMakeBoostingAsCompletedMutation,
  useMakeBoostingAsCancelledMutation,
  useMakeBoostingDeletedMutation,
  useGetMyBoostingPostQuery,
  useGetSingleBoostingPostQuery,
  useLazyGetMyBoostingPostQuery,
  useLazyGetSingleBoostingPostQuery,
} = boostingPostApi;
