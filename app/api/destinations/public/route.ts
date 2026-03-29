import { NextResponse } from "next/server";
import { distinctDestinationSlugsWithPackages } from "@/lib/repositories/tourPackagesRepository";
import { listDestinationsWithPackageSlugs } from "@/lib/repositories/destinationsRepository";

export async function GET() {
  try {
    const slugs = await distinctDestinationSlugsWithPackages();
    const list = await listDestinationsWithPackageSlugs(slugs);
    return NextResponse.json(
      list.map((d) => ({
        slug: d.slug,
        name: d.name,
        coverImage: d.coverImage,
        location: d.location,
      }))
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to load destinations" }, { status: 500 });
  }
}
