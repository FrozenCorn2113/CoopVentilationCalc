import type { Metadata } from 'next'
import { pageTitle, clampDescription } from '@/lib/site'
import { TrustMarkdown } from '@/components/TrustMarkdown'

export const metadata: Metadata = {
  title: { absolute: pageTitle("About") },
  description: clampDescription(
    "Coop Ventilation Calculator is a free tool for backyard chicken keepers, published by Yellowbird Company. How it works, where the numbers come from, and how the site is funded.",
  ),
  alternates: { canonical: '/about' },
}

const body = "Coop Ventilation Calculator is a free tool that tells backyard chicken keepers how much airflow and vent area their coop needs, and how to split it between low inlets and high outlets. It is published by **Yellowbird Company**.\n\n## What the calculator does\n\nEnter your flock size and coop details and the calculator returns a summer and winter airflow target and the vent area to match. The figures follow the same rules everywhere on the site:\n\n- **Summer:** 5 CFM (cubic feet per minute) of airflow per bird.\n- **Winter:** 1 CFM per bird. Enough to clear moisture and ammonia without a draft at roost height.\n- **Vent area:** split 50/50 between inlets and outlets.\n\nThese targets come from cooperative-extension guidance on poultry housing, not forum rules of thumb. Each guide lists the sources it relies on.\n\n## Who it is for\n\nBackyard and small-homestead flocks. The calculator is not designed for commercial poultry houses, which need engineered ventilation systems.\n\n## A note on limits\n\nThe calculator gives a starting point, not a guarantee. Climate, coop design, flock health and local conditions all matter. If your birds show signs of respiratory trouble, frostbite or heat stress, talk to a veterinarian or your local extension office.\n\n## How the site is funded\n\nThe calculator and guides are free. Some product recommendations are affiliate links: if you buy through one, we may earn a commission at no extra cost to you. Recommendations are chosen to match the calculator's output, not by commission rate. Read the full [affiliate disclosure](/privacy#affiliate-disclosure).\n\n## Corrections and contact\n\nIf you spot an error in a number or a guide, tell us and we will check it against the source and fix it. Email [Brett@yellowbirdcompany.com](mailto:Brett@yellowbirdcompany.com) or see the [contact page](/contact).\n"

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-[760px] px-5 sm:px-12 py-16">
      <h1 className="font-display text-4xl sm:text-5xl leading-[1.05] tracking-[-0.02em] text-[var(--color-ink)] mb-8">
        About Coop Ventilation Calculator
      </h1>
      <TrustMarkdown>{body}</TrustMarkdown>
    </main>
  )
}
