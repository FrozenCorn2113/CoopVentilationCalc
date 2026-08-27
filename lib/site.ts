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
  // No sentence break landed late enough to carry the description on its own.
  // Falling through to a whole-word cut here is what used to emit SERP snippets
  // ending on a preposition ("...and how to", "...how floor area drives"). Take
  // the first COMPLETE sentence instead: shorter, but it reads as written copy
  // rather than a truncation. Only when even that is unavailable (a single
  // run-on sentence longer than `max`) do we fall back to the word cut.
  const firstSentence = Math.max(t.indexOf('. '), t.indexOf('? '), t.indexOf('! '))
  if (firstSentence > 0 && firstSentence + 1 <= max) {
    return t.slice(0, firstSentence + 1).trim()
  }
  const cut = t.slice(0, max)
  const lastSpace = cut.lastIndexOf(' ')
  return (lastSpace > 0 ? cut.slice(0, lastSpace) : cut)
    .replace(/[\s,;:.–—-]+$/, '')
    .trim()
}

// A post body that opens by restating its own title renders that line as an <h2>
// directly beneath the page <h1> — the same text twice, which gives passage
// chunkers a duplicate-titled section and reads as a formatting slip on screen.
// Strip that opening heading only when it is genuinely the title again; a leading
// `#` that says something different is left alone for the renderer to demote.
export function stripDuplicateTitleHeading(body: string, title: string): string {
  const norm = (v: string) =>
    v
      .replace(/[*_`]/g, '')
      .replace(/\s+/g, ' ')
      .replace(/[\u2018\u2019]/g, "'")
      .replace(/[\u201c\u201d]/g, '"')
      .trim()
      .toLowerCase()
  const target = norm(title)
  if (!target) return body
  return body.replace(/^\s*#\s+(.+?)\s*$(\r?\n)*/m, (match, heading: string) =>
    norm(heading) === target ? '' : match,
  )
}
