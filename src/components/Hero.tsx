import { useState } from 'react'
import { certifications, education, experience, profile } from '../data/profile'
import { projects } from '../data/projects'
import type { Viewer } from '../data/viewers'
import RoboticPortrait from './RoboticPortrait'
import { BrandMark, DownloadIcon, InfoIcon, PlayIcon } from './Icons'

interface Props {
  viewer: Viewer
}

export default function Hero({ viewer }: Props) {
  const [info, setInfo] = useState(false)
  const firstSection = viewer.order[0]
  const job = experience[0]

  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="hero-bg" aria-hidden />
      <div className="hero-inner">
        <div className="hero-copy">
          <BrandMark className="hero-brand reveal" />
          <h1 id="hero-title" className="hero-title reveal" style={{ '--d': '80ms' } as React.CSSProperties}>
            <span className="hero-name" data-text={profile.displayName}>
              {profile.displayName}
            </span>
            <span className="sr-only"> — {profile.fullName}</span>
          </h1>
          <p className="hero-series reveal" style={{ '--d': '160ms' } as React.CSSProperties}>
            The Series
          </p>
          <ul className="hero-meta reveal" style={{ '--d': '220ms' } as React.CSSProperties} aria-label="At a glance">
            <li className="hero-rating">ROS 2</li>
            <li>{education.short}</li>
            <li>
              {job.role} @ {job.company}
            </li>
            <li>{projects.length} Originals</li>
            <li>
              {certifications.length} Certification{certifications.length > 1 ? 's' : ''}
            </li>
          </ul>
          <p className="hero-genre reveal" style={{ '--d': '280ms' } as React.CSSProperties}>
            {profile.tagline}
          </p>
          <p className="hero-desc reveal" style={{ '--d': '340ms' } as React.CSSProperties}>
            {profile.intro}
          </p>
          <div className="hero-actions reveal" style={{ '--d': '400ms' } as React.CSSProperties}>
            <a className="btn btn-light" href={`#${firstSection}`}>
              <PlayIcon /> Play {viewer.id === 'madan' ? 'Series' : 'Your Cut'}
            </a>
            <a className="btn btn-ghost" href="#story">
              <DownloadIcon /> View Résumé
            </a>
            <button
              className="btn btn-round"
              onClick={() => setInfo((i) => !i)}
              aria-expanded={info}
              aria-controls="hero-info"
              aria-label="More info"
            >
              <InfoIcon />
            </button>
          </div>
          <div id="hero-info" className={`hero-info ${info ? 'is-open' : ''}`} hidden={!info}>
            <dl>
              <div>
                <dt>Currently</dt>
                <dd>
                  {job.role} · {job.company} — {job.team}
                </dd>
              </div>
              <div>
                <dt>Studying</dt>
                <dd>
                  {education.degree} · {education.institution}
                </dd>
              </div>
              <div>
                <dt>Based in</dt>
                <dd>{profile.location}</dd>
              </div>
            </dl>
            <div className="hero-info-links">
              <a href={profile.links.github} target="_blank" rel="noreferrer">
                GitHub ↗
              </a>
              <a href={profile.links.linkedin} target="_blank" rel="noreferrer">
                LinkedIn ↗
              </a>
            </div>
          </div>
        </div>

        <div className="hero-visual reveal" style={{ '--d': '200ms' } as React.CSSProperties}>
          <div className="hero-halo" aria-hidden />
          <RoboticPortrait />
          <div className="hero-chip chip-a" aria-hidden>
            <strong>ROS 2 · Nav2</strong>
            <span>Autonomy</span>
          </div>
          <div className="hero-chip chip-b" aria-hidden>
            <strong>{job.company}</strong>
            <span>R&amp;AI Intern</span>
          </div>
        </div>
      </div>
      <p className="hero-viewer">
        Watching as <strong>{viewer.name}</strong> · {viewer.blurb}
      </p>
    </section>
  )
}
