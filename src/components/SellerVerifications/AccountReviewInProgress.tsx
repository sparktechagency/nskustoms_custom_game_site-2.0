import Link from "next/link";
import React from "react";

function AccountReviewInProgress() {
  return (
    <div className="bg-[#282836F0] rounded-xl shadow-2xl w-full max-w-md p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center mb-6 justify-center">
        <h1 className="text-2xl font-bold text-green-500">
          Account review in progress
        </h1>
      </div>
      {/* middle  */}
      <div className="flex flex-col space-y-4 pb-8">
        <p className="text-lg">
          Your account review is currently being processed. You will receive a
          notification once the review is completed.
        </p>

        <span className="text-sm">Thank you for your patience!</span>
      </div>

      <Link href={"/"} className="text-sm font-semibold bg-[#AC2212] px-8 py-4">
        Back to home
      </Link>
    </div>
  );
}

export default AccountReviewInProgress;
