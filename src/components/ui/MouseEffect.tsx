import * as React from "react"
import { createPortal } from "react-dom"
import { motion, useMotionValue, useMotionTemplate } from "framer-motion"
import { cn } from "../../lib/utils"

interface MouseGlowProps {
  className?: string
  dotColor?: string
  overlayColor?: string
  gap?: number
  maskRadius?: number
  overlayRadius?: number
}

export function MouseGlow({
  className,
  dotColor = "rgba(255, 255, 255, 0.5)",
  overlayColor = "rgba(251, 113, 133, 0.95)",
  gap = 24,
  maskRadius = 300,
  overlayRadius = 220,
}: MouseGlowProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const overlayRef = React.useRef<HTMLDivElement>(null)
  const [opacity, setOpacity] = React.useState(0)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX
      const y = e.clientY
      setOpacity(1)

      if (containerRef.current) {
        containerRef.current.style.setProperty("--mx", `${x}px`)
        containerRef.current.style.setProperty("--my", `${y}px`)
      }
      if (overlayRef.current) {
        overlayRef.current.style.setProperty("--mx", `${x}px`)
        overlayRef.current.style.setProperty("--my", `${y}px`)
      }
    }

    const handleMouseOut = () => setOpacity(0)

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseout", handleMouseOut)
    window.addEventListener("mouseleave", handleMouseOut)

    return () => {
      setMounted(false)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseout", handleMouseOut)
      window.removeEventListener("mouseleave", handleMouseOut)
    }
  }, [])

  const gapPx = `${gap}px`

  const element = (
    <div
      ref={containerRef}
      className={cn("pointer-events-none fixed inset-0 z-0", className)}
      style={{
        width: "100vw",
        height: "100vh",
        transition: "opacity 0.25s ease",
        opacity,
        maskImage: `radial-gradient(circle ${maskRadius}px at var(--mx, -9999px) var(--my, -9999px), black 0%, transparent 100%)`,
        WebkitMaskImage: `radial-gradient(circle ${maskRadius}px at var(--mx, -9999px) var(--my, -9999px), black 0%, transparent 100%)`,
      }}
    >
      {/* Base dot layer */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(${dotColor} 1px, transparent 0)`,
          backgroundSize: `${gapPx} ${gapPx}`,
          backgroundRepeat: "repeat",
        }}
      />

      {/* Colored overlay dot layer with tighter mask */}
      <div
        ref={overlayRef}
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(${overlayColor} 1px, transparent 0)`,
          backgroundSize: `${gapPx} ${gapPx}`,
          backgroundRepeat: "repeat",
          maskImage: `radial-gradient(circle ${overlayRadius}px at var(--mx, -9999px) var(--my, -9999px), black 0%, transparent 100%)`,
          WebkitMaskImage: `radial-gradient(circle ${overlayRadius}px at var(--mx, -9999px) var(--my, -9999px), black 0%, transparent 100%)`,
        }}
      />
    </div>
  )

  if (typeof document !== "undefined" && mounted) {
    return createPortal(element, document.body)
  }

  return element
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
