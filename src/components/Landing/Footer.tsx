"use client";

import { useState } from "react";
import Image from "next/image";
import logo from "@/src/Assets/Landing/logo.png";
import amex from "@/src/Assets/Footer/amex.png";
import appleyPay from "@/src/Assets/Footer/applepay.png";
import discover from "@/src/Assets/Footer/discover.png";
import googlepay from "@/src/Assets/Footer/googlepay.png";
import mastercard from "@/src/Assets/Footer/mastercard.png";
import visa from "@/src/Assets/Footer/visa.png";
import Link from "next/link";
import { changeGoogleTranslateLanguage } from "@/src/components/GoogleTranslateScript";

const languages = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "Portuguese", value: "pt" },
  { label: "Spanish", value: "es" },
];

export default function Footer() {
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("currentLanguage") || "en";
    }
    return "en";
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const switchLanguage = (lang: string) => {
    setSelectedLanguage(lang);
    localStorage.setItem("currentLanguage", lang);
    changeGoogleTranslateLanguage(lang);
  };

  const getCurrentLanguageLabel = () => {
    return (
      languages.find((l) => l.value === selectedLanguage)?.label || "English"
    );
  };

  const paymentMethods = [
    { name: "Visa", icon: visa },
    { name: "Mastercard", icon: mastercard },
    { name: "Amex", icon: amex },
    { name: "Discover", icon: discover },
    { name: "Apple Pay", icon: appleyPay },
    { name: "Google Pay", icon: googlepay },
  ];

  const helpCenterLinks = [
    { name: "Help Center", href: "/docs" },
    { name: "Contact Us", href: "/contact" },
  ];

  const accountWarrantyLinks = [
    { name: "RankGuard (Buying)", href: "#" },
    { name: "RankGuard (Selling)", href: "#" },
    { name: "Deposited", href: "#" },
    { name: "Withdrawal", href: "#" },
  ];

  const accountSellerRulesLinks = [
    { name: "Seller Rules", href: "#" },
    { name: "Changing Username", href: "#" },
    { name: "Fees", href: "#" },
    { name: "Refund Policy", href: "#" },
  ];

  return (
    <footer className="bg-[#282836] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
          {/* Left section - Logo and tagline */}
          <div className="flex flex-col items-center lg:items-start">
            <div className="mb-6">
              <Image
                src={logo}
                alt="Auraboost"
                className="h-16 w-auto"
                width={200}
                height={70}
              />
            </div>
            <p className="text-gray-400 text-center lg:text-left max-w-xs">
              Join us now and elevate the way you game!
            </p>
          </div>

          {/* Middle section - Navigation links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Help Center */}
            <div>
              <h3 className="font-semibold mb-4">Help Center</h3>
              <ul className="space-y-2">
                {helpCenterLinks.map((link, index) => (
                  <li key={index}>
                    <Link href={link.href} className="text-blue-300 text-sm">
                      <span className="text-blue-300">{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Account Warranty */}
            <div>
              <h3 className="font-semibold mb-4">Account Warranty</h3>
              <ul className="space-y-2">
                {accountWarrantyLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-blue-300 text-sm hover:text-white transition-colors"
                    >
                      <span className="text-blue-300">{link.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Account Seller Rules */}
            <div>
              <h3 className="font-semibold mb-4">Seller Rules</h3>
              <ul className="space-y-2">
                {accountSellerRulesLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-blue-300 text-sm hover:text-white transition-colors"
                    >
                      <span className="text-blue-300">{link.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right section - Payment methods and language selector */}
          <div className="flex flex-col items-center lg:items-end space-y-6">
            {/* Payment methods */}
            <div className="flex flex-wrap items-center gap-3">
              {paymentMethods.map((method, index) => (
                <div key={index} className="w-8 h-8">
                  <Image
                    src={method.icon}
                    alt={method.name}
                    className="w-full h-full object-contain"
                    width={32}
                    height={32}
                  />
                </div>
              ))}
            </div>

            {/* Language selector */}
            <div className="relative">
              <button
                className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-md flex items-center space-x-2"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
                <span>{getCurrentLanguageLabel()}</span>
                <svg
                  className={`w-4 h-4 ml-1 transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 bottom-11 mt-2 w-48 bg-gray-800 rounded-md shadow-lg z-10 max-h-80 overflow-y-auto">
                  <div className="py-1">
                    <div className="px-4 py-2 text-sm text-gray-300 border-b border-gray-700">
                      Language
                    </div>
                    {languages.map((lang) => (
                      <button
                        key={lang.value}
                        onClick={() => switchLanguage(lang.value)}
                        className={`block w-full text-left px-4 py-2 text-sm ${
                          selectedLanguage === lang.value
                            ? "bg-gray-700"
                            : "hover:bg-gray-700"
                        }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom section - Copyright and legal links */}
        <div className="mt-12 pt-6 border-t text-xs border-gray-800 text-center text-gray-400">
          <p>© 2026 AB Gaming Services LTD. All right reserved.</p>
          <div className="mt-2 flex justify-center space-x-4">
            <Link
              href="/docs/privacy_policy"
              className="text-[#A3A3A3] hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>

            <Link
              href="/docs/terms_condition"
              className="text-[#A3A3A3] hover:text-white transition-colors"
            >
              Terms & Condition
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
