import { education, experience, interests, practicalExperience, profile } from '../../data/profile'
import SectionHeading from '../SectionHeading'

export default function About() {
  const job = experience[0]
  return (
    <section id="about" className="sec about" aria-labelledby="about-title">
      <SectionHeading id="about-title" kicker="The Pilot" title="About Me" />
      <div className="about-grid">
        <figure className="about-poster reveal">
          <img src={profile.photo.cutout} alt="Portrait of E Madan Kumar" loading="lazy" width={697} height={914} />
          <figcaption>
            <span className="about-poster-k">Starring</span>
            <span className="about-poster-name">{profile.fullName}</span>
          </figcaption>
        </figure>

        <div className="about-copy">
          <blockquote className="about-quote reveal">
            “I’m a Robotics &amp; AI engineering student and a Robotics &amp; AI Intern at {job.company}. I like the part
            where code leaves the screen — where a ROS 2 stack, a sensor and a motor have to agree, and the robot actually moves.”
          </blockquote>

          <dl className="about-facts reveal" style={{ '--d': '100ms' } as React.CSSProperties}>
            <div>
              <dt>Now</dt>
              <dd>
                {job.role}
                <span>
                  {job.company} · {job.team}
                </span>
              </dd>
            </div>
            <div>
              <dt>Studying</dt>
              <dd>
                {education.short}
                <span>{education.institution}</span>
              </dd>
            </div>
            <div>
              <dt>Primary stack</dt>
              <dd>
                ROS 2 · Python
                <span>with C++, OpenCV, Nav2</span>
              </dd>
            </div>
            <div>
              <dt>Based in</dt>
              <dd>
                Bengaluru
                <span>Karnataka, India</span>
              </dd>
            </div>
          </dl>

          <div className="reveal" style={{ '--d': '160ms' } as React.CSSProperties}>
            <h3 className="about-h">Hands-on with</h3>
            <ul className="tags">
              {practicalExperience.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <h3 className="about-h">Interests</h3>
            <ul className="tags subtle">
              {interests.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
