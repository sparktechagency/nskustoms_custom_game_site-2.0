import { documentationData } from "@/src/data/documentation";

interface DocumentationContentProps {
  slug: string;
}

export default function DocumentationContent({
  slug,
}: DocumentationContentProps) {
  const doc = documentationData[slug];

  if (!doc) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold mb-4">Documentation Not Found</h2>
        <p>The requested documentation page could not be found.</p>
      </div>
    );
  }

  return (
    <div className="content-body">
      <h1 id="overview" className="text-3xl font-bold mb-3">
        {doc.title}
      </h1>
      <p className="text-[#A3A3A3] text-[15px] mb-8 leading-relaxed">
        {doc.description}
      </p>

      {doc.steps.map((step) => (
        <div key={step.number} className="step" id={`step-${step.number}`}>
          <h2 className="text-white text-[20px] font-bold mb-2">
            <span>Step {step.number}: </span>
            {step.title}
          </h2>
          <p className="mb-6 text-[16px] text-[#A3A3A3] leading-relaxed">
            {step.content}
          </p>
        </div>
      ))}
    </div>
  );
}
