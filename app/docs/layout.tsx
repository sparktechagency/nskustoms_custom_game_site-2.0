import React from "react";

const DocsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="min-h-screen bg-gray-900 text-white">
      <div className="md:container mx-auto px-4 py-6">{children}</div>
    </section>
  );
};

export default DocsLayout;
