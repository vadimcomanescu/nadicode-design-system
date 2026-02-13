'use client'

import * as React from "react"
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react"
import { cn } from "../../lib/utils"

interface TiltCardProps {
  children: React.ReactNode
  className?: string
  maxTilt?: number
}

export const TiltCard = React.forwardRef<HTMLDivElement, TiltCardProps>(
  ({ children, className, maxTilt = 6 }, ref) => {
    const prefersReduced = useReducedMotion()
    const clampedTilt = Math.min(maxTilt, 8)
    const x = useMotionValue(0)
    const y = useMotionValue(0)
    const rotateX = useSpring(0, { duration: 0.2, bounce: 0 })
    const rotateY = useSpring(0, { duration: 0.2, bounce: 0 })

    const handleMouse = React.useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (prefersReduced) return
        const rect = e.currentTarget.getBoundingClientRect()
        const px = (e.clientX - rect.left) / rect.width - 0.5
        const py = (e.clientY - rect.top) / rect.height - 0.5
        rotateX.set(-py * clampedTilt)
        rotateY.set(px * clampedTilt)
      },
      [prefersReduced, clampedTilt, rotateX, rotateY]
    )

    const handleLeave = React.useCallback(() => {
      rotateX.set(0)
      rotateY.set(0)
    }, [rotateX, rotateY])

    return (
      <motion.div
        ref={ref}
        className={cn("will-change-transform", className)}
        style={{
          perspective: 1000,
          rotateX,
          rotateY,
          x,
          y,
        }}
        onMouseMove={handleMouse}
        onMouseLeave={handleLeave}
      >
        {children}
      </motion.div>
    )
  }
)
TiltCard.displayName = "TiltCard"
