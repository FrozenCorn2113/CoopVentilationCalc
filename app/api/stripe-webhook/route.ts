import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { appendFileSync, existsSync, mkdirSync } from 'fs'
import path from 'path'

// Stripe webhook receiver.
//
// Ships inert so that turning on paid products later is a
// product (stripe-pdf, stripe-micro-saas, stripe-paid-newsletter, stripe-one-time)
// config change, not a route deploy.
//
// Behavior:
//   - If STRIPE_SECRET_KEY or STRIPE_WEBHOOK_SECRET are missing, returns 503
//     (Stripe will mark the endpoint as failing — that is intentional pre-flip).
//   - Once the env vars are present,
//     verifies the signature and appends events to data/stripe-events.jsonl.
//   - Per-product fulfillment (PDF download links, license keys, email triggers)
//     is added at product launch time, not in this generic handler.

// apiVersion intentionally omitted — Stripe SDK pins to the version it was published against.
const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : (null as unknown as Stripe)
const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || ''

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY || !WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: 'Stripe is not configured. Endpoint is scaffolded but inactive.' },
      { status: 503 },
    )
  }

  const sig = req.headers.get('stripe-signature') || ''
  const body = await req.text()
  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, WEBHOOK_SECRET)
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'unknown'
    return NextResponse.json({ error: `bad signature: ${msg}` }, { status: 400 })
  }

  try {
    const dir = path.join(process.cwd(), 'data')
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
    appendFileSync(
      path.join(dir, 'stripe-events.jsonl'),
      JSON.stringify({ ts: new Date().toISOString(), type: event.type, id: event.id, data: event.data.object }) + '\n',
    )
  } catch {
    // best effort — read-only FS on Vercel is tolerable; events can be re-pulled from Stripe.
  }

  return NextResponse.json({ received: true })
}

export async function GET() {
  return NextResponse.json({ ok: true, hint: 'POST stripe events here' })
}
