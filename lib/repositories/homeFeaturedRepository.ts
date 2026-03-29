import type { Collection } from "mongodb";
import { getDb } from "@/lib/mongodb";
import type { HomeFeaturedConfigDoc } from "@/types/models";

const COLLECTION = "home_featured_config";
const SINGLETON_ID = "singleton";

async function collection(): Promise<Collection<HomeFeaturedConfigDoc & { _id: string }>> {
  const db = await getDb();
  return db.collection<HomeFeaturedConfigDoc & { _id: string }>(COLLECTION);
}

const defaultDoc: HomeFeaturedConfigDoc = {
  section1Slugs: [],
  section2Slugs: [],
  section1Title: "Popular getaways",
  section2Title: "More destinations",
};

export async function getHomeFeaturedConfig(): Promise<HomeFeaturedConfigDoc> {
  try {
    const col = await collection();
    const doc = await col.findOne({ _id: SINGLETON_ID });
    if (!doc) return { ...defaultDoc };
    const { _id: _docId, ...rest } = doc;
    void _docId;
    return {
      section1Slugs: rest.section1Slugs ?? [],
      section2Slugs: rest.section2Slugs ?? [],
      section1Title: rest.section1Title ?? defaultDoc.section1Title,
      section2Title: rest.section2Title ?? defaultDoc.section2Title,
      updatedAt: rest.updatedAt,
    };
  } catch {
    return { ...defaultDoc };
  }
}

type HomeFeaturedPatch = Partial<
  Pick<HomeFeaturedConfigDoc, "section1Slugs" | "section2Slugs" | "section1Title" | "section2Title">
>;

export async function upsertHomeFeaturedConfig(patch: HomeFeaturedPatch): Promise<void> {
  const col = await collection();
  const now = new Date();
  const $set: Record<string, unknown> = { updatedAt: now };
  if (patch.section1Slugs !== undefined) $set.section1Slugs = patch.section1Slugs;
  if (patch.section2Slugs !== undefined) $set.section2Slugs = patch.section2Slugs;
  if (patch.section1Title !== undefined) $set.section1Title = patch.section1Title;
  if (patch.section2Title !== undefined) $set.section2Title = patch.section2Title;
  await col.updateOne(
    { _id: SINGLETON_ID },
    {
      $set: $set as never,
      $setOnInsert: { _id: SINGLETON_ID },
    },
    { upsert: true }
  );
}
