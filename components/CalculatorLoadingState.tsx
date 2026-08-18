'use client'

import * as React from 'react'

// Spinner + rotating domain-specific copy. NEVER "Loading..." or "Calculating...".
// Cycles `copy` strings every 700ms. The shell passes a precomputed delay so
// rendering this component feels deterministic per submission.

export function CalculatorLoadingState({
  copy,
  intervalMs = 700,
}: {
  copy: string[]
  intervalMs?: number
}) {
  const [i, setI] = React.useState(0)
  React.useEffect(() => {
    if (copy.length <= 1) return
    const id = window.setInterval(() => setI((n) => (n + 1) % copy.length), intervalMs)
    return () => window.clearInterval(id)
  }, [copy, intervalMs])

  return (
    <div className="py-6 flex items-center gap-3 text-charcoal" aria-live="polite">
      <span
        className="inline-block h-4 w-4 rounded-full border-2 border-hairline border-t-ink animate-spin"
        aria-hidden
      />
      <span className="text-sm">{copy[i] || 'Working...'}</span>
    </div>
  )
}
