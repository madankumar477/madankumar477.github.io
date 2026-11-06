import { useEffect, useRef, useState } from 'react'
import { mediaKindLabel, projectById } from '../data/projects'
import ProjectArt from './ProjectArt'
import { ArrowUpRight, ChevronLeft, ChevronRight, CloseIcon, GithubIcon, LockIcon, PlayIcon } from './Icons'

interface Props {
  projectId: string | null
  onClose: () => void
}

/** Streaming-style "title details" modal for a project. */
export default function ProjectModal({ projectId, onClose }: Props) {
  const p = projectId ? projectById(projectId) : undefined
  const [idx, setIdx] = useState(0)
  const dialog = useRef<HTMLDivElement>(null)
  const lastFocus = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!p) return
    setIdx(0)
    lastFocus.current = document.activeElement as HTMLElement
    document.body.classList.add('lock-scroll')
    const t = setTimeout(() => dialog.current?.querySelector<HTMLElement>('.modal-close')?.focus(), 30)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab' && dialog.current) {
        const f = dialog.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
        if (!f.length) return
        const first = f[0]
        const last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      clearTimeout(t)
      document.removeEventListener('keydown', onKey)
      document.body.classList.remove('lock-scroll')
      lastFocus.current?.focus?.()
    }
  }, [p, onClose])

  if (!p) return null
  const media = p.media
  const m = media[idx]

  return (
    <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div
        ref={dialog}
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        style={{ '--accent': p.accent } as React.CSSProperties}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close project details">
          <CloseIcon />
        </button>

        <div className="modal-media">
          {m ? (
            <figure>
              <img src={m.src} alt={m.alt} className={m.kind === 'photo' ? 'is-photo' : ''} />
              <figcaption>
                <span className="pv-tag static">{mediaKindLabel[m.kind]}</span> {m.caption}
              </figcaption>
            </figure>
          ) : (
            <figure>
              {p.art && <ProjectArt variant={p.art} accent={p.accent} />}
              <figcaption>
                <span className="pv-tag static">Illustration</span> {p.note}
              </figcaption>
            </figure>
          )}
          {media.length > 1 && (
            <div className="modal-nav">
              <button onClick={() => setIdx((i) => (i - 1 + media.length) % media.length)} aria-label="Previous image">
                <ChevronLeft />
              </button>
              <span>
                {idx + 1} / {media.length}
              </span>
              <button onClick={() => setIdx((i) => (i + 1) % media.length)} aria-label="Next image">
                <ChevronRight />
              </button>
            </div>
          )}
          <div className="modal-fade" aria-hidden />
        </div>

        <div className="modal-body">
          <div className="modal-main">
            <p className="orig-genres">{p.genres.join(' • ')}</p>
            <h2 id="modal-title" className="modal-title">
              {p.title}
            </h2>
            <div className="modal-actions">
              {p.repo ? (
                <a className="btn btn-light" href={p.repo} target="_blank" rel="noreferrer">
                  <GithubIcon /> Open Repository
                </a>
              ) : (
                <span className="btn btn-ghost is-disabled">
                  <LockIcon /> Private repository
                </span>
              )}
              {p.demo && (
                <a className="btn btn-red" href={p.demo.url} target="_blank" rel="noreferrer">
                  <PlayIcon /> {p.demo.label} <ArrowUpRight />
                </a>
              )}
            </div>
            <p className="modal-desc">{p.description}</p>
            <h3 className="modal-h">Key features</h3>
            <ul className="modal-features">
              {p.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            {p.note && media.length > 0 && <p className="modal-note">{p.note}</p>}
          </div>
          <aside className="modal-side">
            <h3 className="modal-h">Tech stack</h3>
            <ul className="chips">
              {p.tech.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <h3 className="modal-h">Repository</h3>
            <p className="modal-repo">
              {p.repo ? (
                <a href={p.repo} target="_blank" rel="noreferrer">
                  {p.repo.replace('https://', '')} ↗
                </a>
              ) : (
                'Private'
              )}
            </p>
            {p.repoNote && <p className="modal-note">{p.repoNote}</p>}
          </aside>
        </div>
      </div>
    </div>
  )
}
