import Link from 'next/link'
import Image from 'next/image'
import { Calculator } from '@/components/Calculator'
import { AffiliateProducts } from '@/components/AffiliateProducts'
import { EmailCapture } from '@/components/EmailCapture'
import { FaqJsonLd } from '@/components/FaqJsonLd'
import { AdSlot } from '@/components/AdSlot'
import { Sources } from '@/components/Sources'
import { faqsForHomepage } from '@/lib/faqs'
import { recentPosts } from '@/lib/posts'
import { hero, byBucket } from '@/lib/images'
import { sources, lastReviewed } from '@/lib/sources'
import {
  organizationNode,
  websiteNode,
  webPageNode,
  ORG_ID,
  SOFTWARE_APP_ID,
  HERO_IMAGE_ID,
} from '@/lib/schema'

// calculator-tool homepage. Section order per template-rules:
// 1. Hero (H1 + calculator above fold)
// 2. Calculator with showRelated
// 3. Stat band (4 numbers)
// 4. How it works
// 5. Sources
// 6. FAQ
// 7. Blog teaser (≥3 /blog/ links)
// 8. Email capture

export const metadata = {
  // Emits `https://coopventilationcalc.com` (no trailing slash) — Next strips a
  // trailing slash from canonical URLs unless `trailingSlash: true` is set
  // globally, so passing the slashed absolute form here does NOT survive the
  // build. The sitemap is aligned to this form instead (see app/sitemap.ts);
  // do not "fix" it here, it will silently no-op.
  alternates: { canonical: '/' },
}

const STATS = [
  { num: '5', unit: 'CFM', label: 'summer airflow target per bird in CFM (cubic feet per minute), per UKy ID-204' },
  { num: '1', unit: 'CFM', label: 'winter airflow per bird for moisture removal, per PSU 1083' },
  { num: '144', unit: 'sq in', label: 'vent area in square inches per 10 sq ft of coop floor, per U Maine 2227' },
  { num: '50', unit: '/ 50', label: 'split between low inlets and high outlets, per PSU 1083' },
]

const HOW_IT_WORKS = [
  {
    n: '01',
    h: 'Tell us your flock and floor',
    p: 'Enter how many birds you keep and how much floor area is in the coop. Standard hens default; if you keep bantams or heavy breeds, the climate selector adjusts the math.',
  },
  {
    n: '02',
    h: 'We size to extension-service formulas',
    p: 'The calculator runs the University of Kentucky 5-CFM-per-bird summer rule (CFM = cubic feet per minute, the standard airflow measurement) against the U Maine 144-square-inches-per-10-sq-ft floor rule and takes the larger of the two, climate-adjusted.',
  },
  {
    n: '03',
    h: 'You get inlet and outlet square inches',
    p: 'The result splits total vent area roughly half low inlets and half high outlets. That is the actual hardware target you can buy and frame in.',
  },
  {
    n: '04',
    h: 'Hardware that fits the result',
    p: 'Below the result we show three pieces of vent hardware sized to your flock and climate. Affiliate links to Amazon, picked for fit, not commission.',
  },
]

