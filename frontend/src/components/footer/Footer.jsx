import React from "react";
import FooterLink from "./FooterLink";
import FooterMedia from "./FooterMedia";

const Footer = () => {
  return (
    
    <footer className="bg-gray-100  ">
      <div className="mx-auto max-w-5xl px-4 py-2 sm:px-6 lg:px-8">
        <div className="flex justify-center s-pink items-center gap-4 ">
          <img src="/navBear.png" alt="logo" className="w-12 h-12" />
          Sinu Note
        </div>

        <p className="mx-auto mt-4 max-w-md text-center leading-relaxed text-gray-500">
          Sinu Note is your personal note-taking app that helps you easily
          create, edit, and manage your notes. Sign in to get started and keep
          your thoughts organized!
        </p>

        <FooterLink />

        <FooterMedia />
      </div>

      <div className="border-t border-gray-100 pt-6">
        <p className="text-center text-xs/relaxed text-gray-500">
          SINU© Company 2025. All rights reserved.
          <br />
          Created By{" "}
          <a
            href="https://www.yiwang.run"
            className="text-gray-700 underline transition hover:text-gray-700/75"
          >
            Yi
          </a>{" "}
          ♥ Design By{" "}
          <a
            href="#"
            className="text-gray-700 underline transition hover:text-gray-700/75"
          >
            Sinu
          </a>
          .
        </p>
      </div>
    </footer>
  );
};

export default Footer;
