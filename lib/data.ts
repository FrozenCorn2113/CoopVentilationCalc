// Parameterized-route data. Drives generateStaticParams, so adding an entry
// here is all it takes to add a statically generated page.
//
// Items carry segmentation axes (flock_size, climate_fit) that the
// AffiliateProducts component uses to filter the catalog at render time.

export type PrimaryItem = {
  slug: string
  label: string
  body?: string
  // segmentation axes — match the keys in data/affiliate-products.json
  flock_size?: number
  climate_fit?: string
  // diagram mode hint for vent placement section
  diagram_mode?: 'summer' | 'winter' | 'balanced'
}

export const primaryItems: PrimaryItem[] = [
  // entries go here
]

export function getItem(slug: string): PrimaryItem | null {
  return primaryItems.find((i) => i.slug === slug) || null
}

// Group items by primary axis for the homepage progressive-disclosure browse
// (small / medium / large flock buckets, with climate links inside).
export type FlockBucket = 'small' | 'medium' | 'large'

export function bucketFor(item: PrimaryItem): FlockBucket {
  const f = item.flock_size ?? 0
  if (f <= 6) return 'small'
  if (f <= 15) return 'medium'
  return 'large'
}

export function groupByFlockBucket(items: PrimaryItem[]) {
  const groups: Record<FlockBucket, PrimaryItem[]> = {
    small: [],
    medium: [],
    large: [],
  }
  for (const it of items) groups[bucketFor(it)].push(it)
  return groups
}

export const FLOCK_BUCKET_META: Record<FlockBucket, { label: string; range: string }> = {
  small: { label: 'Small flocks', range: '2–6 birds' },
  medium: { label: 'Medium flocks', range: '8–15 birds' },
  large: { label: 'Large flocks', range: '20–30 birds' },
}
