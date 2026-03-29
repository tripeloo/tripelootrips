import type { Collection, Filter } from "mongodb";
import { getDb } from "@/lib/mongodb";
import type { TourPackageDoc } from "@/types/models";

const COLLECTION = "tour_packages";

async function collection(): Promise<Collection<TourPackageDoc>> {
  const db = await getDb();
  return db.collection<TourPackageDoc>(COLLECTION);
}

function publicFilter(extra: Filter<TourPackageDoc> = {}): Filter<TourPackageDoc> {
  const hiddenOk: Filter<TourPackageDoc> = {
    $or: [{ isHidden: false }, { isHidden: { $exists: false } }],
  };
  if (Object.keys(extra).length === 0) return hiddenOk;
  return { $and: [hiddenOk, extra] };
}

export async function listTourPackagesVisible(
  filter: Filter<TourPackageDoc> = {}
): Promise<TourPackageDoc[]> {
  const col = await collection();
  return col.find(publicFilter(filter)).sort({ updatedAt: -1, createdAt: -1 }).toArray();
}

export async function listByDestinationSlug(slug: string): Promise<TourPackageDoc[]> {
  return listTourPackagesVisible({ destinationSlug: slug });
}

export async function getTourPackageById(id: string): Promise<TourPackageDoc | null> {
  const col = await collection();
  const { ObjectId } = await import("mongodb");
  let oid: InstanceType<typeof ObjectId> | null = null;
  try {
    oid = new ObjectId(id);
  } catch {
    return null;
  }
  return col.findOne(publicFilter({ _id: oid }));
}

export async function distinctDestinationSlugsWithPackages(): Promise<string[]> {
  const col = await collection();
  const slugs = await col.distinct("destinationSlug", publicFilter());
  return (slugs as string[]).filter(Boolean);
}
