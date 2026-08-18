import { sources, lastReviewed } from '@/lib/sources'
import { Card, CardContent } from '@/components/ui/card'

// Inline citations. Lives inside a shadcn <Card> so theme tokens (border,
// background, foreground) flow uniformly across the site. Reads from
// lib/sources.ts, so citations live in one place rather than inline in copy.

export function Sources() {
  if (sources.length === 0) return null
  return (
    <section id="sources" className="mt-12">
      <Card className="shadow-none">
        <CardContent className="text-sm text-stone leading-relaxed">
          <span className="text-charcoal">
            Last reviewed: {lastReviewed} · Sources:{' '}
          </span>
          {sources.map((s, i) => (
            <span key={s.url}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink underline decoration-hairline underline-offset-4 hover:decoration-ink"
              >
                {s.label}
              </a>
              {i < sources.length - 1 ? ' · ' : ''}
            </span>
          ))}
        </CardContent>
      </Card>
    </section>
  )
}
