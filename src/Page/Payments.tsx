// app/checkout/page.tsx
"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Header from "@/src/components/Landing/Header";
import Footer from "@/src/components/Landing/Footer";
import { useCreateOrderBuyerMutation } from "../redux/features/orders/ordersApi";
import { toast } from "sonner";
import { Loader2, ArrowLeft, User, Clock, DollarSign } from "lucide-react";
import { useGetSettingByTypeQuery } from "../redux/features/settings/settingApi";

interface OrderResponse {
  data: {
    paymentUrl?: string;
  };
}

interface PlatformChargeData {
  type: string;
  value: number;
}

// Helper function to round to 2 decimal places
const roundToTwoDecimals = (num: number): number => {
  return Math.round((num + Number.EPSILON) * 100) / 100;
};

export default function CheckoutPage() {
  const { data: platformChargeData } = useGetSettingByTypeQuery({
    type: "platform_charge",
  });

  const router = useRouter();
  const searchParams = useSearchParams();

  // Get params from URL
  const offerId = searchParams.get("offer_id") || "";
  const price = parseFloat(searchParams.get("price") || "0");
  const sellerId = searchParams.get("seller_id") || "";
  const sellerName = searchParams.get("seller_name") || "";
  const boostingId = searchParams.get("boosting_id") || "";
  const deliveryTime = searchParams.get("delivery_time") || "";

  const [createOrderPayments, { isLoading: isProcessing }] =
    useCreateOrderBuyerMutation();

  const [gameUsername, setGameUsername] = useState("");
  const [gamePassword, setGamePassword] = useState("");

  // Get platform charge percentage from API (value is the actual percentage, e.g., 5 = 5%)
  const platformChargeSettings = platformChargeData as PlatformChargeData | undefined;
  const platformChargePercentage = platformChargeSettings?.value ?? 5; // Default to 5% if not available

  // Calculate totals
  const orderPrice = price;
  // Calculate platform charge as percentage of order price
  const platformCharge = roundToTwoDecimals((orderPrice * platformChargePercentage) / 100);
  const total = roundToTwoDecimals(orderPrice + platformCharge);

  const handlePayment = async () => {
    if (!gameUsername.trim()) {
      toast.error("Please enter your game username");
      return;
    }

    if (!gamePassword.trim()) {
      toast.error("Please enter your game password");
      return;
    }

    if (!offerId || !sellerId || !boostingId) {
      toast.error("Missing order information");
      return;
    }

    try {
      const res = (await createOrderPayments({
        sellerId,
        boostingPostId: boostingId,
        offerId,
        gameUsername: gameUsername.trim(),
        gamePassword: gamePassword.trim(),
        orderPrice,
        platformCharge,
        total,
      }).unwrap()) as OrderResponse;

      const { paymentUrl } = res?.data || {};
      if (paymentUrl) {
        window.location.href = paymentUrl;
      } else {
        toast.success("Order created successfully!");
        router.push("/buyer/orders");
      }
    } catch (error) {
      console.error("Failed to create order:", error);
      toast.error("Failed to create order. Please try again.");
    }
  };

  // If no offer data, show error
  if (!offerId || !price) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <p className="text-gray-400 mb-4">No order information found</p>
            <button
              onClick={() => router.back()}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md transition-colors"
            >
              Go Back
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800 rounded-lg p-8">
            {/* Header */}
            <div className="flex items-center mb-6">
              <button
                onClick={() => router.back()}
                className="mr-4 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-2xl font-bold">Secure Checkout</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left column - Checkout Form */}
              <div>
                <h2 className="text-xl font-bold mb-4">Order Details</h2>

                {/* Seller & Delivery Info */}
                <div className="bg-gray-700/50 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Seller</p>
                      <p className="text-white font-medium">{sellerName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>Delivery Time: {deliveryTime}</span>
                  </div>
                </div>

                {/* Game Credentials */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Game Credentials</h3>
                  <p className="text-sm text-gray-400">
                    Enter your game credentials so the booster can access your
                    account.
                  </p>

                  <div>
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Game Username
                    </label>
                    <input
                      id="username"
                      type="text"
                      value={gameUsername}
                      onChange={(e) => setGameUsername(e.target.value)}
                      placeholder="Enter your game username"
                      className="w-full bg-gray-700 text-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 border border-gray-600"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Game Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      value={gamePassword}
                      onChange={(e) => setGamePassword(e.target.value)}
                      placeholder="Enter your game password"
                      className="w-full bg-gray-700 text-white px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 border border-gray-600"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Your credentials are encrypted and securely stored.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right column - Order Summary */}
              <div>
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>

                <div className="bg-gray-700 rounded-lg p-4 mb-6">
                  {/* Order Price */}
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-gray-400">Order Price</span>
                    <div className="flex items-center gap-1 text-white">
                      <DollarSign className="w-4 h-4" />
                      <span className="font-medium">
                        {orderPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Platform Charge */}
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-gray-400">
                      Platform Charge ({platformChargePercentage}%)
                    </span>
                    <div className="flex items-center gap-1 text-white">
                      <DollarSign className="w-4 h-4" />
                      <span className="font-medium">
                        {platformCharge.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="border-t border-gray-600 pt-3 mt-3">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-white">Total</span>
                      <div className="flex items-center gap-1 text-green-400">
                        <DollarSign className="w-5 h-5" />
                        <span className="text-2xl font-bold">
                          {total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className={`w-full py-3 px-4 rounded-md text-white font-bold transition-colors flex items-center justify-center gap-2 ${
                    isProcessing
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-red-600 hover:bg-red-700"
                  }`}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Proceed to Checkout"
                  )}
                </button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  By proceeding, you agree to our Terms of Service and Privacy
                  Policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
