// SVG coop cross-section showing vent placement.
// Three modes: 'summer' (gable + ridge open, lower vents shut),
// 'winter' (high vents only, no draft on roost),
// 'balanced' (default — soffit in + ridge out).
// The build prompt can theme strokes/fills via DESIGN.md tokens; the
// scaffold paint is intentionally neutral.

export type DiagramMode = 'summer' | 'winter' | 'balanced'

const HIGHLIGHT = 'var(--color-accent, #2d5e3f)'
const MUTED = 'var(--color-stone, #8b857d)'
const HAIRLINE = 'var(--color-hairline, #e8e4dd)'

export function Diagram({
  mode = 'balanced',
  caption,
}: {
  mode?: DiagramMode
  caption?: string
}) {
  // Vent activation per mode (active = airflow path, muted = closed)
  const ridgeActive = mode !== 'winter' ? true : true // ridge always active (passive chimney)
  const soffitActive = mode !== 'winter'
  const gableActive = mode === 'summer'

  return (
    <figure className="my-8">
      <svg
        viewBox="0 0 480 280"
        role="img"
        aria-label={caption || `Coop cross-section showing ${mode} ventilation pattern`}
        className="w-full max-w-xl mx-auto"
      >
        {/* Ground line */}
        <line x1="20" y1="240" x2="460" y2="240" stroke={HAIRLINE} strokeWidth="1" />

        {/* Coop walls */}
        <path
          d="M 80 240 L 80 130 L 240 60 L 400 130 L 400 240 Z"
          fill="none"
          stroke={MUTED}
          strokeWidth="2"
        />

        {/* Floor */}
        <line x1="80" y1="240" x2="400" y2="240" stroke={MUTED} strokeWidth="2" />

        {/* Roost bar */}
        <line x1="160" y1="190" x2="320" y2="190" stroke={MUTED} strokeWidth="3" />
        <text x="240" y="210" textAnchor="middle" fontSize="11" fill={MUTED}>
          roost
        </text>

        {/* Soffit vents (lower, under eaves) */}
        <rect
          x="78"
          y="125"
          width="12"
          height="10"
          fill={soffitActive ? HIGHLIGHT : 'none'}
          stroke={soffitActive ? HIGHLIGHT : MUTED}
          strokeWidth="1.5"
          opacity={soffitActive ? 1 : 0.4}
        />
        <rect
          x="390"
          y="125"
          width="12"
          height="10"
          fill={soffitActive ? HIGHLIGHT : 'none'}
          stroke={soffitActive ? HIGHLIGHT : MUTED}
          strokeWidth="1.5"
          opacity={soffitActive ? 1 : 0.4}
        />

        {/* Gable vents (mid-wall, used in hot summer) */}
        <rect
          x="135"
          y="155"
          width="14"
          height="14"
          fill={gableActive ? HIGHLIGHT : 'none'}
          stroke={gableActive ? HIGHLIGHT : MUTED}
          strokeWidth="1.5"
          opacity={gableActive ? 1 : 0.35}
        />
        <rect
          x="331"
          y="155"
          width="14"
          height="14"
          fill={gableActive ? HIGHLIGHT : 'none'}
          stroke={gableActive ? HIGHLIGHT : MUTED}
          strokeWidth="1.5"
          opacity={gableActive ? 1 : 0.35}
        />

        {/* Ridge vent (peak) */}
        <rect
          x="225"
          y="50"
          width="30"
          height="10"
          fill={ridgeActive ? HIGHLIGHT : 'none'}
          stroke={ridgeActive ? HIGHLIGHT : MUTED}
          strokeWidth="1.5"
        />

        {/* Airflow arrows */}
        {soffitActive && (
          <>
            <path
              d="M 60 130 Q 70 130 78 130"
              stroke={HIGHLIGHT}
              strokeWidth="1.5"
              fill="none"
              markerEnd="url(#arrow)"
            />
            <path
              d="M 420 130 Q 410 130 402 130"
              stroke={HIGHLIGHT}
              strokeWidth="1.5"
              fill="none"
              markerEnd="url(#arrow)"
            />
          </>
        )}
        {ridgeActive && (
          <path
            d="M 240 50 L 240 30"
            stroke={HIGHLIGHT}
            strokeWidth="1.5"
            fill="none"
            markerEnd="url(#arrow)"
          />
        )}

        <defs>
          <marker
            id="arrow"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill={HIGHLIGHT} />
          </marker>
        </defs>
      </svg>
      {caption && (
        <figcaption className="text-center text-sm text-stone mt-3">{caption}</figcaption>
      )}
    </figure>
  )
}
