"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Drawer, Menu } from "antd";

import {
  FaRocket,
  FaTags,
  FaEnvelope,
  FaBell,
  FaStar,
  FaCog,
} from "react-icons/fa";
import Image from "next/image";
import { CgMenuBoxed } from "react-icons/cg";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/src/redux/features/auth/authSlice";

// Profile component for reuse
const ProfileSection = () => {
  const user = useSelector(selectCurrentUser);
  return (
    <div className="flex items-center gap-1 p-2 bg-gradient-to-br from-slate-800 to-[#282836] rounded-lg border border-slate-700">
      {/* Avatar/Logo */}
      <div className="relative w-14 h-14  flex-shrink-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full opacity-20 blur-xl"></div>
        <div className="relative w-full h-full bg-gradient-to-br from-indigo-900 to-purple-900 rounded-full flex items-center justify-center border-2 border-purple-500/30 overflow-hidden">
          <Image
            src={user?.image as string}
            alt="Profile"
            width={200}
            height={200}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Text Content */}
      <div className="flex flex-col min-w-0">
        <h2 className="text-sm sm:text-md font-bold text-white mb-1 truncate">
          {user?.name || "N/A"}
        </h2>
      </div>
    </div>
  );
};

const SellerSidebar = () => {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Normalize pathname for comparison (remove trailing slash)
  const normalizedPathname = pathname?.replace(/\/$/, "");

  const menuItems = [
    { label: "Boosting", path: "/seller/sellerboosting", icon: FaRocket },
    { label: "Offers", path: "/seller/offers", icon: FaTags },
    { label: "Messages", path: "/seller/message", icon: FaEnvelope },
    { label: "Notifications", path: "/seller/notifications", icon: FaBell },
    { label: "Feedback", path: "/seller/feedback", icon: FaStar },
    { label: "Settings", path: "/seller/accountsetting", icon: FaCog },
  ];

  // AntD menu format
  const antdItems = menuItems.map((item) => ({
    key: item.path,
    icon: <item.icon />,
    label: <Link href={item.path}>{item.label}</Link>,
  }));

  return (
    <>
      {/* 📱 Phone menu button */}
      <button
        className="md:hidden fixed top-2 left-2 z-50 bg-slate-800/50 p-1 rounded-lg shadow-lg hover:bg-slate-700 transition-colors"
        onClick={() => setDrawerOpen(true)}
        aria-label="Open menu"
      >
        <CgMenuBoxed className="text-white text-xl" />
      </button>

      {/* 📱 Drawer (PHONE ONLY) - 50% width on mobile */}
      <Drawer
        placement="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        className="md:hidden"
        width="57%"
        styles={{
          body: { padding: 0, backgroundColor: "#0f172a" },
        }}
      >
        <div className="p-1 ">
          <ProfileSection />
        </div>
        <Menu
          mode="inline"
          className="bg-[#282836] border-0"
          selectedKeys={[normalizedPathname]}
          items={antdItems}
          onClick={() => setDrawerOpen(false)}
          style={{
            backgroundColor: "#282836",
            color: "#fff",
          }}
          styles={{
            item: {
              color: "#94a3b8", // slate-400 for inactive items
            },
          }}
          theme="dark"
        />
      </Drawer>

      {/* 🖥 Tablet + Desktop Sidebar */}
      <aside className="hidden md:flex md:flex-col md:w-48 lg:w-52 xl:w-60 min-h-[90vh] rounded-md bg-[#282836] text-white p-2">
        <div className="mb-4">
          <ProfileSection />
        </div>
        <Menu
          mode="inline"
          className="rounded-2xl mt-4 flex-1"
          selectedKeys={[normalizedPathname]}
          items={antdItems}
          theme="dark"
          style={{
            backgroundColor: "#282836",
            border: "none",
          }}
          styles={{
            item: {
              color: "#94a3b8", // slate-400 for inactive items
            },
          }}
        />
      </aside>

      {/* Custom CSS for active state */}
      <style jsx global>{`
        .ant-menu-item-selected,
        .ant-menu-item-selected:hover {
          background-color: #f4f7fb !important; /* red-500 */
          color: #ef4444 !important; /* white */
        }

        .ant-menu-item-selected .ant-menu-item-icon {
          color: #ef4444 !important; /* white icon */
        }

        .ant-menu-item-selected a {
          color: #ef4444 !important; /* white text */
        }

        .ant-menu-item:hover {
          background-color: #e2e8f04f !important; /* slate-800 */
          color: #e2e8f0 !important; /* slate-200 */
        }

        .ant-menu-dark .ant-menu-item-selected {
          background-color: !important; /* red-500 */
        }
      `}</style>
    </>
  );
};

export default SellerSidebar;
