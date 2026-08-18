import type { Faq } from '@/lib/faqs'
import { SITE_ORIGIN, WEBPAGE_ID } from '@/lib/schema'

// FAQPage JSON-LD per SEO-BRIEF.md. Renders a script tag with structured
// data for AI citation anchoring.
//
// Note on rich results: Google restricted FAQ rich results to government and
// healthcare sites in Aug 2023, so this will not produce one here. It stays
// because FAQPage is this site's strongest answer-engine citation surface.
//
// The @id + isPartOf are load-bearing: without them this node was an orphan
// root, floating alongside the homepage @graph with nothing tying it to the
// page it describes.
export function FaqJsonLd({ faqs }: { faqs: Faq[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SITE_ORIGIN}/#faq`,
    url: `${SITE_ORIGIN}/`,
    isPartOf: { '@id': WEBPAGE_ID },
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
