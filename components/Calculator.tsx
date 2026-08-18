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

  async function handleSubmit(inputs: Inputs) {
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
