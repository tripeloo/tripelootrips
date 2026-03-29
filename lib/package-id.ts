import type { TourPackageDoc } from "@/types/models";

export function tourPackageId(p: Pick<TourPackageDoc, "_id">): string {
  const id = p._id;
  if (id && typeof id === "object" && "toString" in id) return String(id);
  return String(id ?? "");
}
