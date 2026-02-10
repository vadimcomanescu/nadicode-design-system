import * as React from "react"
import { useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

interface AnimatedGradientTextProps {
  children: React.ReactNode
  className?: string
}

export const AnimatedGradientText = React.forwardRef<
  HTMLSpanElement,
  AnimatedGradientTextProps
>(({ children, className }, ref) => {
  const prefersReduced = useReducedMotion()

  return (
    <span
      ref={ref}
      className={cn(
        "bg-gradient-to-r from-accent via-info to-accent bg-[length:200%_auto] bg-clip-text text-transparent",
        !prefersReduced && "animate-gradient-sweep",
        className
      )}
    >
      {children}
    </span>
  )
})
AnimatedGradientText.displayName = "AnimatedGradientText"
