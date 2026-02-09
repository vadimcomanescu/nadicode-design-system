import * as React from "react"
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react"
import { cn } from "../../lib/utils"

interface MagneticElementProps {
  children: React.ReactNode
  className?: string
  strength?: number
}

export const MagneticElement = React.forwardRef<
  HTMLDivElement,
  MagneticElementProps
>(({ children, className, strength = 0.3 }, ref) => {
  const prefersReduced = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { duration: 0.4, bounce: 0.1 })
  const springY = useSpring(y, { duration: 0.4, bounce: 0.1 })

  const handleMouse = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReduced) return
      const rect = e.currentTarget.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      x.set((e.clientX - cx) * strength)
      y.set((e.clientY - cy) * strength)
    },
    [prefersReduced, strength, x, y]
  )

  const handleLeave = React.useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  return (
    <motion.div
      ref={ref}
      className={cn("inline-block", className)}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
    >
      {children}
    </motion.div>
  )
})
MagneticElement.displayName = "MagneticElement"
