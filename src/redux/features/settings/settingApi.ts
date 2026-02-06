import { baseApi } from "@/src/redux/baseApi/baseApi";

interface GetSettingParams {
  type: "privacy_policy" | "terms_condition" | "about_us" | "platform_charge";
}

const generSettingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get setting by type
    getSettingByType: builder.query({
      query: ({ type }: GetSettingParams) => ({
        url: `/settings/${type}`,
        method: "GET",
      }),
      transformResponse: (res) => res.data,
      providesTags: (_result, _error, { type }) => [{ type: "Setting", id: type }],
    }),
    postSupportMessage: builder.mutation({
      query: (data) => ({
        url: "/admin/support-messages/create",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetSettingByTypeQuery, usePostSupportMessageMutation } = generSettingApi;
