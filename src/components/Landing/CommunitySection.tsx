"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

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
  {
    id: 5,
    name: "Alex K.",
    date: "Aug 5",
    rating: 5,
    content:
      "Went from Gold to Diamond in just 3 days. Incredible service, super secure, and the booster was a beast. Will definitely use again.",
  },
  {
    id: 6,
    name: "Lisa W.",
    date: "Sep 18",
    rating: 5,
    content:
      "Best boosting experience I've ever had. The live tracking feature is a game changer. Felt safe the entire time.",
  },
];

const renderStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, i) => (
    <span
      key={i}
      className={`text-lg ${i < rating ? "text-yellow-400" : "text-gray-600"}`}
    >
      ★
    </span>
  ));
};

export default function CommunitySection() {
  return (
    <section className="py-16 bg-gray-900">
      <div className="xl:container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-bold text-white mb-2">Our Community</h2>
          <p className="text-gray-400">See what our customers are saying</p>
        </div>

        <div className="community-swiper">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            grabCursor={true}
            loop={true}
            speed={600}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            className="!pb-0"
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id}>
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
                        {review.name.charAt(0)}
                      </div>
                      <span className="font-semibold text-white">
                        {review.name}
                      </span>
                    </div>
                    <div className="flex gap-0.5">
                      {renderStars(review.rating)}
                    </div>
                  </div>

                  <p className="text-sm text-gray-300 leading-relaxed flex-1">
                    &ldquo;{review.content}&rdquo;
                  </p>

                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-700">
                    <span className="text-xs text-purple-400 font-semibold">
                      ✓ Verified Customer
                    </span>
                    <span className="text-xs text-gray-400">{review.date}</span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <style jsx global>{`
        .community-swiper .swiper-pagination {
          bottom: 0 !important;
          margin-top: 24px;
          position: relative;
        }
        .community-swiper .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: #4b5563;
          opacity: 0.5;
          transition: all 0.3s ease;
        }
        .community-swiper .swiper-pagination-bullet-active {
          background: #8b5cf6;
          opacity: 1;
          width: 28px;
          border-radius: 5px;
        }
      `}</style>
    </section>
  );
}
