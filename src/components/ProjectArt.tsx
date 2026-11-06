import type { ArtVariant } from '../data/projects'

/**
 * Clean technical illustrations for repositories that contain no suitable
 * image. Always rendered with an "Illustration" label so they are never
 * mistaken for project photographs.
 */
export default function ProjectArt({ variant, accent }: { variant: ArtVariant; accent: string }) {
  return (
    <svg className="art" viewBox="0 0 400 240" role="img" aria-label="Designed technical illustration (not a project photograph)">
      <defs>
        <pattern id={`grid-${variant}`} width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20" fill="none" stroke="rgba(255,255,255,0.06)" />
        </pattern>
        <radialGradient id={`glow-${variant}`} cx="0.6" cy="0.45" r="0.6">
          <stop offset="0" stopColor={accent} stopOpacity="0.45" />
          <stop offset="1" stopColor={accent} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="240" fill="#0d0d12" />
      <rect width="400" height="240" fill={`url(#grid-${variant})`} />
      <rect width="400" height="240" fill={`url(#glow-${variant})`} />
      <g fill="none" stroke="#f4f3ef" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        {variant === 'amr' && (
          <>
            {/* lidar sweep */}
            <g className="art-sweep" style={{ transformOrigin: '230px 112px' }}>
              <path d="M230 112 L370 70 A150 150 0 0 1 372 150 Z" fill={accent} fillOpacity="0.16" stroke="none" />
            </g>
            {[40, 70, 100].map((r) => (
              <circle key={r} cx="230" cy="112" r={r} stroke={accent} strokeOpacity="0.35" strokeDasharray="3 6" />
            ))}
            {/* robot body */}
            <rect x="170" y="100" width="120" height="60" rx="8" />
            <rect x="214" y="80" width="32" height="22" rx="4" />
            <circle cx="230" cy="91" r="5" fill={accent} stroke="none" />
            <circle cx="192" cy="166" r="12" />
            <circle cx="268" cy="166" r="12" />
            <path d="M180 130 H280" strokeOpacity="0.4" />
            {/* path + goal */}
            <path d="M60 200 C 110 200, 120 150, 165 140" stroke={accent} strokeDasharray="5 6" />
            <circle cx="60" cy="200" r="6" stroke={accent} />
            {/* obstacle points */}
            {[
              [350, 92], [356, 104], [360, 118], [358, 132], [80, 60], [92, 58], [104, 62],
            ].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="2.2" fill="#f4f3ef" stroke="none" />
            ))}
          </>
        )}
        {variant === 'weld' && (
          <>
            {/* conveyor */}
            <rect x="30" y="170" width="340" height="18" rx="9" />
            {[50, 110, 170, 230, 290, 350].map((x) => (
              <circle key={x} cx={x} cy="179" r="5" strokeOpacity="0.5" />
            ))}
            {/* parts */}
            <rect x="70" y="146" width="44" height="24" rx="3" />
            <path d="M76 158 H108" stroke="#22c55e" strokeWidth="3" />
            <rect x="250" y="146" width="44" height="24" rx="3" />
            <path d="M256 158 q6 -6 10 0 t10 0 t10 0" stroke={accent} strokeWidth="3" />
            {/* camera + detection box */}
            <rect x="242" y="40" width="36" height="22" rx="4" />
            <path d="M260 62 L240 140 M260 62 L304 140" strokeOpacity="0.35" strokeDasharray="4 5" />
            <rect x="244" y="138" width="56" height="38" stroke={accent} strokeWidth="2" />
            <text x="244" y="132" fill={accent} stroke="none" fontSize="11" fontFamily="monospace" fontWeight="700">
              DEFECT
            </text>
            {/* arm */}
            <path d="M150 168 V120 L180 80 L218 92" strokeWidth="5" />
            <circle cx="150" cy="120" r="6" fill="#0d0d12" />
            <circle cx="180" cy="80" r="6" fill="#0d0d12" />
            <path d="M218 92 V108" />
          </>
        )}
        {variant === 'twinarm' && (
          <>
            {[100, 300].map((cx, k) => (
              <g key={cx} strokeOpacity={k ? 0.95 : 0.6}>
                <rect x={cx - 34} y="180" width="68" height="14" rx="4" />
                <path d={`M${cx} 180 V130 L${cx + 34} 92 L${cx + 70} 104`} strokeWidth="5" />
                <circle cx={cx} cy="130" r="6" fill="#0d0d12" />
                <circle cx={cx + 34} cy="92" r="6" fill="#0d0d12" />
                <text x={cx - 30} y="214" fill="#a1a1ab" stroke="none" fontSize="11" fontFamily="monospace">
                  {k ? 'FOLLOWER' : 'LEADER'}
                </text>
              </g>
            ))}
            <path d="M150 60 C 190 30, 230 30, 270 60" stroke={accent} strokeDasharray="5 6" />
            <path d="M262 52 L270 60 L259 64" stroke={accent} />
            <text x="166" y="28" fill={accent} stroke="none" fontSize="11" fontFamily="monospace" fontWeight="700">
              POSE · 50 ms
            </text>
          </>
        )}
        {variant === 'wifi' && (
          <>
            <rect x="60" y="150" width="90" height="46" rx="6" />
            <path d="M80 150 V120 M130 150 V120" />
            {[1, 2, 3].map((i) => (
              <path key={i} d={`M${105 - i * 22} ${132 - i * 12} A ${i * 30} ${i * 30} 0 0 1 ${105 + i * 22} ${132 - i * 12}`} stroke={accent} strokeOpacity={1 - i * 0.22} />
            ))}
            {/* frame */}
            {['80 00', 'FF:FF', 'BSSID', 'SEQ', 'SSID'].map((t, i) => (
              <g key={t}>
                <rect x={196 + (i % 3) * 62} y={70 + Math.floor(i / 3) * 44} width="56" height="32" rx="3" strokeOpacity="0.8" />
                <text x={202 + (i % 3) * 62} y={91 + Math.floor(i / 3) * 44} fill="#f4f3ef" stroke="none" fontSize="10" fontFamily="monospace">
                  {t}
                </text>
              </g>
            ))}
            <text x="196" y="58" fill={accent} stroke="none" fontSize="11" fontFamily="monospace" fontWeight="700">
              802.11 BEACON
            </text>
          </>
        )}
      </g>
    </svg>
  )
}
