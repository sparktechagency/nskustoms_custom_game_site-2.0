"use client";
interface OrderSummaryProps {
  orderData: {
    price: number;
    platformFees: number;
    total: number;
  };
  isProcessing: boolean;
  onConfirmPayment: () => void;
}

export default function OrderSummary({
  orderData,
  isProcessing,
  onConfirmPayment,
}: OrderSummaryProps) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>

      <div className="bg-gray-700 rounded-lg p-4 mb-6 text-sm">
        <div className="flex justify-between mb-2">
          <span className="text-gray-400">Order price</span>
          <span>${orderData.price.toFixed(2)}</span>
        </div>

        <div className="flex justify-between mb-2">
          <span className="text-gray-400">Platform fees</span>
          <span>${orderData.platformFees.toFixed(2)}</span>
        </div>

        <div className="border-t border-gray-600 pt-2 mt-2">
          <div className="flex justify-between">
            <span className="font-semibold">Total</span>
            <span className="text-xl font-bold">
              ${orderData.total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={onConfirmPayment}
        disabled={isProcessing}
        className={`w-full py-3 px-4 rounded-md text-white font-bold transition-colors ${
          isProcessing
            ? "bg-gray-600 cursor-not-allowed"
            : "bg-red-600 hover:bg-red-700"
        }`}
      >
        {isProcessing ? "Processing..." : "Confirm Payment"}
      </button>
    </div>
  );
}
