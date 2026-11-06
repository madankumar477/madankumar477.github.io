import { useEffect, useState } from 'react'
import { profile } from '../data/profile'
import { useReducedMotion } from '../hooks/useMedia'
import { PlayIcon } from './Icons'

interface Props {
  onPlay: () => void
  onSkip: () => void
}

/** Cinematic title card: name → "The Series" → portrait reveal → PLAY. */
export default function Intro({ onPlay, onSkip }: Props) {
  const reduced = useReducedMotion()
  const [phase, setPhase] = useState(reduced ? 3 : 0)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    if (reduced) return
    const t = [setTimeout(() => setPhase(1), 120), setTimeout(() => setPhase(2), 1300), setTimeout(() => setPhase(3), 2300)]
    return () => t.forEach(clearTimeout)
  }, [reduced])

  const play = () => {
    if (leaving) return
    setLeaving(true)
    setTimeout(onPlay, reduced ? 0 : 750)
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && phase >= 3) play()
      if (e.key === 'Escape') onSkip()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  return (
    <section className={`intro ${leaving ? 'is-leaving' : ''}`} data-phase={phase} aria-label="Opening title">
      <div className="intro-glow" aria-hidden />
      <button className="skip-intro btn-caps" onClick={onSkip}>
        Skip intro
      </button>

      <div className="intro-stage">
        <h1 className="intro-title" aria-label={profile.displayName}>
          {profile.displayName.split('').map((ch, i) => (
            <span key={i} style={{ '--i': i } as React.CSSProperties}>
              {ch}
            </span>
          ))}
        </h1>
        <p className="intro-series">The Series</p>

        <div className="intro-portrait" aria-hidden>
          <img src={profile.photo.cutout} alt="" width={profile.photo.width} height={profile.photo.height} />
        </div>

        <div className="intro-cta">
          <p className="intro-tag">{profile.tagline}</p>
          <button className="btn btn-light btn-pill btn-caps intro-play" onClick={play} autoFocus={phase >= 3}>
            <PlayIcon /> Play
          </button>
        </div>
      </div>
    </section>
  )
}
