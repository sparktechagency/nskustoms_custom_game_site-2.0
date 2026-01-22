/* eslint-disable react/no-unescaped-entities */
"use client";

import {
  useDeleteNotificationMutation,
  useGetMyNotificationsQuery,
  useMarkNotificationsAsReadMutation,
} from "@/src/redux/features/notifications/notificationsApi";
import { Bell, X, Loader2 } from "lucide-react";

interface Notification {
  _id: string;
  userId: string;
  title: string;
  message: string;
  type: string;
  price?: number;
  referenceId?: string;
  referenceType?: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

interface NotificationsResponse {
  notifications: Notification[];
  total: number;
  pages: number;
  unreadCount: number;
}

// Helper function to format relative time
const formatRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "Just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min ago`;
  if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 604800)
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  return date.toLocaleDateString();
};

// Helper function to format notification type
const formatType = (type: string): string => {
  return type
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const Notifications = () => {
  const {
    data: userNotifications,
    isLoading,
    refetch,
  } = useGetMyNotificationsQuery({});
  const [deleteNotification, { isLoading: isDeleting }] =
    useDeleteNotificationMutation();
  const [markAsRead] = useMarkNotificationsAsReadMutation();

  const notificationsData = userNotifications as
    | NotificationsResponse
    | undefined;
  const notifications = notificationsData?.notifications || [];
  const unreadCount = notificationsData?.unreadCount || 0;

  const handleDelete = async (id: string) => {
    try {
      await deleteNotification(id).unwrap();
      refetch();
    } catch (error) {
      console.error("Failed to delete notification:", error);
    }
  };

  const handleMarkAsRead = async (notification: Notification) => {
    if (notification.isRead) return;

    try {
      await markAsRead({
        notificationIds: [notification._id],
      }).unwrap();
      refetch();
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
    }
  };

  return (
    <div>
      {/* Content */}
      <div className="relative">
        {/* Header */}
        <div className="flex items-center justify-between pb-4">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Bell className="w-8 h-8 text-red-500" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {unreadCount}
                </span>
              )}
            </div>
            <h1 className="text-white text-lg font-semibold">Notifications</h1>
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-[#282836] rounded-md">
          {isLoading ? (
            /* Loading State */
            <div className="flex flex-col items-center justify-center py-24 px-4">
              <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
              <p className="text-gray-400 mt-2">Loading notifications...</p>
            </div>
          ) : notifications.length === 0 ? (
            /* Empty State - You're all caught up! */
            <div className="flex flex-col items-center justify-center py-24 px-4">
              <div className="text-6xl mb-4 animate-bounce">🎉</div>
              <p className="text-gray-300 text-center text-lg">
                You're all caught up!
              </p>
            </div>
          ) : (
            /* Notifications List */
            <div className="divide-y divide-gray-700/50">
              {notifications.map((notification) => (
                <div
                  key={notification._id}
                  onClick={() => handleMarkAsRead(notification)}
                  className={`p-4 hover:bg-gray-800/30 transition-colors cursor-pointer group ${
                    !notification.isRead ? "bg-gray-800/20" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-white font-medium">
                          {notification.title}
                        </h3>
                        <span className="px-2 py-0.5 bg-orange-500/20 text-orange-400 text-xs rounded">
                          {formatType(notification.type)}
                        </span>
                        {!notification.isRead && (
                          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        )}
                      </div>
                      <p className="text-gray-400 text-sm mb-1">
                        {notification.message}
                      </p>
                      {notification.price && (
                        <p className="text-green-400 text-sm mb-1">
                          Price: ${notification.price}
                        </p>
                      )}
                      <p className="text-gray-500 text-xs">
                        {formatRelativeTime(notification.createdAt)}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(notification._id);
                      }}
                      disabled={isDeleting}
                      className="text-gray-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all disabled:opacity-50"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
