import { useState } from 'react'
import { genres } from '../../data/skills'
import { projectById } from '../../data/projects'
import SectionHeading from '../SectionHeading'

interface Props {
  onOpenProject: (id: string) => void
}

export default function SkillUniverse({ onOpenProject }: Props) {
  const [gid, setGid] = useState(genres[0].id)
  const g = genres.find((x) => x.id === gid)!

  return (
    <section id="skills" className="sec skills" aria-labelledby="skills-title">
      <SectionHeading
        id="skills-title"
        kicker="Genres"
        title="My Skill Universe"
        aside={<p>Pick a genre. Hover or focus a skill to see where it shows up in my repositories.</p>}
      />
      <div className="skills-grid">
        <div className="genre-list reveal" role="tablist" aria-label="Skill genres" aria-orientation="vertical">
          {genres.map((x) => (
            <button
              key={x.id}
              role="tab"
              id={`tab-${x.id}`}
              aria-selected={x.id === gid}
              aria-controls="genre-panel"
              className={`genre ${x.id === gid ? 'is-active' : ''}`}
              style={{ '--g': x.color } as React.CSSProperties}
              onClick={() => setGid(x.id)}
            >
              <span className="genre-name">{x.name}</span>
              <span className="genre-sub">
                {x.skills.length} skills · {x.tagline}
              </span>
            </button>
          ))}
        </div>

        <div
          id="genre-panel"
          className="genre-panel reveal"
          role="tabpanel"
          aria-labelledby={`tab-${g.id}`}
          style={{ '--g': g.color } as React.CSSProperties}
        >
          <p className="genre-panel-head">
            <strong>{g.name}</strong> — {g.tagline}
          </p>
          <ul className="skill-tiles" key={g.id}>
            {g.skills.map((s, i) => (
              <li key={s.name} className="skill" style={{ '--i': i } as React.CSSProperties} tabIndex={0}>
                <span className="skill-icon" aria-hidden>
                  {s.abbr}
                </span>
                <span className="skill-name">
                  {s.name}
                  {s.core && <em className="skill-core">CORE</em>}
                </span>
                <span className="skill-seen">
                  {s.seenIn?.length ? (
                    <>
                      Seen in{' '}
                      {s.seenIn.map((pid, j) => {
                        const p = projectById(pid)
                        if (!p) return null
                        return (
                          <span key={pid}>
                            {j > 0 && ', '}
                            <button className="skill-link" onClick={() => onOpenProject(pid)}>
                              {p.short}
                            </button>
                          </span>
                        )
                      })}
                    </>
                  ) : (
                    'Part of my toolkit'
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
