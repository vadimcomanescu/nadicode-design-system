'use client'

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"
import { ChevronDownIcon } from "@/components/ui/icons/chevron-down"

const thinkingIndicatorVariants = cva(
  "inline-flex items-center gap-2 rounded-lg glass-panel border border-border",
  {
    variants: {
      size: {
        sm: "px-2.5 py-1.5 text-xs",
        default: "px-3 py-2 text-sm",
        lg: "px-4 py-3 text-base",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

const dotSizes = {
  sm: "h-1 w-1",
  default: "h-1.5 w-1.5",
  lg: "h-2 w-2",
} as const

export interface ThinkingIndicatorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof thinkingIndicatorVariants> {
  reasoning?: string
}

const ThinkingIndicator = React.forwardRef<HTMLDivElement, ThinkingIndicatorProps>(
  ({ className, size = "default", reasoning, ...props }, ref) => {
    const [expanded, setExpanded] = React.useState(false)
    const dotSize = dotSizes[size ?? "default"]
    const reasoningPanelId = React.useId()

    return (
      <div ref={ref} className={cn("flex flex-col", className)} {...props}>
        <div className={cn(thinkingIndicatorVariants({ size }))}>
          <div className="flex items-center gap-1" aria-label="Thinking">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className={cn("rounded-full bg-accent", dotSize)}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
          <span className="text-text-secondary">Thinking</span>
          {reasoning && (
            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              aria-expanded={expanded}
              aria-controls={reasoningPanelId}
              aria-label={expanded ? "Hide reasoning" : "Show reasoning"}
              className="ml-1 text-text-tertiary hover:text-text-secondary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded-sm"
            >
              <ChevronDownIcon
                size={14}
                className={cn("transition-transform", expanded && "rotate-180")}
              />
            </button>
          )}
        </div>
        {reasoning && (
          <div
            id={reasoningPanelId}
            className={cn(
              "mt-1 rounded-lg border border-border bg-surface p-2 text-xs text-text-secondary",
              !expanded && "hidden"
            )}
            aria-hidden={!expanded}
          >
            {reasoning}
          </div>
        )}
      </div>
    )
  }
)
ThinkingIndicator.displayName = "ThinkingIndicator"

export { ThinkingIndicator, thinkingIndicatorVariants }
