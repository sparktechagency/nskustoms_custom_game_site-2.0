/* eslint-disable react/no-unescaped-entities */
"use client";
import herobg from "@/src/Assets/Landing/herobg.png";
import raja from "@/src/Assets/Landing/raja.png";
import raja1 from "@/src/Assets/Landing/raja1.png";
import Vector from "@/src/Assets/Landing/Vector.png";
import whay from "@/src/Assets/Landing/Whay.png";
import Ironiv from "@/src/Assets/Landing/Ironiv.png";
import Challenger from "@/src/Assets/Landing/Challenger.png";

import React, { useState } from "react";
import { Star, Award } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type OrderType =
  | "rank-boost"
  | "placement-matches"
  | "net-wins"
  | "custom-request";
type RankType =
  | "Iron IV"
  | "Iron III"
  | "Iron II"
  | "Iron I"
  | "Bronze IV"
  | "Bronze III"
  | "Bronze II"
  | "Bronze I"
  | "Silver IV"
  | "Silver III"
  | "Silver II"
  | "Silver I"
  | "Gold IV"
  | "Gold III"
  | "Gold II"
  | "Gold I"
  | "Platinum IV"
  | "Platinum III"
  | "Platinum II"
  | "Platinum I"
  | "Diamond IV"
  | "Diamond III"
  | "Diamond II"
  | "Diamond I"
  | "Master"
  | "Grandmaster"
  | "Challenger";
type QueueType = "Solo/Duo" | "5v5 Flex";
type RegionType =
  | "North America"
  | "Europe West"
  | "Europe Nordic & East"
  | "Korea"
  | "Brazil"
  | "Latin America North"
  | "Latin America South"
  | "Oceania"
  | "Turkey"
  | "Russia"
  | "Japan";

