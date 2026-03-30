import {
  distinctDestinationSlugsWithPackages,
  listTourPackagesVisible,
} from "@/lib/repositories/tourPackagesRepository";
import { listDestinationsWithPackageSlugs } from "@/lib/repositories/destinationsRepository";
import { getHomeFeaturedConfig } from "@/lib/repositories/homeFeaturedRepository";
import type { DestinationDoc, TourPackageDoc } from "@/types/models";

export type DestinationWithPackages = DestinationDoc & { packages: TourPackageDoc[] };

function pickUniqueBySlugs(
  bySlug: Map<string, DestinationWithPackages>,
  slugs: string[]
): DestinationWithPackages[] {
  const out: DestinationWithPackages[] = [];
  const seen = new Set<string>();
  for (const s of slugs) {
    const d = bySlug.get(s);
    if (d && !seen.has(d.slug)) {
      out.push(d);
      seen.add(d.slug);
    }
  }
  return out;
}

function balanceSections(
  a: DestinationWithPackages[],
  b: DestinationWithPackages[]
): [DestinationWithPackages[], DestinationWithPackages[]] {
  let s1 = [...a];
  let s2 = [...b];
  if (s1.length > 1 && s2.length === 0) {
    const move = Math.floor(s1.length / 2);
    const tail = s1.slice(-move);
    s1 = s1.slice(0, s1.length - move);
    s2 = [...s2, ...tail];
  } else if (s2.length > 1 && s1.length === 0) {
    const move = Math.ceil(s2.length / 2);
    s1 = s2.slice(0, move);
    s2 = s2.slice(move);
  }
  return [s1, s2];
}

export async function loadHomeSections(): Promise<{
  section1Title: string;
  section2Title: string;
  section1: DestinationWithPackages[];
  section2: DestinationWithPackages[];
}> {
  const [slugsWithPkgs, config] = await Promise.all([
    distinctDestinationSlugsWithPackages(),
    getHomeFeaturedConfig(),
  ]);

  const dests = await listDestinationsWithPackageSlugs(slugsWithPkgs);

  async function attachPackages(list: DestinationDoc[]): Promise<DestinationWithPackages[]> {
    const results = await Promise.all(
      list.map(async (d) => {
        const packages = await listTourPackagesVisible({ destinationSlug: d.slug });
        return { ...d, packages };
      })
    );
    return results.filter((r) => r.packages.length > 0);
  }

  const allWithPkgs = await attachPackages(dests);
  allWithPkgs.sort((a, b) => a.name.localeCompare(b.name, "en", { sensitivity: "base" }));

  if (!allWithPkgs.length) {
    return {
      section1Title: config.section1Title,
      section2Title: config.section2Title,
      section1: [],
      section2: [],
    };
  }

  const bySlug = new Map(allWithPkgs.map((d) => [d.slug, d]));
  const admin1 = config.section1Slugs ?? [];
  const admin2 = config.section2Slugs ?? [];
  const adminConfigured = admin1.length > 0 || admin2.length > 0;

  let section1: DestinationWithPackages[];
  let section2: DestinationWithPackages[];

  if (!adminConfigured) {
    const half = Math.ceil(allWithPkgs.length / 2);
    section1 = allWithPkgs.slice(0, half);
    section2 = allWithPkgs.slice(half);
  } else {
    section1 = pickUniqueBySlugs(bySlug, admin1);
    section2 = pickUniqueBySlugs(bySlug, admin2);
    const assigned = new Set([...section1, ...section2].map((d) => d.slug));
    const unassigned = allWithPkgs.filter((d) => !assigned.has(d.slug));
    const half = Math.ceil(unassigned.length / 2);
    section1 = [...section1, ...unassigned.slice(0, half)];
    section2 = [...section2, ...unassigned.slice(half)];
    [section1, section2] = balanceSections(section1, section2);
  }

  return {
    section1Title: config.section1Title,
    section2Title: config.section2Title,
    section1,
    section2,
  };
}

/** All home featured destination rails in display order (section 1, then section 2, de-duplicated by slug). */
export async function loadHomePageRails(): Promise<DestinationWithPackages[]> {
  const { section1, section2 } = await loadHomeSections();
  const seen = new Set<string>();
  const out: DestinationWithPackages[] = [];
  for (const d of [...section1, ...section2]) {
    if (seen.has(d.slug)) continue;
    seen.add(d.slug);
    out.push(d);
  }
  return out;
}
