import { baseApi } from "@/src/redux/baseApi/baseApi";

const notificationsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createNotifications: builder.mutation({
      query: (notificationsBody) => ({
        url: "/notifications",
        method: "POST",
        body: notificationsBody,
      }),
    }),

    // Get my notifications
    // get request /notifications?page=1&limit=10

    //  delete notification
    // delete request /notifications/:id

    // mark notifications as read
    // post request /notifications/mark-read
  }),
});

export const { useCreateNotificationsMutation } = notificationsApi;
