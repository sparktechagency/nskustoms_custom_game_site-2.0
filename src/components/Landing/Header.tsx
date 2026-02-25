import Logo from "@/src/Assets/Landing/logo.png";
import { selectCurrentUser } from "@/src/redux/features/auth/authSlice";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";

function Header() {
  const user = useSelector(selectCurrentUser);
  return (
    <div className="w-full bg-[#282836]/90 h-fit flex items-center sticky top-0 z-50 backdrop-blur-sm">
      <nav className="w-full md:container mx-auto flex justify-between items-center px-3 sm:px-4 md:px-6 py-1">
        {/* Left Section */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          <Link href={"/"} className="shrink-0">
            <Image
              src={Logo}
              height={150}
              width={150}
              className="w-[100px] h-[44px] sm:w-[120px] sm:h-[52px] md:w-[150px] md:h-[65px] object-center"
              alt="Best Boosting Platform League of Legends Boosting"
            />
          </Link>
          <p className="hidden sm:block text-white text-[10px] sm:text-xs font-medium mt-4 sm:mt-5 md:mt-6 whitespace-nowrap">
            League of Legends Boosting
          </p>
        </div>

        {/* Right Section */}
        <div className="shrink-0">
          {user ? (
            <Link
              href={
                user?.role == "seller" ? "/seller/sellerboosting" : "/boosting"
              }
              className="bg-red-500 hover:bg-red-600 transition-colors text-white text-xs sm:text-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded"
            >
              <span className="text-white">Dashboard</span>
            </Link>
          ) : (
            <Link
              href={"/login"}
              className="bg-red-500 hover:bg-red-600 transition-colors text-white text-xs sm:text-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded"
            >
              <span className="text-white">Log in</span>
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Header;
