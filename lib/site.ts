// Site-level config — coopventilationcalc

export const site = {
  name: 'Coop Ventilation Calculator',
  shortName: 'Coop Vent Calc',
  domain: 'coopventilationcalc.com',
  niche: 'backyard chicken coop ventilation',
  primaryRoute: 'flock',
  nav: [
    { label: 'Calculator', href: '/#calculator' },
    { label: 'How it works', href: '/#how-it-works' },
    { label: 'Sources', href: '/#sources' },
    { label: 'FAQ', href: '/#faq' },
    { label: 'Guides', href: '/blog' },
  ],
} as const

// Short brand suffix for <title> tags. The long-form name blows past the ~60ch
// SERP limit once appended, so pages that already read long use pageTitle to
// drop the suffix rather than truncate the meaningful part.
export const TITLE_SUFFIX = ' · Coop Vent Calc'

// Append the brand suffix only when the result still fits the SERP title cap;
// otherwise return the base title alone. Used with metadata.title.absolute.
export function pageTitle(base: string, suffix: string = TITLE_SUFFIX): string {
  return base.length + suffix.length <= 60 ? base + suffix : base
}

// Cap a meta description at the SERP-safe length. Prefer a clean sentence break
// inside the window; otherwise trim to the last whole word and strip trailing
// punctuation. Keeps existing + future post descriptions compliant without
// hand-editing every source string.
export function clampDescription(text: string, max = 155): string {
  const t = text.trim()
  if (t.length <= max) return t
  const window = t.slice(0, max + 2)
  const sentenceEnd = Math.max(
    window.lastIndexOf('. '),
    window.lastIndexOf('? '),
    window.lastIndexOf('! '),
  )
  if (sentenceEnd >= 100) return t.slice(0, sentenceEnd + 1).trim()
  const cut = t.slice(0, max)
  const lastSpace = cut.lastIndexOf(' ')
  return (lastSpace > 0 ? cut.slice(0, lastSpace) : cut)
    .replace(/[\s,;:.–—-]+$/, '')
    .trim()
}
