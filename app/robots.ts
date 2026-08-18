import type { MetadataRoute } from 'next'

const SITE_ORIGIN = 'https://coopventilationcalc.com'

// The site's thesis is AI-answer-engine citation, so the major AI crawlers get
// explicit Allow rules (same /api/ and /go/ disallows) alongside the wildcard.
//
// Two classes here, and BOTH must stay named. The training/index crawlers
// (GPTBot, ClaudeBot, CCBot, Google-Extended) build the corpus; the search-time
// fetchers (OAI-SearchBot, ChatGPT-User, Claude-SearchBot, Perplexity-User) are
// what actually retrieve a page to cite it in a live answer. They resolve to
// Allow via `*` today, so naming them changes nothing right now — the point is
// that if the wildcard group is ever tightened, the citation-time fetchers keep
// access instead of silently losing it while the training bots keep theirs.
const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'CCBot',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/go/'],
      },
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: '/',
        disallow: ['/api/', '/go/'],
      })),
    ],
    sitemap: `${SITE_ORIGIN}/sitemap.xml`,
    host: SITE_ORIGIN,
  }
}
