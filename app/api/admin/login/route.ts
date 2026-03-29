import { NextResponse } from "next/server";
import { adminCookieName, getAdminToken } from "@/lib/admin-auth";

export async function POST(request: Request) {
  const token = getAdminToken();
  if (!token) {
    return NextResponse.json({ error: "Admin not configured" }, { status: 503 });
  }
  const body = await request.json().catch(() => ({}));
  const secret = String(body.secret ?? "");
  if (secret !== token) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set(adminCookieName(), token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    secure: process.env.NODE_ENV === "production",
  });
  return res;
}
