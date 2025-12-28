"use client";

interface CancelRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function CancelBoostingRequestModal({
  isOpen,
  onClose,
  onConfirm,
}: CancelRequestModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#00000046] bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md border border-blue-500">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold">Cancel boosting request</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg
              className="w-6 h-6"
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
          </button>
        </div>

        <p className="text-gray-300 mb-6">
          Are you sure you want to cancel this boosting request?
        </p>

        <div className="flex space-x-4">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-md transition-colors"
          >
            Back
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition-colors"
          >
            Cancel request
          </button>
        </div>
      </div>
    </div>
  );
}
