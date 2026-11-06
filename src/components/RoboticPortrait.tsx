import { useCallback, useEffect, useRef, useState } from 'react'
import { profile } from '../data/profile'
import { useFinePointer } from '../hooks/useMedia'

/*
 * Landmarks measured on the 697×914 source photograph. The SVG overlay shares
 * the photo's coordinate space (viewBox), so every marker stays locked to the
 * face at any rendered size.
 */
const W = profile.photo.width
const H = profile.photo.height
const FACE = { x: 178, y: 150, w: 326, h: 410 }
const FACE_C = { x: 341, y: 352 }
const EYES = [
  { x: 268, y: 326, label: 'OPTIC·L' },
  { x: 421, y: 324, label: 'OPTIC·R' },
]

const P: Record<string, [number, number]> = {
  ft: [340, 172], fl: [232, 200], fr: [452, 196],
  tl: [190, 298], tr: [498, 296],
  bl: [300, 318], br: [384, 316], bridge: [342, 332],
  el: [268, 326], er: [421, 324],
  cl: [222, 410], cr: [462, 405],
  nose: [340, 402], nl: [310, 410], nr: [372, 408],
  ml: [276, 456], mr: [414, 452], mc: [343, 466],
  jl: [200, 448], jr: [488, 444],
  chl: [262, 525], chr: [420, 522], chin: [338, 552],
}
const EDGES: [string, string][] = [
  ['ft', 'fl'], ['ft', 'fr'], ['fl', 'tl'], ['fr', 'tr'], ['fl', 'bl'], ['fr', 'br'], ['ft', 'bridge'],
  ['bl', 'bridge'], ['br', 'bridge'], ['tl', 'el'], ['tr', 'er'], ['bl', 'el'], ['br', 'er'],
  ['el', 'cl'], ['er', 'cr'], ['tl', 'cl'], ['tr', 'cr'], ['bridge', 'nose'], ['el', 'nl'], ['er', 'nr'],
  ['nose', 'nl'], ['nose', 'nr'], ['nl', 'cl'], ['nr', 'cr'], ['nl', 'ml'], ['nr', 'mr'], ['ml', 'mc'],
  ['mr', 'mc'], ['nose', 'mc'], ['cl', 'jl'], ['cr', 'jr'], ['cl', 'ml'], ['cr', 'mr'], ['jl', 'chl'],
  ['jr', 'chr'], ['ml', 'chl'], ['mr', 'chr'], ['chl', 'chin'], ['chr', 'chin'], ['mc', 'chin'], ['tl', 'jl'], ['tr', 'jr'],
]

const corner = (x: number, y: number, dx: number, dy: number, len = 38) =>
  `M${x + dx * len} ${y} H${x} V${y + dy * len}`

type Mode = 'idle' | 'search' | 'lock'

interface Props {
  className?: string
}

