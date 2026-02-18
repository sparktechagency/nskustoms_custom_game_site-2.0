import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://www.auraboost.gg";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/accountsetting",
          "/boosting/",
          "/message",
          "/notifications",
          "/supportmessage",
          "/refundpolicy",
          "/payments",
          "/seller/",
          "/opt-verifications",
          "/reset-password",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
