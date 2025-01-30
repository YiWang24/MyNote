import { Logout } from "@/lib/actions/auth";
import React from "react";

const LogoutButton = () => {
  return (
    <form
      action={async () => {
        "use server";
        await Logout();
      }}
    >
      <button
        type="submit"
        className="rounded-md bg-red-400 px-5 py-2.5 text-sm font-medium text-white cursor-pointer hover:bg-red-500 hover:shadow-md hover:scale-105 transition duration-300"
      >
        Logout
      </button>
    </form>
  );
};

export default LogoutButton;
