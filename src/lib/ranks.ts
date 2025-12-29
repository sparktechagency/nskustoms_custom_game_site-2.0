import { RankType, RegionType } from "../types/components.types";
// ranks image
import ironImage from "@/src/Assets/Landing/ranks/ironiv.png";
import bronzeImage from "@/src/Assets/Landing/ranks/brozeiv.png";
import diamondImage from "@/src/Assets/Landing/ranks/diamoniv.png";
import emeraldImage from "@/src/Assets/Landing/ranks/emeraldiv.png";
import goldImage from "@/src/Assets/Landing/ranks/goldiv.png";
import grandmasterImage from "@/src/Assets/Landing/ranks/grandmaster.png";
import masterImage from "@/src/Assets/Landing/ranks/master.png";
import platumImage from "@/src/Assets/Landing/ranks/platinumiv.png";
import sliverImage from "@/src/Assets/Landing/ranks/silveriv.png";

export const rankData = [
  // Iron ranks
  { name: "Iron IV", image: ironImage },
  { name: "Iron III", image: ironImage },
  { name: "Iron II", image: ironImage },
  { name: "Iron I", image: ironImage },

  // Bronze ranks
  { name: "Bronze IV", image: bronzeImage },
  { name: "Bronze III", image: bronzeImage },
  { name: "Bronze II", image: bronzeImage },
  { name: "Bronze I", image: bronzeImage },

  // Silver ranks
  { name: "Silver IV", image: sliverImage },
  { name: "Silver III", image: sliverImage },
  { name: "Silver II", image: sliverImage },
  { name: "Silver I", image: sliverImage },

  // Gold ranks
  { name: "Gold IV", image: goldImage },
  { name: "Gold III", image: goldImage },
  { name: "Gold II", image: goldImage },
  { name: "Gold I", image: goldImage },

  // Platinum ranks
  { name: "Platinum IV", image: platumImage },
  { name: "Platinum III", image: platumImage },
  { name: "Platinum II", image: platumImage },
  { name: "Platinum I", image: platumImage },

  // Emerald ranks
  { name: "Emerald IV", image: emeraldImage },
  { name: "Emerald III", image: emeraldImage },
  { name: "Emerald II", image: emeraldImage },
  { name: "Emerald I", image: emeraldImage },

  // Diamond ranks
  { name: "Diamond IV", image: diamondImage },
  { name: "Diamond III", image: diamondImage },
  { name: "Diamond II", image: diamondImage },
  { name: "Diamond I", image: diamondImage },

  // Master rank
  { name: "Master", image: masterImage },

  // Grandmaster rank
  { name: "Grandmaster", image: grandmasterImage },
];

export const ranks: RankType[] = [
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
  "Gold IV",
  "Gold III",
  "Gold II",
  "Gold I",
  "Platinum IV",
  "Platinum III",
  "Platinum II",
  "Platinum I",
  "Emerald IV",
  "Emerald III",
  "Emerald II",
  "Emerald I",
  "Diamond IV",
  "Diamond III",
  "Diamond II",
  "Diamond I",
  "Master",
  "Grandmaster",
  "Challenger",
];

export const regions: RegionType[] = [
  "North America (NA)",
  "Europe (EUW/EUNE)",
  "Korea (KR)",
  "Japan (JP)",
  "Oceania (OCE)",
  "Latin America (LAN/LAS)",
  "China (CN)",
  "Southeast Asia (SEA)",
  "Brazil (BR)",
  "Turkey (TR)",
  "Middle East / North Africa (MENA)",
];
