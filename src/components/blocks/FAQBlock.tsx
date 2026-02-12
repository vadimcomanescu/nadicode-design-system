'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/Accordion"
import { Typography } from "../ui/Typography"
import { ScrollFadeIn } from "../ui/ScrollFadeIn"
import { cn } from "../../lib/utils"

interface FAQItem {
  question: string
  answer: string
}

interface FAQBlockProps {
  items?: FAQItem[]
  title?: string
  description?: string
  className?: string
}

const defaultItems: FAQItem[] = [
  {
    question: "What frameworks are supported?",
    answer:
      "We support React 18+, Next.js 13+, and any framework that works with Tailwind CSS. Our components are built on Radix UI primitives for maximum accessibility.",
  },
  {
    question: "Can I customize the design tokens?",
    answer:
      "Yes. All colors, spacing, typography, and shadows are driven by a single tokens.config.js file. Change the tokens and every component updates automatically.",
  },
  {
    question: "Is dark mode supported?",
    answer:
      "Both light and dark themes are built in via CSS custom properties. The ThemeProvider handles persistence and system preference detection out of the box.",
  },
  {
    question: "How do I get support?",
    answer:
      "Community support is available on GitHub Discussions. Pro and Enterprise plans include priority email and dedicated Slack channels.",
  },
]

export function FAQBlock({
  items = defaultItems,
  title = "Frequently asked questions",
  description,
  className,
}: FAQBlockProps) {
  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="mx-auto max-w-3xl px-6">
        <ScrollFadeIn>
          <div className="mb-12 text-center">
            <Typography variant="h2" className="text-text-primary">
              {title}
            </Typography>
            {description && (
              <Typography variant="body" className="mt-4 text-text-secondary">
                {description}
              </Typography>
            )}
          </div>
        </ScrollFadeIn>

        <Accordion type="single" collapsible className="w-full">
          {items.map((item, index) => (
            <ScrollFadeIn key={index} delay={index * 0.05}>
              <AccordionItem value={`faq-${index}`}>
                <AccordionTrigger className="text-left text-base font-medium text-text-primary">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-text-secondary leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            </ScrollFadeIn>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
