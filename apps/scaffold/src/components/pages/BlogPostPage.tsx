'use client'

import { HeroHeader } from "../blocks/HeaderBlock"
import { Footer } from "../blocks/FooterBlock"
import { Typography } from "../ui/Typography"
import { Badge } from "../ui/Badge"
import { Avatar, AvatarFallback } from "../ui/Avatar"
import { Card, CardContent } from "../ui/Card"
import { CodeBlock } from "../blocks/CodeBlock"
import { ScrollFadeIn } from "../ui/ScrollFadeIn"
import { NewsletterBlock } from "../blocks/NewsletterBlock"

export function BlogPostPage() {
  return (
    <div className="min-h-dvh bg-background text-text-primary">
      <HeroHeader />

      <article className="pt-32 pb-16">
        <div className="mx-auto max-w-3xl px-6">
          {/* Article header */}
          <ScrollFadeIn>
            <div className="mb-8">
              <div className="flex gap-2 mb-4">
                <Badge variant="accent">Design Systems</Badge>
                <Badge variant="secondary">Tutorial</Badge>
              </div>
              <Typography variant="h1" className="text-text-primary leading-tight">
                Building a Token-Driven Design System with Tailwind CSS 4
              </Typography>
              <Typography variant="body" className="mt-4 text-lg text-text-secondary">
                How we built a centralized token architecture that powers both light and dark themes, keeps components consistent, and scales from startup to enterprise.
              </Typography>

              <div className="mt-6 flex items-center gap-3 border-t border-b border-border py-4">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>NA</AvatarFallback>
                </Avatar>
                <div>
                  <Typography variant="small" className="font-medium text-text-primary">
                    Aria
                  </Typography>
                  <Typography variant="muted" className="text-xs">
                    Feb 9, 2026 &middot; 8 min read
                  </Typography>
                </div>
              </div>
            </div>
          </ScrollFadeIn>

          {/* Article body */}
          <div className="prose-custom space-y-6">
            <ScrollFadeIn>
              <Typography variant="h2" className="text-text-primary mt-12">
                The Problem with Scattered Tokens
              </Typography>
              <Typography variant="body" className="text-text-secondary leading-relaxed">
                Most design systems start by defining colors directly in Tailwind&apos;s config. This works
                fine at first, but once you add dark mode, brand variants, or multiple products, you
                end up with duplicated values scattered across config files, CSS, and component code.
              </Typography>
            </ScrollFadeIn>

            <ScrollFadeIn>
              <Typography variant="body" className="text-text-secondary leading-relaxed">
                Our approach uses a single JavaScript file as the source of truth. Every color,
                spacing value, and shadow is defined once and flows through the system automatically.
              </Typography>
            </ScrollFadeIn>

            <ScrollFadeIn>
              <Typography variant="h2" className="text-text-primary mt-12">
                The Three-File Architecture
              </Typography>
              <Typography variant="body" className="text-text-secondary leading-relaxed">
                The token system follows a linear flow: definition, CSS generation, and Tailwind
                integration. Here&apos;s how the three files work together:
              </Typography>
            </ScrollFadeIn>

            <ScrollFadeIn>
              <Card className="my-8">
                <CardContent className="p-4 text-sm text-text-secondary font-mono space-y-1">
                  <p>tokens.config.js  → Master definitions (JS object)</p>
                  <p>index.css          → CSS custom properties (:root / .dark)</p>
                  <p>tailwind.config.mjs → Theme extension via CSS var references</p>
                </CardContent>
              </Card>
            </ScrollFadeIn>

            <ScrollFadeIn>
              <Typography variant="h3" className="text-text-primary mt-8">
                Step 1: Define tokens in plain JavaScript
              </Typography>
              <Typography variant="body" className="text-text-secondary leading-relaxed mb-4">
                The config file exports a structured object with all design decisions. Colors use
                space-separated RGB values for Tailwind&apos;s opacity modifier syntax.
              </Typography>
            </ScrollFadeIn>

            <ScrollFadeIn>
              <CodeBlock
                filename="tokens.config.js"
                code={`export const colorTokens = {
  dark: {
    background: "15 17 20",
    surface: "25 28 33",
    primary: "225 231 237",     // Arctic Glow gray.12
    accent: "56 189 184",       // Arctic Glow teal.9
    success: "61 214 140",      // Green.9
  },
  light: {
    background: "251 252 253",
    surface: "240 243 246",
    primary: "26 34 48",        // Gray.12
    accent: "26 143 136",       // Teal.9
    success: "27 148 80",       // Green.9
  },
}`}
              />
            </ScrollFadeIn>

            <ScrollFadeIn>
              <Typography variant="h3" className="text-text-primary mt-8">
                Step 2: Generate CSS custom properties
              </Typography>
              <Typography variant="body" className="text-text-secondary leading-relaxed mb-4">
                The CSS file maps tokens to custom properties. Light values go on :root, dark values
                activate when the .dark class is present.
              </Typography>
            </ScrollFadeIn>

            <ScrollFadeIn>
              <CodeBlock
                filename="index.css"
                code={`:root {
  --background: 251 252 253;
  --primary: 26 34 48;
}

.dark {
  --background: 15 17 20;
  --primary: 225 231 237;
}`}
              />
            </ScrollFadeIn>

            <ScrollFadeIn>
              <Typography variant="h2" className="text-text-primary mt-12">
                Results
              </Typography>
              <Typography variant="body" className="text-text-secondary leading-relaxed">
                With this architecture, changing a brand color means editing one line in
                tokens.config.js. The change cascades through CSS variables to every component
                automatically. Dark mode is just a different set of values for the same variable names.
              </Typography>
            </ScrollFadeIn>

            <ScrollFadeIn>
              <Typography variant="body" className="text-text-secondary leading-relaxed">
                This pattern has scaled from 20 components to over 100, across light and dark
                themes, without a single hardcoded color value in component code.
              </Typography>
            </ScrollFadeIn>
          </div>
        </div>
      </article>

      <NewsletterBlock
        title="Enjoyed this article?"
        description="Get more design system insights delivered to your inbox."
      />

      <Footer />
    </div>
  )
}
