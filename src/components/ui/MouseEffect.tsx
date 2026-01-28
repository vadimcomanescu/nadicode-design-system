import * as React from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { cn } from "../../lib/utils"

export function MouseGlow({ children, className }: { children?: React.ReactNode, className?: string }) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth the mouse movement
  const springX = useSpring(mouseX, { damping: 20, stiffness: 150 })
  const springY = useSpring(mouseY, { damping: 20, stiffness: 150 })

  function handleMouseMove(e: React.MouseEvent | MouseEvent) {
    const target = (e.currentTarget || document.body) as HTMLElement
    if (target === document.body) {
       mouseX.set(e.clientX)
       mouseY.set(e.clientY)
    } else {
      const { left, top } = target.getBoundingClientRect()
      mouseX.set(e.clientX - left)
      mouseY.set(e.clientY - top)
    }
  }

  React.useEffect(() => {
    // Only bind to window if it's a global background effect
    const isGlobal = className?.includes("fixed") || className?.includes("absolute")
    if (!isGlobal) return
    
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [className])


  return (
    <div
      onMouseMove={handleMouseMove}
      className={cn("group relative", className)}
    >
      <motion.div
        className={cn(
          "pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100",
          (className?.includes("fixed") || className?.includes("absolute")) && "opacity-100"
        )}
        style={{
          background: `radial-gradient(800px circle at ${springX}px ${springY}px, rgba(59, 130, 246, 0.15), transparent 60%)`,
          zIndex: 1
        }}
      />
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
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

  return (
    <div
      onMouseMove={handleMouseMove}
      className={cn("group relative", className)}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(250px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.06), transparent 80%)`,
        }}
      />
      {children}
    </div>
  )
}
