import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE = "tripeloo_admin";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!pathname.startsWith("/admin") || pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }
  const token = process.env.ADMIN_TOKEN;
  if (!token) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
  const cookie = request.cookies.get(COOKIE)?.value;
  if (cookie !== token) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
