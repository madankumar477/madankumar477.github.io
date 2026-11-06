import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/bebas-neue/400.css'
import '@fontsource-variable/inter/index.css'
import '@fontsource/playfair-display/400-italic.css'
import './styles/base.css'
import './styles/intro.css'
import './styles/browse.css'
import './styles/sections.css'
import './styles/portrait.css'
import App from './App'
import { enterFullscreenOnFirstInteraction } from './fullscreen'

enterFullscreenOnFirstInteraction()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
