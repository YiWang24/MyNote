import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const protectedPaths = ["/notes"];

const publicPaths = ["/auth"];

export default async function middleware(request) {
  const { pathname } = request.nextUrl;

  if (publicPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const isProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );

  if (isProtectedPath) {
    const token = await getToken({
      req: request,
      secret: process.env.AUTH_SECRET,
    });

    // Check token expiration
    console.log(token);
    if (!token || token.exp < Math.floor(Date.now() / 1000)) {
      const signInUrl = new URL("/auth?type=login", request.url);
      signInUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(signInUrl);
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
