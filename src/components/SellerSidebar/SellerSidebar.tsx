"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Drawer, Menu } from "antd";

import {
  FaRocket,
  FaTags,
  FaEnvelope,
  FaBell,
  FaStar,
  FaCog,
  FaSignOutAlt,
  FaTimes,
} from "react-icons/fa";
import Image from "next/image";
import { CgMenuBoxed } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectCurrentUser } from "@/src/redux/features/auth/authSlice";
import { GiWallet } from "react-icons/gi";
import { Loader2 } from "lucide-react";
import socketService from "@/src/lib/socket/socketService";
import Logo from "@/src/Assets/Landing/logo.png";
import { BiSupport } from "react-icons/bi";

// Logout Confirmation Modal
const LogoutModal = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#282836] rounded-xl p-6 max-w-sm w-full border border-gray-700 shadow-2xl transform transition-all animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-center w-14 h-14 mx-auto mb-4 rounded-full bg-red-500/20">
          <FaSignOutAlt className="w-7 h-7 text-red-500" />
        </div>
        <h3 className="text-xl font-bold text-white text-center mb-2">
          Logout
        </h3>
        <p className="text-gray-400 text-center mb-6 text-sm">
          Are you sure you want to logout from your account?
        </p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 px-4 py-2.5 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors font-medium disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Logging out...</span>
              </>
            ) : (
              "Logout"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// Profile component for reuse
const ProfileSection = ({ compact = false }: { compact?: boolean }) => {
  const user = useSelector(selectCurrentUser);

  if (compact) {
    return (
      <div className="flex items-center justify-center p-2">
        <div className="relative w-10 h-10 flex-shrink-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full opacity-20 blur-lg"></div>
          <div className="relative w-full h-full bg-gradient-to-br from-indigo-900 to-purple-900 rounded-full flex items-center justify-center border-2 border-purple-500/30 overflow-hidden">
            {user?.image ? (
              <Image
                src={user.image}
                alt="Profile"
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-white text-sm font-bold">
                {user?.name?.charAt(0) || "U"}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 p-3 bg-gradient-to-br from-slate-800 to-[#282836] rounded-lg border border-slate-700/50">
      {/* Avatar/Logo */}
      <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full opacity-20 blur-xl"></div>
        <div className="relative w-full h-full bg-gradient-to-br from-indigo-900 to-purple-900 rounded-full flex items-center justify-center border-2 border-purple-500/30 overflow-hidden">
          {user?.image ? (
            <Image
              src={user.image}
              alt="Profile"
              width={200}
              height={200}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-white text-lg font-bold">
              {user?.name?.charAt(0) || "U"}
            </span>
          )}
        </div>
      </div>

      {/* Text Content */}
      <div className="flex flex-col min-w-0 flex-1">
        <h2 className="text-sm font-bold text-white truncate">
          {user?.name || "N/A"}
        </h2>
        <p className="text-xs text-gray-400 truncate">
          {user?.email || ""}
        </p>
      </div>
    </div>
  );
};

const SellerSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      // Disconnect socket
      socketService.disconnect();

      // Clear auth state
      dispatch(logout());
      localStorage.removeItem("auth-auraboost");

      setShowLogoutModal(false);
      setDrawerOpen(false);

      // Redirect to home
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Normalize pathname for comparison (remove trailing slash)
  const normalizedPathname = pathname?.replace(/\/$/, "");

  const menuItems = [
    { label: "Boosting", path: "/seller/sellerboosting", icon: FaRocket },
    { label: "Offers", path: "/seller/offers", icon: FaTags },
    { label: "Messages", path: "/seller/message", icon: FaEnvelope },
    { label: "Notifications", path: "/seller/notifications", icon: FaBell },
    { label: "Feedback", path: "/seller/feedback", icon: FaStar },
    { label: "Wallet", path: "/seller/wallet", icon: GiWallet },
    { label: "Support Message", path: "/seller/sellersupportmessage", icon: BiSupport },
    { label: "Settings", path: "/seller/accountsetting", icon: FaCog },
  ];

  // AntD menu format
  const antdItems = menuItems.map((item) => ({
    key: item.path,
    icon: <item.icon className="text-base" />,
    label: <Link href={item.path}>{item.label}</Link>,
  }));

  // Logout button component for reuse
  const LogoutButton = ({ onClick, className = "" }: { onClick: () => void; className?: string }) => (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200 group ${className}`}
    >
      <FaSignOutAlt className="w-4 h-4 group-hover:scale-110 transition-transform" />
      <span className="font-medium">Logout</span>
    </button>
  );

  return (
    <>
      {/* Mobile menu button - Fixed position */}
      <button
        className="lg:hidden fixed top-3 left-3 z-50 bg-slate-800/90 backdrop-blur-sm p-2 rounded-lg shadow-lg hover:bg-slate-700 transition-all duration-200 border border-slate-700/50"
        onClick={() => setDrawerOpen(true)}
        aria-label="Open menu"
      >
        <CgMenuBoxed className="text-white text-2xl" />
      </button>

      {/* Mobile & Tablet Drawer */}
      <Drawer
        placement="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        className="lg:hidden"
        width={280}
        closeIcon={null}
        styles={{
          body: { padding: 0, backgroundColor: "#1e1e2d" },
          header: { display: "none" },
        }}
      >
        <div className="flex flex-col h-full bg-[#1e1e2d]">
          {/* Drawer Header with Logo and Close Button */}
          <div className="flex items-center justify-between p-3 border-b border-gray-700/50">
            <Link href="/" onClick={() => setDrawerOpen(false)}>
              <Image
                src={Logo}
                height={120}
                width={120}
                className="w-[120px] h-[50px] object-contain"
                alt="Logo - Go to Home"
              />
            </Link>
            <button
              onClick={() => setDrawerOpen(false)}
              className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
            >
              <FaTimes className="text-gray-400 text-lg" />
            </button>
          </div>

          {/* Profile Section */}
          <div className="p-4 border-b border-gray-700/50">
            <ProfileSection />
          </div>

          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto">
            <Menu
              mode="inline"
              className="bg-transparent border-0"
              selectedKeys={[normalizedPathname]}
              items={antdItems}
              onClick={() => setDrawerOpen(false)}
              style={{
                backgroundColor: "transparent",
                color: "#fff",
              }}
              theme="dark"
            />
          </div>

          {/* Logout Button - Mobile */}
          <div className="p-4 border-t border-gray-700/50 bg-[#1a1a27]">
            <LogoutButton
              onClick={() => {
                setDrawerOpen(false);
                setShowLogoutModal(true);
              }}
            />
          </div>
        </div>
      </Drawer>

      {/* Desktop Sidebar - Hidden on mobile and tablet */}
      <aside className="hidden lg:flex lg:flex-col lg:w-56 xl:w-64 min-h-[90vh] rounded-xl bg-[#282836] text-white p-3 shadow-xl border border-gray-700/30">
        {/* Logo - Click to go home */}
        <Link href="/" className="block mb-4 pb-3 border-b border-gray-700/50">
          <Image
            src={Logo}
            height={150}
            width={150}
            className="w-[140px] h-[55px] object-contain mx-auto hover:opacity-80 transition-opacity"
            alt="Logo - Go to Home"
          />
        </Link>

        {/* Profile Section */}
        <div className="mb-4">
          <ProfileSection />
        </div>

        {/* Menu Items */}
        <div className="flex-1">
          <Menu
            mode="inline"
            className="rounded-lg bg-transparent"
            selectedKeys={[normalizedPathname]}
            items={antdItems}
            theme="dark"
            style={{
              backgroundColor: "transparent",
              border: "none",
            }}
          />
        </div>

        {/* Logout Button - Desktop */}
        <div className="mt-auto pt-4 border-t border-gray-700/50">
          <LogoutButton onClick={() => setShowLogoutModal(true)} />
        </div>
      </aside>

      {/* Logout Confirmation Modal */}
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
        isLoading={isLoggingOut}
      />

      {/* Custom CSS for active state */}
      <style jsx global>{`
        /* Menu item base styles */
        .ant-menu-dark.ant-menu-inline .ant-menu-item {
          margin: 4px 8px;
          border-radius: 8px;
          height: 44px;
          line-height: 44px;
        }

        /* Selected menu item */
        .ant-menu-item-selected,
        .ant-menu-item-selected:hover {
          background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%) !important;
          color: #dc2626 !important;
        }

        .ant-menu-item-selected .ant-menu-item-icon,
        .ant-menu-item-selected .ant-menu-item-icon svg {
          color: #dc2626 !important;
        }

        .ant-menu-item-selected a {
          color: #dc2626 !important;
          font-weight: 600;
        }

        /* Hover state for non-selected items */
        .ant-menu-dark .ant-menu-item:not(.ant-menu-item-selected):hover {
          background-color: rgba(255, 255, 255, 0.08) !important;
          color: #e2e8f0 !important;
        }

        .ant-menu-dark .ant-menu-item:not(.ant-menu-item-selected):hover a {
          color: #e2e8f0 !important;
        }

        /* Default text color */
        .ant-menu-dark .ant-menu-item a {
          color: #94a3b8;
          transition: color 0.2s ease;
        }

        .ant-menu-dark .ant-menu-item-icon {
          color: #94a3b8;
          transition: color 0.2s ease;
        }

        /* Drawer styles */
        .ant-drawer-content {
          background-color: #1e1e2d !important;
        }

        /* Mobile menu adjustments */
        @media (max-width: 1023px) {
          .ant-menu-dark.ant-menu-inline .ant-menu-item {
            margin: 2px 8px;
            height: 48px;
            line-height: 48px;
            font-size: 15px;
          }
        }
      `}</style>
    </>
  );
};

export default SellerSidebar;
