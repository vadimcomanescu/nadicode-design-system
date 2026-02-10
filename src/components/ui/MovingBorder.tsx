import * as React from "react"
import { useReducedMotion } from "motion/react"
import { cn } from "../../lib/utils"

interface MovingBorderProps {
  children: React.ReactNode
  className?: string
  duration?: string
  borderRadius?: string
}

export const MovingBorder = React.forwardRef<HTMLDivElement, MovingBorderProps>(
  ({ children, className, duration = "3s", borderRadius = "0.5rem" }, ref) => {
    const prefersReduced = useReducedMotion()

    return (
      <div
        ref={ref}
        className={cn("relative overflow-hidden p-px", className)}
        style={{ borderRadius }}
      >
        <div
          className={cn(
            "absolute inset-[-100%]",
            !prefersReduced && "animate-border-spin"
          )}
          style={{
            background:
              "conic-gradient(from 0deg, #38BDB8, #2DD4BF, #38BDB8)",
            animationDuration: duration,
          }}
        />
        <div
          className="relative bg-surface"
          style={{ borderRadius: `calc(${borderRadius} - 1px)` }}
        >
          {children}
        </div>
      </div>
    )
  }
)
MovingBorder.displayName = "MovingBorder"
