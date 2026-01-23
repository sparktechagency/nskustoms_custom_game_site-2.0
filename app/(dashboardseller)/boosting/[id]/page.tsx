"use client";

import { FaCircle } from "react-icons/fa";
import profile from "@/src/Assets/seller/profile.png";
import Image from "next/image";
const Page = () => {
  const requestData = {
    createdDate: "Dec 8, 2025, 9:45AM",
    expiredDate: "Dec 15, 2025, 9:45AM",
    username: "Manik hossan",
    currentRank: "Iron VI",
    currentLP: "2",
    queue: "Solo/Duo",
    desiredRank: "Bronze IV",
    region: "North America",
    completionMethod: "Solo",
    offersLiveFeed: {
      notifiedSellers: 500,
      seenBy: 30,
      offersCreated: 7,
    },
  };

  return (
    <div className="">
      <div className="space-y-6">
        <div className="bg-[#282836]  border border-gray-700 rounded-lg ">
          {/* Request Details Section */}
          <div className=" p-6  border-b border-gray-700">
            <h2 className="text-gray-300 text-sm font-medium mb-4">
              Request Details
            </h2>
            <div className="space-y-2 text-sm">
              <div className="text-gray-400">
                Created:{" "}
                <span className="text-gray-300">{requestData.createdDate}</span>
              </div>
              <div className="text-gray-400">
                Expired:{" "}
                <span className="text-gray-300">{requestData.expiredDate}</span>
              </div>
            </div>
          </div>

          {/* User Info Section */}
          <div className=" p-6 ">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 md:w-12 md:h-12 h-10  flex items-center justify-center">
                <Image src={profile} alt="iamge" />
              </div>
              <span className="text-gray-200 font-medium">
                {requestData.username}
              </span>
            </div>

            {/* Details Grid */}
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-700">
                <span className="text-gray-400 text-sm">Current rank</span>
                <span className="text-gray-200 text-sm font-medium">
                  {requestData.currentRank}
                </span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-gray-700">
                <span className="text-gray-400 text-sm">Current LP</span>
                <span className="text-gray-200 text-sm font-medium">
                  {requestData.currentLP}
                </span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-gray-700">
                <span className="text-gray-400 text-sm">Queue</span>
                <span className="text-gray-200 text-sm font-medium">
                  {requestData.queue}
                </span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-gray-700">
                <span className="text-gray-400 text-sm">Desired rank</span>
                <span className="text-gray-200 text-sm font-medium">
                  {requestData.desiredRank}
                </span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-gray-700">
                <span className="text-gray-400 text-sm">Region</span>
                <span className="text-gray-200 text-sm font-medium">
                  {requestData.region}
                </span>
              </div>

              <div className="flex justify-between items-center py-2 border-b border-gray-700">
                <span className="text-gray-400 text-sm">Completion Method</span>
                <span className="text-gray-200 text-sm font-medium">
                  {requestData.completionMethod}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#282836] rounded-lg p-6 md:flex justify-between items-center shadow-xl border border-gray-700">
          <div className="flex items-center gap-2">
            <FaCircle className="text-green-500 text-xs" />
            <span className="text-gray-200 font-medium">Offers live feed</span>
          </div>

          <div className="flex items-center gap-6 text-sm text-gray-400">
            <span>
              Notified sellers:{" "}
              <span className="text-gray-300">
                {requestData.offersLiveFeed.notifiedSellers}
              </span>
            </span>
            <span>
              Seen by:{" "}
              <span className="text-gray-300">
                {requestData.offersLiveFeed.seenBy}
              </span>
            </span>
            <span>
              Offers created:{" "}
              <span className="text-gray-300">
                {requestData.offersLiveFeed.offersCreated}
              </span>
            </span>
          </div>
        </div>

        {/* Offers Live Feed Section */}
        <div className="bg-[#282836] rounded-lg p-6 shadow-xl border border-gray-700">
          <div className="text-center py-8">
            <p className="text-gray-400 mb-4">Create your offer here.</p>
            <button className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded transition-colors duration-200">
              Create an offer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
