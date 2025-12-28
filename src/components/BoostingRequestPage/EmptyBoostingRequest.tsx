// components/EmptyBoostingRequest.tsx
"use client";

import { useState, useEffect } from "react";

interface EmptyBoostingRequestProps {
  isOpen: boolean;
  onCreateRequest: () => void;
}

export default function EmptyBoostingRequest({
  isOpen,
  onCreateRequest,
}: EmptyBoostingRequestProps) {
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    setShowAnimation(isOpen);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className=" flex items-center justify-center z-50 p-4">
      <div
        className={`bg-gray-800 rounded-lg p-6 w-full h-[400px] flex flex-col justify-center transition-opacity duration-300 ${
          showAnimation ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex justify-center mb-6">
          <svg
            className="w-24 h-24 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        <p className="text-gray-300 text-center mb-6">
          Boosting request is canceled
        </p>

        <div className="flex justify-center">
          <button
            onClick={onCreateRequest}
            className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-md transition-colors"
          >
            Create a request
          </button>
        </div>
      </div>
    </div>
  );
}
