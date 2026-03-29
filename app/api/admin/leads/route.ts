import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { listLeads } from "@/lib/repositories/leadsRepository";

export async function GET(request: Request) {
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const leads = await listLeads(500);
    return NextResponse.json(
      leads.map((l) => ({
        id: String(l._id),
        name: l.name,
        phone: l.phone,
        moreInfo: l.moreInfo,
        budget: l.budget,
        packageId: l.packageId,
        packageName: l.packageName,
        destinationSlug: l.destinationSlug,
        destinationName: l.destinationName,
        source: l.source,
        createdAt: l.createdAt,
      }))
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to load leads" }, { status: 500 });
  }
}
