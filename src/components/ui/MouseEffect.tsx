'use client'

import * as React from "react"
import { createPortal } from "react-dom"
import { motion, useMotionValue, useMotionTemplate, useReducedMotion } from "motion/react"
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
  overlayColor = "rgba(56, 189, 184, 0.95)",
  gap = 24,
  maskRadius = 300,
  overlayRadius = 220,
}: MouseGlowProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const overlayRef = React.useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX
      const y = e.clientY
      if (containerRef.current) {
        containerRef.current.style.opacity = '1'
        containerRef.current.style.setProperty("--mx", `${x}px`)
        containerRef.current.style.setProperty("--my", `${y}px`)
      }
      if (overlayRef.current) {
        overlayRef.current.style.setProperty("--mx", `${x}px`)
        overlayRef.current.style.setProperty("--my", `${y}px`)
      }
    }

    const handleMouseOut = () => {
      if (containerRef.current) {
        containerRef.current.style.opacity = '0'
      }
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    window.addEventListener("mouseout", handleMouseOut, { passive: true })
    window.addEventListener("mouseleave", handleMouseOut, { passive: true })

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
        opacity: 0,
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

interface MouseSpotlightProps {
  children?: React.ReactNode
  className?: string
  color?: string
  size?: number
}

export const MouseSpotlight = React.forwardRef<HTMLDivElement, MouseSpotlightProps>(
  ({ children, className, color = "rgba(255,255,255,0.06)", size = 250 }, ref) => {
    const prefersReduced = useReducedMotion()
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const handleMouseMove = React.useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (prefersReduced) return
        const rect = e.currentTarget.getBoundingClientRect()
        mouseX.set(e.clientX - rect.left)
        mouseY.set(e.clientY - rect.top)
      },
      [prefersReduced, mouseX, mouseY]
    )

    const bgImage = useMotionTemplate`radial-gradient(
    ${size}px circle at ${mouseX}px ${mouseY}px,
    ${color},
    transparent 80%
  )`

    return (
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        className={cn("group relative", className)}
      >
        {!prefersReduced && (
          <motion.div
            className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
            style={{ background: bgImage }}
          />
        )}
        {children}
      </div>
    )
  }
)
MouseSpotlight.displayName = "MouseSpotlight"
