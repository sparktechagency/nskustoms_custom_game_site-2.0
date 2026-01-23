"use client";

import { useState, useRef } from "react";
import { CheckCircle, X, Image } from "lucide-react";

interface SellerIDImageVerificationsProps {
  onSubmit: (frontImage: File | null, backImage: File | null) => void;
  onNext: () => void;
}

export default function SellerIDImageVerifications({
  onSubmit,
  onNext,
}: SellerIDImageVerificationsProps) {
  const [frontImage, setFrontImage] = useState<File | null>(null);
  const [frontPreview, setFrontPreview] = useState<string | null>(null);
  const [backImage, setBackImage] = useState<File | null>(null);
  const [backPreview, setBackPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const frontInputRef = useRef<HTMLInputElement>(null);
  const backInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>,
    setPreview: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (
    setFile: React.Dispatch<React.SetStateAction<File | null>>,
    setPreview: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    setFile(null);
    setPreview(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate that both images are uploaded
    if (!frontImage || !backImage) {
      alert("Please upload both front and back images of your ID");
      setIsSubmitting(false);
      return;
    }

    // Submit images to parent component
    onSubmit(frontImage, backImage);

    setIsSubmitting(false);
    onNext(); // Move to next step
  };

  const handleFrontImageClick = () => {
    frontInputRef.current?.click();
  };

  const handleBackImageClick = () => {
    backInputRef.current?.click();
  };

  return (
    <div className="bg-[#282836F0] rounded-xl shadow-2xl w-full max-w-md p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center mb-6 justify-center">
        <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
        <h1 className="text-xl font-bold text-white">Seller ID Verification</h1>
      </div>

      {/* Instructions */}
      <div className="mb-6">
        <p className="text-sm text-gray-300 mb-2">
          Take a photo showing your ID and Auraboost in the background
        </p>

        {/* Image Upload Section */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Front Image */}
          <div className="relative">
            <div
              className={`border-2 border-dashed rounded-lg p-4 cursor-pointer transition-all ${
                frontPreview
                  ? "border-green-500 bg-green-900/20"
                  : "border-gray-600 hover:border-gray-500"
              }`}
              onClick={handleFrontImageClick}
            >
              {frontPreview ? (
                <div className="relative">
                  <img
                    src={frontPreview}
                    alt="Front ID"
                    className="w-full h-32 object-cover rounded"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveImage(setFrontImage, setFrontPreview);
                    }}
                    className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <Image className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-xs text-gray-400">Front ID</p>
                </div>
              )}
            </div>
            <input
              ref={frontInputRef}
              type="file"
              accept="image/jpeg,image/png,image/gif"
              onChange={(e) => handleImageUpload(e, setFrontImage, setFrontPreview)}
              className="hidden"
            />
          </div>

          {/* Back Image */}
          <div className="relative">
            <div
              className={`border-2 border-dashed rounded-lg p-4 cursor-pointer transition-all ${
                backPreview
                  ? "border-green-500 bg-green-900/20"
                  : "border-gray-600 hover:border-gray-500"
              }`}
              onClick={handleBackImageClick}
            >
              {backPreview ? (
                <div className="relative">
                  <img
                    src={backPreview}
                    alt="Back ID"
                    className="w-full h-32 object-cover rounded"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveImage(setBackImage, setBackPreview);
                    }}
                    className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <Image className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-xs text-gray-400">Back ID</p>
                </div>
              )}
            </div>
            <input
              ref={backInputRef}
              type="file"
              accept="image/jpeg,image/png,image/gif"
              onChange={(e) => handleImageUpload(e, setBackImage, setBackPreview)}
              className="hidden"
            />
          </div>
        </div>

        {/* Notes */}
        <div className="bg-gray-700 rounded-lg p-4 mb-4">
          <p className="text-xs text-gray-300 mb-2">
            • Accepted Documents: Driver{`'`}s license, government-issued ID,
            passport, or international student ID
          </p>
          <p className="text-xs text-gray-300">
            • Note: Please ensure all personal details on the document are
            clearly visible and easy to read.
          </p>
        </div>
      </div>

      {/* Submit Button */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <button
          type="submit"
          disabled={isSubmitting || !frontImage || !backImage}
          className={`w-full py-2.5 px-4 rounded-lg font-medium text-white transition-all duration-200 ${
            isSubmitting || !frontImage || !backImage
              ? "bg-red-600 opacity-80 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700 active:bg-red-800"
          }`}
        >
          Next
        </button>
      </form>
    </div>
  );
}
