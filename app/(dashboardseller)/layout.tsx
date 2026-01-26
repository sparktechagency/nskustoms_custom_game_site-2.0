"use client";
import Footer from "@/src/components/Landing/Footer";
import React from "react";
import herobg from "@/src/Assets/seller/sellerBackground.png";
import BuyerSidebar from "@/src/components/Buyer/BuyerSidebar";
import ProtectedRoute from "@/src/Provider/ProtectedRoute";

const Dashboard = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProtectedRoute allowedRoles={["user"]}>
      <section
        className="w-full bg-no-repeat bg-cover bg-center rounded-md relative"
        style={{
          backgroundImage: `url(${herobg.src})`,
        }}
      >
        <div className="px-2 xl:container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 lg:gap-0 xl:gap-8  py-8">
            {/* Sidebar */}
            <div className="md:col-span-3 lg:col-span-3 xl:col-span-2">
              <BuyerSidebar />
            </div>

            {/* Main Content */}
            <div className="md:col-span-9 lg:col-span-9 xl:col-span-10 xl:ml-10 xxl:ml-0">
              {children}
            </div>
          </div>
        </div>
        <Footer />
      </section>
    </ProtectedRoute>
  );
};

export default Dashboard;
