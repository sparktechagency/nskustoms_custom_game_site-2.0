"use client";
import { useGetSettingByTypeQuery } from "@/src/redux/features/settings/settingApi";
import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import Header from "@/src/components/Landing/Header";
import Footer from "@/src/components/Landing/Footer";

interface SettingData {
  type: string;
  content: string;
  title?: string;
}

type SettingType = "privacy_policy" | "terms_condition" | "about_us" | "platform_charge";

function Page() {
  const { type } = useParams<{ type: string }>();
  const { data, isLoading } = useGetSettingByTypeQuery({ type: type as SettingType });

  const settingData = data as SettingData | undefined;

  // Format type for display (e.g., "privacy_policy" -> "Privacy Policy")
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
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Header />
      <main className="flex-1 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Title */}
          <h1 className="text-3xl font-bold text-white mb-8">
            {settingData?.title || formatTitle(type)}
          </h1>

          {/* Content */}
          {settingData?.content ? (
            <div
              className="prose prose-invert prose-lg max-w-none
                prose-headings:text-white
                prose-p:text-gray-300
                prose-strong:text-white
                prose-a:text-red-400 prose-a:no-underline hover:prose-a:underline
                prose-ul:text-gray-300
                prose-ol:text-gray-300
                prose-li:text-gray-300
                prose-blockquote:border-red-500 prose-blockquote:text-gray-400
                [&_*]:leading-relaxed"
              dangerouslySetInnerHTML={{ __html: settingData.content }}
            />
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400">No content available for this page.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Page;
