'use client'

import * as React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Typography } from '@/components/ui/Typography'
import { Container } from '@/components/layout/Grid'
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
import { cn } from '@/lib/utils'
import { useTheme } from '@/lib/ThemeProvider'

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
  const { theme, setTheme, style } = useTheme()
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
    router.push(`/${value}`, { scroll: false })
    window.scrollTo(0, 0)
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
    <div className="min-h-dvh bg-background text-text-primary py-4 md:py-12 relative overflow-hidden">
      <MouseGlow className="fixed inset-0 z-0 pointer-events-none opacity-85" />
      <Container className="relative z-10">
        <AnimatedTabs
          value={currentTab}
          onValueChange={handleTabChange}
          className="mb-6 md:mb-10"
        >
          <div className="sticky top-2 z-30 rounded-xl border border-border/60 bg-surface/85 p-2 shadow-lg backdrop-blur-xl">
            <div className="flex w-full items-center gap-2">
              <button
                onClick={() => setCmdkOpen(true)}
                className="inline-flex h-11 min-w-0 flex-1 items-center justify-center gap-2 rounded-md border border-border bg-surface px-3 text-sm text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary md:h-10 md:flex-none"
                aria-label="Open command palette"
              >
                <SearchIcon size={14} />
                <span>Search</span>
                <Kbd className="ml-1 hidden sm:inline-flex">
                  <span className="text-xs">&#8984;K</span>
                </Kbd>
              </button>
              <StyleToggle className="shrink-0" />
              <div
                className="inline-flex shrink-0 items-center rounded-full border border-border bg-surface p-1"
                role="radiogroup"
                aria-label="Theme mode"
              >
                {[
                  { value: 'light', label: 'Light', short: 'L' },
                  { value: 'dark', label: 'Dark', short: 'D', disabled: style === 'bloom' },
                  { value: 'system', label: 'System', short: 'Sys', disabled: style === 'bloom' },
                ].map(option => (
                  <button
                    key={option.value}
                    type="button"
                    role="radio"
                    aria-checked={theme === option.value}
                    aria-label={`Set theme to ${option.label.toLowerCase()}`}
                    onClick={() => setTheme(option.value as 'light' | 'dark' | 'system')}
                    disabled={option.disabled}
                    className={cn(
                      'inline-flex min-h-10 items-center justify-center rounded-full px-2.5 text-xs font-medium transition-all sm:px-3',
                      theme === option.value
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-text-secondary hover:text-text-primary',
                      option.disabled && 'opacity-50'
                    )}
                  >
                    <span className="sm:hidden">{option.short}</span>
                    <span className="hidden sm:inline">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <AnimatedTabsList className="glass-panel mt-2 h-11 w-full justify-start overflow-x-auto overflow-y-hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:justify-center">
              {TABS.map(tab => (
                <AnimatedTabsTrigger key={tab.value} value={tab.value} className="min-h-10">
                  {tab.label}
                </AnimatedTabsTrigger>
              ))}
            </AnimatedTabsList>
          </div>
        </AnimatedTabs>

        <header className="mb-8 md:mb-12">
          <Typography variant="h1" className="mb-3">
            <AnimatedGradientText className="text-3xl sm:text-5xl md:text-6xl">Nadicode System</AnimatedGradientText>
          </Typography>
          <Typography variant="body" className="max-w-2xl text-base text-text-secondary sm:text-lg md:text-xl">
            A comprehensive design system for AI-integrated web applications.
            Featuring ultra-realistic aesthetics, deep blacks, and high-contrast accessibility.
          </Typography>
        </header>

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
