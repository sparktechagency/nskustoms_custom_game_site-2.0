"use client";

import { useState } from "react";

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqItems = [
    {
      question: "How does Auraboost work?",
      answer:
        "Auraboost connects you with experienced boosters who will play on your account to improve your rank. We handle all communication and ensure your account's security throughout the process.",
    },
    {
      question: "Is Auraboost safe?",
      answer:
        "Yes, we prioritize your account's safety. All our boosters are vetted professionals who follow strict security protocols. We also offer a money-back guarantee for added peace of mind.",
    },
    {
      question: "What if I have shared some of my documents marked?",
      answer:
        "If you've shared sensitive information, contact our support team immediately. We can help you secure your account and provide guidance on next steps.",
    },
    {
      question: "How long does Auraboost take?",
      answer:
        "The time varies depending on your starting rank and desired rank. Most boosts take between 24-72 hours, but we provide estimated completion times when you place your order.",
    },
    {
      question: "How long will the boosting last?",
      answer:
        "Once your boost is complete, you'll maintain your new rank until you play games that affect your ranking. Our boosters ensure you reach your target rank safely and efficiently.",
    },
    {
      question: "Do I need to share my account for the Auraboost service?",
      answer:
        "Yes, you'll need to provide temporary access to your account. We use secure methods to protect your credentials, and our boosters never share or store your login information.",
    },
    {
      question: "When can I track the progress of the Auraboost?",
      answer:
        "You can track your boost progress through our dashboard. We also provide regular updates via email and in-app notifications to keep you informed at every step.",
    },
    {
      question: "Can I play on my account while boosting is in progress?",
      answer:
        "We strongly advise against playing during the boosting process as it may interfere with the booster's strategy and potentially lead to account issues or delays.",
    },
    {
      question: "How do I know that my account won't get banned?",
      answer:
        "Our boosters follow Riot Games' terms of service guidelines to minimize risk. While we can't guarantee against bans (as they're ultimately controlled by Riot), we've maintained an excellent safety record.",
    },
  ];

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-white">FAQ</h2>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="bg-[#282836] rounded-lg p-6 cursor-pointer text-white transition-all duration-300"
              onClick={() => toggleAccordion(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-white">{item.question}</h3>
                <span className="text-xl text-white">
                  {activeIndex === index ? "−" : "+"}
                </span>
              </div>

              {activeIndex === index && (
                <div className="mt-4 text-white pt-4 border-t border-gray-600 animate-fadeIn">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
