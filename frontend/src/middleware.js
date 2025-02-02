import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const protectedPaths = ["/notes"];

const publicPaths = ["/auth"];

export default async function middleware(request) {
  const { pathname } = request.nextUrl;

  if (protectedPaths.some((path) => pathname.startsWith(path))) {
    const token = await getToken({
      req: request,
      secret: process.env.AUTH_SECRET,
    });

    if (!token) {
      console.log("🔴 No token found, redirecting to login");
      return NextResponse.redirect(new URL("/auth?type=login", request.url));
    }

    if (token.exp < Math.floor(Date.now() / 1000)) {
      console.log("🟡 Token expired, redirecting to login");
      return NextResponse.redirect(new URL("/auth?type=login", request.url));
    }
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
