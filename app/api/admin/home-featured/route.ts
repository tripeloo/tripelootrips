import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { getHomeFeaturedConfig, upsertHomeFeaturedConfig } from "@/lib/repositories/homeFeaturedRepository";

export async function GET(request: Request) {
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const config = await getHomeFeaturedConfig();
  return NextResponse.json(config);
}

export async function PUT(request: Request) {
  if (!(await isAdminRequest(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const section1Slugs = Array.isArray(body.section1Slugs)
      ? body.section1Slugs.map((s: unknown) => String(s).toLowerCase().trim()).filter(Boolean)
      : undefined;
    const section2Slugs = Array.isArray(body.section2Slugs)
      ? body.section2Slugs.map((s: unknown) => String(s).toLowerCase().trim()).filter(Boolean)
      : undefined;
    const section1Title =
      body.section1Title != null ? String(body.section1Title).trim() : undefined;
    const section2Title =
      body.section2Title != null ? String(body.section2Title).trim() : undefined;

    await upsertHomeFeaturedConfig({
      ...(section1Slugs !== undefined ? { section1Slugs } : {}),
      ...(section2Slugs !== undefined ? { section2Slugs } : {}),
      ...(section1Title !== undefined ? { section1Title } : {}),
      ...(section2Title !== undefined ? { section2Title } : {}),
    });
    const config = await getHomeFeaturedConfig();
    return NextResponse.json(config);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
