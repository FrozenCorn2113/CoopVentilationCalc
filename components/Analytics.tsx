'use client'

import * as React from 'react'

// PostHog snippet wrapper. Reads NEXT_PUBLIC_POSTHOG_KEY + HOST from env;
// Values come from environment variables, so the component is inert
// until analytics is configured.

export function Analytics() {
  React.useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com'
    if (!key) return

    let cancelled = false
    void (async () => {
      const mod = await import('posthog-js').catch(() => null)
      if (cancelled || !mod) return
      mod.default.init(key, {
        api_host: host,
        autocapture: true,
        capture_pageview: true,
        person_profiles: 'identified_only',
      })
    })()

    return () => {
      cancelled = true
    }
  }, [])

  return null
}
