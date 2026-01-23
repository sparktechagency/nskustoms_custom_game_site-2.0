"use client";

import { useState, useRef } from "react";
import { CheckCircle, X, Image, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { SellerTypes, SellerCategories } from "./SellerVerifications";

interface FormDataType {
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

type SellerTypeValue = (typeof SellerTypes)[keyof typeof SellerTypes];
type SellerCategoryValue =
  (typeof SellerCategories)[keyof typeof SellerCategories];

interface VerificationData {
  sellerType: SellerTypeValue | null;
  sellingCategory: SellerCategoryValue | null;
  formData: FormDataType | null;
  idImages: {
    frontImage: File | null;
    backImage: File | null;
  } | null;
  selfieImage: File | null;
}

interface SellerSelfieImageVerificationProps {
  onSubmit: (image: File | null) => void;
  verificationData: VerificationData;
  applyVerification: ReturnType<
    typeof import("@/src/redux/features/become-seller/becomeSellerApi").useApplyBecomeSellerMutation
  >[0];
  onSuccess: () => void;
}

interface ValidationError {
  path: string;
  message: string;
}

interface ApiError {
  status: number;
  data: {
    errors: ValidationError[];
  };
}

export default function SellerSelfieImageVerification({
  onSubmit,
  verificationData,
  applyVerification,
  onSuccess,
}: SellerSelfieImageVerificationProps) {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate that the image is uploaded
    if (!image) {
      toast.error("Please upload a selfie with your ID");
      setIsSubmitting(false);
      return;
    }

    // Validate all required data
    if (
      !verificationData.sellerType ||
      !verificationData.sellingCategory ||
      !verificationData.formData ||
      !verificationData.idImages?.frontImage ||
      !verificationData.idImages?.backImage
    ) {
      toast.error("Missing required verification data");
      setIsSubmitting(false);
      return;
    }

    // Submit image to parent component
    onSubmit(image);

    // Create FormData
    const formData = new FormData();
    formData.append("sellerType", verificationData.sellerType);
    formData.append("sellingCategory", verificationData.sellingCategory);
    formData.append("firstName", verificationData.formData.firstName);
    formData.append("lastName", verificationData.formData.lastName);
    formData.append("birthYear", verificationData.formData.dateOfBirth.year);
    formData.append("birthMonth", verificationData.formData.dateOfBirth.month);
    formData.append("birthDay", verificationData.formData.dateOfBirth.day);
    formData.append("nationality", verificationData.formData.nationality);
    formData.append("streetAddress", verificationData.formData.streetAddress);
    formData.append("city", verificationData.formData.city);
    formData.append("country", verificationData.formData.country);
    formData.append("zipCode", verificationData.formData.zipCode);
    formData.append("frontId", verificationData.idImages.frontImage);
    formData.append("backId", verificationData.idImages.backImage);
    formData.append("selfieWithId", image);

    try {
      setErrors([]);
      await applyVerification(formData).unwrap();
      toast.success("Verification submitted successfully!");
      onSuccess();
    } catch (error) {
      console.error("Verification failed:", error);
      const apiError = error as ApiError;
      if (apiError?.data?.errors && Array.isArray(apiError.data.errors)) {
        setErrors(apiError.data.errors);
        apiError.data.errors.forEach((err) => {
          toast.error(err.message);
        });
      } else {
        toast.error("Failed to submit verification. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
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
                preview
                  ? "border-green-500 bg-green-900/20"
                  : "border-gray-600 hover:border-gray-500"
              }`}
              onClick={handleImageClick}
            >
              {preview ? (
                <div className="relative w-full">
                  <img
                    src={preview}
                    alt="Selfie with ID"
                    className="w-full h-64 object-cover rounded"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveImage();
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
              onChange={handleImageUpload}
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

        {/* Validation Errors */}
        {errors.length > 0 && (
          <div className="bg-red-500/20 border border-red-500 rounded-lg p-4">
            <p className="text-red-400 text-sm font-medium mb-2">
              Please fix the following errors:
            </p>
            <ul className="list-disc list-inside space-y-1">
              {errors.map((error, index) => (
                <li key={index} className="text-red-300 text-xs">
                  <span className="font-medium capitalize">{error.path}:</span>{" "}
                  {error.message}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <button
          type="submit"
          disabled={isSubmitting || !image}
          className={`w-full py-2.5 px-4 rounded-lg font-medium text-white transition-all duration-200 flex items-center justify-center gap-2 ${
            isSubmitting || !image
              ? "bg-red-600 opacity-80 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700 active:bg-red-800"
          }`}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Verification"
          )}
        </button>
      </form>
    </div>
  );
}
