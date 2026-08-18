import type { BreakdownRow } from '@/lib/formulas'
import type { Source } from '@/lib/sources'

// Result block: verdict + one-line interpretation + breakdown table (NOT a
// stat strip) + sources line. NOT a card. NO eyebrow above the verdict.

const LABEL_TONES: Record<'green' | 'amber' | 'red', string> = {
  green: 'text-accent',
  amber: 'text-warn',
  red: 'text-warn',
}

export function CalculatorResult({
  verdict,
  verdictLabel,
  verdictLabelColor,
  interpretation,
  breakdown,
  sources,
  lastReviewed,
}: {
  verdict: string
  verdictLabel?: string
  verdictLabelColor?: 'green' | 'amber' | 'red'
  interpretation: string
  breakdown: BreakdownRow[]
  sources?: Source[]
  lastReviewed?: string
}) {
  return (
    <section className="mt-8 border-t border-hairline-soft pt-8">
      <p className="font-display text-5xl md:text-6xl font-medium leading-none tracking-[-0.02em] text-ink">
        {verdict}
      </p>
      {verdictLabel && (
        <p
          className={`mt-2 text-sm font-medium ${
            verdictLabelColor ? LABEL_TONES[verdictLabelColor] : 'text-charcoal'
          }`}
        >
          {verdictLabel}
        </p>
      )}
      <p className="mt-4 text-base text-charcoal leading-relaxed max-w-xl">
        {interpretation}
      </p>

      <dl className="mt-8 divide-y divide-hairline-soft border-y border-hairline-soft">
        {breakdown.map((row) => (
          <div key={row.label} className="flex items-baseline justify-between py-3 gap-6">
            <dt className="text-sm text-stone">{row.label}</dt>
            <dd className="text-sm text-ink font-medium tabular-nums">{row.value}</dd>
          </div>
        ))}
      </dl>

      {sources && sources.length > 0 && (
        <p className="mt-6 text-sm text-stone leading-relaxed">
          {lastReviewed && <>Last reviewed: {lastReviewed} · </>}
          Sources:{' '}
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
        </p>
      )}
    </section>
  )
}
