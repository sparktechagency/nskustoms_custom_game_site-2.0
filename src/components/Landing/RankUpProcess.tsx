import rocket from "@/src/Assets/Landing/rocket.png";
import people from "@/src/Assets/Landing/people.png";
import wallet from "@/src/Assets/Landing/wallet.png";
import diamonds from "@/src/Assets/Landing/diamonds.png";
import Image from "next/image";

const RankUpProcess = () => {
  return (
    <div className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h2 className="text-2xl font-bold text-center mb-12">
          Effortless rank-up process
        </h2>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Step 1 */}
          <div
            className="flex flex-col items-center text-center"
            data-aos="zoom-in-up"
          >
            <div className="mb-4">
              <Image
                src={rocket}
                height={50}
                width={100}
                className="ml-auto"
                alt="Rocket Image For Ranked up Process"
              />
            </div>
            <h3 className="text-lg font-semibold mb-2">1. Select a service</h3>
            <p className="text-sm text-gray-400">
              Select the boosting service and customize it to fit your needs
            </p>
          </div>

          {/* Step 2 */}
          <div
            className="flex flex-col items-center text-center"
            data-aos="zoom-in-up"
          >
            <div className="mb-4">
              <Image
                src={people}
                height={50}
                width={100}
                className="ml-auto"
                alt="people Image For Ranked up Process"
              />
            </div>
            <h3 className="text-lg font-semibold mb-2">2. Choose an offer</h3>
            <p className="text-sm text-gray-400">
              Select the best offer from a top-rated seller
            </p>
          </div>

          {/* Step 3 */}
          <div
            className="flex flex-col items-center text-center"
            data-aos="zoom-in-up"
          >
            <div className="mb-4">
              <Image
                src={wallet}
                height={70}
                width={130}
                className="ml-auto"
                alt="wallet Image For Ranked up Process"
              />
            </div>
            <h3 className="text-lg font-semibold mb-2">3. Complete payment</h3>
            <p className="text-sm text-gray-400">
              Choose a convenient payment method
            </p>
          </div>

          {/* Step 4 */}
          <div
            className="flex flex-col items-center text-center"
            data-aos="zoom-in-up"
          >
            <div className="mb-4">
              <Image
                src={diamonds}
                height={50}
                width={100}
                className="ml-auto"
                alt="diamonds Image For Ranked up Process"
              />
            </div>
            <h3 className="text-lg font-semibold mb-2">4. Rank Up</h3>
            <p className="text-sm text-gray-400">
              Enjoy the rewards of a ranked account!
            </p>
          </div>
        </div>

        {/* Call to Action Button */}
        <div className="text-center">
          <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded transition-colors duration-300">
            Get offers now
          </button>
        </div>
      </div>
    </div>
  );
};

export default RankUpProcess;
