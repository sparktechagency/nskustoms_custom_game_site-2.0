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
      <h1 id="overview" className="text-3xl font-bold mb-6">
        {doc.title}
      </h1>

      {doc.steps.map((step) => (
        <div key={step.number} className="step" id={`step-${step.number}`}>
          <h2 className="text-white text-[20px] font-bold mb-2">
            <span>Step {step.number}: </span>
            {step.title}
          </h2>
          <p className="mb-4 text-[16px] text-[#A3A3A3]">{step.content}</p>
        </div>
      ))}

      {doc.securityTips && doc.securityTips.length > 0 && (
        <>
          <h2 id="security-tips" className="section-heading mt-8">
            Security Tips for Account Purchases
          </h2>
          {doc.securityTips.map((tip) => (
            <div key={tip.game} className="security-tip">
              <h3 className="security-tip-title">{tip.game}</h3>
              <p className="text-[16px] text-[#A3A3A3]">{tip.tips}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
