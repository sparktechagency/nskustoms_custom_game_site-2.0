/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  useGetTransactionsQuery,
  useGetTransactionsStatsQuery,
  useSetTransactionsMutation,
} from "@/src/redux/features/become-seller/becomeSellerApi";
import { formatDate, getStatusColor } from "@/src/utils/pageHealper";
import {
  Wallet,
  TrendingUp,
  ArrowDownCircle,
  ArrowUpCircle,
  Clock,
  CheckCircle,
  XCircle,
  Receipt,
  Loader2,
} from "lucide-react";
import { useState } from "react";

interface TransactionStats {
  totalEarning: number;
  totalWithdrawal: number;
  availableWithdrawal: number;
  totalTransactions: number;
  pendingAmount: number;
  paidAmount: number;
  rejectedAmount: number;
}

const WalletPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [withdrawalAmount, setWithdrawalAmount] = useState("500");
  const [formData, setFormData] = useState({
    accountNumber: "",
    swiftCode: "",
    bankName: "",
    accountHolderName: "",
  });

  const { data, isLoading: isTransactionsLoading } = useGetTransactionsQuery(
    {},
  );

  const { data: Stats, isLoading: isStatsLoading } =
    useGetTransactionsStatsQuery({});

  const stats = Stats?.data as TransactionStats | undefined;
  const availableBalance = stats?.availableWithdrawal ?? 0;

  const [SetTransactions] = useSetTransactionsMutation();

  const transactions = data?.data?.transactions || [];

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSendRequest = async () => {
    try {
      const payload = {
        bankInfo: {
          accountNumber: formData.accountNumber,
          swiftCode: formData.swiftCode,
          bankName: formData.bankName,
          accountHolderName: formData.accountHolderName,
        },
        amount: Number(withdrawalAmount),
      };

      console.log("Withdrawal request:", payload);

      // Post withdrawal request
      const result = await SetTransactions(payload).unwrap();
      console.log("Success:", result);

      // Reset form and close modal
      setFormData({
        accountNumber: "",
        swiftCode: "",
        bankName: "",
        accountHolderName: "",
      });
      setWithdrawalAmount("500");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Withdrawal request failed:", error);
      // You can add toast notification here
    }
  };

  const isLoading = isStatsLoading || isTransactionsLoading;

  const statsCards = [
    {
      icon: TrendingUp,
      label: "Total Earnings",
      value: stats?.totalEarning ?? 0,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      prefix: "$",
    },
    {
      icon: ArrowUpCircle,
      label: "Total Withdrawal",
      value: stats?.totalWithdrawal ?? 0,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      prefix: "$",
    },
    {
      icon: Wallet,
      label: "Available to Withdraw",
      value: stats?.availableWithdrawal ?? 0,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
      prefix: "$",
    },
    {
      icon: Receipt,
      label: "Total Transactions",
      value: stats?.totalTransactions ?? 0,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      prefix: "",
    },
  ];

  return (
    <div className="px-6">
      {/* Wallet Header */}
      <div className="max-w-7xl mx-auto">
        <h1 className="text-red-500 text-2xl font-bold mb-6 flex items-center">
          <span className="mr-2">💰</span> Wallet
        </h1>

        {/* Main Balance Card */}
        <div className="bg-gradient-to-r from-[#282836] to-[#1e1e2a] backdrop-blur-sm rounded-xl p-6 mb-6 border border-gray-700/50 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Wallet className="w-5 h-5 text-emerald-500" />
                  <p className="text-gray-400 text-sm">Available Balance</p>
                </div>
                <p className="text-white text-4xl font-bold">
                  {isLoading ? (
                    <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
                  ) : (
                    `$${availableBalance.toLocaleString()}`
                  )}
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  Ready for withdrawal
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                disabled={availableBalance <= 0}
                className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
              >
                <ArrowDownCircle className="w-5 h-5" />
                Request Withdrawal
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {statsCards.slice(0, 4).map((stat, index) => (
            <div
              key={index}
              className="bg-[#282836] backdrop-blur-sm rounded-lg p-4 border border-gray-700/50 hover:border-gray-600/50 transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <span className="text-gray-400 text-sm">{stat.label}</span>
              </div>
              <div className="text-white text-2xl font-bold">
                {isLoading ? (
                  <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
                ) : (
                  `${stat.prefix}${stat.value.toLocaleString()}`
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Recent Transactions */}
        <div className="bg-[#282836] backdrop-blur-sm rounded-lg overflow-hidden">
          <h2 className="text-white text-xl font-bold p-6 pb-4">
            Recent Transactions
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left text-gray-400 font-medium p-4 text-sm">
                    Bank Name
                  </th>
                  <th className="text-left text-gray-400 font-medium p-4 text-sm">
                    Account Holder
                  </th>
                  <th className="text-left text-gray-400 font-medium p-4 text-sm">
                    Type
                  </th>
                  <th className="text-left text-gray-400 font-medium p-4 text-sm">
                    Transaction Date
                  </th>
                  <th className="text-left text-gray-400 font-medium p-4 text-sm">
                    Amount
                  </th>
                  <th className="text-left text-gray-400 font-medium p-4 text-sm">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions.length > 0 ? (
                  transactions.map((transaction: any) => (
                    <tr
                      key={transaction._id}
                      className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors"
                    >
                      <td className="p-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-slate-700 rounded-lg mr-3 flex items-center justify-center">
                            <span className="text-xs">🏦</span>
                          </div>
                          <span className="text-white text-sm">
                            {transaction.bankInfo?.bankName || "N/A"}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 text-gray-300 text-sm">
                        {transaction.bankInfo?.accountHolderName || "N/A"}
                      </td>
                      <td className="p-4 text-gray-300 text-sm capitalize">
                        {transaction.type}
                      </td>
                      <td className="p-4 text-gray-300 text-sm">
                        {formatDate(transaction.createdAt)}
                      </td>
                      <td className="p-4 text-white font-semibold text-sm">
                        ${transaction.amount}
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${getStatusColor(transaction.status)}`}
                        >
                          {transaction.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-gray-400">
                      No transactions found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Withdrawal Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-xl p-6 w-full max-w-md border border-slate-700 shadow-2xl">
            <h2 className="text-emerald-400 text-xl font-bold mb-6 text-center">
              Withdrawal Request
            </h2>

            <div className="space-y-4">
              {/* Available Balance and Withdrawal Amount */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-300 text-sm mb-2 block">
                    Available Balance
                  </label>
                  <div className="bg-slate-900 rounded-lg px-4 py-3 text-white font-semibold">
                    ${availableBalance.toLocaleString()}
                  </div>
                </div>
                <div>
                  <label className="text-gray-300 text-sm mb-2 block">
                    Withdrawal Amount
                  </label>
                  <input
                    type="number"
                    value={withdrawalAmount}
                    onChange={(e) => setWithdrawalAmount(e.target.value)}
                    max={availableBalance}
                    className="bg-slate-900 rounded-lg px-4 py-3 text-white w-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Account Holder Name */}
              <div>
                <label className="text-gray-300 text-sm mb-2 block">
                  Account Holder Name
                </label>
                <input
                  type="text"
                  name="accountHolderName"
                  placeholder="Enter account holder name"
                  value={formData.accountHolderName}
                  onChange={handleInputChange}
                  className="bg-slate-900 rounded-lg px-4 py-3 text-white w-full placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Account Number */}
              <div>
                <label className="text-gray-300 text-sm mb-2 block">
                  Account Number
                </label>
                <input
                  type="text"
                  name="accountNumber"
                  placeholder="Enter account number"
                  value={formData.accountNumber}
                  onChange={handleInputChange}
                  className="bg-slate-900 rounded-lg px-4 py-3 text-white w-full placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Swift Code */}
              <div>
                <label className="text-gray-300 text-sm mb-2 block">
                  Swift Code
                </label>
                <input
                  type="text"
                  name="swiftCode"
                  placeholder="Enter swift code"
                  value={formData.swiftCode}
                  onChange={handleInputChange}
                  className="bg-slate-900 rounded-lg px-4 py-3 text-white w-full placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Bank Name */}
              <div>
                <label className="text-gray-300 text-sm mb-2 block">
                  Bank Name
                </label>
                <input
                  type="text"
                  name="bankName"
                  placeholder="Enter bank name"
                  value={formData.bankName}
                  onChange={handleInputChange}
                  className="bg-slate-900 rounded-lg px-4 py-3 text-white w-full placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={handleSendRequest}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  Send Request
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-full bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletPage;
