import ContactUs from "@/src/Page/ContactUs";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact Us | Auraboost",
  description:
    "Get in touch with the Auraboost team. Have a question about our boosting services, need help with an order, or want to become a seller? We're here to help — 8am to 8pm daily.",
  openGraph: {
    title: "Contact Us | Auraboost",
    description:
      "Reach out to Auraboost for support, partnership inquiries, or any questions about our game boosting services.",
    url: "https://www.auraboost.gg/contact",
    siteName: "Auraboost",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Auraboost",
    description:
      "Reach out to Auraboost for support, partnership inquiries, or any questions about our game boosting services.",
  },
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return <ContactUs />;
}
