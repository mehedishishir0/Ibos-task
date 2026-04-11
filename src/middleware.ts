import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = req.nextUrl;
  const isAuthPage = pathname.startsWith("/login") 
  const isAdminRoute = pathname.startsWith("/dashboard");

  if (!token && (pathname === "/" || isAdminRoute)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token && isAuthPage) {
    if (token.role === "admin") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (isAdminRoute) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (token.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  }

  if (token && pathname === "/" && token.role === "admin") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/registration", "/dashboard/:path*"],
};