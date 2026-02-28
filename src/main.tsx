import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Strip any URL hash (e.g. #merch, #parks) before React renders.
// Without this, the browser jumps to that anchor before JS can scroll to top.
if (window.location.hash) {
  history.replaceState(null, '', window.location.pathname + window.location.search);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
