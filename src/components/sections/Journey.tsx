import { useState } from 'react'
import { seasons } from '../../data/journey'
import SectionHeading from '../SectionHeading'
import { PlayIcon } from '../Icons'

interface Props {
  onOpenProject: (id: string) => void
}

export default function Journey({ onOpenProject }: Props) {
  const [sel, setSel] = useState(seasons.length - 2)
  const s = seasons[sel]

  return (
    <section id="journey" className="sec journey" aria-labelledby="journey-title">
      <SectionHeading
        id="journey-title"
        kicker={`${seasons.length} Seasons`}
        title="My Journey"
        aside={<p>Every stage of the story, told as a season. Grouped by theme — select one to see its episodes.</p>}
      />
      <div className="season-tabs reveal" role="tablist" aria-label="Seasons">
        {seasons.map((x, i) => (
          <button
            key={x.number}
            role="tab"
            aria-selected={i === sel}
            aria-controls="season-panel"
            className={`season-tab ${i === sel ? 'is-active' : ''}`}
            onClick={() => setSel(i)}
          >
            <span className="season-no">Season {x.number}</span>
            <span className="season-name">{x.name}</span>
          </button>
        ))}
      </div>

      <div id="season-panel" role="tabpanel" className="season-panel" key={s.number}>
        <div className="season-intro">
          <span className="season-big" aria-hidden>
            S{s.number}
          </span>
          <div>
            <h3 className="season-title">{s.name}</h3>
            <p className="season-log">{s.logline}</p>
          </div>
        </div>
        <ol className="episodes">
          {s.episodes.map((e, i) => (
            <li key={e.title} className={`episode ${s.upcoming ? 'is-upcoming' : ''}`} style={{ '--i': i } as React.CSSProperties}>
              <span className="episode-no">{i + 1}</span>
              <div className="episode-copy">
                <h4>{e.title}</h4>
                <p>{e.text}</p>
              </div>
              {e.projectId && (
                <button className="episode-play" onClick={() => onOpenProject(e.projectId!)} aria-label={`Open ${e.title}`}>
                  <PlayIcon />
                </button>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
