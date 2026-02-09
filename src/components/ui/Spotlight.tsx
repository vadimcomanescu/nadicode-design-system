import * as React from "react"
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useReducedMotion,
} from "motion/react"
import { cn } from "../../lib/utils"

interface SpotlightProps {
  children: React.ReactNode
  className?: string
  color?: string
  size?: number
}

export const Spotlight = React.forwardRef<HTMLDivElement, SpotlightProps>(
  ({ children, className, color = "rgb(var(--color-accent) / 0.06)", size = 300 }, ref) => {
    const prefersReduced = useReducedMotion()
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const background = useMotionTemplate`radial-gradient(${size}px circle at ${mouseX}px ${mouseY}px, ${color}, transparent 80%)`

    const handleMouse = React.useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (prefersReduced) return
        const rect = e.currentTarget.getBoundingClientRect()
        mouseX.set(e.clientX - rect.left)
        mouseY.set(e.clientY - rect.top)
      },
      [prefersReduced, mouseX, mouseY]
    )

    return (
      <div
        ref={ref}
        className={cn("relative overflow-hidden", className)}
        onMouseMove={handleMouse}
      >
        {!prefersReduced && (
          <motion.div
            className="pointer-events-none absolute inset-0 z-0"
            style={{ background }}
          />
        )}
        <div className="relative z-[1]">{children}</div>
      </div>
    )
  }
)
Spotlight.displayName = "Spotlight"
