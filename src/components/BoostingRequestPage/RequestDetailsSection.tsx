"use client";

interface RequestDetailsSectionProps {
  details: RequestDetails;
}

interface RequestDetails {
  created: string;
  expires: string;
  currentRank: string;
  currentLP: number;
  queue: string;
  desiredRank: string;
  region: string;
  completionMethod: string;
}

export default function RequestDetailsSection({
  details,
}: RequestDetailsSectionProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4">Request Details</h2>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-400">Created:</span>
          <span>{details.created}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-400">Expires:</span>
          <span>{details.expires}</span>
        </div>

        <div className="pt-3 border-t border-gray-700">
          <div className="flex justify-between py-2">
            <span className="text-gray-400">Current rank:</span>
            <span>{details.currentRank}</span>
          </div>

          <div className="flex justify-between py-2">
            <span className="text-gray-400">Current LP:</span>
            <span>{details.currentLP}</span>
          </div>

          <div className="flex justify-between py-2">
            <span className="text-gray-400">Queue:</span>
            <span>{details.queue}</span>
          </div>

          <div className="flex justify-between py-2">
            <span className="text-gray-400">Desired rank:</span>
            <span>{details.desiredRank}</span>
          </div>

          <div className="flex justify-between py-2">
            <span className="text-gray-400">Region:</span>
            <span>{details.region}</span>
          </div>

          <div className="flex justify-between py-2">
            <span className="text-gray-400">Completion Method:</span>
            <span>{details.completionMethod}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
