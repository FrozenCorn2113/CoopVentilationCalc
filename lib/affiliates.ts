// Affiliate tag config. Yellow Bird's canonical Amazon associate IDs.
// CA: yellowbird211-20  /  US: tiktokcreatpr-20  (source: Vault/Memory/References.md)

export const AFFILIATES = {
  amazonCa: 'yellowbird211-20',
  amazonUs: 'tiktokcreatpr-20',
} as const

export function buildAmazonUrl(asin: string, region: 'CA' | 'US' = 'US'): string {
  const isCa = region === 'CA'
  const tld = isCa ? 'ca' : 'com'
  const tag = isCa ? AFFILIATES.amazonCa : AFFILIATES.amazonUs
  return `https://www.amazon.${tld}/dp/${asin}?tag=${tag}`
}
