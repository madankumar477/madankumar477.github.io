import { useState } from 'react'
import { profile } from '../../data/profile'
import { ArrowUpRight, CloseIcon, PlayIcon, ReplayIcon } from '../Icons'

interface Props {
  onReplayOpening: () => void
}

/** "To Be Continued…" finale + mail-client contact form (no backend, no third-party service). */
export default function Contact({ onReplayOpening }: Props) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio — hello from ${form.name}`)
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <section id="contact" className="sec finale" aria-labelledby="finale-title">
      <div className="finale-glow" aria-hidden />
      <p className="finale-kicker reveal">The Next Episode</p>
      <h2 id="finale-title" className="finale-title reveal" data-text="To Be Continued…">
        To Be Continued…
      </h2>
      <p className="finale-name reveal">{profile.fullName.toUpperCase()}</p>
      <p className="finale-role reveal">{profile.title}</p>

      <div className="finale-actions reveal">
        <button className="btn btn-red btn-pill btn-caps" onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="contact-form">
          <PlayIcon /> Let’s build
        </button>
        <a className="btn btn-outline btn-pill btn-caps" href={profile.links.linkedin} target="_blank" rel="noreferrer">
          LinkedIn <ArrowUpRight />
        </a>
        <a className="btn btn-outline btn-pill btn-caps" href={profile.links.github} target="_blank" rel="noreferrer">
          GitHub <ArrowUpRight />
        </a>
        <a className="btn btn-outline btn-pill btn-caps" href={`mailto:${profile.email}`}>
          Email <ArrowUpRight />
        </a>
      </div>

      <div id="contact-form" className={`contact-panel ${open ? 'is-open' : ''}`} hidden={!open}>
        <form className="contact-form" onSubmit={submit}>
          <div className="contact-head">
            <h3>Pitch the next episode</h3>
            <button type="button" className="contact-x" onClick={() => setOpen(false)} aria-label="Close form">
              <CloseIcon />
            </button>
          </div>
          <label>
            <span>Name</span>
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} autoComplete="name" />
          </label>
          <label>
            <span>Your email</span>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              autoComplete="email"
            />
          </label>
          <label className="full">
            <span>Message</span>
            <textarea required rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
          </label>
          <div className="contact-foot full">
            <p>Opens your mail app addressed to {profile.email} — nothing is sent to any server.</p>
            <button className="btn btn-light" type="submit">
              Send via email
            </button>
          </div>
          {sent && (
            <p className="contact-sent full" role="status">
              Your mail app should open with the message ready. If it didn’t, write to {profile.email}.
            </p>
          )}
        </form>
      </div>

      <div className="finale-links reveal">
        <a href="#home">
          <ReplayIcon /> Watch again
        </a>
        <button onClick={onReplayOpening}>
          <PlayIcon /> Replay opening
        </button>
      </div>
    </section>
  )
}
