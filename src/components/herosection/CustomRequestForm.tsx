import React from "react";
import herobg from "@/src/Assets/Landing/herobg.png";

interface CustomRequestFormProps {
  customRequest: string;
  setCustomRequest: (request: string) => void;
}

const CustomRequestForm: React.FC<CustomRequestFormProps> = ({
  customRequest,
  setCustomRequest,
}) => {
  return (
    <div
      className="w-full p-4 sm:p-6 bg-no-repeat bg-cover rounded-md relative"
      style={{ backgroundImage: `url(${herobg.src})` }}
    >
      <div className="rounded-lg p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-bold mb-2">Custom Request</h3>
        <p className="text-xs sm:text-sm text-gray-400 mb-4">
          Unable to locate what you are looking for exactly? Simply describe
          boosting related to our services and let our pro team handle the rest
          for you!
        </p>
        <div className="mb-4">
          <label className="block text-xs sm:text-sm text-gray-400 mb-2">
            Game Service
          </label>
          <select className="w-full bg-[#282836] border border-gray-600 rounded px-3 py-2 text-white text-sm">
            <option>League of Legends</option>
          </select>
        </div>
        <div>
          <label className="block text-xs sm:text-sm text-gray-400 mb-2">
            Request description
          </label>
          <textarea
            value={customRequest}
            onChange={(e) => setCustomRequest(e.target.value)}
            className="w-full bg-[#282836] border border-gray-600 rounded px-3 py-2 text-white h-24 sm:h-32 resize-none text-sm"
            placeholder="I need some level..."
          />
        </div>
      </div>
    </div>
  );
};

export default CustomRequestForm;