export default function RoboticPortrait({ className }: Props) {
  const fine = useFinePointer()
  const wrap = useRef<HTMLDivElement>(null)
  const reticle = useRef<SVGGElement>(null)
  const readout = useRef<SVGTSpanElement>(null)
  const [mode, setMode] = useState<Mode>('idle')
  // Last active mode — keeps HUD parts mounted while the whole HUD fades out.
  const [shown, setShown] = useState<Exclude<Mode, 'idle'>>('lock')
  useEffect(() => {
    if (mode !== 'idle') setShown(mode)
  }, [mode])
  const target = useRef({ x: FACE_C.x, y: FACE_C.y })
  const cur = useRef({ x: FACE_C.x, y: FACE_C.y })

  // Smoothly trail the reticle toward the pointer (in photo coordinates).
  useEffect(() => {
    if (mode === 'idle') return
    let raf = 0
    let frame = 0
    const tick = () => {
      const c = cur.current
      const t = target.current
      c.x += (t.x - c.x) * 0.16
      c.y += (t.y - c.y) * 0.16
      reticle.current?.setAttribute('transform', `translate(${c.x.toFixed(1)} ${c.y.toFixed(1)})`)
      if (readout.current && frame++ % 4 === 0) {
        readout.current.textContent = `X ${String(Math.round(c.x)).padStart(3, '0')}  Y ${String(Math.round(c.y)).padStart(3, '0')}`
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [mode])

  const toPhoto = useCallback((clientX: number, clientY: number) => {
    const r = wrap.current!.getBoundingClientRect()
    return { x: ((clientX - r.left) / r.width) * W, y: ((clientY - r.top) / r.height) * H }
  }, [])

  const inFace = (p: { x: number; y: number }) =>
    p.x > FACE.x - 20 && p.x < FACE.x + FACE.w + 20 && p.y > FACE.y - 30 && p.y < FACE.y + FACE.h + 20

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return
    const p = toPhoto(e.clientX, e.clientY)
    const locked = inFace(p)
    // Inside the face the reticle magnetises toward the face centre.
    target.current = locked ? { x: FACE_C.x + (p.x - FACE_C.x) * 0.25, y: FACE_C.y + (p.y - FACE_C.y) * 0.25 } : p
    setMode(locked ? 'lock' : 'search')
    const r = wrap.current!
    r.style.setProperty('--tx', ((p.x / W - 0.5) * 2).toFixed(3))
    r.style.setProperty('--ty', ((p.y / H - 0.5) * 2).toFixed(3))
  }

  const onLeave = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') return
    setMode('idle')
    target.current = { ...FACE_C }
    wrap.current?.style.setProperty('--tx', '0')
    wrap.current?.style.setProperty('--ty', '0')
  }

  // Touch / pen / keyboard: tap to toggle the scan.
  const toggle = () => {
    target.current = { ...FACE_C }
    setMode((m) => (m === 'idle' ? 'lock' : 'idle'))
  }
  const onPointerUp = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') toggle()
  }

  const active = mode !== 'idle'

  return (
    <div className={`robo ${className ?? ''}`} data-mode={mode} data-show={mode === 'idle' ? shown : mode}>
      <div
        ref={wrap}
        className="robo-frame"
        data-cursor="scan"
        role="button"
        tabIndex={0}
        aria-pressed={active}
        aria-label="Profile photo of E Madan Kumar. Activate to run the robotic face-scan effect."
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        onPointerUp={onPointerUp}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            toggle()
          }
        }}
      >
        <img
          className="robo-photo"
          src={profile.photo.cutout}
          alt="E Madan Kumar"
          width={W}
          height={H}
          fetchPriority="high"
          draggable={false}
        />
        <div className="robo-texture" aria-hidden />

        <svg className="robo-hud" viewBox={`0 0 ${W} ${H}`} aria-hidden>
          <defs>
            <clipPath id="robo-face-clip">
              <ellipse cx={FACE_C.x} cy={FACE_C.y + 10} rx={FACE.w / 2 + 6} ry={FACE.h / 2 + 4} />
            </clipPath>
            <linearGradient id="robo-scan" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ff2d3a" stopOpacity="0" />
              <stop offset="0.85" stopColor="#ff2d3a" stopOpacity="0.28" />
              <stop offset="1" stopColor="#ffd0d3" stopOpacity="0.9" />
            </linearGradient>
            <radialGradient id="robo-tint" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stopColor="#ff2d3a" stopOpacity="0.1" />
              <stop offset="1" stopColor="#ff2d3a" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* depth contour bands + scan sweep, clipped to the face */}
          <g className="robo-clip" clipPath="url(#robo-face-clip)">
            <rect x={FACE.x - 20} y={FACE.y - 20} width={FACE.w + 40} height={FACE.h + 40} fill="url(#robo-tint)" />
            <g className="robo-contours">
              {Array.from({ length: 14 }, (_, i) => {
                const y = FACE.y + 10 + i * 30
                return (
                  <path
                    key={i}
                    d={`M${FACE.x - 10} ${y} Q ${FACE_C.x} ${y + 26} ${FACE.x + FACE.w + 10} ${y}`}
                    pathLength={1}
                  />
                )
              })}
            </g>
            <rect className="robo-sweep" x={FACE.x - 20} y={FACE.y - 70} width={FACE.w + 40} height={70} fill="url(#robo-scan)" />
          </g>

          {/* wireframe face mesh */}
          <g className="robo-mesh">
            {EDGES.map(([a, b], i) => (
              <line
                key={i}
                x1={P[a][0]}
                y1={P[a][1]}
                x2={P[b][0]}
                y2={P[b][1]}
                pathLength={1}
                style={{ '--i': i } as React.CSSProperties}
              />
            ))}
            {Object.entries(P).map(([k, [x, y]], i) => (
              <circle key={k} cx={x} cy={y} r={4} style={{ '--i': i } as React.CSSProperties} />
            ))}
          </g>

          {/* face lock brackets */}
          <g className="robo-brackets">
            <path d={corner(FACE.x, FACE.y, 1, 1)} />
            <path d={corner(FACE.x + FACE.w, FACE.y, -1, 1)} />
            <path d={corner(FACE.x, FACE.y + FACE.h, 1, -1)} />
            <path d={corner(FACE.x + FACE.w, FACE.y + FACE.h, -1, -1)} />
            <rect className="robo-lock-tag" x={FACE.x} y={FACE.y - 34} width={124} height={24} rx={3} />
            <text className="robo-lock-text" x={FACE.x + 10} y={FACE.y - 17}>
              {mode === 'search' ? 'SEARCHING…' : 'FACE LOCK ✓'}
            </text>
            <text className="robo-small" x={FACE.x + FACE.w} y={FACE.y - 16} textAnchor="end">
              ID: E·MADAN·KUMAR
            </text>
          </g>

          {/* optic reticles */}
          {EYES.map((e) => (
            <g key={e.label} className="robo-eye" transform={`translate(${e.x} ${e.y})`}>
              <circle r={26} className="robo-eye-ring" />
              <circle r={36} className="robo-eye-dash" />
              <path d="M-46 0H-30M30 0H46M0 -46V-30M0 30V46" />
              <circle r={3} className="robo-eye-core" />
            </g>
          ))}

          {/* leader-line callouts */}
          <g className="robo-callouts">
            <g className="robo-call" style={{ '--i': 0 } as React.CSSProperties}>
              <path d={`M${P.el[0] - 40} ${P.el[1]} L150 ${P.el[1]} L120 260`} pathLength={1} />
              <text x={22} y={238} className="robo-small">VISION</text>
              <text x={22} y={258} className="robo-big">ONLINE</text>
            </g>
            <g className="robo-call" style={{ '--i': 1 } as React.CSSProperties}>
              <path d={`M${P.cr[0]} ${P.cr[1]} L560 ${P.cr[1]} L590 360`} pathLength={1} />
              <text x={675} y={338} textAnchor="end" className="robo-small">ROLE</text>
              <text x={675} y={360} textAnchor="end" className="robo-big">ROBOTICS·AI</text>
            </g>
            <g className="robo-call" style={{ '--i': 2 } as React.CSSProperties}>
              <path d={`M${P.jl[0]} ${P.jl[1]} L140 ${P.jl[1] + 30} L110 520`} pathLength={1} />
              <text x={22} y={500} className="robo-small">STACK</text>
              <text x={22} y={521} className="robo-big">ROS 2 · CV</text>
            </g>
            <g className="robo-call" style={{ '--i': 3 } as React.CSSProperties}>
              <path d={`M${P.tr[0]} ${P.tr[1]} L570 220 L600 200`} pathLength={1} />
              <text x={675} y={180} textAnchor="end" className="robo-small">BASE</text>
              <text x={675} y={201} textAnchor="end" className="robo-big">BENGALURU</text>
            </g>
          </g>

          {/* telemetry bars */}
          <g className="robo-bars" transform={`translate(${FACE.x + FACE.w + 22} ${FACE.y + 120})`}>
            {Array.from({ length: 7 }, (_, i) => (
              <rect key={i} x={i * 9} y={0} width={5} height={46} style={{ '--i': i } as React.CSSProperties} />
            ))}
          </g>

          {/* pointer-tracking reticle */}
          <g ref={reticle} className="robo-reticle" transform={`translate(${FACE_C.x} ${FACE_C.y})`}>
            <circle r={16} />
            <path d="M-28 0H-10M10 0H28M0 -28V-10M0 10V28" />
            <text x={-58} y={52} className="robo-small">
              <tspan ref={readout}>X 341  Y 352</tspan>
            </text>
          </g>
        </svg>
      </div>

      <p className="robo-hint" aria-hidden>
        <span className="robo-hint-dot" />
        {fine ? 'Hover the portrait to run a vision scan' : 'Tap the portrait to run a vision scan'}
      </p>
    </div>
  )
}
