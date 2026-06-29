import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

document.addEventListener('mousemove', (e) => {
  const cursor = document.getElementById('cursor')
  const glow = document.getElementById('cursor-glow')
  if (cursor) { cursor.style.left = e.clientX + 'px'; cursor.style.top = e.clientY + 'px' }
  if (glow) { glow.style.left = e.clientX + 'px'; glow.style.top = e.clientY + 'px' }
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)