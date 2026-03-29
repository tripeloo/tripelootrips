import { cookies } from "next/headers";

const COOKIE = "tripeloo_admin";

export function getAdminToken(): string | undefined {
  return process.env.ADMIN_TOKEN;
}

export async function isAdminRequest(request: Request): Promise<boolean> {
  const token = getAdminToken();
  if (!token) return false;
  const auth = request.headers.get("authorization");
  if (auth === `Bearer ${token}`) return true;
  const url = new URL(request.url);
  if (url.searchParams.get("token") === token) return true;
  const jar = await cookies();
  if (jar.get(COOKIE)?.value === token) return true;
  return false;
}

export async function isAdminCookie(): Promise<boolean> {
  const token = getAdminToken();
  if (!token) return false;
  const jar = await cookies();
  return jar.get(COOKIE)?.value === token;
}

export function adminCookieName(): string {
  return COOKIE;
}
