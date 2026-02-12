'use client'

import * as React from "react"
import { motion, useInView, useReducedMotion } from "motion/react"
import { useStyleMotion } from "../../lib/motion"
import { cn } from "../../lib/utils"

interface ScrollFadeInProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right"
  distance?: number
}

const directionOffset = {
  up: { x: 0, y: 1 },
  down: { x: 0, y: -1 },
  left: { x: 1, y: 0 },
  right: { x: -1, y: 0 },
} as const

export const ScrollFadeIn = React.forwardRef<HTMLDivElement, ScrollFadeInProps>(
  ({ children, className, delay = 0, direction = "up", distance }, ref) => {
    const prefersReduced = useReducedMotion()
    const internalRef = React.useRef<HTMLDivElement>(null)
    const mergedRef = ref || internalRef
    const isInView = useInView(internalRef, { once: true, margin: "-40px" })
    const { spring, distance: styleDistance } = useStyleMotion()

    const d = distance ?? styleDistance.md

    if (prefersReduced) {
      return (
        <div ref={mergedRef as React.Ref<HTMLDivElement>} className={className}>
          {children}
        </div>
      )
    }

    const offset = directionOffset[direction]

    return (
      <motion.div
        ref={internalRef}
        className={cn(className)}
        initial={{
          opacity: 0,
          x: offset.x * d,
          y: offset.y * d,
        }}
        animate={
          isInView
            ? { opacity: 1, x: 0, y: 0, transition: { ...spring.snappy, delay: delay / 1000 } }
            : undefined
        }
      >
        {children}
      </motion.div>
    )
  }
)
ScrollFadeIn.displayName = "ScrollFadeIn"
