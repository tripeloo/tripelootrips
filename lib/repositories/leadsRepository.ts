import type { Collection } from "mongodb";
import { getDb } from "@/lib/mongodb";
import type { TripelooLeadDoc } from "@/types/models";

const COLLECTION = "tripelootrips_leads";

async function collection(): Promise<Collection<TripelooLeadDoc>> {
  const db = await getDb();
  return db.collection<TripelooLeadDoc>(COLLECTION);
}

export async function insertLead(doc: Omit<TripelooLeadDoc, "_id" | "createdAt">): Promise<void> {
  const col = await collection();
  await col.insertOne({
    ...doc,
    createdAt: new Date(),
  });
}

export async function listLeads(limit = 200): Promise<TripelooLeadDoc[]> {
  const col = await collection();
  return col.find({}).sort({ createdAt: -1 }).limit(limit).toArray();
}
