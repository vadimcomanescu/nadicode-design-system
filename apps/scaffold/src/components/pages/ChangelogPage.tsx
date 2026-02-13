'use client'

import { HeroHeader } from "../blocks/HeaderBlock"
import { Footer } from "../blocks/FooterBlock"
import { ChangelogBlock } from "../blocks/ChangelogBlock"
import { Typography } from "../ui/Typography"
import { ScrollFadeIn } from "../ui/ScrollFadeIn"

export function ChangelogPage() {
  return (
    <div className="min-h-dvh bg-background text-text-primary">
      <HeroHeader />

      <section className="pt-32 pb-8 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <ScrollFadeIn>
            <Typography variant="h1" className="text-text-primary">
              What&apos;s new
            </Typography>
            <Typography variant="body" className="mt-4 text-lg text-text-secondary">
              All the latest updates, improvements, and fixes to the Scaffold design system.
            </Typography>
          </ScrollFadeIn>
        </div>
      </section>

      <ChangelogBlock />

      <Footer />
    </div>
  )
}
