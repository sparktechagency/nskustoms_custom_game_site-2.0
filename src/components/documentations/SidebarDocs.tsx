"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { navigationItems } from "@/src/data/documentation";
import Image from "next/image";
import logo from "@/src/Assets/Landing/logo.png";

interface SidebarProps {
  activePage: string;
}

export default function SidebarDocs({ activePage }: SidebarProps) {
  const router = useRouter();
  const [expanded, setExpanded] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    // Update expanded state based on current active page
    const updateExpandedState = () => {
      const newExpanded: { [key: string]: boolean } = {};
      navigationItems.forEach((item) => {
        if (item.children) {
          const hasActiveChild = item.children.some(
            (child) =>
              child.href === `/${activePage}` ||
              child.href === `/docs/${activePage}`
          );
          newExpanded[item.id] = hasActiveChild;
        }
      });
      setExpanded((prev) => {
        // Only update if there's a change to prevent unnecessary renders
        if (JSON.stringify(prev) !== JSON.stringify(newExpanded)) {
          return newExpanded;
        }
        return prev;
      });
    };

    updateExpandedState();
  }, [activePage]);

  const toggleExpand = (id: string) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const isActive = (href: string) => {
    // Check if the href matches the current active page
    const normalizedHref = href
      .replace("/help-center/", "")
      .replace("/docs/", "");
    return normalizedHref === activePage;
  };

  const handleNavigation = (href: string) => {
    // Extract the slug from the href
    const slug = href.split("/").pop();
    if (slug) {
      router.push(`/docs/${slug}`);
    }
  };

  return (
    <aside className="sidebar ">
      <div className="sidebar-header">
        <div className="flex items-center space-x-2">
          <Link href={"/"}>
            <Image src={logo} width={250} height={400} alt="AuraBoost Logo" />
          </Link>
        </div>
      </div>

      <nav className="sidebar-nav">
        {navigationItems.map((item) => (
          <div key={item.id}>
            {item.children && item.children.length > 0 ? (
              <div>
                <div
                  className={`w-full text-left flex items-center justify-between p-3 ${
                    isActive(item.href)
                      ? "bg-blue-600 text-white"
                      : "hover:bg-gray-700"
                  }`}
                >
                  <span>{item.title}</span>
                  <button
                    onClick={() => toggleExpand(item.id)}
                    className="focus:outline-none"
                  >
                    <svg
                      className={`w-4 h-4 transition-transform ${
                        expanded[item.id] ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                </div>
                {expanded[item.id] && item.children && (
                  <div className="pl-6">
                    {item.children.map((child) => (
                      <div
                        key={child.id}
                        onClick={() => handleNavigation(child.href)}
                        className={`block p-3 cursor-pointer ${
                          isActive(child.href)
                            ? "bg-blue-600 text-white"
                            : "hover:bg-gray-700"
                        } sidebar-item`}
                      >
                        {child.title}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div
                key={item.id}
                onClick={() => handleNavigation(item.href)}
                className={`block p-3 cursor-pointer ${
                  isActive(item.href)
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-700"
                } sidebar-item`}
              >
                {item.title}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}
