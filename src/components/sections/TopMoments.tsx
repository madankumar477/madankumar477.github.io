import { certifications, education, experience } from '../../data/profile'
import SectionHeading from '../SectionHeading'
import { Laurel } from '../Icons'

/** Experience, education & credentials as gold "award" cards (reference: Top Moments + Certified row). */
export default function TopMoments() {
  const job = experience[0]
  const moments = [
    {
      kicker: 'Now playing',
      title: job.role,
      line: `${job.company} · ${job.team}`,
      detail: `${job.location} · ${job.status}`,
      featured: true,
    },
    {
      kicker: 'The degree',
      title: education.short,
      line: education.institution,
      detail: education.location,
    },
    ...certifications.map((c) => ({
      kicker: `${c.provider} certified`,
      title: c.title,
      line: c.issuer,
      detail: 'Certification',
    })),
  ]

  return (
    <section id="experience" className="sec moments" aria-labelledby="moments-title">
      <SectionHeading
        id="moments-title"
        kicker="Experience · Award Season"
        title="Top Moments"
        aside={<p>The internship, the degree and the credential — exactly as they are.</p>}
      />

      <ol className="moment-row">
        {moments.map((m, i) => (
          <li
            key={m.title}
            className={`moment reveal ${m.featured ? 'is-featured' : ''}`}
            style={{ '--d': `${i * 90}ms` } as React.CSSProperties}
          >
            <Laurel className="moment-laurel" />
            <p className="moment-kicker">{m.kicker}</p>
            <h3 className="moment-title">{m.title}</h3>
            <p className="moment-line">{m.line}</p>
            <p className="moment-detail">{m.detail}</p>
          </li>
        ))}
      </ol>

      <div className="certified reveal">
        <h3 className="row-title">
          Certified <span className="row-count">· {certifications.length} credential</span>
        </h3>
        <ul className="cert-row">
          {certifications.map((c) => (
            <li key={c.title} className="cert-card">
              <span className="cert-provider">{c.provider}</span>
              <span className="cert-title">{c.title}</span>
              <span className="cert-issuer">{c.issuer}</span>
              <span className="cert-bar" aria-hidden />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
