// What the product surface actually earns, read once and committed so the
// catalog can be ordered by demand instead of by the order it was typed in.
//
// Source: docs/monetization-0003-affiliate-click-reading.md. 29 affiliate_click
// events from 17 distinct people, 2026-09-12 to 2026-10-12, internal filter
// applied, total reconciled against the registered metric reader.
//
// Two limits travel with this table, because an ordering rule that forgets them
// turns a small sample into a permanent verdict:
//
// 1. 29 clicks is small. The reading could not distinguish ASIN differences
//    below roughly 4 clicks from noise, so 2 clicks beating 1 is a tiebreak and
//    not a finding. What this ordering claims is only that a weak demand signal
//    beats catalog position, which carries no signal at all.
// 2. A zero can belong to the surface instead of the product. The homepage
//    six-slot grid earned 0 clicks across 142 pageviews, so anything shown only
//    there carries that zero whether it deserves it or not. Zeros lose ties,
//    they are never dropped from the catalog, and one click moves a product back
//    up the moment it earns one.
//
// Re-read before trusting this past the next placement decision. The numbers are
// a snapshot, not a constant, and `clicks30d` returning 0 for an ASIN that is
// simply newer than the window is the expected failure mode.

export const DEMAND_READING = {
  window: '2026-09-12 to 2026-10-12',
  window_days: 30,
  total_clicks: 29,
  distinct_people: 17,
  noise_floor_clicks: 4,
  source_doc: 'docs/monetization-0003-affiliate-click-reading.md',
} as const

// Every ASIN in the 30-day window that took at least one click. Absent means zero.
const CLICKS_30D: Readonly<Record<string, number>> = {
  B0DKF5ZXRM: 9,
  B00658O1HE: 5,
  B0BM45GHZV: 4,
  B0D2VNZV61: 3,
  B0BBVHZKM9: 2,
  B0DKF5L3C2: 2,
  B0CSN7RZ1B: 1,
  B0B11JXN7T: 1,
  B015PD9F52: 1,
  B0G2XDCFXQ: 1,
}

export function clicks30d(asin: string): number {
  return CLICKS_30D[asin] ?? 0
}

/**
 * Categories that answer the calculator's number, versus categories that only
 * watch it. Demand is ranked INSIDE this split and never across it.
 *
 * Ordering a hot-summer result panel on clicks alone put a hygrometer above a
 * solar exhaust fan, because hygrometers took 2 clicks and that fan took 1.
 * That is a worse recommendation for a keeper the calculator has just told to
 * add airflow, and this site's only asset is being right about that number. A
 * monitor tells you whether you crossed the USDA ARS humidity threshold; it does
 * not move a single CFM.
 */
const SECONDARY_CATEGORIES: ReadonlySet<string> = new Set(['thermometer-hygrometer'])

function relevanceBand(category: string): 0 | 1 {
  return SECONDARY_CATEGORIES.has(category) ? 1 : 0
}

/**
 * Airflow hardware first, then most-clicked, then catalog order for anything
 * still tied (which is most of the catalog: 8 of 18 products took no clicks at
 * all). Stable, so the same inputs always produce the same shortlist and a
 * surface change stays attributable to the change rather than to shuffling.
 */
export function byDemand<T extends { asin: string; category: string }>(
  items: readonly T[],
): T[] {
  return items
    .map((item, index) => ({ item, index }))
    .sort(
      (a, b) =>
        relevanceBand(a.item.category) - relevanceBand(b.item.category) ||
        clicks30d(b.item.asin) - clicks30d(a.item.asin) ||
        a.index - b.index,
    )
    .map((row) => row.item)
}
