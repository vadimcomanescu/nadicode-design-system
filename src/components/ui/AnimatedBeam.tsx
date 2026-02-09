import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { cn } from "../../lib/utils"

interface AnimatedBeamProps {
  fromRef: React.RefObject<HTMLElement | null>
  toRef: React.RefObject<HTMLElement | null>
  containerRef: React.RefObject<HTMLElement | null>
  className?: string
  duration?: number
  curvature?: number
}

function getCenter(el: HTMLElement, container: HTMLElement) {
  const r = el.getBoundingClientRect()
  const cr = container.getBoundingClientRect()
  return {
    x: r.left - cr.left + r.width / 2,
    y: r.top - cr.top + r.height / 2,
  }
}

export const AnimatedBeam: React.FC<AnimatedBeamProps> = ({
  fromRef,
  toRef,
  containerRef,
  className,
  duration = 1500,
  curvature = 50,
}) => {
  const prefersReduced = useReducedMotion()
  const [path, setPath] = React.useState("")
  const [dims, setDims] = React.useState({ w: 0, h: 0 })

  React.useEffect(() => {
    const update = () => {
      if (!fromRef.current || !toRef.current || !containerRef.current) return
      const container = containerRef.current
      const from = getCenter(fromRef.current, container)
      const to = getCenter(toRef.current, container)
      const midX = (from.x + to.x) / 2
      const midY = (from.y + to.y) / 2 - curvature
      setPath(`M ${from.x} ${from.y} Q ${midX} ${midY} ${to.x} ${to.y}`)
      setDims({
        w: container.offsetWidth,
        h: container.offsetHeight,
      })
    }

    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [fromRef, toRef, containerRef, curvature])

  if (!path) return null

  return (
    <svg
      className={cn("pointer-events-none absolute inset-0", className)}
      width={dims.w}
      height={dims.h}
      fill="none"
    >
      <motion.path
        d={path}
        stroke="url(#beam-gradient)"
        strokeWidth={2}
        strokeLinecap="round"
        initial={{ pathLength: prefersReduced ? 1 : 0, opacity: 0 }}
        animate={{
          pathLength: 1,
          opacity: 1,
          transition: {
            pathLength: { duration: prefersReduced ? 0 : duration / 1000, ease: [0.215, 0.61, 0.355, 1] },
            opacity: { duration: 0.2 },
          },
        }}
      />
      <defs>
        <linearGradient id="beam-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FB7185" stopOpacity="0.4" />
          <stop offset="50%" stopColor="#FB7185" stopOpacity="1" />
          <stop offset="100%" stopColor="#2DD4BF" stopOpacity="0.4" />
        </linearGradient>
      </defs>
    </svg>
  )
}
AnimatedBeam.displayName = "AnimatedBeam"
