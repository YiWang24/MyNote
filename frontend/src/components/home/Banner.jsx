import Link from "next/link";
import React from "react";
import { TypingAnimation } from "../ui/typing-animation";
import { VelocityScroll } from "../ui/scroll-based-velocity";
import { AuroraText } from "../ui/aurora-text";
import { LineShadowText } from "../ui/line-shadow-text";
const Banner = () => {
  return (
    <section className="relative bg-[url('/mainColor.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-gray-900/75 sm:bg-transparent sm:from-gray-900/95 sm:to-gray-900/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"></div>

      <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
        <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
          <h1 className="text-3xl font-extrabold text-white sm:text-5xl">
            Capture Ideas{" "}
            <TypingAnimation className={"s-pink"}>
              Shape Your Future
            </TypingAnimation>
            <strong className="block font-extrabold text-rose-500">
              with Sinu Note.
            </strong>
          </h1>

          <p className="mt-4 max-w-lg text-white sm:text-xl/relaxed ">
            Transform your thoughts into organized clarity. Start your journey
            with Sinu Note - where ideas come to life and knowledge finds its
            home.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 text-center">
            <Link
              href="/notes"
              className="block w-full rounded bg-rose-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
            >
              Get Started
            </Link>

            <Link
              href="/chatgpt"
              className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-rose-600 shadow hover:text-rose-700 focus:outline-none focus:ring active:text-rose-500 sm:w-auto"
            >
              Chat GPT
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
