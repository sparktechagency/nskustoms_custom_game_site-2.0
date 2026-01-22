import { baseApi } from "@/src/redux/baseApi/baseApi";

interface NotificationParams {
  page?: number;
  limit?: number;
}

interface CreateNotificationBody {
  title: string;
  message: string;
  type?: string;
  [key: string]: unknown;
}

interface MarkReadBody {
  notificationIds?: string[];
  markAll?: boolean;
}

const notificationsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create notification
    createNotification: builder.mutation({
      query: (notificationBody: CreateNotificationBody) => ({
        url: "/notifications",
        method: "POST",
        body: notificationBody,
      }),
      invalidatesTags: ["notification"],
    }),

    // Get my notifications
    getMyNotifications: builder.query({
      query: (params?: NotificationParams) => ({
        url: "/notifications",
        method: "GET",
        params: params || { page: 1, limit: 10 },
      }),
      transformResponse: (res) => res.data,
      providesTags: ["notification"],
    }),

    // Delete notification by ID
    deleteNotification: builder.mutation({
      query: (id: string) => ({
        url: `/notifications/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["notification"],
    }),

    // Mark notifications as read
    markNotificationsAsRead: builder.mutation({
      query: (body?: MarkReadBody) => ({
        url: "/notifications/mark-read",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["notification"],
    }),
  }),
});

export const {
  useCreateNotificationMutation,
  useGetMyNotificationsQuery,
  useDeleteNotificationMutation,
  useMarkNotificationsAsReadMutation,
  useLazyGetMyNotificationsQuery,
} = notificationsApi;
