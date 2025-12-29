"use client";
import React, { useState } from "react";
import {
  OrderType,
  QueueType,
  RankType,
  RegionType,
} from "@/src/types/components.types";

// Import subcomponents
import OrderTypeButtons from "./OrderTypeButtons";
import RankBoostForm from "./RankBoostForm";
import PlacementMatchesForm from "./PlacementMatchesForm";
import NetWinsForm from "./NetWinsForm";
import CustomRequestForm from "./CustomRequestForm";
import AdditionalInfo from "./AdditionalInfo";
import WhyTrustSection from "./WhyTrustSection";
import OrderSummary from "./OrderSummary";

const Herosectionfrom: React.FC = () => {
  const [orderType, setOrderType] = useState<OrderType>("rank-boost");
  const [desiredRank, setDesiredRank] = useState<RankType>("Challenger");
  const [queue, setQueue] = useState<QueueType>("Solo/Duo");
  const [region, setRegion] = useState<RegionType>("North America (NA)");
  const [previousSeasonRank, setPreviousSeasonRank] =
    useState<RankType>("Iron IV");
  const [placementQueue, setPlacementQueue] = useState<QueueType>("Solo/Duo");
  const [placementRegion, setPlacementRegion] =
    useState<RegionType>("North America (NA)");
  const [numberOfGames, setNumberOfGames] = useState<number>(1);
  const [currentLP, setCurrentLP] = useState<RankType>("Iron IV");
  const [customRequest, setCustomRequest] = useState<string>("");
  const [additionalInfo, setAdditionalInfo] = useState<string>("");
  const [orderMode, setOrderMode] = useState<"solo" | "duo">("solo");
  const [stream, setStream] = useState(false);
  const [appearOffline, setAppearOffline] = useState(false);
  const [offlineMode, setOfflineMode] = useState(false);

  return (
    <div className="py-2">
      <div className="">
        <OrderTypeButtons orderType={orderType} setOrderType={setOrderType} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Left Panel - Order Configuration */}
          <div className="md:col-span-2 lg:col-span-2 space-y-2">
            {/* Rank Boost Form */}
            {orderType === "rank-boost" && (
              <RankBoostForm
                currentLP={currentLP}
                setCurrentLP={setCurrentLP}
                queue={queue}
                setQueue={setQueue}
                region={region}
                setRegion={setRegion}
                desiredRank={desiredRank}
                setDesiredRank={setDesiredRank}
              />
            )}

            {/* Placement Matches */}
            {orderType === "placement-matches" && (
              <PlacementMatchesForm
                previousSeasonRank={previousSeasonRank}
                setPreviousSeasonRank={setPreviousSeasonRank}
                placementRegion={placementRegion}
                setPlacementRegion={setPlacementRegion}
                placementQueue={placementQueue}
                setPlacementQueue={setPlacementQueue}
                numberOfGames={numberOfGames}
                setNumberOfGames={setNumberOfGames}
              />
            )}

            {orderType === "net-wins" && (
              <NetWinsForm
                previousSeasonRank={previousSeasonRank}
                setPreviousSeasonRank={setPreviousSeasonRank}
                placementRegion={placementRegion}
                setPlacementRegion={setPlacementRegion}
                placementQueue={placementQueue}
                setPlacementQueue={setPlacementQueue}
                numberOfGames={numberOfGames}
                setNumberOfGames={setNumberOfGames}
              />
            )}

            {/* Custom Request */}
            {orderType === "custom-request" && (
              <CustomRequestForm
                customRequest={customRequest}
                setCustomRequest={setCustomRequest}
              />
            )}

            <AdditionalInfo
              additionalInfo={additionalInfo}
              setAdditionalInfo={setAdditionalInfo}
            />

            <WhyTrustSection />
          </div>

          {/* Right Panel - Order Summary */}
          <OrderSummary
            orderMode={orderMode}
            setOrderMode={setOrderMode}
            stream={stream}
            setStream={setStream}
            appearOffline={appearOffline}
            setAppearOffline={setAppearOffline}
            offlineMode={offlineMode}
            setOfflineMode={setOfflineMode}
          />
        </div>
      </div>
    </div>
  );
};

export default Herosectionfrom;
