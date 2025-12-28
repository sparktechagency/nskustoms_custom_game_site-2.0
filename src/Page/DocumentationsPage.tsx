"use client";

import { useState, useEffect } from "react";
import { documentationData } from "@/src/data/documentation";
import SidebarDocs from "../components/documentations/SidebarDocs";
import DocsSearchBar from "../components/documentations/DocsSearchBar";
import DocumentationContent from "../components/documentations/DocumentationContent";
import TableOfContents from "../components/documentations/TableOfContents";

const getInitialPage = () => {
  if (typeof window === "undefined") return "how-to-buy";

  const path = window.location.pathname;
  const parts = path.split("/");
  const slug = parts[parts.length - 1];

  return slug && documentationData[slug] ? slug : "how-to-buy";
};

export default function DocumentationPage() {
  const [activePage, setActivePage] = useState(getInitialPage);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log("Searching for:", query);
  };

  const handleSectionClick = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      // Calculate offset to account for header
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const getSections = () => {
    const doc = documentationData[activePage];
    if (!doc) return [];

    const sections = [{ id: "overview", title: "Overview" }];

    doc.steps.forEach((step) => {
      sections.push({
        id: `step-${step.number}`,
        title: step.title,
      });
    });

    if (doc.securityTips && doc.securityTips.length > 0) {
      sections.push({
        id: "security-tips",
        title: "Security Tips for Account Purchases",
      });
    }

    return sections;
  };

  return (
    <div className="flex h-screen">
      <SidebarDocs activePage={activePage} />

      <div className="main-content">
        <div className="content-header">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Help Center</h1>
            <DocsSearchBar onSearch={handleSearch} />
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 overflow-y-auto">
            <DocumentationContent slug={activePage} />
          </div>

          <div className="right-sidebar">
            <TableOfContents
              sections={getSections()}
              activeSection={activeSection}
              onSectionClick={handleSectionClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
