/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState, useEffect, useCallback } from "react";
import { Bell, X, Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import { selectIsConnected } from "@/src/redux/features/socket/socketSlice";
import socketService from "@/src/lib/socket/socketService";
import { SOCKET_CONFIG } from "@/src/lib/socket/socketConfig";
import { toast } from "sonner";

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
  const isConnected = useSelector(selectIsConnected);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  // Fetch notifications via socket
  const fetchNotifications = useCallback(() => {
    if (!isConnected) return;

    socketService.getNotificationList<NotificationsResponse>(
      { page: 1, limit: 50 },
      (response) => {
        setIsLoading(false);
        if (response.success && response.data) {
          setNotifications(response.data.notifications || []);
          setUnreadCount(response.data.unreadCount || 0);
        }
      },
    );
  }, [isConnected]);

  // Initial fetch when connected
  useEffect(() => {
    if (isConnected) {
      fetchNotifications();
    }
  }, [isConnected, fetchNotifications]);

  // Listen for real-time notification updates
  useEffect(() => {
    if (!isConnected) return;

    // Handler for new notifications
    const handleNewNotification = (data: {
      type: string;
      notification?: Notification;
    }) => {
      if (data.notification) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setNotifications((prev) => {
          const exists = prev.some((n) => n._id === data.notification!._id);
          if (exists) return prev;
          return [data.notification!, ...prev];
        });
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setUnreadCount((prev) => prev + 1);
      }
    };

    // Subscribe to notification events
    const unsubOffer = socketService.on(
      SOCKET_CONFIG.events.NOTIFICATION_OFFER,
      handleNewNotification as (...args: unknown[]) => void,
    );
    const unsubMessage = socketService.on(
      SOCKET_CONFIG.events.NOTIFICATION_MESSAGE,
      handleNewNotification as (...args: unknown[]) => void,
    );
    const unsubOrder = socketService.on(
      SOCKET_CONFIG.events.NOTIFICATION_ORDER,
      handleNewNotification as (...args: unknown[]) => void,
    );

    return () => {
      unsubOffer();
      unsubMessage();
      unsubOrder();
    };
  }, [isConnected]);

  const handleDelete = useCallback(
    (id: string) => {
      if (!isConnected) return;

      setIsDeleting(id);
      socketService.deleteNotification(id, (response) => {
        setIsDeleting(null);
        if (response.success) {
          setNotifications((prev) => prev.filter((n) => n._id !== id));
          // Update unread count if the deleted notification was unread
          const deletedNotification = notifications.find((n) => n._id === id);
          if (deletedNotification && !deletedNotification.isRead) {
            setUnreadCount((prev) => Math.max(0, prev - 1));
          }
        } else {
          toast.error("Failed to delete notification");
        }
      });
    },
    [isConnected, notifications],
  );

  const handleMarkAsRead = useCallback(
    (notification: Notification) => {
      if (notification.isRead || !isConnected) return;

      socketService.markNotificationAsRead([notification._id], (response) => {
        if (response.success) {
          setNotifications((prev) =>
            prev.map((n) =>
              n._id === notification._id ? { ...n, isRead: true } : n,
            ),
          );
          setUnreadCount((prev) => Math.max(0, prev - 1));
        }
      });
    },
    [isConnected],
  );

  return (
    <div>
      {/* Content */}
      <div className="relative px-6">
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
                      disabled={isDeleting === notification._id}
                      className="text-gray-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all disabled:opacity-50"
                    >
                      {isDeleting === notification._id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <X className="w-4 h-4" />
                      )}
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
