import { useEffect, useRef, useState } from 'react'
import { profile } from '../data/profile'
import { sectionMeta, viewers, type SectionId, type Viewer } from '../data/viewers'
import { BrandMark, ChevronDown, CloseIcon, MenuIcon } from './Icons'

interface Props {
  order: SectionId[]
  active: string
  viewer: Viewer
  onSwitchProfile: () => void
}

export default function Navbar({ order, active, viewer, onSwitchProfile }: Props) {
  const [solid, setSolid] = useState(false)
  const [menu, setMenu] = useState(false)
  const [drop, setDrop] = useState(false)
  const dropRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!drop) return
    const close = (e: MouseEvent) => {
      if (!dropRef.current?.contains(e.target as Node)) setDrop(false)
    }
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setDrop(false)
    document.addEventListener('click', close)
    document.addEventListener('keydown', esc)
    return () => {
      document.removeEventListener('click', close)
      document.removeEventListener('keydown', esc)
    }
  }, [drop])

  useEffect(() => {
    document.body.classList.toggle('lock-scroll', menu)
    if (!menu) return
    // Close on any in-page navigation (covers taps that skip React's click path) and on Escape.
    const close = () => setMenu(false)
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && close()
    window.addEventListener('hashchange', close)
    document.addEventListener('keydown', esc)
    return () => {
      window.removeEventListener('hashchange', close)
      document.removeEventListener('keydown', esc)
    }
  }, [menu])

  const links: { id: string; label: string }[] = [
    { id: 'home', label: 'Home' },
    ...order.map((id) => ({ id, label: sectionMeta[id].nav })),
  ]

  return (
    <header className={`nav ${solid ? 'is-solid' : ''}`}>
      <a href="#home" className="nav-brand" aria-label="Back to top">
        <BrandMark />
      </a>
      <nav className={`nav-links ${menu ? 'is-open' : ''}`} aria-label="Sections">
        <button className="nav-close" onClick={() => setMenu(false)} aria-label="Close menu">
          <CloseIcon />
        </button>
        {links.map((l) => (
          <a
            key={l.id}
            href={`#${l.id}`}
            className={active === l.id ? 'is-active' : ''}
            aria-current={active === l.id ? 'true' : undefined}
            onClick={() => setMenu(false)}
          >
            {l.label}
          </a>
        ))}
      </nav>
      <div className="nav-right">
        <a href="#contact" className="nav-cta btn-caps">
          Let’s build
        </a>
        <div className="nav-profile" ref={dropRef}>
          <button
            className="nav-avatar-btn"
            onClick={() => setDrop((d) => !d)}
            aria-expanded={drop}
            aria-haspopup="menu"
            aria-label={`Watching as ${viewer.name}. Open profile menu`}
          >
            <span className="nav-avatar" style={{ background: viewer.gradient }}>
              {viewer.id === 'madan' ? <img src={profile.photo.cutout} alt="" /> : <span>{viewer.glyph}</span>}
            </span>
            <ChevronDown className={`nav-caret ${drop ? 'is-up' : ''}`} />
          </button>
          {drop && (
            <div className="nav-drop" role="menu">
              <p className="nav-drop-label">Watching as {viewer.name}</p>
              {viewers.map((v) => (
                <div key={v.id} className={`nav-drop-row ${v.id === viewer.id ? 'is-current' : ''}`}>
                  <span className="nav-avatar sm" style={{ background: v.gradient }}>
                    {v.id === 'madan' ? <img src={profile.photo.cutout} alt="" /> : <span>{v.glyph}</span>}
                  </span>
                  {v.name}
                </div>
              ))}
              <button className="nav-drop-switch" role="menuitem" onClick={onSwitchProfile}>
                Switch profile
              </button>
              <a className="nav-drop-switch" role="menuitem" href={profile.links.github} target="_blank" rel="noreferrer">
                GitHub ↗
              </a>
            </div>
          )}
        </div>
        <button className="nav-burger" onClick={() => setMenu(true)} aria-label="Open menu" aria-expanded={menu}>
          <MenuIcon />
        </button>
      </div>
    </header>
  )
}
