import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

// Adds a contact to the per-business Resend audience, then fires the
// day-0 welcome email immediately via transactional send.
// Day-3 and day-7 drip emails are configured as Resend dashboard automations
// (broadcast IDs stored in RESEND_BROADCAST_DAY0/3/7 env vars for reference).

const RESEND_API_KEY = process.env.RESEND_API_KEY || ''
const RESEND_AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID || ''
const RESEND_FROM = 'Coop Ventilation Calc <hello@coopventilationcalc.com>'

function day0Html(unsubscribeUrl: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Your coop ventilation checklist</title>
<style>
body{margin:0;padding:0;background:#f6f1e7;font-family:Georgia,sans-serif;color:#1A1B17}
.wrapper{max-width:580px;margin:0 auto;padding:32px 16px}
.header{border-top:3px solid #1A1B17;border-bottom:1px solid #B6A684;padding:8px 0;margin-bottom:24px;display:flex;justify-content:space-between;align-items:center}
.header-brand{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.15em;color:#3B3A30}
.header-url{font-size:11px;color:#C5402A;font-weight:600;text-decoration:none}
.body-text{font-size:15px;line-height:1.65;color:#3B3A30}
.body-text p{margin:0 0 16px}
.cta-block{background:#E8DBBF;border:2px solid #1A1B17;padding:20px 24px;margin:24px 0;box-shadow:4px 4px 0 #1A1B17;text-align:center}
.cta-block p{margin:0 0 12px;font-size:14px;font-weight:600;color:#1A1B17}
.cta-btn{display:inline-block;background:#C5402A;color:#F2E8D2;font-size:14px;font-weight:700;text-decoration:none;padding:11px 28px;border:2px solid #1A1B17;letter-spacing:.04em}
.insight-box{background:#DFCFA8;border-left:3px solid #C5402A;padding:14px 16px;margin:20px 0;font-size:14px;line-height:1.55;color:#1A1B17}
.insight-box strong{display:block;font-size:13px;text-transform:uppercase;letter-spacing:.1em;color:#C5402A;margin-bottom:6px}
.footer{border-top:1px solid #B6A684;margin-top:32px;padding-top:16px;font-size:11px;color:#6E6B3A;line-height:1.5}
.footer a{color:#C5402A}
</style>
</head>
<body>
<div class="wrapper">
<div class="header">
<span class="header-brand">Backyard Coop Reference</span>
<a href="https://coopventilationcalc.com" class="header-url">coopventilationcalc.com</a>
</div>
<div class="body-text">
<p>Here is your printable checklist.</p>
<div class="cta-block">
<p>The Backyard Coop Ventilation Checklist</p>
<a href="https://coopventilationcalc.com/checklist" class="cta-btn">Download PDF</a>
</div>
<p>Print it, laminate it, hang it near the coop. It has the vent area numbers for 4x4, 4x8, 6x8, and 8x10 coops, the ammonia thresholds you actually need to act on, and the four early warning signs most keepers catch too late.</p>
<p><strong>One thing worth fixing today if you have not already:</strong></p>
<div class="insight-box">
<strong>The winter vent mistake</strong>
Most chicken keepers close every vent when it gets cold. But moisture and ammonia build up behind sealed boards faster than the temperature drops. Frostbitten combs are almost always a moisture problem, not a temperature problem. High vents, eave gaps, and ridge vents stay open year-round. Side vents below roost level are the ones to close or baffle.
</div>
<p>Nothing to buy today. Just check your high vents are clear before the next cold night.</p>
<p>Talk soon,<br>The team at coopventilationcalc.com</p>
<p style="font-size:13px;color:#6E6B3A;">P.S. Run your exact vent calculation free anytime at <a href="https://coopventilationcalc.com" style="color:#C5402A;">coopventilationcalc.com</a></p>
</div>
<div class="footer">
You are receiving this because you downloaded the coop ventilation checklist.<br>
<a href="${unsubscribeUrl}">Unsubscribe</a> &bull; coopventilationcalc.com
</div>
</div>
</body>
</html>`
}

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  if (!RESEND_API_KEY || !RESEND_AUDIENCE_ID) {
    return NextResponse.json(
      { error: 'email capture not configured' },
      { status: 503 },
    )
  }

  const { email } = (await req.json().catch(() => ({}))) as { email?: string }
  if (!email || !/.+@.+\..+/.test(email)) {
    return NextResponse.json({ error: 'invalid email' }, { status: 400 })
  }

  try {
    const resend = new Resend(RESEND_API_KEY)

    // Add contact to audience
    await resend.contacts.create({
      audienceId: RESEND_AUDIENCE_ID,
      email,
      unsubscribed: false,
    })

    // Fire day-0 welcome email immediately (transactional send)
    // Day-3 and day-7 are wired via Resend dashboard automations.
    const unsubUrl = `https://coopventilationcalc.com/unsubscribe?email=${encodeURIComponent(email)}`
    await resend.emails.send({
      from: RESEND_FROM,
      to: email,
      subject: 'Your coop ventilation checklist (and one mistake to fix today)',
      html: day0Html(unsubUrl),
      headers: {
        'List-Unsubscribe': `<${unsubUrl}>`,
        'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
      },
    })

    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json(
      { error: (e as Error).message.slice(0, 200) },
      { status: 500 },
    )
  }
}
