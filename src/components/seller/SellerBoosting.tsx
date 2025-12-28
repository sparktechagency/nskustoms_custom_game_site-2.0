"use client"
import { useState } from 'react';
import Link from 'next/link';
const SellerBoosting = () => {
  const [activeTab, setActiveTab] = useState('all');
  
  const tabs = [
    { id: 'all', label: 'All Requests' },
    { id: 'progress', label: 'In Progress' },
    { id: 'completed', label: 'Completed' },
    { id: 'disputed', label: 'Disputed' },
    { id: 'cancelled', label: 'Cancelled' }
  ];

  const tableData = [
  { id: 1, gene: 'Gene', buyer: 'afnan90', category: 'Real Boost', date: 'Dec 8, 2025, 9:45AM', status: 'Viewed' },
  { id: 2, gene: 'Gene', buyer: 'afnan90', category: 'Real Boost', date: 'Dec 8, 2025, 9:45AM', status: 'Viewed' },
  { id: 3, gene: 'Gene', buyer: 'afnan90', category: 'Real Boost', date: 'Dec 8, 2025, 9:45AM', status: 'Viewed' },
  { id: 4, gene: 'Gene', buyer: 'afnan90', category: 'Real Boost', date: 'Dec 8, 2025, 9:45AM', status: '' },
  { id: 5, gene: 'Gene', buyer: 'afnan90', category: 'Real Boost', date: 'Dec 8, 2025, 9:45AM', status: '' },
  { id: 6, gene: 'Gene', buyer: 'afnan90', category: 'Real Boost', date: 'Dec 9, 2025, 10:30AM', status: 'Viewed' },
  { id: 7, gene: 'Gene', buyer: 'afnan90', category: 'Real Boost', date: 'Dec 9, 2025, 11:15AM', status: '' },
  { id: 8, gene: 'Gene', buyer: 'afnan90', category: 'Real Boost', date: 'Dec 10, 2025, 8:20AM', status: 'Viewed' },
  { id: 9, gene: 'Gene', buyer: 'afnan90', category: 'Real Boost', date: 'Dec 10, 2025, 2:45PM', status: '' },
  { id: 10, gene: 'Gene', buyer: 'afnan90', category: 'Real Boost', date: 'Dec 11, 2025, 4:00PM', status: 'Viewed' }
];

  return (
    <div className="">
      <div className="w-full">
        {/* Header Tabs */}
        <div className="flex flex-wrap gap-3 md:gap-2 mb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 border rounded text-sm font-medium transition-colors relative ${
                activeTab === tab.id
                  ? 'text-white bg-[#282836]'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
              }`}
            >
              {tab.label}
              
            </button>
          ))}
        </div>

       

        {/* Table */}
        <div className="bg-[#282836] rounded-lg overflow-hidden border border-gray-700">
          {tableData.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Gene</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Buyer</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Category</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-gray-400">Request creation date</th>
                  <th className="text-right px-6 py-4 text-sm font-medium text-gray-400"></th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr 
                    key={row.id} 
                    className={`border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors ${
                      index === tableData.length - 1 ? 'border-b-0' : ''
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold">G</span>
                        </div>
                        <span className="text-sm text-white">{row.gene}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">{row.buyer}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{row.category}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">{row.date}</td>
                    <td className="px-6 py-4 text-right">
                      {row.status && (
                        <Link href={`/sellerboosting/${1}`} className="text-sm text-blue-400 font-medium">{row.status}</Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-20 h-20 mb-4 relative">
                <div className="w-16 h-16 bg-yellow-500 rounded-lg transform rotate-45"></div>
                <div className="absolute top-2 left-2 w-12 h-12 bg-yellow-600 rounded-lg"></div>
              </div>
              <p className="text-gray-400 text-lg">Nothing found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SellerBoosting