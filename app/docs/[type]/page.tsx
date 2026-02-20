"use client";

import { useParams } from "next/navigation";
import { documentationData } from "@/src/data/documentation";
import DocumentationPage from "@/src/Page/DocumentationsPage";
import { useGetSettingByTypeQuery } from "@/src/redux/features/settings/settingApi";
import { Loader2 } from "lucide-react";
import Header from "@/src/components/Landing/Header";
import Footer from "@/src/components/Landing/Footer";

interface SettingData {
  type: string;
  content: string;
  title?: string;
}

type SettingType =
  | "privacy_policy"
  | "terms_condition"
  | "about_us"
  | "platform_charge";

const settingTypes = [
  "privacy_policy",
  "terms_condition",
  "about_us",
  "platform_charge",
];

function SettingsPage({ type }: { type: string }) {
  const { data, isLoading } = useGetSettingByTypeQuery({
    type: type as SettingType,
  });

  const settingData = data as SettingData | undefined;

  const formatTitle = (str: string) => {
    return str
      .split(/[-_]/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-8 h-8 text-red-500 animate-spin" />
            <p className="text-gray-400">Loading...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            {settingData?.title || formatTitle(type)}
          </h1>

          {settingData?.content ? (
            <div
              className="prose prose-pink"
              dangerouslySetInnerHTML={{ __html: settingData.content }}
            />
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400">
                No content available for this page.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Page() {
  const { type } = useParams<{ type: string }>();

  // If it's a documentation page, render with sidebar layout
  if (documentationData[type]) {
    return <DocumentationPage />;
  }

  // If it's a settings page (privacy_policy, terms_condition, etc.)
  if (settingTypes.includes(type)) {
    return <SettingsPage type={type} />;
  }

  // Fallback — treat unknown slugs as documentation
  return <DocumentationPage />;
}

export default Page;
