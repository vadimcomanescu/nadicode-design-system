import * as React from "react"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"
import { useLocation } from "react-router-dom"
import { cn } from "../../lib/utils"

interface PageTransitionProps {
  children: React.ReactNode
  mode?: "fade" | "slide" | "scale"
  className?: string
}

const variants = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slide: {
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.98 },
  },
} as const

const transition = {
  duration: 0.2,
  ease: [0.215, 0.61, 0.355, 1] as [number, number, number, number],
}

export const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  mode = "fade",
  className,
}) => {
  const location = useLocation()
  const prefersReduced = useReducedMotion()
  const v = variants[mode]

  if (prefersReduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        className={cn(className)}
        initial={v.initial}
        animate={{ ...v.animate, transition }}
        exit={{ ...v.exit, transition }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
PageTransition.displayName = "PageTransition"
