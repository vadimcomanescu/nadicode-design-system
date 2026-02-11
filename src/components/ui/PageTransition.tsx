import * as React from "react"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"
import { cn } from "../../lib/utils"

interface PageTransitionProps {
  children: React.ReactNode
  pathname: string
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
    initial: { opacity: 0, y: 32, filter: "blur(4px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    exit: { opacity: 0, y: -32, filter: "blur(4px)" },
  },
  scale: {
    initial: { opacity: 0, scale: 0.90, filter: "blur(6px)" },
    animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
    exit: { opacity: 0, scale: 0.90, filter: "blur(6px)" },
  },
} as const

const transition = {
  type: "spring" as const,
  stiffness: 400,
  damping: 28,
  mass: 0.8,
}

export const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  pathname,
  mode = "fade",
  className,
}) => {
  const prefersReduced = useReducedMotion()
  const v = variants[mode]

  if (prefersReduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
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
