import { useEffect, useState } from 'react'

/**
 * Tracks the furthest scroll progress (0–1) reached through each section id,
 * powering the "Continue Exploring" progress bars and the active nav link.
 */
export function useSectionProgress(ids: string[]) {
  const [progress, setProgress] = useState<Record<string, number>>({})
  const [active, setActive] = useState<string>('home')

  useEffect(() => {
    let raf = 0
    const best: Record<string, number> = {}
    const measure = () => {
      raf = 0
      const vh = window.innerHeight
      let current = 'home'
      let changed = false
      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        const r = el.getBoundingClientRect()
        const seen = Math.min(1, Math.max(0, (vh - r.top) / (r.height + vh * 0.35)))
        if (seen > (best[id] ?? 0)) {
          best[id] = seen
          changed = true
        }
        if (r.top < vh * 0.4) current = id
      }
      if (changed) setProgress({ ...best })
      setActive(window.scrollY < vh * 0.4 ? 'home' : current)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure)
    }
    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [ids])

  return { progress, active }
}
