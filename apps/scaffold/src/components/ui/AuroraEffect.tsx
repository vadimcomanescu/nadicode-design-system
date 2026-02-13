'use client'

import * as React from "react"
import { useReducedMotion } from "motion/react"
import { cn } from "../../lib/utils"

interface AuroraEffectProps {
  className?: string
  intensity?: "low" | "medium" | "high"
}

const opacityMap = {
  low: "opacity-[0.12]",
  medium: "opacity-[0.18]",
  high: "opacity-[0.25]",
} as const

export const AuroraEffect = React.forwardRef<HTMLDivElement, AuroraEffectProps>(
  ({ className, intensity = "low" }, ref) => {
    const prefersReduced = useReducedMotion()
    const op = opacityMap[intensity]

    return (
      <div
        ref={ref}
        className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
        aria-hidden="true"
      >
        <div
          className={cn(
            "absolute -inset-[50%] rounded-full blur-3xl",
            op,
            !prefersReduced && "animate-aurora-1"
          )}
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgb(var(--color-accent)), transparent 70%)",
          }}
        />
        <div
          className={cn(
            "absolute -inset-[50%] rounded-full blur-3xl",
            op,
            !prefersReduced && "animate-aurora-2"
          )}
          style={{
            background:
              "radial-gradient(ellipse at 30% 70%, rgb(var(--color-link)), transparent 70%)",
          }}
        />
        <div
          className={cn(
            "absolute -inset-[50%] rounded-full blur-3xl",
            op,
            !prefersReduced && "animate-aurora-3"
          )}
          style={{
            background:
              "radial-gradient(ellipse at 70% 30%, rgb(var(--color-accent)), transparent 70%)",
          }}
        />
      </div>
    )
  }
)
AuroraEffect.displayName = "AuroraEffect"
