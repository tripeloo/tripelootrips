import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { listAllDestinations } from "@/lib/repositories/destinationsRepository";

export async function GET(request: Request) {
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const list = await listAllDestinations();
    return NextResponse.json(
      list.map((d) => ({
        slug: d.slug,
        name: d.name,
        isHidden: Boolean(d.isHidden),
      }))
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
