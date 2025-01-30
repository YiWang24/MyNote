"use server";
import { signIn, signOut } from "@/auth";
export const githubLogin = async () => {
  await signIn("github", { redirectTo: "/notes" });
};
export const googleLogin = async () => {
  await signIn("google", { redirectTo: "/notes" });
};
export const credentialsLogin = async (email,password) => {
  await signIn("credentials", {
    redirect: false,
    callbackUrl: "/notes",
    email,
    password,
  });
  
};
export const Logout = async () => {
  await signOut({ redirectTo: "/" });
};
