import { filterProducts } from '@/lib/affiliate-products'
import { Card } from '@/components/ui/card'

// Inline editorial product list. Each product is a shadcn <Card> wrapper so
// theme tokens flow, but rendered as a horizontal row (copy + CTA only),
// NOT as a uniform grid. Max 3 items. Filters by current page's flock +
// climate axes.
//
// Anti-patterns enforced: no equal-height grid, no badges, no card hover-lift.
// Note: Amazon product images dropped 2026-05-10 — Amazon CDN URLs constructed
// from ASIN don't resolve without PA-API credentials, leading to broken
// thumbnails. Text-only cards until Brett enrolls in PA-API or PA-equivalent.

export function AffiliateProducts({
  flock,
  climate,
  cohort,
  max = 3,
  heading = 'Products that match this setup',
  showHeading = true,
}: {
  flock?: number
  climate?: string
  cohort?: string
  max?: number
  heading?: string
  showHeading?: boolean
}) {
  // `cohort` is the operator-facing name (used in MDX blog content); maps to
  // the category filter under the hood. Scribe writes `<AffiliateProducts cohort="ventilation-fans" />`
  // in monetizable blog posts; calculator-result pages still use flock+climate.
  const picks = filterProducts({ flockSize: flock, climate, category: cohort }, max)
  if (picks.length === 0) return null

  return (
    <section className="my-12">
      {showHeading && (
        <h2 className="font-display text-2xl font-medium text-ink mb-6">{heading}</h2>
      )}
      <ul className="space-y-3">
        {picks.map((p) => (
          <li key={p.asin}>
            <Card className="flex flex-row gap-5 items-start p-5 shadow-none">
              <div className="flex-1 min-w-0">
                <p className="text-base text-ink font-medium leading-snug">{p.title}</p>
                <p className="mt-1 text-sm text-charcoal leading-relaxed">{p.why}</p>
                <div className="mt-2 flex items-center gap-4 text-sm">
                  <span className="text-stone">{p.price_range}</span>
                  <a
                    href={`/go/${p.asin}`}
                    rel="sponsored nofollow noopener"
                    className="text-ink underline decoration-hairline underline-offset-4 hover:decoration-ink"
                  >
                    View on Amazon →
                  </a>
                </div>
              </div>
            </Card>
          </li>
        ))}
      </ul>
    </section>
  )
}
