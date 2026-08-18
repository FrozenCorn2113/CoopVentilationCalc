import Image from 'next/image'
import Link from 'next/link'
import { site } from '@/lib/site'

// Dark almanac footer with affiliate disclosure (required by revenue-rules/affiliate.md).

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="mt-24 bg-[var(--color-ink)] text-[var(--color-paper)]">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-12 py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <Image
              src="/logo-light.png"
              alt={site.name}
              width={754}
              height={174}
              className="h-11 w-auto"
            />
            <p className="mt-2 text-sm opacity-80 max-w-xs">
              A free reference for backyard flock-keepers. Built on cooperative-extension formulas, not forum hearsay.
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.15em] opacity-70 mb-3">Read</p>
            <ul className="space-y-2 text-sm">
              <li><Link href="/#calculator" className="hover:text-[var(--color-accent)]">Calculator</Link></li>
              <li><Link href="/#how-it-works" className="hover:text-[var(--color-accent)]">How it works</Link></li>
              <li><Link href="/#faq" className="hover:text-[var(--color-accent)]">FAQ</Link></li>
              <li><Link href="/blog" className="hover:text-[var(--color-accent)]">Guides</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.15em] opacity-70 mb-3">Disclosure</p>
            <p className="text-sm opacity-80 leading-relaxed">
              We earn from qualifying purchases as an Amazon affiliate. Recommended hardware
              uses affiliate links, marked <code className="font-mono text-xs">rel=&quot;sponsored&quot;</code>.
              Recommendations are picked for the calculator output, not by commission rate.
            </p>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-[var(--color-paper)]/20 flex flex-col sm:flex-row justify-between gap-3 text-xs opacity-70">
          <p>© {year} {site.name}. Independent. Free to use.</p>
          <p>Issue №1 · Ventilation · {year}</p>
        </div>
      </div>
    </footer>
  )
}
