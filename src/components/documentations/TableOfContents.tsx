"use client";

import { useEffect, useState, useCallback } from "react";

interface TableOfContentsProps {
  sections: Array<{ id: string; title: string }>;
  activeSection: string;
  onSectionClick: (id: string) => void;
}

export default function TableOfContents({
  sections,
  activeSection,
  onSectionClick,
}: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>(activeSection);

  useEffect(() => {
    setActiveId(activeSection);
  }, [activeSection]);

  // Function to handle scroll and update active section
  const handleScroll = useCallback(() => {
    const sections = document.querySelectorAll(
      '[id^="step-"], #overview, #security-tips'
    );
    let currentSection = activeId;

    sections.forEach((section) => {
      const element = section as HTMLElement;
      const rect = element.getBoundingClientRect();
      const topOffset = window.pageYOffset + rect.top;

      if (window.pageYOffset >= topOffset - 100) {
        currentSection = element.id;
      }
    });

    if (currentSection !== activeId) {
      setActiveId(currentSection);
      // Optionally update the parent component about the active section
      // onSectionClick(currentSection);
    }
  }, [activeId]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className="on-page-section">
      <h2 className="on-page-heading">On this page</h2>
      <ul className="space-y-1">
        {sections.map((section) => (
          <li key={section.id}>
            <button
              onClick={() => {
                onSectionClick(section.id);
                setActiveId(section.id);
              }}
              className={`w-full text-left ${
                activeId === section.id
                  ? "bg-[#AC221226] text-[#AC2212]"
                  : "hover:bg-[#AC221226]"
              } on-page-link`}
            >
              {section.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
