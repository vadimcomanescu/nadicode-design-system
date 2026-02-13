'use client'

import * as React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Typography } from '@/components/ui/Typography'
import { Container } from '@/components/layout/Grid'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { StyleToggle } from '@/components/ui/StyleToggle'
import { Toaster } from '@/components/ui/Toaster'
import { AnimatedTabs, AnimatedTabsList, AnimatedTabsTrigger } from '@/components/ui/AnimatedTabs'
import { AnimatedGradientText } from '@/components/ui/text-effects'
import { MouseGlow } from '@/components/ui/MouseEffect'
import { PageTransition } from '@/components/ui/PageTransition'
import { Dialog, DialogContent } from '@/components/ui/Dialog'
import { SearchCommand, type SearchResult } from '@/components/ui/SearchCommand'
import { SearchIcon } from '@/components/ui/icons'
import { Kbd } from '@/components/ui/Kbd'

const TABS = [
  { value: 'foundations', label: 'Foundations' },
  { value: 'components', label: 'Components' },
  { value: 'blocks', label: 'Blocks' },
  { value: 'charts', label: 'Charts' },
  { value: 'icons', label: 'Icons' },
  { value: 'pages', label: 'Pages' },
] as const

const STANDALONE_PAGES = [
  { value: '/dashboard', label: 'Dashboard', category: 'Pages' },
  { value: '/landing', label: 'Landing', category: 'Pages' },
  { value: '/pricing', label: 'Pricing', category: 'Pages' },
  { value: '/onboarding', label: 'Onboarding', category: 'Pages' },
  { value: '/changelog', label: 'Changelog', category: 'Pages' },
  { value: '/blog', label: 'Blog', category: 'Pages' },
  { value: '/voice-agents', label: 'Voice Agents', category: 'Pages' },
] as const

function buildSearchResults(query: string): SearchResult[] {
  if (!query.trim()) return []
  const q = query.toLowerCase()

  const results: SearchResult[] = []

  for (const tab of TABS) {
    if (tab.label.toLowerCase().includes(q) || tab.value.includes(q)) {
      results.push({
        id: tab.value,
        title: tab.label,
        description: `Go to ${tab.label} showcase`,
        category: 'Showcase',
      })
    }
  }

  for (const page of STANDALONE_PAGES) {
    if (page.label.toLowerCase().includes(q) || page.value.includes(q)) {
      results.push({
        id: page.value,
        title: page.label,
        description: `Go to ${page.label} page`,
        category: page.category,
      })
    }
  }

  return results
}

export default function ShowcaseLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const currentTab = pathname.split('/').pop() || 'foundations'

  const [cmdkOpen, setCmdkOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState('')

  // Cmd+K / Ctrl+K listener
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setCmdkOpen((prev) => !prev)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleTabChange = (value: string) => {
    router.push(`/${value}`)
  }

  const handleSearchSelect = (result: SearchResult) => {
    setCmdkOpen(false)
    setSearchQuery('')
    // Showcase tabs use /<value>, standalone pages use their full path
    const path = result.id.startsWith('/') ? result.id : `/${result.id}`
    router.push(path)
  }

  const searchResults = buildSearchResults(searchQuery)

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
            <button
              onClick={() => setCmdkOpen(true)}
              className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-1.5 text-sm text-text-secondary hover:text-text-primary hover:bg-surface-hover transition-colors"
              aria-label="Open command palette"
            >
              <SearchIcon size={14} />
              <span className="hidden sm:inline">Search</span>
              <Kbd className="ml-1">
                <span className="text-xs">&#8984;K</span>
              </Kbd>
            </button>
            <StyleToggle />
            <ThemeToggle />
          </div>
        </header>

        <AnimatedTabs
          value={currentTab}
          onValueChange={handleTabChange}
          className="space-y-8"
        >
          <AnimatedTabsList className="glass-panel mb-8">
            {TABS.map(tab => (
              <AnimatedTabsTrigger key={tab.value} value={tab.value}>{tab.label}</AnimatedTabsTrigger>
            ))}
          </AnimatedTabsList>
        </AnimatedTabs>

        <PageTransition pathname={pathname} mode="slide">
          {children}
        </PageTransition>
      </Container>
      <Toaster />

      {/* Cmd+K Command Palette */}
      <Dialog open={cmdkOpen} onOpenChange={setCmdkOpen}>
        <DialogContent className="p-0 gap-0 max-w-lg overflow-hidden">
          <SearchCommand
            value={searchQuery}
            onChange={setSearchQuery}
            results={searchResults}
            onSelect={handleSearchSelect}
            placeholder="Search pages..."
            variant="default"
            size="lg"
            className="border-0 rounded-none"
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}
