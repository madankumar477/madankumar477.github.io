// Browsers only allow full screen after a user gesture, so the site switches to
// full screen on the visitor's first click, tap or key press (e.g. choosing a
// "Who's watching?" profile). Esc exits; it is not re-entered automatically.
export function enterFullscreenOnFirstInteraction(): void {
  const root = document.documentElement
  if (!root.requestFullscreen || !document.fullscreenEnabled) return // e.g. iPhone Safari

  const events = ['pointerdown', 'keydown'] as const
  const go = () => {
    events.forEach((e) => window.removeEventListener(e, go, true))
    if (!document.fullscreenElement) {
      root.requestFullscreen({ navigationUI: 'hide' }).catch(() => {
        /* refused by the browser: keep browsing normally */
      })
    }
  }
  events.forEach((e) => window.addEventListener(e, go, { capture: true }))
}
