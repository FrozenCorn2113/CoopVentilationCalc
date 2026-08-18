import { AffiliateProducts } from './AffiliateProducts'
import type { CalculatorInputs as Inputs } from '@/lib/formulas'

// Post-result affiliate strip. Renders ONLY after calculator result is set.
// Framing references the user's inputs (not generic "recommended products").
// Max 3, editorial list (not card grid). Wraps AffiliateProducts with a
// calculator-aware heading and the user's input axes.

export function RelatedProducts({
  inputs,
  max = 3,
}: {
  inputs: Inputs
  max?: number
}) {
  const flockNote = typeof inputs.flockSize === 'number' && inputs.flockSize > 0
    ? `${inputs.flockSize} birds`
    : 'your flock'
  const climateNote = typeof inputs.climateZone === 'string' && inputs.climateZone
    ? inputs.climateZone.replace(/-/g, ' ')
    : 'your climate'
  const heading = `What keepers with ${flockNote} in a ${climateNote} climate use`

  return (
    <AffiliateProducts
      flock={typeof inputs.flockSize === 'number' ? inputs.flockSize : undefined}
      climate={typeof inputs.climateZone === 'string' ? inputs.climateZone : undefined}
      max={max}
      heading={heading}
    />
  )
}
