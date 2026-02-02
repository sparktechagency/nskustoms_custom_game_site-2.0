// components/SellerIDVerificationForm.tsx
"use client";

import { useState } from "react";
import { CheckCircle, ChevronDown } from "lucide-react";

export interface FormData {
  firstName: string;
  lastName: string;
  dateOfBirth: {
    year: string;
    month: string;
    day: string;
  };
  nationality: string;
  streetAddress: string;
  city: string;
  country: string;
  zipCode: string;
}

interface SellerIDVerificationFormProps {
  onSubmit: (data: FormData) => void;
  onNext: () => void;
}

export default function SellerIDVerificationForm({ onSubmit, onNext }: SellerIDVerificationFormProps) {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    dateOfBirth: {
      year: "",
      month: "",
      day: "",
    },
    nationality: "",
    streetAddress: "",
    city: "",
    country: "",
    zipCode: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name.startsWith("dateOfBirth")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        dateOfBirth: {
          ...prev.dateOfBirth,
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Submit data to parent component
    onSubmit(formData);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      onNext();
    }, 1000);
  };

  return (
    <div className="bg-gray-800 rounded-xl shadow-2xl w-2xl max-w-xl p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-center mb-6">
        <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
        <h1 className="text-xl font-bold text-white">Seller ID Verification</h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col items-start space-y-2">
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            First name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter first name"
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div className="flex flex-col items-start space-y-2">
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Last name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter last name"
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label
            htmlFor="dateOfBirth"
            className="block text-sm text-left font-medium text-gray-300 mb-1"
          >
            Date of birth:
          </label>
          <div className="grid grid-cols-3 gap-2 w-full">
            <div className="flex flex-col items-start space-y-2 w-full">
              <div className="relative w-full">
                <select
                  id="dateOfBirth.year"
                  name="dateOfBirth.year"
                  value={formData.dateOfBirth.year}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none pr-10"
                  required
                >
                  <option value="">Year</option>
                  {Array.from(
                    { length: 100 },
                    (_, i) => new Date().getFullYear() - i
                  ).map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div className="flex flex-col items-start space-y-2 w-full">
              <div className="relative w-full">
                <select
                  id="dateOfBirth.month"
                  name="dateOfBirth.month"
                  value={formData.dateOfBirth.month}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none pr-10"
                  required
                >
                  <option value="">Month</option>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                    <option key={month} value={month}>
                      {new Date(0, month - 1).toLocaleString("default", {
                        month: "short",
                      })}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div className="flex flex-col items-start space-y-2 w-full">
              <div className="relative w-full">
                <select
                  id="dateOfBirth.day"
                  name="dateOfBirth.day"
                  value={formData.dateOfBirth.day}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none pr-10"
                  required
                >
                  <option value="">Day</option>
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start space-y-2">
          <label
            htmlFor="nationality"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Nationality:
          </label>
          <div className="relative w-full">
            <select
              id="nationality"
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none pr-10"
              required
            >
              <option value="">Nationality</option>
              <option value="us">United States</option>
              <option value="ca">Canada</option>
              <option value="uk">United Kingdom</option>
              <option value="au">Australia</option>
              <option value="de">Germany</option>
              <option value="fr">France</option>
              <option value="jp">Japan</option>
              <option value="cn">China</option>
              <option value="in">India</option>
              <option value="br">Brazil</option>
              {/* Add more countries as needed */}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div className="flex flex-col items-start space-y-2">
          <label
            htmlFor="streetAddress"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Street address
          </label>
          <input
            type="text"
            id="streetAddress"
            name="streetAddress"
            value={formData.streetAddress}
            onChange={handleChange}
            placeholder="Street address"
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div className="flex flex-col items-start space-y-2">
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div className="flex flex-col items-start space-y-2">
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Country
          </label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="Country"
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div className="flex flex-col items-start space-y-2">
          <label
            htmlFor="zipCode"
            className="block text-sm font-medium text-gray-300 mb-1"
          >
            Zip code
          </label>
          <input
            type="text"
            id="zipCode"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            placeholder="Zip code"
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2.5 px-4 rounded-lg font-medium text-white transition-all duration-200 ${
            isSubmitting
              ? "bg-red-600 opacity-80 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700 active:bg-red-800"
          }`}
        >
          {isSubmitting ? "Verifying..." : "Next"}
        </button>
      </form>
    </div>
  );
}