const Herosectionfrom: React.FC = () => {
  const [orderType, setOrderType] = useState<OrderType>("rank-boost");
  const [desiredRank, setDesiredRank] = useState<RankType>("Challenger");
  const [queue, setQueue] = useState<QueueType>("Solo/Duo");
  const [region, setRegion] = useState<RegionType>("North America");
  const [previousSeasonRank, setPreviousSeasonRank] =
    useState<RankType>("Iron IV");
  const [placementQueue, setPlacementQueue] = useState<QueueType>("Solo/Duo");
  const [placementRegion, setPlacementRegion] =
    useState<RegionType>("North America");
  const [numberOfGames, setNumberOfGames] = useState<number>(1);
  const [currentLP, setCurrentLP] = useState<RankType>("Iron IV");
  const [customRequest, setCustomRequest] = useState<string>("");
  const [additionalInfo, setAdditionalInfo] = useState<string>("");
  const [orderMode, setOrderMode] = useState<"solo" | "duo">("solo");
  const [stream, setStream] = useState(false);
  const [appearOffline, setAppearOffline] = useState(false);
  const [offlineMode, setOfflineMode] = useState(false);

  const ranks: RankType[] = [
    "Iron IV",
    "Iron III",
    "Iron II",
    "Iron I",
    "Bronze IV",
    "Bronze III",
    "Bronze II",
    "Bronze I",
    "Silver IV",
    "Silver III",
    "Silver II",
    "Silver I",
    "Diamond IV",
    "Diamond III",
    "Diamond II",
    "Diamond I",
    "Master",
    "Grandmaster",
    "Challenger",
  ];

  const regions: RegionType[] = [
    "North America",
    "Europe West",
    "Europe Nordic & East",
    "Korea",
    "Brazil",
    "Latin America North",
    "Latin America South",
    "Oceania",
    "Turkey",
    "Russia",
    "Japan",
  ];

  return (
    <div className="py-2">
      <div className="">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setOrderType("rank-boost")}
              className={`px-3 py-2 rounded-t text-sm min-w-[100px] ${
                orderType === "rank-boost"
                  ? "bg-[#AC2212]"
                  : "bg-[#282836] hover:bg-[#282836]"
              }`}
            >
              Rank Boost
            </button>
            <button
              onClick={() => setOrderType("placement-matches")}
              className={`px-3 py-2 rounded-t text-sm min-w-[100px] ${
                orderType === "placement-matches"
                  ? "bg-[#AC2212]"
                  : "bg-[#282836] hover:bg-[#282836]"
              }`}
            >
              Placement Matches
            </button>
            <button
              onClick={() => setOrderType("net-wins")}
              className={`px-3 py-2 rounded-t text-sm min-w-[100px] ${
                orderType === "net-wins"
                  ? "bg-[#AC2212]"
                  : "bg-[#282836] hover:bg-[#282836]"
              }`}
            >
              Net Wins
            </button>
            <button
              onClick={() => setOrderType("custom-request")}
              className={`px-3 py-2 text-sm rounded-t min-w-[100px] ${
                orderType === "custom-request"
                  ? "bg-[#AC2212]"
                  : "bg-[#282836] hover:bg-[#282836]"
              }`}
            >
              Custom Request
            </button>
          </div>
          <div className="flex items-center gap-2 py-2 rounded  p-3">
            <Star className="w-8 h-8 fill-yellow-400 text-yellow-400" />
            <div className="text-xs sm:text-sm">
              <div className="font-semibold">Review Auraboost here</div>
              <div className="text-gray-400">and get 5% OFF orders</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Left Panel - Order Configuration */}
          <div className="md:col-span-2 lg:col-span-2 space-y-2">
            {/* Rank Boost Form */}
            {orderType === "rank-boost" && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10">
                  {/* ================= CURRENT RANK ================= */}
                  <div
                    className="w-full bg-no-repeat bg-cover rounded-md relative border border-[#A3A3A380] overflow-hidden"
                    style={{ backgroundImage: `url(${Ironiv.src})` }}
                  >
                    <div className="p-4 sm:p-6 ">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
                        <Image src={raja} alt="dsd" className="block" />
                        <div>
                          <h3 className="text-base sm:text-lg font-bold">
                            {currentLP}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-400">
                            Current rank
                          </p>
                        </div>
                      </div>

                      <label className="block text-xs sm:text-sm text-gray-400 mb-2">
                        Current rank
                      </label>

                      <select
                        value={currentLP}
                        onChange={(e) =>
                          setCurrentLP(e.target.value as RankType)
                        }
                        className="w-full bg-[#282836] border border-gray-600 rounded px-3 py-2 text-white text-sm"
                      >
                        <option>Iron IV</option>
                        {ranks.map((rank) => (
                          <option key={rank} value={rank}>
                            {rank}
                          </option>
                        ))}
                      </select>

                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs sm:text-sm text-gray-400 mb-2">
                            Queue
                          </label>
                          <select
                            value={queue}
                            onChange={(e) =>
                              setQueue(e.target.value as QueueType)
                            }
                            className="w-full bg-[#282836] border border-gray-600 rounded px-3 py-2 text-white text-sm"
                          >
                            <option>Solo/Duo</option>
                            <option>5v5 Flex</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs sm:text-sm text-gray-400 mb-2">
                            Current LP
                          </label>
                          <input
                            placeholder="Type your current LP"
                            className="w-full bg-[#282836] border border-gray-600 rounded px-3 py-2 text-white text-sm"
                            type="number"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ================= DESIRED RANK ================= */}
                  <div
                    className="w-full bg-no-repeat bg-cover rounded-md relative border border-[#A3A3A380] overflow-hidden"
                    style={{ backgroundImage: `url(${Ironiv.src})` }}
                  >
                    <div className="p-4 sm:p-6">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
                        <Image src={raja1} alt="dsd" className="block" />
                        <div>
                          <h3 className="text-base sm:text-lg font-bold">
                            {desiredRank}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-400">
                            Desired rank
                          </p>
                        </div>
                      </div>

                      <label className="block text-xs sm:text-sm text-gray-400 mb-2">
                        Desired rank
                      </label>

                      <select
                        value={desiredRank}
                        onChange={(e) =>
                          setDesiredRank(e.target.value as RankType)
                        }
                        className="w-full bg-[#282836] border border-gray-600 rounded px-3 py-2 text-white text-sm"
                      >
                        <option>Challenger</option>
                        {ranks.map((rank) => (
                          <option key={rank} value={rank}>
                            {rank}
                          </option>
                        ))}
                      </select>

                      <div className="mt-4">
                        <label className="block text-xs sm:text-sm text-gray-400 mb-2">
                          Region
                        </label>
                        <select
                          value={region}
                          onChange={(e) =>
                            setRegion(e.target.value as RegionType)
                          }
                          className="w-full bg-[#282836] border border-gray-600 rounded px-3 py-2 text-white text-sm"
                        >
                          {regions.map((r) => (
                            <option key={r} value={r}>
                              {r}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Placement Matches */}
            {orderType === "placement-matches" && (
              <div
                className="w-full p-4 sm:p-6 bg-no-repeat bg-cover rounded-md relative"
                style={{ backgroundImage: `url(${herobg.src})` }}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
                  <Image src={raja} alt="image" className="" />
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold">
                      Placement Matches
                    </h3>
                    <h3 className="text-lg sm:text-xl font-bold">Iron IV</h3>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm text-gray-400 mb-2">
                      Previous season rank
                    </label>
                    <select
                      value={previousSeasonRank}
                      onChange={(e) =>
                        setPreviousSeasonRank(e.target.value as RankType)
                      }
                      className="w-full bg-[#282836] border border-gray-600 rounded px-3 py-2 text-white text-sm"
                    >
                      <option>Iron IV</option>
                      {ranks.map((rank) => (
                        <option key={rank} value={rank}>
                          {rank}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm text-gray-400 mb-2">
                      Region
                    </label>
                    <select
                      value={placementRegion}
                      onChange={(e) =>
                        setPlacementRegion(e.target.value as RegionType)
                      }
                      className="w-full bg-[#282836] border border-gray-600 rounded px-3 py-2 text-white text-sm"
                    >
                      {regions.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm text-gray-400 mb-2">
                      Queue
                    </label>
                    <select
                      value={placementQueue}
                      onChange={(e) =>
                        setPlacementQueue(e.target.value as QueueType)
                      }
                      className="w-full bg-[#282836] border border-gray-600 rounded px-3 py-2 text-white text-sm"
                    >
                      <option>Solo/Duo</option>
                      <option>5v5 Flex</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm text-gray-400 mb-2">
                      Number of games
                    </label>
                    <select
                      value={numberOfGames}
                      onChange={(e) => setNumberOfGames(Number(e.target.value))}
                      className="w-full bg-[#282836] border border-gray-600 rounded px-3 py-2 text-white text-sm"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {orderType === "net-wins" && (
              <div
                className="w-full p-4 sm:p-6 bg-no-repeat bg-cover rounded-md relative"
                style={{ backgroundImage: `url(${herobg.src})` }}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
                  <Image src={raja} alt="image" />
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold">Net Wins</h3>
                    <h3 className="text-lg sm:text-xl font-bold">Iron IV</h3>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm text-gray-400 mb-2">
                      Current rank
                    </label>
                    <select
                      value={previousSeasonRank}
                      onChange={(e) =>
                        setPreviousSeasonRank(e.target.value as RankType)
                      }
                      className="w-full bg-[#282836] border border-gray-600 rounded px-3 py-2 text-white text-sm"
                    >
                      <option>Iron IV</option>
                      {ranks.map((rank) => (
                        <option key={rank} value={rank}>
                          {rank}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm text-gray-400 mb-2">
                      Region
                    </label>
                    <select
                      value={placementRegion}
                      onChange={(e) =>
                        setPlacementRegion(e.target.value as RegionType)
                      }
                      className="w-full bg-[#282836] border border-gray-600 rounded px-3 py-2 text-white text-sm"
                    >
                      {regions.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm text-gray-400 mb-2">
                      Queue
                    </label>
                    <select
                      value={placementQueue}
                      onChange={(e) =>
                        setPlacementQueue(e.target.value as QueueType)
                      }
                      className="w-full bg-[#282836] border border-gray-600 rounded px-3 py-2 text-white text-sm"
                    >
                      <option>Solo/Duo</option>
                      <option>5v5 Flex</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm text-gray-400 mb-2">
                      Number of wins
                    </label>
                    <select
                      value={numberOfGames}
                      onChange={(e) => setNumberOfGames(Number(e.target.value))}
                      className="w-full bg-[#282836] border border-gray-600 rounded px-3 py-2 text-white text-sm"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Custom Request */}
            {orderType === "custom-request" && (
              <div
                className="w-full p-4 sm:p-6 bg-no-repeat bg-cover rounded-md relative"
                style={{ backgroundImage: `url(${herobg.src})` }}
              >
                <div className="rounded-lg p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold mb-2">
                    Custom Request
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 mb-4">
                    Unable to locate what you are looking for exactly? Simply
                    describe boosting related to our services and let our pro
                    team handle the rest for you!
                  </p>
                  <div className="mb-4">
                    <label className="block text-xs sm:text-sm text-gray-400 mb-2">
                      Game Service
                    </label>
                    <select className="w-full bg-[#282836] border border-gray-600 rounded px-3 py-2 text-white text-sm">
                      <option>League of Legends</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm text-gray-400 mb-2">
                      Request description
                    </label>
                    <textarea
                      value={customRequest}
                      onChange={(e) => setCustomRequest(e.target.value)}
                      className="w-full bg-[#282836] border border-gray-600 rounded px-3 py-2 text-white h-24 sm:h-32 resize-none text-sm"
                      placeholder="I need some level..."
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Additional Information */}
            <div className="p-4 border border-[#A3A3A380] rounded-md">
              <label className="block text-xs sm:text-sm text-gray-400 mb-2">
                Provide any additional information
              </label>
              <textarea
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                className="w-full bg-[#282836] border-gray-600 rounded px-3 py-2 text-white h-12 resize-none text-sm"
                placeholder="e.g. I would prefer a booster who..."
              />
            </div>

            {/* Why Trust Auraboost */}
            <div
              className="w-full p-4 sm:p-6 bg-no-repeat bg-cover rounded-md relative border border-[#A3A3A380] mb-5"
              style={{ backgroundImage: `url(${whay.src})` }}
            >
              <h3 className="text-lg sm:text-lg md:text-2xl font-bold mb-4">
                Why trust Auraboost?
              </h3>
              <p className="text-xs sm:text-sm md:text-xl text-gray-400 mb-4">
                Most trusted esports service with reliable and fully experienced
                team
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-5">
                <div className="flex items-center gap-2 border-b border-[#A3A3A380] rounded-b-md pb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs sm:text-sm md:text-lg">
                    Verified and trusted sellers
                  </span>
                </div>
                <div className="flex items-center gap-2 border-b border-[#A3A3A380] rounded-b-md pb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs sm:text-sm md:text-lg">
                    Fast and efficient delivery
                  </span>
                </div>
                <div className="flex items-center gap-2 border-b border-[#A3A3A380] rounded-b-md pb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs sm:text-sm md:text-lg">
                    24/7 customer support
                  </span>
                </div>
                <div className="flex items-center gap-2 border-b border-[#A3A3A380] rounded-b-md pb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs sm:text-sm md:text-lg">
                    Secure instant payments
                  </span>
                </div>
                <div className="flex items-center gap-2 border-b border-[#A3A3A380] rounded-b-md pb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs sm:text-sm md:text-lg">
                    Built-in buyer protection
                  </span>
                </div>
                <div className="flex items-center gap-2 border-b border-[#A3A3A380] rounded-b-md pb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs sm:text-sm md:text-lg">
                    Wide range of offers to choose from
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Order Summary */}
          <div className="space-y-2">
            <div className="bg-[#282836] bg-opacity-50 backdrop-blur rounded-lg p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-bold mb-2">
                CUSTOMIZE ORDER
              </h3>
              <div className="bg-[#000000] p-3 sm:p-4 rounded-md">
                {/* Solo/Duo Toggle */}
                <div className="flex gap-2 mb-4">
                  <button
                    onClick={() => setOrderMode("solo")}
                    className={`flex-1 py-2 rounded text-sm ${
                      orderMode === "solo"
                        ? "border border-[#FAB504]"
                        : "bg-[#282836] hover:bg-gray-600"
                    }`}
                  >
                    Solo
                  </button>
                  <button
                    onClick={() => setOrderMode("duo")}
                    className={`flex-1 py-2 rounded text-sm ${
                      orderMode === "duo"
                        ? "border border-[#FAB504]"
                        : "bg-[#282836] hover:bg-gray-600"
                    }`}
                  >
                    Duo
                  </button>
                </div>

                {/* Options */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm">Stream</span>
                    <button
                      onClick={() => setStream(!stream)}
                      className={`w-10 h-5 rounded-full transition-colors ${
                        stream ? "bg-blue-600" : "bg-gray-600"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 bg-white rounded-full transition-transform ${
                          stream ? "translate-x-5" : "translate-x-1"
                        }`}
                      ></div>
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm">Appear offline</span>
                    <button
                      onClick={() => setAppearOffline(!appearOffline)}
                      className={`w-10 h-5 rounded-full transition-colors ${
                        appearOffline ? "bg-blue-600" : "bg-gray-600"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 bg-white rounded-full transition-transform ${
                          appearOffline ? "translate-x-5" : "translate-x-1"
                        }`}
                      ></div>
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm">Offline mode</span>
                    <button
                      onClick={() => setOfflineMode(!offlineMode)}
                      className={`w-10 h-5 rounded-full transition-colors ${
                        offlineMode ? "bg-blue-600" : "bg-gray-600"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 bg-white rounded-full transition-transform ${
                          offlineMode ? "translate-x-5" : "translate-x-1"
                        }`}
                      ></div>
                    </button>
                  </div>
                </div>

                {/* Get Offers Button */}
                <Link href="/boosting-request">
                  <button className="w-full bg-[#AC2212] hover:bg-red-700 text-white font-bold py-3 rounded mb-3 text-sm">
                    Get offers now
                  </button>
                </Link>

                <div className="text-center text-xs sm:text-sm text-gray-400">
                  🔒 Powered by{" "}
                  <span className="text-yellow-400">Trustpilot</span>
                </div>
              </div>
            </div>

            {/* Savings Info */}
            <div className="p-4 sm:p-6 border border-[#A3A3A380] rounded-md">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                    <div className="text-sm sm:text-md">Save up to</div>
                    <div className="text-sm sm:text-md text-black font-bold bg-[#FAB504] rounded-bl-lg rounded-tr-lg p-[3px]">
                      40%
                    </div>
                    <div className="text-sm sm:text-md">on boosting</div>
                  </div>
                  <div className="text-xs sm:text-sm mt-2">
                    Lowest prices from boosters. So you pay only for what's
                    worth paying for
                  </div>
                </div>
                <Image
                  src={Vector}
                  alt="image"
                  className="w-12 h-12 md:w-16 md:h-16"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Herosectionfrom;
