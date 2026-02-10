import * as React from "react"
import { useReducedMotion } from "motion/react"
import { cn } from "../../lib/utils"

interface MeteorShowerProps {
  count?: number
  className?: string
}

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min
}

export const MeteorShower = React.forwardRef<HTMLDivElement, MeteorShowerProps>(
  ({ count = 15, className }, ref) => {
    const prefersReduced = useReducedMotion()

    const meteors = React.useMemo(
      () =>
        Array.from({ length: count }, (_, i) => ({
          id: i,
          top: `${randomBetween(-20, 60)}%`,
          left: `${randomBetween(-10, 100)}%`,
          delay: `${randomBetween(0, 5)}s`,
          duration: `${randomBetween(1, 3)}s`,
          opacity: randomBetween(0.15, 0.3),
        })),
      [count]
    )

    return (
      <div
        ref={ref}
        className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
        aria-hidden="true"
      >
        {meteors.map((m) => (
          <div
            key={m.id}
            className={cn(
              "absolute h-px w-[80px] rotate-[215deg]",
              prefersReduced ? "opacity-[0.08]" : "animate-meteor"
            )}
            style={{
              top: m.top,
              left: m.left,
              animationDelay: prefersReduced ? undefined : m.delay,
              "--meteor-duration": m.duration,
              opacity: prefersReduced ? 0.08 : undefined,
              background: "linear-gradient(to right, #38BDB8 0%, transparent 100%)",
            } as React.CSSProperties}
          />
        ))}
      </div>
    )
  }
)
MeteorShower.displayName = "MeteorShower"
