import Logo from "@/src/Assets/Landing/logo.png";
import { selectCurrentUser } from "@/src/redux/features/auth/authSlice";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";

function Header() {
  const user = useSelector(selectCurrentUser);
  return (
    <div className="w-full bg-[#282836]/90 h-fit flex items-center sticky top-0 z-50">
      <nav className="md:container mx-auto flex justify-between items-center px-4">
        {/* Left Section */}
        <div className="flex items-center space-x-4 ">
          <Link href={"/"}>
            <div className="py-1">
              <Image
                src={Logo}
                height={150}
                width={150}
                className="w-[150px] h-[65px] object-center"
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
          {user ? (
            <Link
              href={user?.role == "seller" ? "/sellerboosting" : "/boosting"}
              className="bg-red-500 text-white  px-4 py-2 rounded"
            >
              <span className="text-white">Dashboard</span>
            </Link>
          ) : (
            <Link
              href={"/login"}
              className="bg-red-500 text-white  px-4 py-2 rounded"
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
