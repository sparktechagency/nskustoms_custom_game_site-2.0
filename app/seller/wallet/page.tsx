/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useGetTransactionsQuery, useGetTransactionsStatsQuery, useSetTransactionsMutation } from '@/src/redux/features/become-seller/becomeSellerApi';
import { useState } from 'react';

const WalletPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [withdrawalAmount, setWithdrawalAmount] = useState('500');
  const [formData, setFormData] = useState({
    accountNumber: '',
    swiftCode: '',
    bankName: '',
    accountHolderName: ''
  }); 

  const {data} = useGetTransactionsQuery({})
  console.log(data)

  const {data:Stats} = useGetTransactionsStatsQuery({})
  const paidAmount = Stats?.data?.paidAmount

  const [SetTransactions] = useSetTransactionsMutation()

  const transactions = data?.data?.transactions || [];

  // Format date helper function
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'paid':
        return 'bg-green-500/20 text-green-400';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'rejected':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSendRequest = async () => {
    try {
      const payload = {
        bankInfo: {
          accountNumber: formData.accountNumber,
          swiftCode: formData.swiftCode,
          bankName: formData.bankName,
          accountHolderName: formData.accountHolderName
        },
        amount: Number(withdrawalAmount)
      };
      
      console.log('Withdrawal request:', payload);
      
      // Post withdrawal request
      const result = await SetTransactions(payload).unwrap();
      console.log('Success:', result);
      
      // Reset form and close modal
      setFormData({
        accountNumber: '',
        swiftCode: '',
        bankName: '',
        accountHolderName: ''
      });
      setWithdrawalAmount('500');
      setIsModalOpen(false);
      
    } catch (error) {
      console.error('Withdrawal request failed:', error);
      // You can add toast notification here
    }
  };

  return (
    <div className="">
      {/* Wallet Header */}
      <div className="max-w-7xl mx-auto">
        <h1 className="text-red-500 text-2xl font-bold mb-2 flex items-center">
          <span className="mr-2">💰</span> Wallet
        </h1>
        <div className="bg-[#282836] backdrop-blur-sm rounded-lg p-2 mb-6 relative overflow-hidden">
          {/* Background decorative image would go here */}
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Balance</p>
                <p className="text-white text-3xl font-bold">${paidAmount}</p>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Request Withdrawal
              </button>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-[#282836] backdrop-blur-sm rounded-lg overflow-hidden">
          <h2 className="text-white text-xl font-bold p-6 pb-4">Recent Transactions</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left text-gray-400 font-medium p-4 text-sm">Bank Name</th>
                  <th className="text-left text-gray-400 font-medium p-4 text-sm">Account Holder</th>
                  <th className="text-left text-gray-400 font-medium p-4 text-sm">Type</th>
                  <th className="text-left text-gray-400 font-medium p-4 text-sm">Transaction Date</th>
                  <th className="text-left text-gray-400 font-medium p-4 text-sm">Amount</th>
                  <th className="text-left text-gray-400 font-medium p-4 text-sm">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.length > 0 ? (
                  transactions.map((transaction: any) => (
                    <tr key={transaction._id} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-slate-700 rounded-lg mr-3 flex items-center justify-center">
                            <span className="text-xs">🏦</span>
                          </div>
                          <span className="text-white text-sm">{transaction.bankInfo?.bankName || 'N/A'}</span>
                        </div>
                      </td>
                      <td className="p-4 text-gray-300 text-sm">{transaction.bankInfo?.accountHolderName || 'N/A'}</td>
                      <td className="p-4 text-gray-300 text-sm capitalize">{transaction.type}</td>
                      <td className="p-4 text-gray-300 text-sm">{formatDate(transaction.createdAt)}</td>
                      <td className="p-4 text-white font-semibold text-sm">${transaction.amount}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${getStatusColor(transaction.status)}`}>
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
            <h2 className="text-emerald-400 text-xl font-bold mb-6 text-center">Withdrawal Request</h2>
            
            <div className="space-y-4">
              {/* Available Balance and Withdrawal Amount */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-300 text-sm mb-2 block">Available Balance</label>
                  <div className="bg-slate-900 rounded-lg px-4 py-3 text-white font-semibold">
                    ${paidAmount}
                  </div>
                </div>
                <div>
                  <label className="text-gray-300 text-sm mb-2 block">Withdrawal Amount</label>
                  <input
                    type="number"
                    value={withdrawalAmount}
                    onChange={(e) => setWithdrawalAmount(e.target.value)}
                    className="bg-slate-900 rounded-lg px-4 py-3 text-white w-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Account Holder Name */}
              <div>
                <label className="text-gray-300 text-sm mb-2 block">Account Holder Name</label>
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
                <label className="text-gray-300 text-sm mb-2 block">Account Number</label>
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
                <label className="text-gray-300 text-sm mb-2 block">Swift Code</label>
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
                <label className="text-gray-300 text-sm mb-2 block">Bank Name</label>
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