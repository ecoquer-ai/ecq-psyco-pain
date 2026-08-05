/**
 * Seed summary for Neuropi catalog data from @neuropi/shared.
 * Does not write to a database in memory mode — logs inventory for ops/dev.
 */
import {
  BRAND,
  LIBRARY_CATEGORIES,
  LIBRARY_COUNTS,
  MILESTONES,
  PROBABLE_PROFILE_IDS,
} from "@neuropi/shared";

function main() {
  const milestoneLessons = MILESTONES.reduce(
    (sum, m) => sum + m.lessons.length,
    0,
  );

  const summary = {
    brand: BRAND.publicName,
    tagline: BRAND.tagline,
    technicalName: BRAND.technicalName,
    library: {
      ...LIBRARY_COUNTS,
      categories: LIBRARY_CATEGORIES.length,
      categoryIds: LIBRARY_CATEGORIES.map((c) => c.id),
    },
    therapy: {
      milestones: MILESTONES.length,
      lessons: milestoneLessons,
      milestoneTitlesEs: MILESTONES.map((m) => `${m.order}. ${m.titleEs}`),
    },
    profiles: {
      probableProfileCount: PROBABLE_PROFILE_IDS.length,
      ids: PROBABLE_PROFILE_IDS,
    },
    clinicalReminderEs:
      "Neuropi no diagnostica. Orienta, educa y deriva cuando corresponde.",
  };

  console.log(JSON.stringify(summary, null, 2));
  console.log(
    `\nSeed summary: ${LIBRARY_COUNTS.total} library items, ${MILESTONES.length} milestones (${milestoneLessons} lessons), ${PROBABLE_PROFILE_IDS.length} probable profiles.`,
  );
}

main();
