'use client'

import * as React from 'react'
import {
  calculateResult,
  defaultLoadingCopy,
  type CalculatorInputs as Inputs,
  type CalculatorResultData,
} from '@/lib/formulas'
import { sources, lastReviewed } from '@/lib/sources'
import { CalculatorInputs } from './CalculatorInputs'
import { CalculatorLoadingState } from './CalculatorLoadingState'
import { CalculatorResult } from './CalculatorResult'
import { RelatedProducts } from './RelatedProducts'
import { isInternalTraffic } from '@/lib/internal-traffic'
import { Card, CardContent } from '@/components/ui/card'

// Stateful shell. Owns inputs, loading, result. Implements the
// calculator-ux skill mandatory pattern:
//   1. fake 1500-2200ms loading delay between submit and reveal
//   2. verdict + interpretation + breakdown + sources result structure
//   3. post-result affiliate surface (RelatedProducts), never before
//
// Wrapped in shadcn <Card> so theme tokens (border, background) flow from
// app/globals.css. The post-result surface (RelatedProducts) renders OUTSIDE
// the card, in editorial-list form, per affiliate-surface rules.

type PosthogLike = {
  capture: (event: string, properties?: Record<string, unknown>) => void
}

export function Calculator({
  showRelated = true,
  loadingCopy = defaultLoadingCopy,
  className,
}: {
  showRelated?: boolean
  loadingCopy?: string[]
  className?: string
}) {
  const [loading, setLoading] = React.useState(false)
  const [result, setResult] = React.useState<CalculatorResultData | null>(null)
  const [submittedInputs, setSubmittedInputs] = React.useState<Inputs | null>(null)

  // The post-result product panel takes 93% of this site's affiliate clicks and
  // has no denominator: pageviews are not submissions, so nothing could say
  // whether a change moved the panel's rate or just its traffic. One event fixes
  // that for the next read.
  function reportSubmit(inputs: Inputs) {
    try {
      const ph = (window as unknown as { posthog?: PosthogLike }).posthog
      if (!ph || typeof ph.capture !== 'function') return
      ph.capture('calculator_submit', {
        flock_size: inputs.flockSize,
        climate_zone: inputs.climateZone,
        floor_sq_ft: inputs.floorSqFt,
        page_path: window.location.pathname,
        internal: isInternalTraffic(),
      })
    } catch {
      // Analytics must never cost a result.
    }
  }

  async function handleSubmit(inputs: Inputs) {
    reportSubmit(inputs)
    setSubmittedInputs(inputs)
    setResult(null)
    setLoading(true)
    const delay = 1500 + Math.random() * 700 // 1500-2200ms
    await new Promise((r) => setTimeout(r, delay))
    setResult(calculateResult(inputs))
    setLoading(false)
  }

  return (
    <section id="calculator" className={className}>
      <Card>
        <CardContent>
          <CalculatorInputs onSubmit={handleSubmit} disabled={loading} />
          {loading && <CalculatorLoadingState copy={loadingCopy} />}
          {result && submittedInputs && (
            <CalculatorResult
              verdict={result.verdict}
              verdictLabel={result.verdictLabel}
              verdictLabelColor={result.verdictLabelColor}
              interpretation={result.interpretation}
              breakdown={result.breakdown}
              sources={sources}
              lastReviewed={lastReviewed}
            />
          )}
        </CardContent>
      </Card>
      {result && submittedInputs && showRelated && (
        <RelatedProducts inputs={submittedInputs} max={3} />
      )}
    </section>
  )
}
