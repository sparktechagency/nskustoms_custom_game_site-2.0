import React from "react";

interface AdditionalInfoProps {
  additionalInfo: string;
  setAdditionalInfo: (info: string) => void;
}

const AdditionalInfo: React.FC<AdditionalInfoProps> = ({
  additionalInfo,
  setAdditionalInfo,
}) => {
  return (
    <div className="p-4 border border-[#A3A3A380] rounded-md">
      <label className="block text-xs sm:text-sm text-gray-400 mb-2">
        Provide any additional information
      </label>
      <textarea
        value={additionalInfo}
        onChange={(e) => setAdditionalInfo(e.target.value)}
        className="w-full bg-[#282836] border-gray-600 rounded px-3 py-2 text-white h-12 resize-none text-sm"
        placeholder="e.g. I would prefer a booster who..."
      />
    </div>
  );
};

export default AdditionalInfo;