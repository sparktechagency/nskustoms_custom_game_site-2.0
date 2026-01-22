"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/src/redux/features/auth/authSlice";

type UserRole = "user" | "seller" | "admin";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
  redirectTo = "/",
}) => {
  const router = useRouter();
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    // If no user is logged in, redirect to login
    if (!currentUser) {
      router.push("/login");
      return;
    }

    // If user's role is not in allowed roles, redirect
    if (!allowedRoles.includes(currentUser.role)) {
      router.push(redirectTo);
    }
  }, [currentUser, allowedRoles, redirectTo, router]);

  // Show nothing while checking authentication
  if (!currentUser) {
    return null;
  }

  // If user's role is not allowed, show nothing while redirecting
  if (!allowedRoles.includes(currentUser.role)) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
