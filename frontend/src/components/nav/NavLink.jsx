import React from "react";
import Link from "next/link";
const NavLink = () => {
  return (
    <div className="hidden md:block">
      <nav aria-label="Global">
        <ul className="flex items-center gap-6 text-sm">
          <li>
            <Link
              className="text-gray-500 transition hover:text-gray-500/75"
              href="/notes"
            >
              Note
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavLink;