export default function HomePage() {
  const heroImg = hero()
  const detailImg = byBucket('detail')[0]

  // Entity graph: one Organization node, referenced by @id from WebSite +
  // SoftwareApplication. Binds the publisher entity across the whole site (AEO E-E-A-T).
  const graphJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      organizationNode,
      websiteNode,
      webPageNode,
      {
        '@type': 'SoftwareApplication',
        '@id': SOFTWARE_APP_ID,
        name: 'Coop Ventilation Calculator',
        // The node states what the tool returns. Without this the calculator
        // entity carried only a name and a category, so anything reading the
        // graph alone (rather than the rendered page) had nothing describing
        // what it computes.
        description:
          'Sizes chicken coop ventilation from flock size, coop floor area, and climate. Returns the airflow target in CFM, the total vent area in square inches, and the split between the low inlet and the high outlet.',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Web',
        url: 'https://coopventilationcalc.com',
        publisher: { '@id': ORG_ID },
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      },
    ],
  }
  const heroImageJsonLd = heroImg && {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    // Same @id as WebPage.primaryImageOfPage, so the licence/creator metadata
    // below merges into that image entity rather than floating unreferenced.
    '@id': HERO_IMAGE_ID,
    contentUrl: `https://coopventilationcalc.com${heroImg.localPath}`,
    url: `https://coopventilationcalc.com${heroImg.localPath}`,
    width: heroImg.width,
    height: heroImg.height,
    caption: heroImg.alt,
    creditText: heroImg.photographer || 'Pexels',
    creator: heroImg.photographer
      ? { '@type': 'Person', name: heroImg.photographer, url: heroImg.photographerUrl }
      : undefined,
    license: heroImg.pexelsUrl,
    acquireLicensePage: 'https://www.pexels.com/license/',
  }

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graphJsonLd) }} />
      {heroImageJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(heroImageJsonLd) }} />
      )}
      <FaqJsonLd faqs={faqsForHomepage} />

      {/* MASTHEAD STRIP — publication metadata, NOT an eyebrow */}
      <section className="mx-auto max-w-[1320px] px-5 sm:px-12 pt-10 sm:pt-14 pb-5 border-b border-[var(--color-line)]">
        <div className="flex flex-wrap justify-between gap-4 text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.15em] text-[var(--color-ink-soft)]">
          <span>The backyard flock-keeper&apos;s reference</span>
          <span className="text-[var(--color-accent-deep)]">Issue №1 · Ventilation · 2026</span>
          <span>Free · sourced · no email required</span>
        </div>
      </section>

      {/* HERO — H1 stands alone, calculator visible right column on desktop */}
      <section className="mx-auto max-w-[1320px] px-5 sm:px-12 pt-8 pb-16 grid gap-12 lg:grid-cols-[1.2fr_1fr] items-start">
        <div>
          <h1 className="font-display text-[28px] sm:text-[44px] md:text-[60px] lg:text-[72px] xl:text-[92px] leading-[1.02] sm:leading-[1] tracking-[-0.02em] text-[var(--color-ink)]">
            How much air does <em className="font-display italic text-[var(--color-accent-deep)]">your coop</em> actually need?
          </h1>
          <p className="mt-3 font-script text-2xl sm:text-3xl text-[var(--color-accent)]" style={{transform:'rotate(-2deg)', display:'inline-block'}}>
            in plain numbers ↓
          </p>
          <p className="mt-6 max-w-xl text-lg leading-[1.55] text-[var(--color-ink-soft)] border-t border-[var(--color-line)] pt-5">
            <strong className="text-[var(--color-ink)] font-semibold">A free chicken coop ventilation calculator for backyard keepers.</strong>{' '}
            Tell it your flock size and your climate. Get the airflow target, the vent area, and the inlet and outlet split that fit. Built on University of Kentucky and Penn State extension-service formulas, not forum hearsay.
          </p>

          <div className="mt-9 grid grid-cols-1 sm:grid-cols-3 border-y-2 border-[var(--color-ink)]">
            {STATS.slice(0, 3).map((s, i) => (
              <div key={i} className={`p-5 ${i < 2 ? 'sm:border-r border-[var(--color-line)] border-b sm:border-b-0' : ''}`}>
                <p className="font-display text-5xl leading-none text-[var(--color-ink)]">
                  {s.num}<small className="text-lg text-[var(--color-accent-deep)] ml-1 font-display">{s.unit}</small>
                </p>
                <p className="mt-2 text-xs leading-[1.4] text-[var(--color-ink-soft)]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {heroImg && (
            <figure className="relative overflow-hidden poster-card" style={{ height: 280, padding: 0 }}>
              <Image
                src={heroImg.localPath}
                alt={heroImg.alt}
                width={heroImg.width}
                height={heroImg.height}
                priority
                className="w-full h-full object-cover"
                style={{ filter: 'contrast(1.05) saturate(0.95)' }}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(180deg, rgba(26,27,23,0) 55%, rgba(26,27,23,0.55) 100%)',
                }}
              />
              <figcaption
                className="absolute bottom-3 left-4 right-4 font-script text-lg leading-tight text-[var(--color-paper)]"
                style={{ textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}
              >
                A typical backyard coop, the configuration the calculator was built around.
              </figcaption>
            </figure>
          )}

          <div id="calculator">
            <Calculator showRelated={true} />
          </div>

          {/* secondary inline email capture — printable PDF checklist lead magnet */}
          <div className="border-2 border-[var(--color-ink)] bg-[var(--color-paper)] p-5">
            <p className="font-display text-xl leading-tight">
              Or grab the printable ventilation checklist (PDF).
            </p>
            <p className="mt-2 text-sm text-[var(--color-ink-soft)]">
              One-page PDF guide, eight common flock sizes, all the seasonal targets. We email it instantly.
            </p>
            <div className="mt-3">
              <EmailCapture />
            </div>
          </div>
        </div>
      </section>

      {/* WHY IT MATTERS / EXPANDED STAT band — paper-2 inset */}
      <section className="bg-[var(--color-paper-2)] border-y-2 border-[var(--color-ink)]">
        <div className="mx-auto max-w-[1320px] px-5 sm:px-12 py-16">
          <h2 className="font-display text-3xl sm:text-4xl leading-[1.05] tracking-[-0.015em] max-w-2xl">
            What are the ventilation requirements for a chicken coop?
          </h2>
          <p className="mt-5 max-w-2xl text-[17px] leading-[1.6] text-[var(--color-ink-soft)]">
            A backyard chicken coop needs about 5 CFM of airflow per adult standard hen in summer and 1 CFM per bird in winter, with total vent area of roughly 144 square inches per 10 square feet of coop floor, split half low inlets and half high outlets. Most failing winter coops are not too cold, they are too humid: birds exhale water vapor and droppings release ammonia, and a sealed coop holds both at roost height. Frostbite, pasty combs, and respiratory illness almost always trace back to undersized vent area, not undersized insulation. The numbers below are the floor every backyard coop should clear.
          </p>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-0 border-2 border-[var(--color-ink)] bg-[var(--color-paper)]">
            {STATS.map((s, i) => (
              <div key={i} className={`p-6 ${i < 3 ? 'border-b sm:border-b-0 sm:border-r border-[var(--color-line)]' : ''} ${i === 1 ? 'border-b sm:border-b-2 lg:border-b-0' : ''}`}>
                <p className="font-display text-5xl leading-none text-[var(--color-ink)]">
                  {s.num}<small className="text-lg text-[var(--color-accent-deep)] ml-1 font-display">{s.unit}</small>
                </p>
                <p className="mt-3 text-sm leading-[1.45] text-[var(--color-ink-soft)]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="mx-auto max-w-[1320px] px-5 sm:px-12 py-20">
        <h2 className="font-display text-3xl sm:text-4xl leading-[1.05] tracking-[-0.015em] max-w-2xl">
          How the calculator works.
        </h2>
        <p className="mt-4 max-w-xl text-base text-[var(--color-ink-soft)]">
          Four steps. The math is shown next to the result so you can check our work.
        </p>

        <ol className="mt-10 grid gap-8 sm:grid-cols-2">
          {HOW_IT_WORKS.map((step) => (
            <li key={step.n} className="flex gap-5 border-t border-[var(--color-line)] pt-6">
              <span className="font-display text-4xl text-[var(--color-accent)] leading-none flex-shrink-0">
                {step.n}
              </span>
              <div>
                <h3 className="font-display text-xl text-[var(--color-ink)] leading-tight">{step.h}</h3>
                <p className="mt-2 text-[15px] leading-[1.55] text-[var(--color-ink-soft)]">{step.p}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* SOURCES — almanac dark band */}
      <section id="sources" className="bg-[var(--color-ink)] text-[var(--color-paper)] py-20 double-rule">
        <div className="mx-auto max-w-[1320px] px-5 sm:px-12 grid gap-12 lg:grid-cols-2 items-start">
          <div>
            <h2 className="font-display text-4xl sm:text-5xl leading-[1.05] tracking-[-0.02em]">
              Sourced from <em className="italic text-[var(--color-accent)]">named</em> extension-service publications.
            </h2>
            <p className="mt-5 text-[17px] leading-[1.6] opacity-80 max-w-md">
              The formulas in this calculator come from cooperative-extension docs your county vet would point to. Every result page shows the source next to the math. Check our work, then go buy the right vent.
            </p>
          </div>
          <div>
            {sources.map((src, i) => (
              <div
                key={src.url}
                className="grid grid-cols-[auto_1fr] gap-5 items-baseline py-4 border-b border-dashed border-[var(--color-paper)]/25"
              >
                <span className="font-display text-2xl text-[var(--color-accent)]">{String(i + 1).padStart(2, '0')}</span>
                <div className="text-[14px] leading-[1.5]">
                  <a href={src.url} target="_blank" rel="noopener" className="font-semibold hover:text-[var(--color-accent)]">
                    {src.label}
                  </a>
                </div>
              </div>
            ))}
            <p className="mt-5 text-xs uppercase tracking-[0.12em] opacity-60">Last reviewed {lastReviewed}</p>
          </div>
        </div>
      </section>

      {/* AdSlot wired but renders null pre-traffic threshold */}
      <AdSlot slotId="below-sources" size="leaderboard" />

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-[1320px] px-5 sm:px-12 py-20">
        <h2 className="font-display text-3xl sm:text-4xl leading-[1.05] tracking-[-0.015em] max-w-2xl">
          How much ventilation does a chicken coop need? Common questions, answered.
        </h2>
        <p className="mt-4 max-w-xl text-base text-[var(--color-ink-soft)]">
          The questions backyard keepers actually ask, answered with numbers from the same sources the calculator uses.
        </p>

        <div className="mt-10 border-y-2 border-[var(--color-ink)] divide-y divide-[var(--color-line)]">
          {faqsForHomepage.map((f, i) => (
            <details key={i} className="group py-5">
              <summary className="cursor-pointer list-none flex items-baseline justify-between gap-6">
                <span className="font-display text-xl sm:text-2xl text-[var(--color-ink)] leading-tight">{f.q}</span>
                <span className="font-display text-2xl text-[var(--color-accent)] group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-4 max-w-3xl text-[16px] leading-[1.65] text-[var(--color-ink-soft)]">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* BLOG TEASER — ≥3 /blog/ links */}
      <section className="bg-[var(--color-paper-3)] border-y-2 border-[var(--color-ink)]">
        <div className="mx-auto max-w-[1320px] px-5 sm:px-12 py-16">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <h2 className="font-display text-3xl sm:text-4xl leading-[1.05] tracking-[-0.015em] max-w-2xl">
              Guides for the questions the calculator does not answer.
            </h2>
            <Link
              href="/blog"
              className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-ink)] border-b-2 border-[var(--color-ink)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent-deep)] pb-0.5"
            >
              All guides →
            </Link>
          </div>

          {/* literal-href quick-pick row — also satisfies SEO internal-link spec */}
          <div className="mb-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[var(--color-ink-soft)]">
            <span className="font-semibold uppercase tracking-[0.1em] text-xs">Start here:</span>
            <Link href="/blog/chicken-coop-ventilation-requirements" className="underline decoration-[var(--color-line)] underline-offset-4 hover:text-[var(--color-accent-deep)]">Coop ventilation requirements</Link>
            <Link href="/blog/coop-size-calculator" className="underline decoration-[var(--color-line)] underline-offset-4 hover:text-[var(--color-accent-deep)]">What size coop you need</Link>
            <Link href="/blog/chicken-coop-ventilation-sq-ft" className="underline decoration-[var(--color-line)] underline-offset-4 hover:text-[var(--color-accent-deep)]">Vent area per square foot</Link>
            <Link href="/blog/winter-ventilation-without-drafts" className="underline decoration-[var(--color-line)] underline-offset-4 hover:text-[var(--color-accent-deep)]">Winter without drafts</Link>
            <Link href="/blog/summer-heat-stress" className="underline decoration-[var(--color-line)] underline-offset-4 hover:text-[var(--color-accent-deep)]">Summer heat stress</Link>
            <Link href="/blog/ammonia-and-moisture" className="underline decoration-[var(--color-line)] underline-offset-4 hover:text-[var(--color-accent-deep)]">Fixing ammonia smell</Link>
          </div>

          <ul className="grid gap-0 md:grid-cols-3 border-2 border-[var(--color-ink)] bg-[var(--color-paper)]">
            {recentPosts.slice(0, 6).map((p, i) => (
              <li key={p.slug} className={`${i < 5 ? 'border-b md:border-b-0 border-[var(--color-line)]' : ''} ${i % 3 !== 2 ? 'md:border-r border-[var(--color-line)]' : ''} ${i >= 3 ? 'md:border-t' : ''}`}>
                <Link href={`/blog/${p.slug}`} className="block p-6 hover:bg-[var(--color-paper-2)]/60 h-full transition-colors">
                  <p className="font-display text-xl leading-tight text-[var(--color-ink)]">{p.title}</p>
                  <p className="mt-3 text-sm leading-[1.55] text-[var(--color-ink-soft)]">{p.description}</p>
                  <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--color-accent-deep)]">Read guide →</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* RECOMMENDED HARDWARE — always-visible affiliate surface (homepage variant) */}
      <section id="recommended-hardware" className="mx-auto max-w-[1320px] px-5 sm:px-12 py-20">
        <h2 className="font-display text-3xl sm:text-4xl leading-[1.05] tracking-[-0.015em] max-w-2xl">
          Recommended hardware.
        </h2>
        <p className="mt-4 max-w-xl text-base text-[var(--color-ink-soft)]">
          The vents and fans that fit most backyard coops, picked from the same shortlist the calculator pulls from after you run the numbers. Sized to span the typical 4-to-15 bird range.
        </p>
        <AffiliateProducts max={6} showHeading={false} />
      </section>

      {/* EMAIL CAPTURE */}
      <section className="mx-auto max-w-[1320px] px-5 sm:px-12 py-20">
        <div className="poster-card p-8 sm:p-12 grid gap-10 lg:grid-cols-[1.3fr_1fr] items-center">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl leading-[1.05] tracking-[-0.015em]">
              Get the printable coop ventilation checklist.
            </h2>
            <p className="mt-4 text-[16px] leading-[1.6] text-[var(--color-ink-soft)] max-w-xl">
              A one-page PDF with the CFM and vent area targets for the eight most-common backyard flock sizes, plus the seasonal adjustments. Drop your email and we send it. We follow up only when a new calculator or guide ships.
            </p>
          </div>
          <div>
            <p className="font-script text-2xl text-[var(--color-accent)] mb-2" style={{transform:'rotate(-2deg)', display:'inline-block'}}>
              free, no spam ↓
            </p>
            <EmailCapture />
            <p className="mt-3 text-xs text-[var(--color-ink-soft)]">
              We send the checklist immediately and roughly one short note a month after. Unsubscribe in one click.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
