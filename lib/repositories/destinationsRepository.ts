import type { Collection, Filter } from "mongodb";
import { getDb } from "@/lib/mongodb";
import type { DestinationDoc } from "@/types/models";

const COLLECTION = "destinations";

async function collection(): Promise<Collection<DestinationDoc>> {
  const db = await getDb();
  return db.collection<DestinationDoc>(COLLECTION);
}

function visibleFilter(extra: Filter<DestinationDoc> = {}): Filter<DestinationDoc> {
  return {
    ...extra,
    $or: [{ isHidden: false }, { isHidden: { $exists: false } }],
  };
}

export async function listDestinationsVisible(
  filter: Filter<DestinationDoc> = {}
): Promise<DestinationDoc[]> {
  const col = await collection();
  return col.find(visibleFilter(filter)).sort({ name: 1 }).toArray();
}

export async function getDestinationBySlug(slug: string): Promise<DestinationDoc | null> {
  const col = await collection();
  return col.findOne(visibleFilter({ slug }));
}

export async function listDestinationsWithPackageSlugs(
  slugs: string[]
): Promise<DestinationDoc[]> {
  if (!slugs.length) return [];
  const col = await collection();
  return col
    .find(visibleFilter({ slug: { $in: slugs } }))
    .sort({ name: 1 })
    .toArray();
}

/** Admin: all destinations for ordering / featured UI. */
export async function listAllDestinations(): Promise<DestinationDoc[]> {
  const col = await collection();
  return col.find({}).sort({ name: 1 }).toArray();
}
