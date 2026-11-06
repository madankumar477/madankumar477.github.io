export type ViewerId = 'madan' | 'recruiter' | 'engineer' | 'explorer'

export type SectionId = 'story' | 'experience' | 'skills' | 'originals' | 'about' | 'journey' | 'picks'

export interface Viewer {
  id: ViewerId
  name: string
  blurb: string
  glyph: string
  gradient: string
  order: SectionId[]
}

/** Every profile watches the same true story — only the running order changes. */
export const viewers: Viewer[] = [
  {
    id: 'madan',
    name: 'Madan',
    blurb: 'The full series, in order',
    glyph: '',
    gradient: 'linear-gradient(160deg,#b0060f,#e50914 45%,#5a0308)',
    order: ['story', 'experience', 'skills', 'originals', 'about', 'journey', 'picks'],
  },
  {
    id: 'recruiter',
    name: 'Recruiter',
    blurb: 'Experience, résumé & skills first',
    glyph: 'R',
    gradient: 'linear-gradient(160deg,#2b6f9e,#4fa3c7 50%,#1a3f5e)',
    order: ['experience', 'story', 'skills', 'originals', 'about', 'journey', 'picks'],
  },
  {
    id: 'engineer',
    name: 'Engineer',
    blurb: 'Projects, stack & GitHub first',
    glyph: '</>',
    gradient: 'linear-gradient(160deg,#1f7a3a,#3fbf5f 50%,#145227)',
    order: ['originals', 'skills', 'picks', 'story', 'experience', 'about', 'journey'],
  },
  {
    id: 'explorer',
    name: 'Explorer',
    blurb: 'Robots, demos & the journey first',
    glyph: '✦',
    gradient: 'linear-gradient(160deg,#b9770e,#f2b322 50%,#7a4b06)',
    order: ['picks', 'journey', 'originals', 'about', 'experience', 'skills', 'story'],
  },
]

export const isViewerId = (v: unknown): v is ViewerId =>
  typeof v === 'string' && viewers.some((x) => x.id === v)

export const viewerById = (id: ViewerId) => viewers.find((v) => v.id === id)!

export const sectionMeta: Record<SectionId | 'home' | 'contact', { nav: string; episode: string; sub: string }> = {
  home: { nav: 'Home', episode: 'Home', sub: '' },
  story: { nav: 'Résumé', episode: 'The Full Story', sub: 'Résumé · one page' },
  experience: { nav: 'Experience', episode: 'Top Moments', sub: 'Experience · education · certified' },
  skills: { nav: 'Skills', episode: 'My Skills', sub: '6 genres' },
  originals: { nav: 'Originals', episode: 'My Projects', sub: '9 originals' },
  about: { nav: 'About', episode: 'About Me', sub: 'The pilot' },
  journey: { nav: 'Journey', episode: 'My Journey', sub: '6 seasons' },
  picks: { nav: 'Top Picks', episode: 'Top Picks', sub: 'Editor’s choice' },
  contact: { nav: 'Contact', episode: 'To Be Continued', sub: 'Let’s build' },
}
