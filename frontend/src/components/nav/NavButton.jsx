import Link from "next/link";
import { auth } from "@/auth";
import LogoutButton from "../auth/LogoutButton";

const NavButton = async () => {
  const session = await auth();
  let isLoggedIn = false;
  if (session?.user) {
    isLoggedIn = true;
  }

  return (
    <>
      {!isLoggedIn && (
        <div className="sm:flex sm:gap-4">
          <Link
            className="rounded-md bg-[#d5688a] px-5 py-2.5 text-sm font-medium text-white shadow cursor-pointer  hover:bg-pink-600 hover:shadow-lg transition duration-300"
            href="/auth?type=login"
          >
            Login
          </Link>

          <div className="hidden sm:flex">
            <Link
              className="rounded-md bg-[#c7ddea] px-5 py-2.5 text-sm font-medium text-black cursor-pointer hover:bg-gray-200 hover:text-teal-700 hover:shadow-md transition duration-300"
              href="/auth?type=register"
            >
              Register
            </Link>
          </div>
        </div>
      )}
      {isLoggedIn && (
        <div className="sm:flex sm:gap-4">
          <div className="hidden sm:flex">
            <LogoutButton />
          </div>
        </div>
      )}
    </>
  );
};

export default NavButton;
