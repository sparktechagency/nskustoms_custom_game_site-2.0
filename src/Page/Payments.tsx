// app/checkout/page.tsx
"use client";

import { useState } from "react";
import Header from "@/src/components/Landing/Header";
import CheckoutForm from "@/src/components/Payments/CheckoutForm";
import OrderSummary from "@/src/components/Payments/OrderSummary";
import Footer from "@/src/components/Landing/Footer";

export default function CheckoutPage() {
  const [username, setUsername] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"credit" | "google">(
    "credit"
  );
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock order data
  const orderData = {
    deliveryTime: "12h",
    currentRank: "Iron III",
    desiredRank: "Iron I",
    region: "North America",
    price: 9.0,
    platformFees: 1.02,
    total: 10.02,
  };

  const handlePayment = () => {
    if (!username) {
      alert("Please enter your League of Legends username");
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      alert("Payment successful! Your boosting request has been created.");
      // In a real app, you would redirect to a success page
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-800 p-8">
            <div className="flex items-center mb-6">
              <button
                onClick={() => window.history.back()}
                className="mr-4 text-gray-400 hover:text-white transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <h1 className="text-2xl font-bold">Secure checkout</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left column - Checkout Form */}
              <div>
                <CheckoutForm
                  username={username}
                  onUsernameChange={setUsername}
                  paymentMethod={paymentMethod}
                  onPaymentMethodChange={setPaymentMethod}
                />
              </div>

              {/* Right column - Order Summary */}
              <div>
                <OrderSummary
                  orderData={orderData}
                  isProcessing={isProcessing}
                  onConfirmPayment={handlePayment}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
