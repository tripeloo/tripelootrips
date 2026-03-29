import { NextResponse } from "next/server";
import { insertLead } from "@/lib/repositories/leadsRepository";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const moreInfo = body.moreInfo != null ? String(body.moreInfo).trim() : undefined;
    const budget = body.budget != null ? String(body.budget).trim() : undefined;
    const packageId = body.packageId != null ? String(body.packageId).trim() : undefined;
    const packageName = body.packageName != null ? String(body.packageName).trim() : undefined;
    const destinationSlug =
      body.destinationSlug != null ? String(body.destinationSlug).trim() : undefined;
    const destinationName =
      body.destinationName != null ? String(body.destinationName).trim() : undefined;

    if (!name || !phone) {
      return NextResponse.json({ error: "Name and phone are required" }, { status: 400 });
    }

    await insertLead({
      name,
      phone,
      moreInfo: moreInfo || undefined,
      budget: budget || undefined,
      packageId: packageId || undefined,
      packageName: packageName || undefined,
      destinationSlug: destinationSlug || undefined,
      destinationName: destinationName || undefined,
      source: "callback_cta",
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to save lead" }, { status: 500 });
  }
}
