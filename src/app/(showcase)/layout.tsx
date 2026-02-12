'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Typography } from '@/components/ui/Typography'
import { Container } from '@/components/layout/Grid'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { StyleToggle } from '@/components/ui/StyleToggle'
import { Toaster } from '@/components/ui/Toaster'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import { AnimatedGradientText } from '@/components/ui/text-effects'
import { MouseGlow } from '@/components/ui/MouseEffect'

const TABS = [
  { value: 'foundations', label: 'Foundations' },
  { value: 'components', label: 'Components' },
  { value: 'blocks', label: 'Blocks' },
  { value: 'charts', label: 'Charts' },
  { value: 'icons', label: 'Icons' },
  { value: 'pages', label: 'Pages' },
  { value: 'patterns', label: 'Patterns' },
] as const

export default function ShowcaseLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const currentTab = pathname.split('/').pop() || 'foundations'

  const handleTabChange = (value: string) => {
    router.push(`/${value}`)
  }

  return (
    <div className="min-h-dvh bg-background text-text-primary py-12 relative overflow-hidden">
      <MouseGlow className="fixed inset-0 z-0 pointer-events-none opacity-70" />
      <Container className="relative z-10">
        <header className="mb-12 flex items-start justify-between">
          <div>
            <Typography variant="h1" className="mb-4">
              <AnimatedGradientText className="text-5xl sm:text-6xl">Nadicode System</AnimatedGradientText>
            </Typography>
            <Typography variant="body" className="text-xl text-text-secondary max-w-2xl">
              A comprehensive design system for AI-integrated web applications.
              Featuring ultra-realistic aesthetics, deep blacks, and high-contrast accessibility.
            </Typography>
          </div>
          <div className="flex items-center gap-3">
            <StyleToggle />
            <ThemeToggle />
          </div>
        </header>

        <Tabs
          value={currentTab}
          onValueChange={handleTabChange}
          className="space-y-8"
        >
          <TabsList className="glass mb-8">
            {TABS.map(tab => (
              <TabsTrigger key={tab.value} value={tab.value}>{tab.label}</TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {children}
      </Container>
      <Toaster />
    </div>
  )
}
