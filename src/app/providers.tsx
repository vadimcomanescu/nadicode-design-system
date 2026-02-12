'use client'

import { useEffect } from 'react'
import { ThemeProvider } from '@/lib/ThemeProvider'

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    Promise.all([import('three'), import('p5')]).then(([THREE, p5Module]) => {
      (window as unknown as Record<string, unknown>).THREE = THREE;
      (window as unknown as Record<string, unknown>).p5 = p5Module.default;
    })
  }, [])

  return (
    <ThemeProvider defaultTheme="system">
      {children}
    </ThemeProvider>
  )
}
