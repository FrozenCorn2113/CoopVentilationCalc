import Image from 'next/image'
import Link from 'next/link'
import { site } from '@/lib/site'

// Masthead-style header — printed-publication aesthetic. 2px ink bottom rule,
// brand lockup left with handwritten "vol. 1" accent, nav right with hover-rule.

export function Header() {
  return (
    <header className="sticky top-0 z-30 w-full border-b-2 border-[var(--color-ink)] bg-[var(--color-paper)]/95 backdrop-blur supports-[backdrop-filter]:bg-[var(--color-paper)]/85">
      <div className="mx-auto flex max-w-[1320px] items-center justify-between px-5 sm:px-12 py-4">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <Image
            src="/logo.png"
            alt={site.name}
            width={754}
            height={174}
            priority
            className="h-9 w-auto sm:h-11"
          />
          <span className="font-script text-base text-[var(--color-accent)] hidden sm:inline" style={{transform:'rotate(-3deg)', display:'inline-block'}}>vol. 1</span>
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-[12px] font-semibold uppercase tracking-[0.08em]">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[var(--color-ink)] border-b-2 border-transparent hover:border-[var(--color-accent)] pb-0.5 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
