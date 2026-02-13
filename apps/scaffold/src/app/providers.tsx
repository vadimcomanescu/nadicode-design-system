'use client'

import { useEffect } from 'react'
import { ThemeProvider } from '@/lib/ThemeProvider'

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'test') return

    Promise.all([import('three'), import('p5')])
      .then(([THREE, p5Module]) => {
        (window as unknown as Record<string, unknown>).THREE = THREE
        ;(window as unknown as Record<string, unknown>).p5 = p5Module.default
      })
      .catch(() => {
        // Optional globals for Vanta effects. Ignore failures in unsupported runtimes.
      })
  }, [])

  return (
    <ThemeProvider defaultTheme="system">
      {children}
    </ThemeProvider>
  )
}
