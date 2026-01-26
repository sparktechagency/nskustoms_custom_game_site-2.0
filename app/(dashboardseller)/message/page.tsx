import { Suspense } from "react";
import MessageClient from "./MessageClient";

export const dynamic = "force-dynamic";

const Page = () => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-96">
          <div className="text-gray-400">Loading messages...</div>
        </div>
      }
    >
      <MessageClient />
    </Suspense>
  );
};

export default Page;
