import { certifications, education, experience, profile } from '../../data/profile'
import { projects } from '../../data/projects'
import { genres, totalSkills } from '../../data/skills'
import SectionHeading from '../SectionHeading'
import { DownloadIcon, PlayIcon } from '../Icons'

/** "The Full Story" — the one-page screenplay résumé (printable). */
export default function FullStory() {
  const job = experience[0]
  return (
    <section id="story" className="sec story" aria-labelledby="story-title">
      <SectionHeading id="story-title" kicker="The Screenplay" title="The Full Story" />
      <div className="story-grid">
        <article className="script reveal" id="resume-print" aria-label="Résumé">
          <header className="script-head">
            <div>
              <p className="script-label">Starring</p>
              <h3 className="script-name">{profile.fullName.toUpperCase()}</h3>
              <p className="script-role">{profile.title}</p>
            </div>
            <ul className="script-contact">
              <li>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </li>
              <li>
                <a href={profile.links.linkedin} target="_blank" rel="noreferrer">
                  linkedin.com/in/emadankumar
                </a>
              </li>
              <li>
                <a href={profile.links.github} target="_blank" rel="noreferrer">
                  github.com/madankumar477
                </a>
              </li>
              <li>{profile.location}</li>
            </ul>
          </header>

          <div className="script-cols">
            <div>
              <h4 className="script-h">Education</h4>
              <div className="script-item">
                <p className="script-strong">{education.institution}</p>
                <p>{education.degree}</p>
                <p className="script-dim">{education.location}</p>
              </div>

              <h4 className="script-h">Work Experience</h4>
              <div className="script-item">
                <p className="script-strong">
                  {job.company} — {job.role}
                </p>
                <p>
                  {job.team} · {job.location}
                </p>
                <p className="script-dim">{job.status}</p>
              </div>

              <h4 className="script-h">Projects</h4>
              <ul className="script-projects">
                {projects.map((p) => (
                  <li key={p.id}>
                    <span className="script-strong">{p.title}</span>
                    <span className="script-dim">{p.tech.slice(0, 4).join(', ')}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="script-h">Skills</h4>
              <dl className="script-skills">
                {genres.map((g) => (
                  <div key={g.id}>
                    <dt>{g.name}:</dt>
                    <dd>{g.skills.map((s) => s.name).join(', ')}</dd>
                  </div>
                ))}
              </dl>

              <h4 className="script-h">Certifications</h4>
              <ul className="script-list">
                {certifications.map((c) => (
                  <li key={c.title}>
                    <span className="script-strong">
                      {c.provider} — {c.title}
                    </span>{' '}
                    · {c.issuer}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>

        <aside className="story-side reveal" style={{ '--d': '120ms' } as React.CSSProperties}>
          <p className="story-quote">Every episode, on one page.</p>
          <p className="story-sub">Education, internship, projects, skills and certification — read it here, or save a copy.</p>
          <a className="btn btn-cream" href="#originals">
            <PlayIcon /> Watch the Originals
          </a>
          <button className="btn btn-ghost" onClick={() => window.print()}>
            <DownloadIcon /> Download Résumé
          </button>
          <dl className="story-stats">
            <div>
              <dt>{projects.length}</dt>
              <dd>Originals</dd>
            </div>
            <div>
              <dt>{totalSkills}</dt>
              <dd>Skills</dd>
            </div>
            <div>
              <dt>{certifications.length}</dt>
              <dd>Cert</dd>
            </div>
          </dl>
        </aside>
      </div>
    </section>
  )
}
