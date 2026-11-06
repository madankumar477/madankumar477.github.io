import { useRef } from 'react'
import { sectionMeta, type SectionId } from '../data/viewers'
import { ChevronLeft, ChevronRight, PlayIcon } from './Icons'

const art: Record<SectionId, { bg: string; ghost: string }> = {
  story: { bg: 'linear-gradient(135deg,#3b1a7a,#6d28d9 55%,#1b0f3a)', ghost: 'CV' },
  experience: { bg: 'linear-gradient(135deg,#7a0710,#e50914 55%,#3a0306)', ghost: '★' },
  skills: { bg: 'linear-gradient(135deg,#0b3b5c,#1d72a8 55%,#08243a)', ghost: '{ }' },
  originals: { bg: 'linear-gradient(135deg,#5a0610,#b3121f 50%,#2a0308)', ghost: '◎' },
  about: { bg: 'linear-gradient(135deg,#6a4507,#c88912 55%,#352203)', ghost: 'EP' },
  journey: { bg: 'linear-gradient(135deg,#0f4d3a,#169d70 55%,#06281d)', ghost: 'S6' },
  picks: { bg: 'linear-gradient(135deg,#4a0f4f,#a3268f 55%,#24062a)', ghost: '10' },
}

interface Props {
  order: SectionId[]
  progress: Record<string, number>
}

export default function ContinueRow({ order, progress }: Props) {
  const track = useRef<HTMLDivElement>(null)
  const scroll = (dir: number) => {
    const el = track.current
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' })
  }

  return (
    <section className="row continue" aria-labelledby="continue-title">
      <div className="row-head">
        <h2 id="continue-title" className="row-title">
          Continue Exploring
        </h2>
        <p className="row-note">Progress shows what you’ve watched</p>
      </div>
      <div className="row-wrap">
        <button className="row-arrow left" onClick={() => scroll(-1)} aria-label="Scroll episodes left">
          <ChevronLeft />
        </button>
        <div className="row-track" ref={track}>
          {order.map((id, i) => {
            const p = Math.round((progress[id] ?? 0) * 100)
            return (
              <a key={id} href={`#${id}`} className="ep-card" style={{ background: art[id].bg }}>
                <span className="ep-ghost" aria-hidden>
                  {art[id].ghost}
                </span>
                <span className="ep-play" aria-hidden>
                  <PlayIcon />
                </span>
                <span className="ep-num">Episode {String(i + 1).padStart(2, '0')}</span>
                <span className="ep-title">{sectionMeta[id].episode}</span>
                <span className="ep-sub">{sectionMeta[id].sub}</span>
                <span className="ep-progress" aria-label={`${p}% watched`}>
                  <span style={{ width: `${Math.max(p, 3)}%` }} />
                </span>
              </a>
            )
          })}
        </div>
        <button className="row-arrow right" onClick={() => scroll(1)} aria-label="Scroll episodes right">
          <ChevronRight />
        </button>
      </div>
    </section>
  )
}
