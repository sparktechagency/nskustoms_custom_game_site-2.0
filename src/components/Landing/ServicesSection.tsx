"use client";

export default function ServicesSection() {
  return (
    <section className="py-8 sm:py-12 md:py-16 bg-black">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 md:mb-8 text-white">
          League of Legends Boosting Services
        </h2>

        <div className="mb-5 sm:mb-8">
          <p className="text-sm sm:text-base text-white mb-3 sm:mb-4">
            League of Legends Aura Boosting helps you achieve your ranking goals
            by pairing you with highly skilled and discreet, fair, clean, hidden
            clients who have been professionally trained and tested.
          </p>

          <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 text-white">
            Boosting Services we provide:
          </h3>
          <ul className="ml-4 sm:ml-6 space-y-1.5 sm:space-y-2 text-sm sm:text-base text-white list-disc">
            <li>
              Rank Boost - Reach your desired rank (Solo Queue or Flex Queue)
            </li>
            <li>
              Placement - Complete placement matches to achieve a high estimate
            </li>
            <li>Win Rate - Win a set number of wins (wins are unranked)</li>
            <li>Client Shadow - Co-op play, spectating & specific requests</li>
          </ul>
        </div>

        <div className="mb-5 sm:mb-8">
          <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 text-white">
            Why Choose Auraboost?
          </h3>
          <ul className="ml-4 sm:ml-6 space-y-1.5 sm:space-y-2 text-sm sm:text-base text-white list-disc">
            <li>Expert team experience</li>
            <li>Play with experienced players</li>
            <li>Reliable 24/7 customer support</li>
            <li>Safe and secure service</li>
          </ul>
        </div>

        <div>
          <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 text-white">
            How it Works:
          </h3>
          <ul className="ml-4 sm:ml-6 space-y-1.5 sm:space-y-2 text-sm sm:text-base text-white list-disc">
            <li>Choose a boosting plan</li>
            <li>Select your rank target</li>
            <li>Make a payment and wait</li>
            <li>Enjoy a boosted rank and win rate!</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
