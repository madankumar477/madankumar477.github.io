import { useEffect, useRef, useState } from 'react'
import { categories, projects, type ProjectCategory } from '../../data/projects'
import { profile } from '../../data/profile'
import SectionHeading from '../SectionHeading'
import ProjectVisual from '../ProjectVisual'
import { ArrowUpRight, ChevronLeft, ChevronRight, GithubIcon, LockIcon, PlayIcon } from '../Icons'

interface Props {
  onOpenProject: (id: string) => void
}

export default function Originals({ onOpenProject }: Props) {
  const [cat, setCat] = useState<ProjectCategory | 'all'>('all')
  const track = useRef<HTMLDivElement>(null)
  const [prog, setProg] = useState(0)
  const list = cat === 'all' ? projects : projects.filter((p) => p.category === cat)

  useEffect(() => {
    const el = track.current
    if (!el) return
    el.scrollTo({ left: 0 })
    const on = () => {
      const max = el.scrollWidth - el.clientWidth
      setProg(max > 0 ? el.scrollLeft / max : 1)
    }
    on()
    el.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => {
      el.removeEventListener('scroll', on)
      window.removeEventListener('resize', on)
    }
  }, [cat])

  const scroll = (dir: number) => {
    const el = track.current
    if (el) el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.85, 620), behavior: 'smooth' })
  }

  const onScrub = (e: React.ChangeEvent<HTMLInputElement>) => {
    const el = track.current
    if (!el) return
    el.scrollLeft = (Number(e.target.value) / 1000) * (el.scrollWidth - el.clientWidth)
  }

  return (
    <section id="originals" className="sec originals" aria-labelledby="originals-title">
      <SectionHeading
        id="originals-title"
        kicker={`${projects.length} Originals · Real Repos`}
        title="Originals"
        aside={<p>Every title links to its repository. Visuals come from the repos themselves; illustrations are marked.</p>}
      />

      <div className="filters reveal" role="group" aria-label="Filter projects">
        {categories.map((c) => (
          <button key={c.id} className={`filter ${cat === c.id ? 'is-active' : ''}`} aria-pressed={cat === c.id} onClick={() => setCat(c.id)}>
            {c.label}
          </button>
        ))}
      </div>

      <div className="orig-wrap reveal">
        <button className="row-arrow left" onClick={() => scroll(-1)} aria-label="Previous projects">
          <ChevronLeft />
        </button>
        <div className="orig-track" ref={track}>
          {list.map((p) => (
            <article key={p.id} className="orig-card" style={{ '--accent': p.accent } as React.CSSProperties}>
              <div className="orig-media">
                <ProjectVisual project={p} />
              </div>
              <div className="orig-body">
                <p className="orig-genres">{p.genres.join(' • ')}</p>
                <h3 className="orig-title">{p.title}</h3>
                <p className="orig-summary">{p.summary}</p>
                <ul className="chips" aria-label="Technologies">
                  {p.tech.slice(0, 5).map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <div className="orig-actions">
                  <button className="btn btn-light btn-sm" onClick={() => onOpenProject(p.id)}>
                    <PlayIcon /> View Project
                  </button>
                  {p.repo ? (
                    <a className="btn btn-outline btn-sm" href={p.repo} target="_blank" rel="noreferrer">
                      <GithubIcon /> GitHub <ArrowUpRight />
                    </a>
                  ) : (
                    <span className="btn btn-outline btn-sm is-disabled" title={p.repoNote}>
                      <LockIcon /> Private repo
                    </span>
                  )}
                  {p.demo && (
                    <a className="btn btn-outline btn-sm" href={p.demo.url} target="_blank" rel="noreferrer">
                      <PlayIcon /> Demo <ArrowUpRight />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
          <a className="orig-more" href={profile.links.github} target="_blank" rel="noreferrer">
            <GithubIcon />
            <strong>More on GitHub</strong>
            <span>github.com/madankumar477</span>
          </a>
        </div>
        <button className="row-arrow right" onClick={() => scroll(1)} aria-label="Next projects">
          <ChevronRight />
        </button>
      </div>

      <div className="scrubber reveal">
        <span className="scrubber-label">Originals</span>
        <div className="scrubber-track">
          <span className="scrubber-fill" style={{ width: `${prog * 100}%` }} />
          <span className="scrubber-knob" style={{ left: `${prog * 100}%` }} />
          <input
            type="range"
            min={0}
            max={1000}
            value={Math.round(prog * 1000)}
            onChange={onScrub}
            aria-label="Scrub through projects"
          />
        </div>
      </div>
    </section>
  )
}
