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

const settingMeta: Record<string, { title: string; description: string }> = {
  privacy_policy: {
    title: "Privacy Policy",
    description:
      "Read Auraboost's privacy policy. Learn how we collect, use, and protect your personal data.",
  },
  terms_condition: {
    title: "Terms & Conditions",
    description:
      "Read Auraboost's terms and conditions. Understand the rules and agreements that govern your use of our platform.",
  },
  about_us: {
    title: "About Us",
    description:
      "Learn about Auraboost — the trusted game boosting platform built for competitive gamers.",
  },
  platform_charge: {
    title: "Platform Charges",
    description:
      "Understand Auraboost's platform charges and fee structure.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ type: string }>;
}): Promise<Metadata> {
  const { type } = await params;

  const doc = documentationData[type];
  if (doc) {
    return {
      title: doc.title,
      description: doc.description,
      openGraph: {
        title: doc.title,
        description: doc.description,
        url: `https://www.auraboost.gg/docs/${type}`,
        siteName: "Auraboost",
        type: "article",
      },
      twitter: {
        card: "summary_large_image",
        title: doc.title,
        description: doc.description,
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
      alternates: {
        canonical: `/docs/${type}`,
      },
    };
  }

  return {
    title: "Help Center",
    description: "Auraboost Help Center — guides, policies, and support documentation.",
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
