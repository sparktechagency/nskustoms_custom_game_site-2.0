"use client";
/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { IoIosSend } from "react-icons/io";
import { X } from "lucide-react";
import goldie from "@/src/Assets/seller/goldie.png";
import Image from "next/image";

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deliveryTime, setDeliveryTime] = useState("");
  const [price, setPrice] = useState("");

  const handleCreate = () => {
    // Handle offer creation logic here
    console.log({ deliveryTime, price });
    setIsModalOpen(false);
    setDeliveryTime("");
    setPrice("");
  };

  return (
    <div className="">
      {/* Header */}
      <div className="flex items-center gap-1 mb-8">
        <IoIosSend size={28} className="text-red-500 text-xs" />
        <h1 className="text-white text-xl font-semibold">Offers</h1>
      </div>

      {/* Empty State */}
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        {/* Icon */}
        <div className="w-32 h-24 mb-4 flex items-center justify-center">
          <Image src={goldie} alt="" />
        </div>

        {/* Message */}
        <p className="text-gray-300 text-lg mb-6">
          Uh oh... looks like you don't have any offers yet.
        </p>

        {/* Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-md font-medium transition-colors"
        >
          Create a offer
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#000000B2] bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md relative">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X size={20} />
            </button>

            {/* Modal Header */}
            <h2 className="text-white text-xl font-semibold mb-6">
              Create Offers
            </h2>

            {/* Delivery Time Input */}
            <div className="mb-4">
              <label className="text-white text-sm mb-2 block">
                Delivery time
              </label>
              <input
                type="text"
                placeholder="select delivery time"
                value={deliveryTime}
                onChange={(e) => setDeliveryTime(e.target.value)}
                className="w-full bg-gray-700 text-gray-400 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            {/* Price Input */}
            <div className="mb-6">
              <label className="text-white text-sm mb-2 block">Price</label>
              <input
                type="text"
                placeholder="enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full bg-gray-700 text-gray-400 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            {/* Modal Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2.5 rounded-md font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-md font-medium transition-colors"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
