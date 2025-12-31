import React from "react";
import Image from "next/image";
import Ironiv from "@/src/Assets/Landing/Ironiv.png";
import CurrentRankBg from "@/src/Assets/Landing/currnet_rank_bg.png";

import raja from "@/src/Assets/Landing/raja.png";
import raja1 from "@/src/Assets/Landing/raja1.png";
import { RankType, QueueType, RegionType } from "@/src/types/components.types";
import { rankData, ranks, regions } from "@/src/lib/ranks";

interface RankBoostFormProps {
  currentLP: RankType;
  setCurrentLP: (rank: RankType) => void;
  queue: QueueType;
  setQueue: (queue: QueueType) => void;
  region: RegionType;
  setRegion: (region: RegionType) => void;
  desiredRank: RankType;
  setDesiredRank: (rank: RankType) => void;
}

const RankBoostForm: React.FC<RankBoostFormProps> = ({
  currentLP,
  setCurrentLP,
  queue,
  setQueue,
  region,
  setRegion,
  desiredRank,
  setDesiredRank,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-10">
      {/* ================= CURRENT RANK ================= */}
      <div
        className="w-full bg-no-repeat bg-cover rounded-md relative border border-[#A3A3A380] overflow-hidden"
        style={{ backgroundImage: `url(${CurrentRankBg.src})` }}
      >
        <div className="p-4 sm:p-6 ">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
            <Image
              src={
                rankData.find((rank) => rank.name === currentLP)?.image || raja1
              }
              alt={currentLP}
              className="block"
              width={106}
              height={106}
            />
            <div>
              <h3 className="text-base sm:text-lg font-bold">{currentLP}</h3>
              <p className="text-xs sm:text-sm text-gray-400">Current rank</p>
            </div>
          </div>

          <label className="block text-xs sm:text-sm text-gray-400 mb-2">
            Current rank
          </label>

          <select
            value={currentLP}
            onChange={(e) => setCurrentLP(e.target.value as RankType)}
            className="w-full bg-[#282836] border border-gray-600 rounded px-3 py-2 text-white text-sm"
          >
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
                onChange={(e) => setQueue(e.target.value as QueueType)}
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
            <Image
              src={
                rankData.find((rank) => rank.name === desiredRank)?.image ||
                raja1
              }
              alt={desiredRank}
              className="block"
              width={106}
              height={106}
            />
            <div>
              <h3 className="text-base sm:text-lg font-bold">{desiredRank}</h3>
              <p className="text-xs sm:text-sm text-gray-400">Desired rank</p>
            </div>
          </div>

          <label className="block text-xs sm:text-sm text-gray-400 mb-2">
            Desired rank
          </label>

          <select
            value={desiredRank}
            onChange={(e) => setDesiredRank(e.target.value as RankType)}
            className="w-full bg-[#282836] border border-gray-600 rounded px-3 py-2 text-white text-sm"
          >
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
              onChange={(e) => setRegion(e.target.value as RegionType)}
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
  );
};

export default RankBoostForm;
