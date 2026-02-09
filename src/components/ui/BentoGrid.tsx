import * as React from "react"
import { useReducedMotion } from "motion/react"
import { cn } from "../../lib/utils"
import { ScrollFadeIn } from "./ScrollFadeIn"

interface BentoGridProps {
  children: React.ReactNode
  className?: string
  columns?: number
}

export const BentoGrid = React.forwardRef<HTMLDivElement, BentoGridProps>(
  ({ children, className, columns = 3 }, ref) => {
    const prefersReduced = useReducedMotion()
    const items = React.Children.toArray(children)

    return (
      <div
        ref={ref}
        className={cn(
          "grid gap-4",
          columns === 2 && "grid-cols-1 md:grid-cols-2",
          columns === 3 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
          columns === 4 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
          className
        )}
      >
        {items.map((child, i) =>
          prefersReduced ? (
            <div key={i}>{child}</div>
          ) : (
            <ScrollFadeIn key={i} delay={i * 150} direction="up">
              {child}
            </ScrollFadeIn>
          )
        )}
      </div>
    )
  }
)
BentoGrid.displayName = "BentoGrid"
