// Typed loader for data/affiliate-products.json.
// The JSON is generated; this file imports it and exposes filters
// for the AffiliateProducts and RelatedProducts components.

import productsJson from '@/data/affiliate-products.json'

export type AffiliateProduct = {
  asin: string
  title: string
  category: string
  price_range: string
  image_url: string
  affiliate_url: string
  climate_fit?: string[]
  flock_min?: number
  flock_max?: number
  why: string
}

export const products: AffiliateProduct[] = productsJson as AffiliateProduct[]

export type ProductFilter = {
  climate?: string
  flockSize?: number
  category?: string
}

export function filterProducts(filter: ProductFilter, max = 3): AffiliateProduct[] {
  let pool = products.slice()

  if (filter.climate) {
    pool = pool.filter(
      (p) => !p.climate_fit || p.climate_fit.includes(filter.climate as string),
    )
  }

  if (typeof filter.flockSize === 'number') {
    const f = filter.flockSize
    pool = pool.filter(
      (p) =>
        (p.flock_min === undefined || f >= p.flock_min) &&
        (p.flock_max === undefined || f <= p.flock_max),
    )
  }

  if (filter.category) {
    pool = pool.filter((p) => p.category === filter.category)
  }

  // Diversify across categories: keep at most 1 per category until we run out.
  const seen = new Set<string>()
  const diverse: AffiliateProduct[] = []
  for (const p of pool) {
    if (seen.has(p.category)) continue
    diverse.push(p)
    seen.add(p.category)
    if (diverse.length >= max) break
  }
  if (diverse.length < max) {
    for (const p of pool) {
      if (diverse.includes(p)) continue
      diverse.push(p)
      if (diverse.length >= max) break
    }
  }
  return diverse
}
