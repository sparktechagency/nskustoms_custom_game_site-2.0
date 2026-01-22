import { baseApi } from "@/src/redux/baseApi/baseApi";

const boostingPostApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBoostingPost: builder.mutation({
      query: (boostingBody) => ({
        url: "/boosting-posts",
        method: "POST",
        body: boostingBody,
      }),
      transformResponse: (res) => res.data?.data,
    }),
  }),
});

export const { useCreateBoostingPostMutation } = boostingPostApi;
