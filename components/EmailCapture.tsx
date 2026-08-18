'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

// Capture form. Posts to /api/subscribe which adds the contact to the
// Resend audience. The welcome sequence
// fires on contact-added, day 0 / 3 / 7.
//
// Composed from shadcn Input + Button so theme tokens flow consistently.

export function EmailCapture() {
  const [email, setEmail] = React.useState('')
  const [state, setState] = React.useState<'idle' | 'submitting' | 'ok' | 'error'>('idle')
  const [error, setError] = React.useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!/.+@.+\..+/.test(email)) {
      setError('Enter a valid email address.')
      setState('error')
      return
    }
    setState('submitting')
    setError(null)
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) {
        const j = await res.json().catch(() => ({ error: 'request failed' }))
        setError(j.error || 'Something went wrong.')
        setState('error')
        return
      }
      setState('ok')
      setEmail('')
    } catch {
      setError('Network error. Try again.')
      setState('error')
    }
  }

  if (state === 'ok') {
    return (
      <p className="text-sm text-accent">
        Thanks. Check your inbox in a minute or so.
      </p>
    )
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md">
      <Input
        type="email"
        required
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@email.com"
        className="flex-1"
      />
      <Button type="submit" disabled={state === 'submitting'}>
        {state === 'submitting' ? 'Subscribing…' : 'Subscribe'}
      </Button>
      {state === 'error' && error && (
        <p className="text-sm text-warn">{error}</p>
      )}
    </form>
  )
}
