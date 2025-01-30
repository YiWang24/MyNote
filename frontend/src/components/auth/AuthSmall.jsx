import React from "react";
import AuthForm from "./AuthForm";

const AuthSmall = ({ type, href }) => {
  return (
    <main className="flex  items-center justify-center  px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
      <div className=" max-w-xl    lg:max-w-3xl">
        <div className="relative -mt-16 block lg:hidden">
          <a
            className="inline-flex size-16 items-center justify-center rounded-full bg-white text-blue-600 sm:size-20"
            href={href}
          >
            <span className="sr-only">Home</span>

            <img src="/name.png" alt="logo" className="h-24 sm:h-26" />
          </a>

          <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl flex items-center gap-4">
            <span>Welcome to Notes</span>
            <img src="/bear.png" alt="bear" className="h-10 sm:h-12" />
          </h1>

          <p className=" leading-relaxed text-gray-500">
            Welcome to Notes, your personal note-taking app.
          </p>
        </div>

        <AuthForm type={type} />
      </div>
    </main>
  );
};

export default AuthSmall;
