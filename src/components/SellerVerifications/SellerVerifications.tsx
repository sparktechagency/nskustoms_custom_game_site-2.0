"use client";
import React, { useState } from "react";
import { VerifiedIcon } from "lucide-react";
import SellerIDVerificationForm from "./SellerIDVerificationForm";
import SellerIDImageVerifications from "./SellerIDImageVerifications";
import SellerSelfieImageVerification from "./SellerSelfieImageVerification";
import AccountReviewInProgress from "./AccountReviewInProgress";

type Step =
  | "sellerType"
  | "sellingCategory"
  | "idForm"
  | "idImages"
  | "selfie"
  | "review";

interface FormData {
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

interface VerificationData {
  sellerType: string | null;
  sellingCategory: string | null;
  formData: FormData | null;
  idImages: {
    frontImage: string | null;
    backImage: string | null;
  } | null;
  selfieImage: string | null;
}

const SellerVerificationsPage = () => {
  const [currentStep, setCurrentStep] = useState<Step>("sellerType");
  const [verificationData, setVerificationData] = useState<VerificationData>({
    sellerType: null,
    sellingCategory: null,
    formData: null,
    idImages: null,
    selfieImage: null,
  });

  const handleSellerTypeSelect = (type: string) => {
    setVerificationData((prev) => ({
      ...prev,
      sellerType: type,
    }));
  };

  const handleSellingCategorySelect = (category: string) => {
    setVerificationData((prev) => ({
      ...prev,
      sellingCategory: category,
    }));
  };

  const handleFormSubmit = (data: FormData) => {
    setVerificationData((prev) => ({
      ...prev,
      formData: data,
    }));
  };

  const handleIdImagesSubmit = (
    frontImage: string | null,
    backImage: string | null
  ) => {
    setVerificationData((prev) => ({
      ...prev,
      idImages: { frontImage, backImage },
    }));
  };

  const handleSelfieSubmit = (image: string | null) => {
    setVerificationData((prev) => ({
      ...prev,
      selfieImage: image,
    }));
  };

  const handleSubmitAll = () => {
    console.log("All verification data:", verificationData);
    setCurrentStep("review");
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case "sellerType":
        return (
          <SellerType
            onSelect={handleSellerTypeSelect}
            onNext={() => setCurrentStep("sellingCategory")}
          />
        );
      case "sellingCategory":
        return (
          <SellingCategory
            onSelect={handleSellingCategorySelect}
            onNext={() => setCurrentStep("idForm")}
          />
        );
      case "idForm":
        return (
          <SellerIDVerificationForm
            onSubmit={handleFormSubmit}
            onNext={() => setCurrentStep("idImages")}
          />
        );
      case "idImages":
        return (
          <SellerIDImageVerifications
            onSubmit={handleIdImagesSubmit}
            onNext={() => setCurrentStep("selfie")}
          />
        );
      case "selfie":
        return (
          <SellerSelfieImageVerification
            onSubmit={handleSelfieSubmit}
            onSubmitAll={handleSubmitAll}
          />
        );
      case "review":
        return <AccountReviewInProgress />;
      default:
        return (
          <SellerType
            onSelect={handleSellerTypeSelect}
            onNext={() => setCurrentStep("sellingCategory")}
          />
        );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      {renderCurrentStep()}
    </div>
  );
};

export default SellerVerificationsPage;

interface SellerTypeProps {
  onSelect: (type: string) => void;
  onNext: () => void;
}

const SellerType: React.FC<SellerTypeProps> = ({ onSelect, onNext }) => {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
    onSelect(type);
  };

  const handleNext = () => {
    if (selectedType) {
      onNext();
    } else {
      alert("Please select a seller type");
    }
  };

  return (
    <div className="bg-[#282836F0] px-20 py-6 rounded-xl space-y-4">
      {/* top section */}
      <div className="flex flex-col space-y-4 items-center justify-center">
        <div className="flex items-center space-x-1">
          {/* verified Icons */}
          <VerifiedIcon className="h-4 text-green-600" />
          <h2 className="text-green-600 text-sm font-semibold">
            Seller ID Verification
          </h2>
        </div>
        <p className="text-sm">Select your seller type on Auraboost :</p>
      </div>
      {/* bottom section */}
      <div className="flex items-center space-x-4">
        <button
          className={`cursor-pointer px-8 py-2 ${
            selectedType === "individual" ? "bg-[#AC2212]" : "bg-[#A3A3A31A]"
          } text-sm`}
          onClick={() => handleTypeSelect("individual")}
        >
          Individual
        </button>
        <button
          className={`cursor-pointer px-8 py-2 rounded- ${
            selectedType === "company" ? "bg-[#AC2212]" : "bg-[#A3A3A31A]"
          } text-white text-sm font-normal`}
          onClick={() => handleTypeSelect("company")}
        >
          Company
        </button>
      </div>
      {/* button */}
      <div>
        <button
          className="cursor-pointer px-8 py-2 bg-[#AC2212] text-sm"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

interface SellingCategoryProps {
  onSelect: (category: string) => void;
  onNext: () => void;
}

const SellingCategory: React.FC<SellingCategoryProps> = ({
  onSelect,
  onNext,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    onSelect(category);
  };

  const handleNext = () => {
    if (selectedCategory) {
      onNext();
    } else {
      alert("Please select a selling category");
    }
  };

  return (
    <div className="bg-[#282836F0] px-20 py-6 rounded-xl space-y-4">
      {/* top section */}
      <div className="flex flex-col space-y-4 items-center justify-center">
        <div className="flex items-center space-x-1">
          {/* verified Icons */}
          <VerifiedIcon className="h-4 text-green-600" />
          <h2 className="text-green-600 text-sm font-semibold">
            Seller ID Verification
          </h2>
        </div>
        <p className="text-sm">Confirm your selling category :</p>
      </div>
      {/* bottom section */}
      <div className="">
        <button
          className={`cursor-pointer px-8 py-2 rounded- ${
            selectedCategory === "games" ? "bg-[#AC2212]" : "bg-[#A3A3A31A]"
          } text-white text-sm font-normal`}
          onClick={() => handleCategorySelect("games")}
        >
          Boosting
        </button>
      </div>
      {/* button */}
      <div>
        <button
          className="cursor-pointer px-12 py-2 bg-[#AC2212] text-sm"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};
