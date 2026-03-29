import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

/** Public health + Mongo ping + collection counts (no secrets). */
export async function GET() {
  try {
    const db = await getDb();
    const ping = await db.command({ ping: 1 });
    const visibleDest = {
      $or: [{ isHidden: false }, { isHidden: { $exists: false } }],
    };
    const visiblePkg = {
      $or: [{ isHidden: false }, { isHidden: { $exists: false } }],
    };
    const [destinations, tourPackages] = await Promise.all([
      db.collection("destinations").countDocuments(visibleDest),
      db.collection("tour_packages").countDocuments(visiblePkg),
    ]);

    return NextResponse.json({
      ok: true,
      database: db.databaseName,
      pingOk: ping.ok === 1,
      counts: { destinations, tourPackages },
      time: new Date().toISOString(),
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json(
      { ok: false, database: null as string | null, error: message, time: new Date().toISOString() },
      { status: 503 }
    );
  }
}
