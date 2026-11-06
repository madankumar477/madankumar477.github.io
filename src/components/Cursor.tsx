import { useEffect, useRef } from 'react'
import { useFinePointer, useReducedMotion } from '../hooks/useMedia'
import { PlayIcon } from './Icons'

const INTERACTIVE = 'a, button, [role="button"], [data-cursor="play"], input, textarea, select, label'

/** Reference cursor: small dot + trailing ring that becomes a red "play" disc over interactive elements. */
export default function Cursor() {
  const fine = useFinePointer()
  const reduced = useReducedMotion()
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const enabled = fine && !reduced

  useEffect(() => {
    if (!enabled) return
    const root = document.documentElement
    root.classList.add('custom-cursor')
    const pos = { x: -100, y: -100 }
    const lag = { x: -100, y: -100 }
    let raf = 0
    let visible = false

    const tick = () => {
      lag.x += (pos.x - lag.x) * 0.2
      lag.y += (pos.y - lag.y) * 0.2
      if (ring.current) ring.current.style.transform = `translate3d(${lag.x}px, ${lag.y}px, 0)`
      raf = requestAnimationFrame(tick)
    }
    const move = (e: PointerEvent) => {
      pos.x = e.clientX
      pos.y = e.clientY
      if (dot.current) dot.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`
      if (!visible) {
        visible = true
        lag.x = pos.x
        lag.y = pos.y
        dot.current?.classList.remove('is-hidden')
        ring.current?.classList.remove('is-hidden')
      }
      const t = e.target as Element | null
      const scan = !!t?.closest?.('[data-cursor="scan"]')
      const hover = !scan && !!t?.closest?.(INTERACTIVE)
      ring.current?.classList.toggle('is-hover', hover)
      ring.current?.classList.toggle('is-scan', scan)
      dot.current?.classList.toggle('is-hover', hover)
    }
    const leave = () => {
      visible = false
      dot.current?.classList.add('is-hidden')
      ring.current?.classList.add('is-hidden')
    }
    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerleave', leave)
    raf = requestAnimationFrame(tick)
    return () => {
      root.classList.remove('custom-cursor')
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerleave', leave)
      cancelAnimationFrame(raf)
    }
  }, [enabled])

  if (!enabled) return null
  return (
    <>
      <div ref={ring} className="cursor-ring is-hidden" aria-hidden>
        <PlayIcon fill="#fff" />
      </div>
      <div ref={dot} className="cursor-dot is-hidden" aria-hidden />
    </>
  )
}
