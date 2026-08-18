import type { Metadata } from 'next'
import Script from 'next/script'
// PostHog analytics is initialized inside <Analytics /> (components/Analytics.tsx)
import { Analytics } from '@/components/Analytics'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { DM_Serif_Display, Work_Sans, Caveat } from 'next/font/google'
import './globals.css'

// Photo credits: Pexels (pexels.com) — see public/images/manifest.json

const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-display-loaded',
  display: 'swap',
})
const workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body-loaded',
  display: 'swap',
})
const caveat = Caveat({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-script-loaded',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://coopventilationcalc.com'),
  title: {
    default: 'Chicken Coop Ventilation Calculator — Air Your Coop Needs',
    template: '%s · Coop Vent Calc',
  },
  description:
    'Free chicken coop ventilation calculator. Size the exact airflow, vent area, and inlet/outlet split for your flock, from cooperative-extension formulas.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: 'Coop Ventilation Calculator',
    images: [
      {
        url: '/images/hero/hero-rustic-wooden-chicken-coop-exterior-golden-hour-6f9f.jpg',
        width: 1260,
        height: 750,
        alt: 'Rustic wooden chicken coop at golden hour with hens on a small homestead',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [
      '/images/hero/hero-rustic-wooden-chicken-coop-exterior-golden-hour-6f9f.jpg',
    ],
  },
  other: {
    'image-credit': 'Photos provided by Pexels (pexels.com)',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${dmSerif.variable} ${workSans.variable} ${caveat.variable}`}
      style={{
        ['--font-display' as string]: `var(--font-display-loaded), 'DM Serif Display', Georgia, serif`,
        ['--font-body' as string]: `var(--font-body-loaded), 'Work Sans', system-ui, sans-serif`,
        ['--font-script' as string]: `var(--font-script-loaded), 'Caveat', cursive`,
      }}
    >
      <body>
        {/* PostHog. Kept inside <body> — a <script> placed
            directly between <html> and <body> is hoisted by the browser at parse
            time, which desyncs SSR vs client and throws a hydration error. */}
        <Script id="posthog-snippet" strategy="afterInteractive">{`!function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);posthog.init('phc_pjLjjTpdRkZQEUNyfsNBatnniAnqd98UxfxUL5gvDQgB',{api_host:'https://us.i.posthog.com'});`}</Script>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-ZB2XBV50VJ"
          strategy="afterInteractive"
        />
        <Script id="ga4" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-ZB2XBV50VJ');
        `}</Script>
        <Analytics />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
