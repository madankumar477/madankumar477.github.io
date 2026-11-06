import { useCallback, useMemo, useState } from 'react'
import { viewerById, type SectionId, type ViewerId } from '../data/viewers'
import { useRevealAll } from '../hooks/useReveal'
import { useSectionProgress } from '../hooks/useSectionProgress'
import Navbar from './Navbar'
import Hero from './Hero'
import ContinueRow from './ContinueRow'
import FullStory from './sections/FullStory'
import TopMoments from './sections/TopMoments'
import SkillUniverse from './sections/SkillUniverse'
import Originals from './sections/Originals'
import About from './sections/About'
import Journey from './sections/Journey'
import TopPicks from './sections/TopPicks'
import Contact from './sections/Contact'
import Footer from './Footer'
import ProjectModal from './ProjectModal'

interface Props {
  viewer: ViewerId
  onReplayOpening: () => void
  onSwitchProfile: () => void
}

export default function Browse({ viewer, onReplayOpening, onSwitchProfile }: Props) {
  const v = viewerById(viewer)
  const order = v.order
  const ids = useMemo(() => [...order, 'contact'], [order])
  const { progress, active } = useSectionProgress(ids)
  const [openId, setOpenId] = useState<string | null>(null)
  const openProject = useCallback((id: string) => setOpenId(id), [])
  const closeProject = useCallback(() => setOpenId(null), [])

  useRevealAll([viewer])

  const render = (id: SectionId) => {
    switch (id) {
      case 'story':
        return <FullStory key={id} />
      case 'experience':
        return <TopMoments key={id} />
      case 'skills':
        return <SkillUniverse key={id} onOpenProject={openProject} />
      case 'originals':
        return <Originals key={id} onOpenProject={openProject} />
      case 'about':
        return <About key={id} />
      case 'journey':
        return <Journey key={id} onOpenProject={openProject} />
      case 'picks':
        return <TopPicks key={id} onOpenProject={openProject} />
    }
  }

  return (
    <div className="browse">
      <Navbar order={order} active={active} viewer={v} onSwitchProfile={onSwitchProfile} />
      <main id="main" tabIndex={-1}>
        <Hero viewer={v} />
        <ContinueRow order={order} progress={progress} />
        {order.map(render)}
        <Contact onReplayOpening={onReplayOpening} />
      </main>
      <Footer />
      <ProjectModal projectId={openId} onClose={closeProject} />
    </div>
  )
}
