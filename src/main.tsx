import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './lib/ThemeProvider'
import './index.css'
import App from './App.tsx'
import * as THREE from 'three'
import p5 from 'p5'

// Expose THREE and p5 globally for Vanta.js
if (typeof window !== 'undefined') {
  (window as any).THREE = THREE;
  (window as any).p5 = p5;
}

createRoot(document.getElementById('root')!).render(
  // StrictMode disabled temporarily for Vanta.js compatibility
  // <StrictMode>
  <ThemeProvider defaultTheme="system">
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>
  // </StrictMode>,
)
