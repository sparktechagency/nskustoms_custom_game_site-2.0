"use client";

import { useState } from "react";
import { documentationData } from "@/src/data/documentation";
import { useRouter } from "next/navigation";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function DocsSearchBar({ onSearch }: SearchBarProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);

    // Try to find a matching documentation page
    const matchingPage = Object.keys(documentationData).find(key =>
      key.toLowerCase().includes(searchQuery.toLowerCase()) ||
      documentationData[key].title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      documentationData[key].steps.some(step =>
        step.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        step.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );

    if (matchingPage) {
      router.push(`/docs/${matchingPage}`);
      setShowSuggestions(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.length > 0) {
      // Find matching documentation pages based on title or content
      const matches = Object.keys(documentationData).filter(key =>
        key.toLowerCase().includes(value.toLowerCase()) ||
        documentationData[key].title.toLowerCase().includes(value.toLowerCase()) ||
        documentationData[key].steps.some(step =>
          step.title.toLowerCase().includes(value.toLowerCase()) ||
          step.content.toLowerCase().includes(value.toLowerCase())
        )
      );

      setSuggestions(matches.slice(0, 5)); // Show up to 5 suggestions
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (slug: string) => {
    setSearchQuery(documentationData[slug].title);
    router.push(`/docs/${slug}`);
    setShowSuggestions(false);
  };

  return (
    <div className="relative">
      <form onSubmit={handleSearch} className="search-container">
        <input
          type="text"
          placeholder="Search documentation..."
          value={searchQuery}
          onChange={handleInputChange}
          className="search-input"
          onFocus={() => searchQuery && setShowSuggestions(true)}
        />
        <svg
          className="search-icon w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </form>

      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-lg">
          {suggestions.map((slug) => (
            <div
              key={slug}
              className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
              onClick={() => handleSuggestionClick(slug)}
            >
              {documentationData[slug].title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
