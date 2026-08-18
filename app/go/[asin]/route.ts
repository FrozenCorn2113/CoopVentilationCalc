import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'

// Geo-routed Amazon affiliate redirect.
// /go/<asin> → amazon.ca/.com/dp/<asin>?tag=<region-tag>
// Vercel sets x-vercel-ip-country; localhost defaults to US.

const TAG_CA = 'yellowbird052-20'
const TAG_US = 'tiktokcreatpr-20'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ asin: string }> },
) {
  const { asin } = await params
  const h = await headers()
  const country = (h.get('x-vercel-ip-country') || 'US').toUpperCase()

  const isCanada = country === 'CA'
  const tld = isCanada ? 'ca' : 'com'
  const tag = isCanada ? TAG_CA : TAG_US

  const url = `https://www.amazon.${tld}/dp/${asin}?tag=${tag}`
  return NextResponse.redirect(url, { status: 302 })
}
