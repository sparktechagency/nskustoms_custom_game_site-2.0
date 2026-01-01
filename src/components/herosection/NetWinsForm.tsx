import React from "react";
import Image from "next/image";
import herobg from "@/src/Assets/Landing/herobg.png";
import raja1 from "@/src/Assets/Landing/raja1.png";
import { RankType, QueueType, RegionType } from "@/src/types/components.types";
import { rankData, ranks, regions } from "@/src/lib/ranks";

interface NetWinsFormProps {
  previousSeasonRank: RankType;
  setPreviousSeasonRank: (rank: RankType) => void;
  placementRegion: RegionType;
  setPlacementRegion: (region: RegionType) => void;
  placementQueue: QueueType;
  setPlacementQueue: (queue: QueueType) => void;
  numberOfGames: number;
  setNumberOfGames: (num: number) => void;
}

const NetWinsForm: React.FC<NetWinsFormProps> = ({
  previousSeasonRank,
  setPreviousSeasonRank,
  placementRegion,
  setPlacementRegion,
  placementQueue,
  setPlacementQueue,
  numberOfGames,
  setNumberOfGames,
}) => {
  return (
    <div
      className="w-full p-4 sm:p-6 bg-no-repeat bg-cover rounded-md relative"
      style={{ backgroundImage: `url(${herobg.src})` }}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
        <Image
          src={
            rankData.find((rank) => rank.name === previousSeasonRank)?.image ||
            raja1
          }
          alt="Current Rank"
          className=""
          width={106}
          height={106}
        />
        <div>
          <h3 className="text-xs sm:text-sm font-bold">Net Wins</h3>
          <h3 className="text-lg sm:text-xl font-bold">{previousSeasonRank}</h3>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs sm:text-sm text-gray-400 mb-2">
            Current rank
          </label>
          <select
            value={previousSeasonRank}
            onChange={(e) => setPreviousSeasonRank(e.target.value as RankType)}
            className="w-full bg-[#282836] border border-gray-600 rounded px-3 py-2 text-white text-sm"
          >
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
            onChange={(e) => setPlacementRegion(e.target.value as RegionType)}
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
            onChange={(e) => setPlacementQueue(e.target.value as QueueType)}
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
  );
};

export default NetWinsForm;
