import * as React from "react"
import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion"
import { cn } from "../../lib/utils"

export function MouseGlow({ className }: { className?: string }) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth the mouse movement
  const springX = useSpring(mouseX, { damping: 20, stiffness: 150 })
  const springY = useSpring(mouseY, { damping: 20, stiffness: 150 })

  function handleMouseMove(e: React.MouseEvent | MouseEvent) {
    const isGlobal = className?.includes("fixed") || className?.includes("absolute")
    if (isGlobal) {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    } else {
      const target = e.currentTarget as HTMLElement
      if (target && target.getBoundingClientRect) {
        const { left, top } = target.getBoundingClientRect()
        mouseX.set(e.clientX - left)
        mouseY.set(e.clientY - top)
      }
    }
  }

  React.useEffect(() => {
    const isGlobal = className?.includes("fixed") || className?.includes("absolute")
    if (!isGlobal) return

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [className])

  // Mask image: Radial gradient that is transparent at edges and opaque at center
  // revealed at mouse position. Reduced radius for tighter focus.
  const maskImage = useMotionTemplate`radial-gradient(
    300px circle at ${springX}px ${springY}px,
    black,
    transparent 100%
  )`

  return (
    <motion.div
      className={cn(
        "pointer-events-none fixed inset-0 z-0",
        "opacity-40 dark:opacity-70 transition-opacity duration-500", // Subtle but visible in light mode
        className
      )}
      style={{
        maskImage,
        WebkitMaskImage: maskImage
      }}
    >
      <div className="absolute inset-0 h-full w-full mouse-grid-pattern" />

      {/* Dynamic styles to handle theme-aware background SVG colors */}
      <style>{`
        .mouse-grid-pattern {
          background-size: 24px 24px;
          background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 12H24M12 0V24' stroke='rgba(101, 163, 13, 0.4)' stroke-width='0.5'/%3E%3Ccircle cx='12' cy='12' r='0.8' fill='rgba(101, 163, 13, 0.7)'/%3E%3C/svg%3E");
        }
        .dark .mouse-grid-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 12H24M12 0V24' stroke='rgba(99, 102, 241, 0.4)' stroke-width='0.5'/%3E%3Ccircle cx='12' cy='12' r='0.8' fill='rgba(99, 102, 241, 0.7)'/%3E%3C/svg%3E");
        }
      `}</style>
    </motion.div>
  )
}

export function MouseSpotlight({ children, className }: { children?: React.ReactNode, className?: string }) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  const bgImage = useMotionTemplate`radial-gradient(
    250px circle at ${mouseX}px ${mouseY}px, 
    rgba(255,255,255,0.06), 
    transparent 80%
  )`

  return (
    <div
      onMouseMove={handleMouseMove}
      className={cn("group relative", className)}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: bgImage,
        }}
      />
      {children}
    </div>
  )
}
