import type { NextConfig } from 'next'

// Content-Security-Policy is intentionally permissive on script/style sources
// because the app loads inline analytics snippets (PostHog, GA4) and third-party
// scripts (Google Tag Manager, AdSense) that have no per-request nonce. The
// policy still hardens the high-value vectors: clickjacking (frame-ancestors),
// plugin/object injection (object-src none), and base-tag hijacking (base-uri).
// Origins map to what the site actually loads: Google Analytics / Tag Manager,
// Google AdSense, PostHog, and same-origin Pexels imagery.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://www.googletagservices.com https://us.i.posthog.com https://us-assets.i.posthog.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data: https://fonts.gstatic.com",
  "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://us.i.posthog.com https://us-assets.i.posthog.com https://pagead2.googlesyndication.com",
  "frame-src 'self' https://googleads.g.doubleclick.net https://www.google.com https://tpc.googlesyndication.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  'upgrade-insecure-requests',
].join('; ')

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
  },
]

const config: NextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  typedRoutes: true,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
  async redirects() {
    return [
      {
        // Canonical host is the apex. Send www to apex with a 308 so link
        // equity and canonicals consolidate on one hostname.
        source: '/:path*',
        has: [{ type: 'host', value: 'www.coopventilationcalc.com' }],
        destination: 'https://coopventilationcalc.com/:path*',
        permanent: true,
      },
      // Ventilation cluster merge: two thin guides were folded into
      // /blog/chicken-coop-ventilation-requirements, so the ranking signal from
      // the retired URLs consolidates on the surviving guide. statusCode: 301
      // rather than permanent: true, which Next emits as a 308 -- equivalent to
      // Google but not what every SEO crawler and log report expects to see.
      {
        source: '/blog/ventilation-basics',
        destination: '/blog/chicken-coop-ventilation-requirements',
        statusCode: 301,
      },
      {
        source: '/blog/how-much-ventilation-does-a-chicken-coop-need',
        destination: '/blog/chicken-coop-ventilation-requirements',
        statusCode: 301,
      },
      // Near-miss slugs that 404. Each drew a Search Console impression in the
      // 30 days to 2026-09-18 despite never having existed on this site and
      // never appearing in the sitemap, so something external -- most likely an
      // answer engine composing a plausible-looking URL -- is sending traffic
      // at a guess. The guess is one token away from a real guide in every
      // case, so point each at the page the visitor was actually after rather
      // than leaving a dead end. Volume is ~1 impression each: this is index
      // hygiene and citation recovery, not a traffic play.
      {
        source: '/blog/coop-ventilation-requirements',
        destination: '/blog/chicken-coop-ventilation-requirements',
        statusCode: 301,
      },
      {
        source: '/blog/chicken-tax-ventilation-requirements',
        destination: '/blog/chicken-coop-ventilation-requirements',
        statusCode: 301,
      },
      {
        source: '/blog/coop-vent-sizing-recommendations',
        destination: '/blog/chicken-coop-vent-sizing-recommendations',
        statusCode: 301,
      },
      {
        source: '/blog/signs-of-ventilation-in-chicken-coop',
        destination: '/blog/signs-of-poor-ventilation-in-chicken-coop',
        statusCode: 301,
      },
    ]
  },
}

export default config
