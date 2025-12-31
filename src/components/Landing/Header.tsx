import Logo from "@/src/Assets/Landing/logo.png";
import Image from "next/image";
import Link from "next/link";

function Header() {
  return (
    <div className="w-full bg-[#282836]/90 h-fit flex items-center sticky top-0 z-50">
      <nav className="md:container mx-auto flex justify-between items-center px-4">
        {/* Left Section */}
        <div className="flex items-center space-x-4 ">
          <Link href={"/"}>
            <div className="py-1">
              <Image
                src={Logo}
                height={100}
                width={100}
                className="w-[130px] h-[55px] object-center"
                alt="Best Boosting Platform League of Legends Boosting"
              />
            </div>
          </Link>
          <p className="text-white text-xs font-medium mt-6">
            League of Legends Boosting
          </p>
        </div>

        {/* Right Section */}
        <div>
          <Link
            href={"/login"}
            className="bg-red-500 text-white  px-4 py-2 rounded"
          >
            <span className="text-white">Log in</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Header;
