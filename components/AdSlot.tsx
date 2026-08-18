'use client'

// Reserved-space ad slot. Renders nothing until the traffic threshold is
// crossed and NEXT_PUBLIC_ADS_ENABLED=1 is set in env. Visual lint rule
// requires no ad slot rendered above the H1 pre-launch — this component
// returns null in that state. The grep lint rule looks for the JSX
// `<AdSlot` token to confirm the wiring exists.

export function AdSlot({
  slotId,
  size = 'banner',
  className = '',
}: {
  slotId: string
  size?: 'banner' | 'rectangle' | 'leaderboard'
  className?: string
}) {
  if (process.env.NEXT_PUBLIC_ADS_ENABLED !== '1') return null

  const heights: Record<string, number> = {
    banner: 90,
    rectangle: 250,
    leaderboard: 90,
  }
  const widths: Record<string, number> = {
    banner: 728,
    rectangle: 300,
    leaderboard: 728,
  }
  return (
    <div
      className={className}
      style={{
        minHeight: heights[size],
        width: '100%',
        maxWidth: widths[size],
        margin: '24px auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'transparent',
      }}
      data-ad-slot={slotId}
    >
      <ins className="adsbygoogle" style={{ display: 'block' }} />
    </div>
  )
}
