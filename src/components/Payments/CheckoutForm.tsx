"use client";
interface CheckoutFormProps {
  username: string;
  onUsernameChange: (value: string) => void;
  paymentMethod: "credit" | "google";
  onPaymentMethodChange: (method: "credit" | "google") => void;
}

export default function CheckoutForm({
  username,
  onUsernameChange,
  paymentMethod,
  onPaymentMethodChange,
}: CheckoutFormProps) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Rank Boost</h2>

      <div className="mb-6 text-sm">
        <p className="text-gray-400 mb-2">
          Delivery time: {12}h | Current rank: Iron III | Desired rank: Iron I |
          Region: North America (Other options: 3)
        </p>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">
          League of Legends username
        </h3>
        <input
          type="text"
          value={username}
          onChange={(e) => onUsernameChange(e.target.value)}
          placeholder="League of Legends username"
          className="w-full bg-gray-700 text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Payment method</h3>

        <div className="space-y-3 text-sm">
          <div className="flex items-center">
            <input
              type="radio"
              id="credit-card"
              name="payment-method"
              checked={paymentMethod === "credit"}
              onChange={() => onPaymentMethodChange("credit")}
              className="mr-2"
            />
            <label htmlFor="credit-card" className="text-gray-300">
              Credit / Debit Card
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="radio"
              id="google-pay"
              name="payment-method"
              checked={paymentMethod === "google"}
              onChange={() => onPaymentMethodChange("google")}
              className="mr-2"
            />
            <label htmlFor="google-pay" className="text-gray-300">
              Google Pay
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
