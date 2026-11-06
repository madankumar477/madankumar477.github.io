import { profile } from '../data/profile'
import { BrandMark, GithubIcon, LinkedinIcon, MailIcon } from './Icons'

export default function Footer() {
  return (
    <footer className="footer">
      <BrandMark />
      <div className="footer-social">
        <a href={profile.links.github} target="_blank" rel="noreferrer" aria-label="GitHub">
          <GithubIcon />
        </a>
        <a href={profile.links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
          <LinkedinIcon />
        </a>
        <a href={`mailto:${profile.email}`} aria-label="Email">
          <MailIcon />
        </a>
      </div>
      <p>
        © {new Date().getFullYear()} {profile.fullName} · {profile.location}
      </p>
      <p className="footer-fine">A personal portfolio styled as a streaming series. Not affiliated with any streaming service.</p>
    </footer>
  )
}
