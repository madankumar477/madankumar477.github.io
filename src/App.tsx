import { useCallback, useEffect, useState } from 'react'
import Cursor from './components/Cursor'
import Intro from './components/Intro'
import ProfileGate from './components/ProfileGate'
import Browse from './components/Browse'
import { isViewerId, type ViewerId } from './data/viewers'

type Stage = 'intro' | 'profiles' | 'browse'

const STORE_KEY = 'madan-series-viewer'

function readStoredViewer(): ViewerId | null {
  try {
    const v = sessionStorage.getItem(STORE_KEY)
    return isViewerId(v) ? v : null
  } catch {
    return null
  }
}

export default function App() {
  const [viewer, setViewer] = useState<ViewerId | null>(readStoredViewer)
  const [stage, setStage] = useState<Stage>(() => (viewer ? 'browse' : 'intro'))

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [stage])

  const chooseViewer = useCallback((id: ViewerId) => {
    setViewer(id)
    try {
      sessionStorage.setItem(STORE_KEY, id)
    } catch {
      /* storage unavailable — fine */
    }
    setStage('browse')
  }, [])

  const replayOpening = useCallback(() => setStage('intro'), [])
  const switchProfile = useCallback(() => setStage('profiles'), [])

  return (
    <div className="app grain">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Cursor />
      {stage === 'intro' && <Intro onPlay={() => setStage('profiles')} onSkip={() => setStage(viewer ? 'browse' : 'profiles')} />}
      {stage === 'profiles' && <ProfileGate onChoose={chooseViewer} />}
      {stage === 'browse' && viewer && (
        <Browse viewer={viewer} onReplayOpening={replayOpening} onSwitchProfile={switchProfile} />
      )}
    </div>
  )
}
