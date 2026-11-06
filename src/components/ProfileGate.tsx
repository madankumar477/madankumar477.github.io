import { useState } from 'react'
import { profile } from '../data/profile'
import { viewers, type ViewerId } from '../data/viewers'
import { useReducedMotion } from '../hooks/useMedia'

interface Props {
  onChoose: (id: ViewerId) => void
}

/** "Who's watching?" — each profile reorders what plays first. */
export default function ProfileGate({ onChoose }: Props) {
  const reduced = useReducedMotion()
  const [picked, setPicked] = useState<ViewerId | null>(null)

  const choose = (id: ViewerId) => {
    if (picked) return
    setPicked(id)
    setTimeout(() => onChoose(id), reduced ? 0 : 850)
  }

  return (
    <main className={`gate ${picked ? 'is-picked' : ''}`} aria-labelledby="gate-title">
      <div className="gate-inner">
        <h1 id="gate-title" className="gate-title">
          Who’s watching?
        </h1>
        <ul className="gate-list">
          {viewers.map((v, i) => (
            <li key={v.id} style={{ '--i': i } as React.CSSProperties} className={picked === v.id ? 'is-chosen' : ''}>
              <button className="gate-profile" onClick={() => choose(v.id)} aria-label={`${v.name} — ${v.blurb}`}>
                <span className="gate-avatar" style={{ background: v.gradient }}>
                  {v.id === 'madan' ? (
                    <>
                      <img src={profile.photo.cutout} alt="" width={profile.photo.width} height={profile.photo.height} />
                      <span className="gate-badge">MAIN</span>
                    </>
                  ) : (
                    <span className="gate-glyph">{v.glyph}</span>
                  )}
                </span>
                <span className="gate-name">{v.name}</span>
                <span className="gate-blurb">{v.blurb}</span>
              </button>
            </li>
          ))}
        </ul>
        <p className="gate-note">
          Every profile watches the same true story of {profile.fullName} — it only changes what plays first.
        </p>
      </div>
    </main>
  )
}
