// Coop ventilation calculator math.
// Sources:
//   UKy ID-204 — 5 CFM per bird summer, 1 CFM per bird winter
//   U Maine 2227 — 144 sq inches of vent area per 10 sq ft of floor
//   PSU 1083 — vent area split 50/50 between low inlets and high outlets
//   USDA ARS — +50% airflow above 70% humidity or detectable ammonia

export type ClimateZone =
  | 'cold-winter'
  | 'mild-winter'
  | 'temperate'
  | 'hot-summer'
  | 'humid-coastal'

export type CalculatorInputs = Record<string, string | number | undefined> & {
  floorSqFt?: number
  flockSize?: number
  climateZone?: ClimateZone | string
}

export type BreakdownRow = { label: string; value: string }

export type CalculatorResultData = {
  verdict: string
  verdictLabel?: string
  verdictLabelColor?: 'green' | 'amber' | 'red'
  interpretation: string
  breakdown: BreakdownRow[]
}

const SUMMER_CFM_PER_BIRD = 5
const WINTER_CFM_PER_BIRD = 1
const VENT_SQ_IN_PER_10_SQFT = 144

function climateMultiplier(zone: string): number {
  switch (zone) {
    case 'cold-winter':   return 1.00
    case 'mild-winter':   return 1.10
    case 'temperate':     return 1.20
    case 'hot-summer':    return 1.40
    case 'humid-coastal': return 1.50
    default:              return 1.20
  }
}

function climateLabel(zone: string): string {
  return zone.replace(/-/g, ' ')
}

export function calculateResult(inputs: CalculatorInputs): CalculatorResultData {
  const flock = Math.max(1, Number(inputs.flockSize) || 0)
  const floor = Math.max(1, Number(inputs.floorSqFt) || 0)
  const zone = String(inputs.climateZone || 'temperate')
  const mult = climateMultiplier(zone)

  const summerCfm = Math.round(flock * SUMMER_CFM_PER_BIRD * mult)
  const winterCfm = Math.round(flock * WINTER_CFM_PER_BIRD)

  // vent area: greater of (per-bird summer requirement converted) and (per-floor minimum)
  const ventAreaPerFloor = Math.round((floor / 10) * VENT_SQ_IN_PER_10_SQFT)
  const ventAreaPerFlock = Math.round(summerCfm * 1.6) // ~1.6 sq in per CFM at low static pressure
  const ventArea = Math.max(ventAreaPerFloor, ventAreaPerFlock)

  const inletArea = Math.round(ventArea / 2)
  const outletArea = ventArea - inletArea

  const ratio = ventArea / floor // sq in / sq ft
  const targetRatio = VENT_SQ_IN_PER_10_SQFT / 10
  let verdictLabel: string
  let verdictLabelColor: 'green' | 'amber' | 'red'
  if (ratio >= targetRatio) {
    verdictLabel = 'Sized to extension-service guidelines'
    verdictLabelColor = 'green'
  } else if (ratio >= targetRatio * 0.7) {
    verdictLabel = 'Marginal: add airflow before summer'
    verdictLabelColor = 'amber'
  } else {
    verdictLabel = 'Undersized: moisture and ammonia risk'
    verdictLabelColor = 'red'
  }

  const interpretation = `For ${flock} birds in a ${floor} sq ft coop in a ${climateLabel(zone)} climate, target about ${ventArea} square inches of total vent area. Split that roughly in half: ${inletArea} sq in of low inlets near the floor, ${outletArea} sq in of high outlets near the ridge.`

  return {
    verdict: `${ventArea} sq in`,
    verdictLabel,
    verdictLabelColor,
    interpretation,
    breakdown: [
      { label: 'Summer airflow target',  value: `${summerCfm} CFM (cubic feet per minute)` },
      { label: 'Winter airflow target',  value: `${winterCfm} CFM` },
      { label: 'Total vent area',        value: `${ventArea} sq in` },
      { label: 'Low inlets (near floor)',value: `${inletArea} sq in` },
      { label: 'High outlets (at ridge)',value: `${outletArea} sq in` },
      { label: 'Climate adjustment',     value: `×${mult.toFixed(2)} (${climateLabel(zone)})` },
    ],
  }
}

export const defaultLoadingCopy: string[] = [
  'Reading your flock size and coop dimensions',
  'Checking the extension-service tables',
  'Sizing inlets and outlets',
  'Drafting your vent plan',
]
