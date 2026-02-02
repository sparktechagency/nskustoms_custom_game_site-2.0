"use client";
import React, { useState, useCallback } from "react";
import {
  OrderType,
  QueueType,
  RankType,
  RegionType,
} from "@/src/types/components.types";
import { useRouter } from "next/navigation";

// Import subcomponents
import OrderTypeButtons from "./OrderTypeButtons";
import RankBoostForm from "./RankBoostForm";
import PlacementMatchesForm from "./PlacementMatchesForm";
import NetWinsForm from "./NetWinsForm";
import CustomRequestForm from "./CustomRequestForm";
import AdditionalInfo from "./AdditionalInfo";
import WhyTrustSection from "./WhyTrustSection";
import OrderSummary from "./OrderSummary";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/src/redux/features/auth/authSlice";
import { selectIsConnected } from "@/src/redux/features/socket/socketSlice";
import socketService from "@/src/lib/socket/socketService";

// Helper function to convert queue type to API format
const formatQueueForApi = (queue: QueueType): "solo/duo" | "5v5_flex" => {
  return queue === "Solo/Duo" ? "solo/duo" : "5v5_flex";
};

const StaticsSoloNot = {
  stream: false,
  soloQueue: false,
  offlineMode: false,
};

// Helper function to convert region to API format (short code)
const formatRegionForApi = (region: RegionType): string => {
  const regionMap: Record<RegionType, string> = {
    "North America (NA)": "NA",
    "Europe (EUW/EUNE)": "EUW",
    "Europe West (EUW)": "EUW",
    "Korea (KR)": "KR",
    "Japan (JP)": "JP",
    "Oceania (OCE)": "OCE",
    "Latin America (LAN/LAS)": "LAN",
    "China (CN)": "CN",
    "Southeast Asia (SEA)": "SEA",
    "Brazil (BR)": "BR",
    "Turkey (TR)": "TR",
    "Middle East / North Africa (MENA)": "MENA",
  };
  return regionMap[region] || "NA";
};

const Herosectionfrom: React.FC = () => {
  const currentUser = useSelector(selectCurrentUser);
  const isSocketConnected = useSelector(selectIsConnected);
  const router = useRouter();
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
  const [soloqueue, setSoloqueue] = useState(false);
  const [offlineMode, setOfflineMode] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback(() => {
    setError(null);

    // Check if user is logged in
    if (!currentUser) {
      router.push("/login");
      return;
    }

    // Check socket connection
    if (!isSocketConnected) {
      setError("Connection not established. Please wait and try again.");
      return;
    }

    setIsLoading(true);

    let requestBody: Record<string, unknown> = {};

    switch (orderType) {
      case "rank-boost":
        requestBody = {
          boostingType: "rank_boost",
          currentRank: {
            currentRank: currentLP,
            queue: formatQueueForApi(queue),
            currentLp: "0",
          },
          desiredRank: {
            desiredRank: desiredRank,
            region: formatRegionForApi(region),
          },
          customizeOrder: {
            solo:
              orderMode === "solo"
                ? {
                    stream: stream,
                    soloQueue: soloqueue,
                    offlineMode: offlineMode,
                  }
                : StaticsSoloNot,
            duo: orderMode === "duo",
          },
          additionInfo: additionalInfo,
        };
        break;

      case "placement-matches":
        requestBody = {
          boostingType: "placement_matches",
          placementMatches: {
            previousRank: previousSeasonRank,
            region: formatRegionForApi(placementRegion),
            queue: formatQueueForApi(placementQueue),
            numberOfGames: numberOfGames,
          },
          customizeOrder: {
            solo:
              orderMode === "solo"
                ? {
                    stream: stream,
                    soloQueue: soloqueue,
                    offlineMode: offlineMode,
                  }
                : StaticsSoloNot,
            duo: orderMode === "duo",
          },
          additionInfo: additionalInfo,
        };
        break;

      case "net-wins":
        requestBody = {
          boostingType: "net_wins",
          netWins: {
            currentRank: previousSeasonRank,
            region: formatRegionForApi(placementRegion),
            queue: formatQueueForApi(placementQueue),
            numberOfWins: numberOfGames,
          },
          customizeOrder: {
            solo:
              orderMode === "solo"
                ? {
                    stream: stream,
                    soloQueue: soloqueue,
                    offlineMode: offlineMode,
                  }
                : StaticsSoloNot,
            duo: orderMode === "duo",
          },
          additionInfo: additionalInfo,
        };
        break;

      case "custom-request":
        requestBody = {
          boostingType: "custom_request",
          customRequest: {
            gameType: "League of Legends",
            requestDescription: customRequest,
          },
          customizeOrder: {
            solo:
              orderMode === "solo"
                ? {
                    stream: stream,
                    soloQueue: soloqueue,
                    offlineMode: offlineMode,
                  }
                : StaticsSoloNot,
            duo: orderMode === "duo",
          },
          additionalInfo: additionalInfo,
        };
        break;
    }

    // Use socket to create boosting post
    socketService.createBoostingPost<{ _id: string }>(
      requestBody,
      (response) => {
        setIsLoading(false);

        if (response.success && response.data?._id) {
          router.push(`/boosting-request?boostingId=${response.data._id}`);
        } else {
          const errorMessage =
            response.error ||
            response.message ||
            "Failed to create order. Please try again.";
          setError(errorMessage);
        }
      },
    );

    // Fallback timeout in case socket doesn't respond
    setTimeout(() => {
      setIsLoading((prev) => {
        if (prev) {
          setError("Request timed out. Please try again.");
          return false;
        }
        return prev;
      });
    }, 15000);
  }, [
    currentUser,
    isSocketConnected,
    router,
    orderType,
    currentLP,
    queue,
    desiredRank,
    region,
    orderMode,
    stream,
    soloqueue,
    offlineMode,
    additionalInfo,
    previousSeasonRank,
    placementRegion,
    placementQueue,
    numberOfGames,
    customRequest,
  ]);

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
            appearOffline={soloqueue}
            setAppearOffline={setSoloqueue}
            offlineMode={offlineMode}
            setOfflineMode={setOfflineMode}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </div>
    </div>
  );
};

export default Herosectionfrom;
