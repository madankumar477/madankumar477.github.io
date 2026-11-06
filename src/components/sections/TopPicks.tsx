import { topPicks } from '../../data/journey'
import { projectById } from '../../data/projects'
import SectionHeading from '../SectionHeading'
import ProjectVisual from '../ProjectVisual'
import { PlayIcon } from '../Icons'

interface Props {
  onOpenProject: (id: string) => void
}

export default function TopPicks({ onOpenProject }: Props) {
  return (
    <section id="picks" className="sec picks" aria-labelledby="picks-title">
      <SectionHeading id="picks-title" kicker={`Top ${topPicks.length} · From the Repos`} title="Madan’s Top Picks" />
      <ol className="pick-row">
        {topPicks.map((t, i) => {
          const p = projectById(t.projectId)
          if (!p) return null
          return (
            <li key={t.projectId} className="pick reveal" style={{ '--d': `${i * 90}ms`, '--accent': p.accent } as React.CSSProperties}>
              <button className="pick-btn" onClick={() => onOpenProject(p.id)} aria-label={`${t.label}: ${p.title}. Open details`}>
                <span className="pick-num" aria-hidden>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="pick-media">
                  <ProjectVisual project={p} />
                </span>
                <span className="pick-ep">Episode {String(i + 1).padStart(2, '0')}</span>
                <span className="pick-title">{t.label}</span>
                <span className="pick-sub">{p.title}</span>
                <span className="pick-summary">{p.summary}</span>
                <span className="pick-tech">
                  {p.tech.slice(0, 3).map((x) => (
                    <em key={x}>{x}</em>
                  ))}
                </span>
                <span className="pick-play" aria-hidden>
                  <PlayIcon />
                </span>
              </button>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
