import type { Metadata } from 'next'
import { pageTitle, clampDescription } from '@/lib/site'
import { TrustMarkdown } from '@/components/TrustMarkdown'

export const metadata: Metadata = {
  title: { absolute: pageTitle("Contact") },
  description: clampDescription(
    "Contact Yellowbird Company, publisher of Coop Ventilation Calculator, for questions, corrections, and sponsor or affiliate partnership inquiries.",
  ),
  alternates: { canonical: '/contact' },
}

const body = "Coop Ventilation Calculator is published by **Yellowbird Company**.\n\n**Email:** [Brett@yellowbirdcompany.com](mailto:Brett@yellowbirdcompany.com)\n\n## Questions and corrections\n\nFound a number that looks wrong, or a guide that could be clearer? Email us with the page link and what you noticed. We read every message and correct confirmed errors.\n\nWe can't give veterinary advice. For sick or injured birds, contact a veterinarian or your local extension office.\n\n## Partnerships\n\nWe welcome inquiries from coop builders, ventilation and fan makers, coop door makers, and feed and bedding brands about **sponsorships** and **affiliate partnerships**. Email [Brett@yellowbirdcompany.com](mailto:Brett@yellowbirdcompany.com?subject=Partnership%20inquiry) with \"Partnership\" in the subject line. Sponsored placements are always labelled, and we only recommend products that fit the calculator's results.\n\n## Email list\n\nTo stop receiving our emails, use the unsubscribe link at the bottom of any message, or email us and we will remove you.\n"

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-[760px] px-5 sm:px-12 py-16">
      <h1 className="font-display text-4xl sm:text-5xl leading-[1.05] tracking-[-0.02em] text-[var(--color-ink)] mb-8">
        Contact
      </h1>
      <TrustMarkdown>{body}</TrustMarkdown>
    </main>
  )
}
