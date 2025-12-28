"use client";

// Canadian Doller
//Hero section current lp input filed
// offers page logo change as buyer expected

import { useState } from "react";
import Image from "next/image";
import logo from "@/src/Assets/Landing/logo.png";
import amex from "@/src/Assets/Footer/amex.png";
import appleyPay from "@/src/Assets/Footer/applepay.png";
import btc from "@/src/Assets/Footer/btc.png";
import discover from "@/src/Assets/Footer/discover.png";
import googlepay from "@/src/Assets/Footer/googlepay.png";
import mastercard from "@/src/Assets/Footer/mastercard.png";
import visa from "@/src/Assets/Footer/visa.png";
import Link from "next/link";

export default function Footer() {
  const [language, setLanguage] = useState("English");
  const [currency, setCurrency] = useState("USD");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
    { name: "Contact Us", href: "#" },
    { name: "Become a Partner", href: "#" },
  ];

  const accountWarrantyLinks = [
    { name: "Account Warranty", href: "#" },
    { name: "Tradeshield(Buying)", href: "#" },
    { name: "Tradeshield(Selling)", href: "#" },
    { name: "Deposited", href: "#" },
    { name: "Withdrawal", href: "#" },
  ];

  const accountSellerRulesLinks = [
    { name: "Account seller Rules", href: "#" },
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
                alt="Auraboot"
                className="h-12 w-auto"
                width={150}
                height={48}
              />
            </div>
            <p className="text-gray-400 text-center lg:text-left max-w-xs">
              Join us today to level up your gaming experience!
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
                    <Link href={link.href} className="text-[#A3A3A3] text-sm">
                      {link.name}
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
                      className="text-gray-400 text-sm hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Account Seller Rules */}
            <div>
              <h3 className="font-semibold mb-4">Account seller Rules</h3>
              <ul className="space-y-2">
                {accountSellerRulesLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-400 text-sm hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right section - Payment methods and language/currency selector */}
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

            {/* Language and currency selector */}
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
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v6M19 10v6"
                  />
                </svg>
                <span>
                  {language} | {currency} - $
                </span>
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
                <div className="absolute right-0 bottom-11 mt-2 w-48 bg-gray-800 rounded-md shadow-lg z-10">
                  <div className="py-1">
                    <div className="px-4 py-2 text-sm text-gray-300 border-b border-gray-700">
                      Language
                    </div>
                    <button
                      onClick={() => {
                        setLanguage("English");
                        setIsDropdownOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        language === "English"
                          ? "bg-gray-700"
                          : "hover:bg-gray-700"
                      }`}
                    >
                      English
                    </button>
                    <button
                      onClick={() => {
                        setLanguage("Spanish");
                        setIsDropdownOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        language === "Spanish"
                          ? "bg-gray-700"
                          : "hover:bg-gray-700"
                      }`}
                    >
                      Spanish
                    </button>
                    <button
                      onClick={() => {
                        setLanguage("French");
                        setIsDropdownOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        language === "French"
                          ? "bg-gray-700"
                          : "hover:bg-gray-700"
                      }`}
                    >
                      French
                    </button>
                    <button
                      onClick={() => {
                        setLanguage("Portuguese ");
                        setIsDropdownOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        language === "Portuguese "
                          ? "bg-gray-700"
                          : "hover:bg-gray-700"
                      }`}
                    >
                      Portuguese
                    </button>
                  </div>
                  <div className="py-1">
                    <div className="px-4 py-2 text-sm text-gray-300 border-b border-gray-700">
                      Currency
                    </div>
                    <button
                      onClick={() => {
                        setCurrency("USD");
                        setIsDropdownOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        currency === "USD" ? "bg-gray-700" : "hover:bg-gray-700"
                      }`}
                    >
                      USD - $
                    </button>
                    <button
                      onClick={() => {
                        setCurrency("EUR");
                        setIsDropdownOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        currency === "EUR" ? "bg-gray-700" : "hover:bg-gray-700"
                      }`}
                    >
                      EUR - €
                    </button>
                    <button
                      onClick={() => {
                        setCurrency("GBP");
                        setIsDropdownOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        currency === "GBP" ? "bg-gray-700" : "hover:bg-gray-700"
                      }`}
                    >
                      GBP - £
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom section - Copyright and legal links */}
        <div className="mt-12 pt-6 border-t text-xs border-gray-800 text-center text-gray-400">
          <p>
            © 2025. The Auraboot website is operated by GWD Processing FZCO.
          </p>
          <div className="mt-2 flex justify-center space-x-4">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms & Condition
            </a>
            <a href="#" className="hover:text-white transition-colors">
              DMCA
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
