"use client";

import { useState } from "react";

export default function CommunitySection() {
  const reviews = [
    {
      id: 1,
      name: "David P.",
      date: "April 21",
      rating: 5,
      content:
        "This team did an amazing job. I was super happy with my boost. They were very responsive and kept me updated throughout the process.",
    },
    {
      id: 2,
      name: "Sarah M.",
      date: "May 15",
      rating: 5,
      content:
        "Always respond quickly. The booster was professional and very friendly. Really happy with the result!",
    },
    {
      id: 3,
      name: "John D.",
      date: "June 3",
      rating: 5,
      content:
        "Great boost! Got my rank up in no time. My account was never compromised and the support team was awesome.",
    },
    {
      id: 4,
      name: "Emma R.",
      date: "July 12",
      rating: 5,
      content:
        "The fastest boost I got so far. The staff was very helpful and answered all my questions promptly. Highly recommend!",
    },
  ];

  const [isPaused, setIsPaused] = useState(false);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-xl ${
          i < rating ? "text-yellow-400" : "text-gray-600"
        }`}
      >
        ★
      </span>
    ));
  };

  // Duplicate reviews for seamless loop
  const duplicatedReviews = [...reviews, ...reviews];

  return (
    <section className=" py-16 bg-gray-900 ">
      <div className="xl:container mx-auto overflow-hidden">
        <div className=" px-4 mb-4">
          <h2 className="text-4xl font-bold text-center text-white mb-2">
            Our Community
          </h2>
          <p className="text-center text-gray-400">
            See what our customers are saying
          </p>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className={`flex gap-6 ${isPaused ? "" : "animate-marquee"}`}>
            {duplicatedReviews.map((review, index) => (
              <div
                key={`${review.id}-${index}`}
                className="flex-shrink-0 w-80 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 hover:scale-105"
              >
                <div className="">
                  <div className="w-full flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-white block">
                        {review.name}
                      </span>
                    </div>
                    <div className="flex gap-1 ">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-300 leading-relaxed py-3">
                  {review.content}
                </p>
                <div className="flex justify-between items-center mt-2">
                  <div className=" border-t border-gray-700">
                    <span className="text-xs text-purple-400 font-semibold">
                      ✓ Verified Customer
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400">{review.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </section>
  );
}
