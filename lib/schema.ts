// Centralized JSON-LD entity infrastructure for coopventilationcalc.
// AEO layer: Organization is the publisher entity that binds E-E-A-T across the site.
// Uses @id so Article/WebSite/SoftwareApplication can reference one shared org node.
// No geo and no personal data. The author entity is the organisation, not a person.

export const SITE_ORIGIN = 'https://coopventilationcalc.com'

export const ORG_ID = `${SITE_ORIGIN}/#organization`
export const WEBSITE_ID = `${SITE_ORIGIN}/#website`
export const WEBPAGE_ID = `${SITE_ORIGIN}/#webpage`
export const SOFTWARE_APP_ID = `${SITE_ORIGIN}/#calculator`
// The hero photograph as an entity. The homepage emits a second, richer
// ImageObject (Pexels licence, creator, dimensions) as its own script block;
// both carry this same @id so a consumer merges them into ONE image entity
// instead of seeing an unlinked licence node next to a bare url. Sharing an
// @id is deliberately used here rather than a one-way reference, because the
// licence node is conditional on the hero resolving — a reference would dangle
// if it ever did not.
export const HERO_IMAGE_ID = `${SITE_ORIGIN}/#primaryimage`

// Shared hero/og:image. Blog posts inherit this via the layout openGraph image,
// so BlogPosting.image points at the same absolute URL the page emits as og:image.
export const HERO_IMAGE_URL = `${SITE_ORIGIN}/images/hero/hero-rustic-wooden-chicken-coop-exterior-golden-hour-6f9f.jpg`

// Resolve a possibly-relative image src to an absolute URL on this origin.
export function absoluteImageUrl(src?: string): string {
  if (!src) return HERO_IMAGE_URL
  if (/^https?:\/\//i.test(src)) return src
  return `${SITE_ORIGIN}${src.startsWith('/') ? '' : '/'}${src}`
}

// Publisher / Organization node. Referenced by @id everywhere else.
export const organizationNode = {
  '@type': 'Organization',
  '@id': ORG_ID,
  name: 'Coop Ventilation Calculator',
  url: SITE_ORIGIN,
  description:
    'A free reference for backyard chicken keepers that sizes coop ventilation from cooperative-extension service formulas.',
  // Must be the actual brand mark (public/logo.png, the louver-grille vent
  // logo), NOT the hero photograph. Google's logo guidance expects a real logo;
  // a stock photo in this slot is a wrong value, not just an odd choice.
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_ORIGIN}/logo.png`,
    width: 754,
    height: 174,
  },
}

export const websiteNode = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  name: 'Coop Ventilation Calculator',
  url: SITE_ORIGIN,
  description:
    'Free calculator for backyard chicken keepers. Sized off extension-service formulas.',
  publisher: { '@id': ORG_ID },
}

// WebPage node for the homepage "/". Binds the page to the WebSite and points
// `about` at the calculator SoftwareApplication (which carries SOFTWARE_APP_ID).
export const webPageNode = {
  '@type': 'WebPage',
  '@id': WEBPAGE_ID,
  url: `${SITE_ORIGIN}/`,
  name: 'Chicken Coop Ventilation Calculator',
  description:
    'Free chicken coop ventilation calculator. Size the exact airflow, vent area, and inlet/outlet split for your flock, from cooperative-extension formulas.',
  isPartOf: { '@id': WEBSITE_ID },
  about: { '@id': SOFTWARE_APP_ID },
  primaryImageOfPage: { '@type': 'ImageObject', '@id': HERO_IMAGE_ID, url: HERO_IMAGE_URL },
}

// Article (BlogPosting) node for a blog post, bound to the org as both author and publisher.
export function articleNode(opts: {
  slug: string
  title: string
  description: string
  datePublished?: string
  dateModified?: string
  imageUrl?: string
}) {
  const url = `${SITE_ORIGIN}/blog/${opts.slug}`
  const node: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}/#article`,
    headline: opts.title,
    description: opts.description,
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    isPartOf: { '@id': WEBSITE_ID },
    author: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
  }
  if (opts.datePublished) node.datePublished = opts.datePublished
  // dateModified mirrors datePublished until a post carries a real edit date.
  // Deliberately NO `new Date()` fallback: a build-time stamp here would be a
  // fabricated modification date that advances on every deploy, which Google
  // discounts site-wide. Understating freshness is the safe direction.
  const modified = opts.dateModified || opts.datePublished
  if (modified) node.dateModified = modified
  if (opts.imageUrl) node.image = opts.imageUrl
  return node
}

