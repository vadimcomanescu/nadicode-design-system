'use client'

import { Button } from "../ui/Button"
import { Typography } from "../ui/Typography"
import { MeteorShower } from "../ui/MeteorShower"
import { AnimatedGradientText } from "../ui/text-effects"
import { ArrowLeftIcon } from "@/components/ui/icons"
import { cn } from "../../lib/utils"
import Link from 'next/link'

interface NotFoundBlockProps {
  title?: string
  description?: string
  backHref?: string
  backLabel?: string
  className?: string
}

export function NotFoundBlock({
  title = "404",
  description = "The page you're looking for doesn't exist or has been moved.",
  backHref = "/",
  backLabel = "Back home",
  className,
}: NotFoundBlockProps) {
  return (
    <div className={cn("relative flex min-h-[60vh] items-center justify-center overflow-hidden", className)}>
      <MeteorShower className="absolute inset-0" />

      <div className="relative z-10 mx-auto max-w-md px-6 text-center">
        <div className="glass-panel rounded-2xl border border-border/50 p-10 shadow-2xl">
          <AnimatedGradientText className="text-8xl font-extrabold tracking-tighter sm:text-9xl">
            {title}
          </AnimatedGradientText>

          <Typography variant="h3" className="mt-4 text-text-primary">
            Page not found
          </Typography>
          <Typography variant="body" className="mt-2 text-text-secondary">
            {description}
          </Typography>

          <Button asChild size="lg" variant="accent" className="mt-8">
            <Link href={backHref}>
              <ArrowLeftIcon size={16} className="mr-2" />
              {backLabel}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
