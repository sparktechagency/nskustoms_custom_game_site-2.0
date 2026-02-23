import { Metadata } from "next";
import { documentationData } from "@/src/data/documentation";
import DocumentationPage from "@/src/Page/DocumentationsPage";
import SettingsPageClient from "./SettingsPageClient";

const settingTypes = [
  "privacy_policy",
  "terms_condition",
  "about_us",
  "platform_charge",
];

const settingMeta: Record<
  string,
  { title: string; description: string; keywords: string[] }
> = {
  privacy_policy: {
    title: "Privacy Policy",
    description:
      "Read Auraboost's privacy policy. Learn how we collect, use, store, and protect your personal data when you use our game boosting platform and services.",
    keywords: [
      "Auraboost privacy policy",
      "data protection",
      "personal data",
      "boosting privacy",
    ],
  },
  terms_condition: {
    title: "Terms & Conditions",
    description:
      "Read Auraboost's terms and conditions. Understand the rules, agreements, user responsibilities, and legal terms that govern your use of our boosting platform.",
    keywords: [
      "Auraboost terms and conditions",
      "user agreement",
      "boosting terms of service",
      "platform rules",
    ],
  },
  about_us: {
    title: "About Us",
    description:
      "Learn about Auraboost — the trusted game boosting platform built for competitive gamers. Discover our mission, team, and commitment to secure, affordable boosting services.",
    keywords: [
      "about Auraboost",
      "game boosting company",
      "who is Auraboost",
      "boosting platform",
    ],
  },
  platform_charge: {
    title: "Platform Charges",
    description:
      "Understand Auraboost's platform charges and fee structure. Transparent pricing with no hidden costs for buyers and sellers.",
    keywords: [
      "Auraboost charges",
      "platform fees",
      "boosting costs",
      "transaction fees",
    ],
  },
};

const docKeywords: Record<string, string[]> = {
  "how-to-buy": [
    "how to buy boost Auraboost",
    "buy ELO boost",
    "purchase boosting service",
    "Auraboost buyer guide",
    "game boost checkout",
  ],
  "how-to-sell": [
    "how to sell on Auraboost",
    "become a booster",
    "sell boosting services",
    "Auraboost seller guide",
    "earn money boosting",
  ],
  "auraboost-account": [
    "Auraboost account setup",
    "create Auraboost account",
    "account settings",
    "profile management",
    "two-factor authentication",
  ],
  faq: [
    "Auraboost FAQ",
    "boosting questions",
    "is boosting safe",
    "Auraboost help",
    "frequently asked questions",
  ],
  "tradeshield-buying": [
    "RankGuard buyer protection",
    "Auraboost escrow",
    "buyer warranty",
    "purchase protection",
    "safe boosting",
  ],
  "tradeshield-selling": [
    "RankGuard seller protection",
    "seller earnings security",
    "chargeback protection",
    "Auraboost seller safety",
    "dispute handling",
  ],
  deposited: [
    "Auraboost deposit",
    "add funds wallet",
    "wallet deposit",
    "payment methods",
    "top up balance",
  ],
  withdrawal: [
    "Auraboost withdrawal",
    "cash out earnings",
    "payout methods",
    "withdraw funds",
    "seller withdrawal",
  ],
  "account-seller-rules": [
    "account seller rules",
    "Auraboost seller guidelines",
    "listing rules",
    "account recovery policy",
    "seller compliance",
  ],
  "seller-rules": [
    "Auraboost seller rules",
    "booster code of conduct",
    "boosting guidelines",
    "seller eligibility",
    "prohibited activities",
  ],
  "changing-username": [
    "change username Auraboost",
    "update display name",
    "username settings",
    "rename account",
    "profile username",
  ],
  fees: [
    "Auraboost fees",
    "boosting service fees",
    "seller commission",
    "withdrawal fees",
    "transparent pricing",
  ],
  "refund-policy": [
    "Auraboost refund policy",
    "boosting refund",
    "dispute resolution",
    "money back guarantee",
    "order refund process",
  ],
  "become-partner": [
    "Auraboost partner program",
    "affiliate program",
    "become a partner",
    "gaming partnership",
    "referral commission",
  ],
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string }>;
}): Promise<Metadata> {
  const { type } = await params;

  const doc = documentationData[type];
  if (doc) {
    const keywords = docKeywords[type] || [];
    return {
      title: doc.title,
      description: doc.description,
      keywords,
      openGraph: {
        title: `${doc.title} — Auraboost Documentation`,
        description: doc.description,
        url: `https://www.auraboost.gg/docs/${type}`,
        siteName: "Auraboost",
        type: "article",
        images: [
          {
            url: "/opengraph-image.png",
            width: 1200,
            height: 630,
            alt: `${doc.title} — Auraboost`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${doc.title} — Auraboost Documentation`,
        description: doc.description,
        images: ["/opengraph-image.png"],
      },
      alternates: {
        canonical: `/docs/${type}`,
      },
    };
  }

  const setting = settingMeta[type];
  if (setting) {
    return {
      title: setting.title,
      description: setting.description,
      keywords: setting.keywords,
      openGraph: {
        title: `${setting.title} — Auraboost`,
        description: setting.description,
        url: `https://www.auraboost.gg/docs/${type}`,
        siteName: "Auraboost",
        type: "website",
        images: [
          {
            url: "/opengraph-image.png",
            width: 1200,
            height: 630,
            alt: `${setting.title} — Auraboost`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${setting.title} — Auraboost`,
        description: setting.description,
        images: ["/opengraph-image.png"],
      },
      alternates: {
        canonical: `/docs/${type}`,
      },
    };
  }

  return {
    title: "Help Center",
    description:
      "Auraboost Help Center — guides, policies, and support documentation for buyers and sellers on the leading game boosting platform.",
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = await params;

  if (documentationData[type]) {
    return <DocumentationPage />;
  }

  if (settingTypes.includes(type)) {
    return <SettingsPageClient type={type} />;
  }

  return <DocumentationPage />;
}