export function breadcrumbNode(slug: string, title: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_ORIGIN },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: `${SITE_ORIGIN}/blog` },
      { '@type': 'ListItem', position: 3, name: title, item: `${SITE_ORIGIN}/blog/${slug}` },
    ],
  }
}

// BreadcrumbList for the /blog index page (Home > Guides). Mirrors the naming the
// per-post breadcrumb uses for the /blog crumb and the visible "Guides" H1.
export function blogIndexBreadcrumbNode() {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_ORIGIN },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: `${SITE_ORIGIN}/blog` },
    ],
  }
}

// Strip the inline markdown a rendered FAQ answer would show as plain text, so
// the JSON-LD answer text matches the on-page visible text (Google requirement).
function stripInlineMarkdown(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1') // [label](url) -> label
    .replace(/\*\*([^*]+)\*\*/g, '$1') // **bold** -> bold
    .replace(/(?<!\*)\*(?!\*)([^*]+)\*(?!\*)/g, '$1') // *italic* -> italic
    .replace(/`([^`]+)`/g, '$1') // `code` -> code
    .replace(/^\s*[-*]\s+/gm, '') // list bullet markers
    .replace(/^\s*\d+\.\s+/gm, '') // ordered list markers
    .trim()
}

// Normalize a raw markdown answer block into readable plain text: collapse each
// wrapped paragraph to single-spaced, keep paragraph breaks between them.
function answerToPlainText(raw: string): string {
  return raw
    .split(/\n\s*\n/)
    .map((para) => stripInlineMarkdown(para).replace(/\s*\n\s*/g, ' ').replace(/\s{2,}/g, ' ').trim())
    .filter(Boolean)
    .join('\n\n')
    .trim()
}

// Parse a post's markdown body for a visible FAQ section and, if present, build
// a FAQPage node whose Q&A text matches the rendered on-page FAQ. Returns null
// when the post has no FAQ section. Handles both authored formats:
//   A) "## FAQ" heading with "### Question" subheads
//   B) "## Frequently Asked Questions" heading with "**Question?**" bold lines
// `pageUrl` binds the FAQPage into the page's @id graph. Without it the node is
// an orphan root: a second page-level type claiming the same URL as BlogPosting
// with no stated relationship between them. Optional so callers that only want
// the parsed Q&A keep working.
export function faqPageNode(body: string, pageUrl?: string): Record<string, unknown> | null {
  const lines = body.split('\n')
  // Locate the FAQ section heading (level-2).
  let start = -1
  for (let i = 0; i < lines.length; i++) {
    if (/^##\s+(FAQ|Frequently Asked Questions)\s*$/i.test(lines[i].trim())) {
      start = i + 1
      break
    }
  }
  if (start === -1) return null

  // Section ends at the next level-2 heading or end of body.
  let end = lines.length
  for (let i = start; i < lines.length; i++) {
    if (/^##\s+/.test(lines[i]) && !/^###/.test(lines[i])) {
      end = i
      break
    }
  }

  const section = lines.slice(start, end)
  const isBoldQuestion = (l: string) => /^\*\*[^*].*\?\*\*$/.test(l.trim())
  const isHeadingQuestion = (l: string) => /^###\s+.+/.test(l.trim())

  const qa: { q: string; a: string }[] = []
  let currentQ: string | null = null
  let answerBuf: string[] = []

  const flush = () => {
    if (currentQ !== null) {
      const a = answerToPlainText(answerBuf.join('\n'))
      if (a) qa.push({ q: currentQ, a })
    }
    answerBuf = []
  }

  for (const line of section) {
    const t = line.trim()
    if (isHeadingQuestion(t)) {
      flush()
      currentQ = stripInlineMarkdown(t.replace(/^###\s+/, '').trim())
    } else if (isBoldQuestion(t)) {
      flush()
      currentQ = stripInlineMarkdown(t.replace(/^\*\*/, '').replace(/\*\*$/, '').trim())
    } else if (currentQ !== null) {
      answerBuf.push(line)
    }
  }
  flush()

  if (qa.length === 0) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    ...(pageUrl
      ? { '@id': `${pageUrl}#faq`, url: pageUrl, isPartOf: { '@id': pageUrl } }
      : {}),
    mainEntity: qa.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }
}
