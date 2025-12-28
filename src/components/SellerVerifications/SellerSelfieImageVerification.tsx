"use client";

import { useState, useRef } from "react";
import { CheckCircle, X, Image } from "lucide-react";

interface SellerSelfieImageVerificationProps {
  onSubmit: (image: string | null) => void;
  onSubmitAll: () => void;
}

export default function SellerSelfieImageVerification({ onSubmit, onSubmitAll }: SellerSelfieImageVerificationProps) {
  const [image, setImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    setImage: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (
    setImage: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    setImage(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate that the image is uploaded
    if (!image) {
      alert("Please upload a selfie with your ID");
      setIsSubmitting(false);
      return;
    }

    // Submit image to parent component
    onSubmit(image);

    // Submit all verification data
    setTimeout(() => {
      console.log("Selfie image:", image);
      setIsSubmitting(false);
      onSubmitAll(); // Move to review step
      // Here you would typically handle the actual verification logic
    }, 1000);
  };

  const handleImageClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="bg-[#282836F0] rounded-xl shadow-2xl w-full max-w-md p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center mb-6 justify-center">
        <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
        <h1 className="text-xl font-bold text-white">
          Seller Selfie Verification
        </h1>
      </div>

      {/* Instructions */}
      <div className="mb-6">
        <p className="text-lg text-gray-300 mb-2 text-center">
          Take a selfie with your ID
        </p>

        {/* Image Upload Section */}
        <div className="flex justify-center mb-6">
          <div className="relative w-full max-w-xs">
            <div
              className={`border-2 border-dashed rounded-lg p-6 cursor-pointer transition-all flex items-center justify-center ${
                image
                  ? "border-green-500 bg-green-900/20"
                  : "border-gray-600 hover:border-gray-500"
              }`}
              onClick={handleImageClick}
            >
              {image ? (
                <div className="relative w-full">
                  <img
                    src={image}
                    alt="Selfie with ID"
                    className="w-full h-64 object-cover rounded"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveImage(setImage);
                    }}
                    className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <Image className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                  <p className="text-sm text-gray-400">
                    Click to upload selfie with ID
                  </p>
                </div>
              )}
            </div>
            <input
              ref={inputRef}
              type="file"
              accept="image/jpeg,image/png,image/gif"
              onChange={(e) => handleImageUpload(e, setImage)}
              className="hidden"
            />
          </div>
        </div>

        {/* Notes */}
        <div className="bg-gray-700 rounded-lg p-4 mb-4">
          <p className="text-xs text-gray-300 mb-2">
            • Please upload a photo where you are holding your ID next to your
            face.
          </p>
          <p className="text-xs text-gray-300">
            • Both your face and ID document must be clearly visible.
          </p>
        </div>
      </div>

      {/* Submit Button */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <button
          type="submit"
          disabled={isSubmitting || !image}
          className={`w-full py-2.5 px-4 rounded-lg font-medium text-white transition-all duration-200 ${
            isSubmitting || !image
              ? "bg-red-600 opacity-80 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700 active:bg-red-800"
          }`}
        >
          {isSubmitting ? "Verifying..." : "Submit Verification"}
        </button>
      </form>
    </div>
  );
}
