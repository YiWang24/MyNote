import { NextResponse } from "next/server";
import { getSession } from "./lib/getSession";
import { jwtDecode } from "jwt-decode";
import { signOut } from "@/auth";
const protectedPaths = ["/notes"];

export default async function middleware(request) {
  const { pathname } = request.nextUrl;
  const baseUrl = request.nextUrl.origin;

  if (protectedPaths.some((path) => pathname.startsWith(path))) {
    const session = await getSession();
    const token = session?.accessToken;

    if (!token) {
      console.log("🔴 No token found, redirecting to login");
      return NextResponse.redirect(new URL("/auth?type=login", baseUrl));
    }

    const { exp } = jwtDecode(token);
    const expiresAt = exp * 1000;

    if (Date.now() >= expiresAt) {
      await signOut({
        redirect: false,
      });
      localStorage.clear();
      return NextResponse.redirect(new URL("/auth?type=login", baseUrl));
    }

    // if (token.exp < Math.floor(Date.now() / 1000)) {
    //   console.log("🟡 Token expired, redirecting to login");
    //   return NextResponse.redirect(new URL("/auth?type=login", request.url));
    // }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     *
     * - api/auth/**
     * - _next/static
     * - _next/image
     * - favicon.ico
     */
    "/((?!api/auth|_next/static|_next/image|favicon.ico).*)",
  ],
};
