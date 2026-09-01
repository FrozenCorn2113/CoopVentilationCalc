// Curated post-to-post link graph.
//
// Why this file exists: before it, 28 of 33 posts had zero inbound and zero
// outbound links to any other post. Google's URL Inspection confirmed the
// damage directly — /blog, /blog/chicken-coop-ventilation-requirements and
// /blog/coop-size-calculator each reported NO internal referring page and were
// discovered via sitemap.xml alone. A flat /blog index is not an internal link
// graph; it gives every post the same single entry point and no topical signal.
//
// The map is curated rather than computed (no tag-similarity heuristic) because
// the clusters here are genuinely editorial: "which guide does someone reading
// this one actually need next." Grouped by cluster below for maintenance.
//
// Slugs are resolved through the live roster at render time, so an entry naming
// a post that is not deployed is silently dropped rather than emitting a 404
// link. That guard is load-bearing: `types-of-chicken-coop-ventilation` is
// written but not yet committed, so it appears here and simply will not render
// until it ships.

export const RELATED_GUIDES: Record<string, string[]> = {
  // --- Ventilation core ---
  'chicken-coop-ventilation-requirements': [
    'ideal-air-changes-per-hour-chicken-coop',
    'chicken-coop-ventilation-sq-ft',
    'natural-vs-mechanical-ventilation-chicken-coop',
    'coop-space-requirements',
  ],
  'chicken-coop-ventilation-sq-ft': [
    'vent-placement-high-low-ridge',
    'chicken-coop-ventilation-requirements',
    'ideal-air-changes-per-hour-chicken-coop',
    'coop-size-calculator',
  ],
  'ideal-air-changes-per-hour-chicken-coop': [
    'chicken-coop-ventilation-requirements',
    'chicken-coop-ventilation-sq-ft',
    'fan-vs-passive-vents',
    'ammonia-and-moisture',
  ],
  'natural-vs-mechanical-ventilation-chicken-coop': [
    'fan-vs-passive-vents',
    'types-of-chicken-coop-ventilation',
    'vent-placement-high-low-ridge',
    'summer-heat-stress',
  ],
  'types-of-chicken-coop-ventilation': [
    'natural-vs-mechanical-ventilation-chicken-coop',
    'vent-placement-high-low-ridge',
    'fan-vs-passive-vents',
    'chicken-coop-ventilation-requirements',
  ],
  'vent-placement-high-low-ridge': [
    'chicken-coop-ventilation-sq-ft',
    'winter-ventilation-without-drafts',
    'natural-vs-mechanical-ventilation-chicken-coop',
    'chicken-coop-ventilation-requirements',
  ],
  'fan-vs-passive-vents': [
    'natural-vs-mechanical-ventilation-chicken-coop',
    'summer-heat-stress',
    'ideal-air-changes-per-hour-chicken-coop',
    'vent-placement-high-low-ridge',
  ],

  // --- Seasonal ---
  'winter-ventilation-without-drafts': [
    'how-to-winterize-coop',
    'preventing-frostbite-chickens',
    'vent-placement-high-low-ridge',
    'ammonia-and-moisture',
  ],
  'how-to-winterize-coop': [
    'winter-ventilation-without-drafts',
    'preventing-frostbite-chickens',
    'keep-water-from-freezing',
    'chickens-not-laying-winter',
  ],
  'preventing-frostbite-chickens': [
    'winter-ventilation-without-drafts',
    'how-to-winterize-coop',
    'ammonia-and-moisture',
    'chicken-respiratory-issues',
  ],
  'keep-water-from-freezing': [
    'how-to-winterize-coop',
    'chickens-not-laying-winter',
    'winter-ventilation-without-drafts',
    'preventing-frostbite-chickens',
  ],
  'chickens-not-laying-winter': [
    'how-to-winterize-coop',
    'keep-water-from-freezing',
    'nesting-box-setup',
    'preventing-frostbite-chickens',
  ],
  'summer-heat-stress': [
    'fan-vs-passive-vents',
    'natural-vs-mechanical-ventilation-chicken-coop',
    'ideal-air-changes-per-hour-chicken-coop',
    'choosing-coop-location',
    'how-to-keep-chicken-coop-cool-in-summer',
  ],

  // --- Air quality + health ---
  'ammonia-and-moisture': [
    'chicken-respiratory-issues',
    'deep-litter-method',
    'how-to-clean-chicken-coop',
    'chicken-coop-ventilation-requirements',
    'signs-of-poor-ventilation-in-chicken-coop',
  ],
  'chicken-respiratory-issues': [
    'ammonia-and-moisture',
    'chicken-coop-ventilation-requirements',
    'how-to-clean-chicken-coop',
    'mite-prevention-coop',
    'signs-of-poor-ventilation-in-chicken-coop',
  ],
  'deep-litter-method': [
    'sand-vs-shavings-coop-bedding',
    'ammonia-and-moisture',
    'how-to-clean-chicken-coop',
    'coop-flooring-options',
  ],
  'how-to-clean-chicken-coop': [
    'deep-litter-method',
    'droppings-board-guide',
    'ammonia-and-moisture',
    'fly-control-chicken-coop',
  ],

  // --- Coop size, siting, floor ---
  'coop-size-calculator': [
    'coop-space-requirements',
    'chicken-coop-size-calculator',
    'chicken-coop-ventilation-sq-ft',
    'choosing-coop-location',
  ],
  'chicken-coop-size-calculator': [
    'coop-size-calculator',
    'coop-space-requirements',
    'chicken-coop-ventilation-requirements',
    'beginner-chicken-keeping',
  ],
  'coop-space-requirements': [
    'coop-size-calculator',
    'chicken-coop-size-calculator',
    'roosting-bar-setup',
    'nesting-box-setup',
  ],
  'choosing-coop-location': [
    'coop-size-calculator',
    'summer-heat-stress',
    'predator-proofing-coop-run',
    'chicken-coop-ventilation-requirements',
  ],
  'coop-flooring-options': [
    'sand-vs-shavings-coop-bedding',
    'deep-litter-method',
    'how-to-clean-chicken-coop',
    'rodent-control-chicken-coop',
  ],
  'sand-vs-shavings-coop-bedding': [
    'coop-flooring-options',
    'deep-litter-method',
    'ammonia-and-moisture',
    'how-to-clean-chicken-coop',
  ],

  // --- Interior fixtures ---
  'roosting-bar-setup': [
    'droppings-board-guide',
    'vent-placement-high-low-ridge',
    'nesting-box-setup',
    'coop-space-requirements',
  ],
  'nesting-box-setup': [
    'roosting-bar-setup',
    'coop-space-requirements',
    'chickens-not-laying-winter',
    'mite-prevention-coop',
  ],
  'droppings-board-guide': [
    'roosting-bar-setup',
    'how-to-clean-chicken-coop',
    'deep-litter-method',
    'ammonia-and-moisture',
  ],

  // --- Pests + predators ---
  'fly-control-chicken-coop': [
    'how-to-clean-chicken-coop',
    'deep-litter-method',
    'droppings-board-guide',
    'mite-prevention-coop',
  ],
  'mite-prevention-coop': [
    'coop-inspection-checklist',
    'how-to-clean-chicken-coop',
    'roosting-bar-setup',
    'chicken-respiratory-issues',
  ],
  'rodent-control-chicken-coop': [
    'predator-proofing-coop-run',
    'coop-flooring-options',
    'how-to-clean-chicken-coop',
    'coop-inspection-checklist',
  ],
  'predator-proofing-coop-run': [
    'rodent-control-chicken-coop',
    'choosing-coop-location',
    'coop-inspection-checklist',
    'coop-space-requirements',
  ],

  // --- Getting started + upkeep ---
  'beginner-chicken-keeping': [
    'coop-size-calculator',
    'chicken-coop-ventilation-requirements',
    'coop-space-requirements',
    'coop-inspection-checklist',
  ],
  'coop-inspection-checklist': [
    'mite-prevention-coop',
    'predator-proofing-coop-run',
    'ammonia-and-moisture',
    'how-to-clean-chicken-coop',
  ],

  // --- Auto-written posts (lib/genesis-blog-posts.ts) ---
  //
  // Ten of the eleven generated posts had no entry here, so they rendered the
  // generic FALLBACK block and received no inbound curated link from anywhere.
  // Only the two below are wired up, and the omission of the other eight is
  // deliberate, not an oversight:
  //
  //   chicken-coop-ventilation-for-10-chickens / ventilation-for-10-chickens-coop /
  //   ventilation-for-10-chickens-in-coop      -> one intent, three URLs
  //   chicken-coop-vent-sizing-recommendations / how-to-calculate-chicken-coop-ventilation /
  //   how-much-ventilation-per-chicken-coop-square-footage -> the 1-per-10 rule, three URLs
  //   cold-weather-chicken-coop-ventilation / minimum-temperature-for-chickens-in-winter
  //                                            -> the winter cluster
  //
  // Those eight are consolidation candidates (see seo/needs-human.md). Pointing
  // curated links INTO them would strengthen exactly the near-duplicate split we
  // want to collapse, and would have to be unpicked when they are merged or
  // redirected. They keep FALLBACK, which already routes them to the canonical
  // guide, until that decision is made.
  //
  // The two below target genuinely distinct intents with no sibling competing
  // for the same query, so they are safe to link in both directions.
  'signs-of-poor-ventilation-in-chicken-coop': [
    'chicken-coop-ventilation-requirements',
    'ammonia-and-moisture',
    'chicken-respiratory-issues',
    'chicken-coop-ventilation-sq-ft',
  ],
  'how-to-keep-chicken-coop-cool-in-summer': [
    'summer-heat-stress',
    'fan-vs-passive-vents',
    'natural-vs-mechanical-ventilation-chicken-coop',
    'chicken-coop-ventilation-requirements',
  ],
}

// Fallback for any post with no curated entry: the four core ventilation guides,
// minus itself. Guarantees no post ever renders an empty related block.
const FALLBACK = [
  'chicken-coop-ventilation-requirements',
  'chicken-coop-ventilation-sq-ft',
  'vent-placement-high-low-ridge',
  'ideal-air-changes-per-hour-chicken-coop',
]

export function relatedSlugsFor(slug: string): string[] {
  const picked = RELATED_GUIDES[slug] ?? FALLBACK
  return picked.filter((s) => s !== slug)
}
