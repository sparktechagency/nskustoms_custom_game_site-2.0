/* eslint-disable react/no-unescaped-entities */
'use client';

import { Bell, X } from 'lucide-react';
const Notifications = () => {
    const allNotifications = [
    {
      id: 1,
      title: 'New Bonding Offer',
      subtitle: 'ETH Bonding',
      description: 'New payout on the offer',
      time: '1 day ago'
    },
    {
      id: 2,
      title: 'New Bonding Offer',
      subtitle: 'ETH Bonding',
      description: 'New payout on the offer',
      time: '1 day ago'
    },
    {
      id: 3,
      title: 'New Bonding Offer',
      subtitle: 'ETH Bonding',
      description: 'New payout on the offer',
      time: '1 day ago'
    }
  ];
 return (
 <div>
      {/* Content */}
      <div className="relative">
        {/* Header */}
        <div className="flex items-center justify-between pb-4">
          <div className="flex items-center gap-2">
            <Bell className="w-8 h-8 text-red-500" />
            <h1 className="text-white text-lg font-semibold">Notifications</h1>
          </div>
        </div>



        {/* Content Area */}
        <div className="bg-[#282836] rounded-md">
          {allNotifications.length === 0 ? (
            /* Empty State - You're all caught up! */
            <div className="flex flex-col items-center justify-center py-24 px-4">
              <div className="text-6xl mb-4 animate-bounce">🎉</div>
              <p className="text-gray-300 text-center text-lg">You're all caught up!</p>
            </div>
          ) : (
            /* Notifications List */
            <div className="divide-y divide-gray-700/50">
              {allNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className="p-4 hover:bg-gray-800/30 transition-colors cursor-pointer group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-white font-medium">
                          {notification.title}
                        </h3>
                        <span className="px-2 py-0.5 bg-orange-500/20 text-orange-400 text-xs rounded">
                          {notification.subtitle}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm mb-1">
                        {notification.description}
                      </p>
                      <p className="text-gray-500 text-xs">{notification.time}</p>
                    </div>
                    <button className="text-gray-600 hover:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
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