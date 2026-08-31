'use client'

import * as React from 'react'

// Outbound Amazon link that reports the click before the browser leaves.
//
// PostHog is loaded by the snippet in app/layout.tsx, which installs a stub
// queue on window.posthog immediately and replays it once array.js lands, so
// capture() is safe to call from the first paint onward.
//
// Transport is sendBeacon: /go/<asin> is a full navigation to a 302, and a
// normal fetch is cancelled when the document unloads. A beacon survives it.
// The click is never blocked on the capture — if PostHog is absent or throws,
// the navigation still happens.

type PosthogLike = {
  capture: (
    event: string,
    properties?: Record<string, unknown>,
    options?: Record<string, unknown>,
  ) => void
}

export function AffiliateLink({
  asin,
  title,
  surface,
  children,
  className,
}: {
  asin: string
  title: string
  /** Which affiliate block the click came from: 'affiliate-products' | 'related-products'. */
  surface: string
  children: React.ReactNode
  className?: string
}) {
  const onClick = React.useCallback(() => {
    try {
      const ph = (window as unknown as { posthog?: PosthogLike }).posthog
      if (!ph || typeof ph.capture !== 'function') return
      ph.capture(
        'affiliate_click',
        {
          asin,
          product_title: title,
          surface,
          merchant: 'amazon',
          // The page the click fired from, not the /go/<asin> hop it lands on.
          page_path: window.location.pathname,
          page_url: window.location.href,
        },
        // send_instantly bypasses PostHog's request batching, which would
        // otherwise still be holding the event when the document unloads.
        { transport: 'sendBeacon', send_instantly: true },
      )
    } catch {
      // Analytics must never cost a click.
    }
  }, [asin, title, surface])

  return (
    <a
      href={`/go/${asin}`}
      onClick={onClick}
      rel="sponsored nofollow noopener"
      className={className}
    >
      {children}
    </a>
  )
}
