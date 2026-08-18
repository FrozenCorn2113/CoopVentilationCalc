import Link from 'next/link'
import { allBlogPosts } from '@/lib/blog-posts'
import { pageTitle, clampDescription } from '@/lib/site'
import { blogIndexBreadcrumbNode, ORG_ID, WEBSITE_ID, SITE_ORIGIN } from '@/lib/schema'

export const metadata = {
  title: { absolute: pageTitle('Coop Ventilation Guides') },
  description: clampDescription(
    'Coop ventilation guides for backyard chicken keepers: airflow, vent placement, seasonal adjustments, and fan-vs-passive choices, from extension-service formulas.',
  ),
  alternates: { canonical: '/blog' },
}

// isPartOf/publisher reference the canonical @id nodes from lib/schema.ts rather
// than inlining copies. Inlining a second WebSite object here created a duplicate,
// unlinked WebSite entity in the site graph with nothing joining it to /#website.
const blogJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${SITE_ORIGIN}/blog#webpage`,
  name: 'Coop Ventilation Guides',
  url: `${SITE_ORIGIN}/blog`,
  description: 'Practical guides for backyard chicken keepers on coop airflow, vent placement, seasonal adjustments, and fan-vs-passive decisions.',
  isPartOf: { '@id': WEBSITE_ID },
  publisher: { '@id': ORG_ID },
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: allBlogPosts.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${SITE_ORIGIN}/blog/${p.slug}`,
      name: p.title,
    })),
  },
}

const blogBreadcrumb = blogIndexBreadcrumbNode()

export default function BlogIndex() {
  return (
    <main className="mx-auto max-w-3xl px-5 sm:px-12 py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogBreadcrumb) }} />
      <h1 className="font-display text-5xl sm:text-6xl leading-[0.95] tracking-[-0.02em] text-[var(--color-ink)]">
        Guides
      </h1>
      <p className="mt-5 text-lg text-[var(--color-ink-soft)] max-w-xl">
        Numbers-based reading on coop ventilation, sized off the same extension-service publications the calculator uses.
      </p>
      <ul className="mt-12 divide-y-2 divide-[var(--color-ink)] border-y-2 border-[var(--color-ink)]">
        {allBlogPosts.map((p) => (
          <li key={p.slug}>
            <Link href={`/blog/${p.slug}`} className="block py-6 hover:bg-[var(--color-paper-2)]/40 -mx-2 px-2 transition-colors">
              <p className="font-display text-2xl text-[var(--color-ink)]">{p.title}</p>
              <p className="mt-2 text-sm text-[var(--color-ink-soft)] max-w-2xl">{p.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
