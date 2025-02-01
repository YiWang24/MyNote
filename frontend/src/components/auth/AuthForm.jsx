"use client";
import React, { useActionState, useEffect } from "react";
import Divider from "../ui/Divider";
import { faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";
import LoginButton from "./LoginButton";
import { githubLogin, googleLogin } from "@/lib/actions/auth";
import Link from "next/link";
import { authAction } from "@/actions/auth";
import { toast } from "react-hot-toast";

const AuthForm = ({ type }) => {
  const [formState, formAction, isPending] = useActionState(
    authAction.bind(null, type),
    {
      errors: [],
    }
  );

  useEffect(() => {
    if (formState.errors?.length > 0) {
      toast.error(formState.errors[0]);
    }
  }, [formState.errors]);

  return (
    <>
      <form
        action={formAction}
        className="mt-8 grid grid-cols-6 gap-6 "
        key={type}
      >
        {type === "register" && (
          <>
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="FirstName"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>

              <input
                type="text"
                id="FirstName"
                name="first_name"
                className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                defaultValue={formState.enteredValues?.first_name}
              />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="LastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>

              <input
                type="text"
                id="LastName"
                name="last_name"
                className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                defaultValue={formState.enteredValues?.last_name}
              />
            </div>
          </>
        )}
        <div className="col-span-6">
          <label
            htmlFor="Email"
            className="block text-sm font-medium text-gray-700"
          >
            Email{" "}
          </label>

          <input
            type="email"
            id="Email"
            name="email"
            className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            defaultValue={formState.enteredValues?.email}
          />
        </div>

        <div className={`col-span-6 ${type === "register" && "sm:col-span-3"}`}>
          <label
            htmlFor="Password"
            className="block text-sm font-medium text-gray-700"
          >
            Password{" "}
          </label>

          <input
            type="password"
            id="Password"
            name="password"
            className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
          />
        </div>
        {type === "register" && (
          <>
            <div className="col-span-6 sm:col-span-3">
              <label
                htmlFor="PasswordConfirmation"
                className="block text-sm font-medium text-gray-700"
              >
                Password Confirmation
              </label>

              <input
                type="password"
                id="PasswordConfirmation"
                name="password_confirmation"
                className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
              />
            </div>

            <div className="col-span-6">
              <label htmlFor="MarketingAccept" className="flex gap-4">
                <input
                  type="checkbox"
                  id="MarketingAccept"
                  name="marketing_accept"
                  className="size-5 rounded-md border-gray-200 bg-white shadow-sm"
                />

                <span className="text-sm text-gray-700">
                  I want to receive emails about events, product updates and
                  company announcements.
                </span>
              </label>
            </div>
          </>
        )}

        <div className="col-span-6">
          <p className="text-sm text-gray-500">
            By{" "}
            {type === "login" ? "log in your account" : "creating an account"},
            you agree to our{" "}
            <Link href="#" className="text-gray-700 underline">
              terms and conditions{" "}
            </Link>
            and{" "}
            <Link href="#" className="text-gray-700 underline">
              privacy policy
            </Link>
            .
          </p>
        </div>

        <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
          <button
            className={`inline-block shrink-0 rounded-md border border-[#df92a0] bg-[#df92a0] px-12 py-3 text-sm font-medium text-white transition hover:bg-[#cc9085] hover:text-black focus:outline-none focus:ring active:text-blue-500  
           }`}
            type="submit"
            disabled={isPending}
          >
            {type === "login" ? "Log in" : "Create an account"}
          </button>

          <p className="mt-4 text-sm text-gray-500 sm:mt-0">
            {type === "login"
              ? "Don't have an account?"
              : "Already have an account?"}
            <Link
              href={
                type === "login" ? "/auth?type=register" : "/auth?type=login"
              }
              className="text-gray-700 underline"
            >
              {type === "login" ? "Sign up" : "Log in"}
            </Link>
            .
          </p>
        </div>
      </form>

      <Divider text="or continue with" />
      <div className="flex flex-row justify-evenly gap-4 mt-6 px-4">
        <LoginButton icon={faGithub} login={githubLogin} type="GitHub" />
        <LoginButton icon={faGoogle} login={googleLogin} type="Google" />
      </div>
    </>
  );
};

export default AuthForm;
