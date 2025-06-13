import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './shared/styles/index.css'
import App from './configs/App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
