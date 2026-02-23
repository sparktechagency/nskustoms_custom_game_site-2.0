"use client";
import React, { useState } from "react";
import { VerifiedIcon } from "lucide-react";
import SellerIDVerificationForm from "./SellerIDVerificationForm";
import SellerIDImageVerifications from "./SellerIDImageVerifications";
import SellerSelfieImageVerification from "./SellerSelfieImageVerification";
import AccountReviewInProgress from "./AccountReviewInProgress";
import { useApplyBecomeSellerMutation } from "@/src/redux/features/become-seller/becomeSellerApi";

export const SellerTypes = {
  INDIVIDUAL: "individual",
  COMPANY: "company",
} as const;

export const SellerCategories = {
  BOOSTING: "boosting",
} as const;

type SellerTypeValue = (typeof SellerTypes)[keyof typeof SellerTypes];
type SellerCategoryValue =
  (typeof SellerCategories)[keyof typeof SellerCategories];

type Step =
  | "sellerType"
  | "sellingCategory"
  | "idForm"
  | "idImages"
  | "selfie"
  | "review";

interface FormDataType {
  firstName: string;
  lastName: string;
  dateOfBirth: {
    year: string;
    month: string;
    day: string;
  };
  streetAddress: string;
  city: string;
  country: string;
  zipCode: string;
  opGgAccounts: string;
}

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

const SellerVerificationsPage = () => {
  const [currentStep, setCurrentStep] = useState<Step>("sellerType");
  const [applyVerification] = useApplyBecomeSellerMutation();
  const [verificationData, setVerificationData] = useState<VerificationData>({
    sellerType: null,
    sellingCategory: null,
    formData: null,
    idImages: null,
    selfieImage: null,
  });

  const handleSellerTypeSelect = (type: SellerTypeValue) => {
    setVerificationData((prev) => ({
      ...prev,
      sellerType: type,
    }));
  };

  const handleSellingCategorySelect = (category: SellerCategoryValue) => {
    setVerificationData((prev) => ({
      ...prev,
      sellingCategory: category,
    }));
  };

  const handleFormSubmit = (data: FormDataType) => {
    setVerificationData((prev) => ({
      ...prev,
      formData: data,
    }));
  };

  const handleIdImagesSubmit = (
    frontImage: File | null,
    backImage: File | null,
  ) => {
    setVerificationData((prev) => ({
      ...prev,
      idImages: { frontImage, backImage },
    }));
  };

  const handleSelfieSubmit = (image: File | null) => {
    setVerificationData((prev) => ({
      ...prev,
      selfieImage: image,
    }));
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case "sellerType":
        return (
          <SellerTypeStep
            onSelect={handleSellerTypeSelect}
            onNext={() => setCurrentStep("sellingCategory")}
          />
        );
      case "sellingCategory":
        return (
          <SellingCategoryStep
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
            verificationData={verificationData}
            applyVerification={applyVerification}
            onSuccess={() => setCurrentStep("review")}
          />
        );
      case "review":
        return <AccountReviewInProgress />;
      default:
        return (
          <SellerTypeStep
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

type SellerTypeStepProps = {
  onSelect: (type: (typeof SellerTypes)[keyof typeof SellerTypes]) => void;
  onNext: () => void;
};

const SellerTypeStep: React.FC<SellerTypeStepProps> = ({ onSelect, onNext }) => {
  const [selectedType, setSelectedType] = useState<SellerTypeValue | null>(null);

  const handleTypeSelect = (type: SellerTypeValue) => {
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
            selectedType === SellerTypes.INDIVIDUAL ? "bg-[#AC2212]" : "bg-[#A3A3A31A]"
          } text-sm`}
          onClick={() => handleTypeSelect(SellerTypes.INDIVIDUAL)}
        >
          Individual
        </button>
        <button
          className={`cursor-pointer px-8 py-2 rounded- ${
            selectedType === SellerTypes.COMPANY ? "bg-[#AC2212]" : "bg-[#A3A3A31A]"
          } text-white text-sm font-normal`}
          onClick={() => handleTypeSelect(SellerTypes.COMPANY)}
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

type SellingCategoryStepProps = {
  onSelect: (category: (typeof SellerCategories)[keyof typeof SellerCategories]) => void;
  onNext: () => void;
};

const SellingCategoryStep: React.FC<SellingCategoryStepProps> = ({
  onSelect,
  onNext,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<SellerCategoryValue | null>(null);

  const handleCategorySelect = (category: SellerCategoryValue) => {
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
            selectedCategory === SellerCategories.BOOSTING ? "bg-[#AC2212]" : "bg-[#A3A3A31A]"
          } text-white text-sm font-normal`}
          onClick={() => handleCategorySelect(SellerCategories.BOOSTING)}
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
