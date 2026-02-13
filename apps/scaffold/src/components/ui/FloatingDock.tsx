'use client'

import * as React from "react"
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react"
import { useDialKit } from "dialkit"
import { cn } from "../../lib/utils"

/*
 * ANIMATION STORYBOARD - FloatingDock
 *    idle   icons rest at MAGNIFICATION.restSize px
 *  hover    mouse enters dock region
 *   +0ms   icons within MAGNIFICATION.distance px begin scaling
 *   +0ms   nearest icon scales to MAGNIFICATION.peakSize px (SPRING config)
 *   +0ms   adjacent icons interpolate between rest and peak
 *  leave    mouse exits, all icons spring back to rest size
 */

const DOCK_DEFAULTS = {
  spring: {
    type: "spring" as const,
    visualDuration: 0.15,
    bounce: 0.25,
  },
  magnification: {
    restSize: 40,
    peakSize: 56,
    distance: 100,
  },
} as const

interface DockItem {
  icon: React.ReactNode
  label: string
  onClick?: () => void
}

interface FloatingDockProps {
  items: DockItem[]
  className?: string
}

export const FloatingDock = React.forwardRef<HTMLDivElement, FloatingDockProps>(
  ({ items, className }, ref) => {
    const prefersReduced = useReducedMotion()
    const mouseX = useMotionValue(Infinity)

    const params = useDialKit("FloatingDock", {
      spring: DOCK_DEFAULTS.spring,
      magnification: {
        restSize: [DOCK_DEFAULTS.magnification.restSize, 24, 64],
        peakSize: [DOCK_DEFAULTS.magnification.peakSize, 40, 80],
        distance: [DOCK_DEFAULTS.magnification.distance, 50, 200],
      },
    })

    return (
      <motion.div
        ref={ref}
        className={cn(
          "inline-flex items-end gap-2 rounded-2xl glass-panel px-3 py-2",
          className
        )}
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
      >
        {items.map((item) => (
          <DockIcon
            key={item.label}
            item={item}
            mouseX={mouseX}
            disabled={!!prefersReduced}
            spring={params.spring}
            restSize={params.magnification.restSize as number}
            peakSize={params.magnification.peakSize as number}
            distance={params.magnification.distance as number}
          />
        ))}
      </motion.div>
    )
  }
)
FloatingDock.displayName = "FloatingDock"

function DockIcon({
  item,
  mouseX,
  disabled,
  spring,
  restSize,
  peakSize,
  distance,
}: {
  item: DockItem
  mouseX: ReturnType<typeof useMotionValue<number>>
  disabled: boolean
  spring: { type: "spring"; visualDuration?: number; bounce?: number }
  restSize: number
  peakSize: number
  distance: number
}) {
  const ref = React.useRef<HTMLButtonElement>(null)

  const dist = useTransform(mouseX, (val) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return distance + 50
    return val - rect.left - rect.width / 2
  })

  const widthSync = useTransform(
    dist,
    [-distance, 0, distance],
    [restSize, peakSize, restSize]
  )
  const width = useSpring(widthSync, {
    duration: spring.visualDuration,
    bounce: spring.bounce,
  })

  return (
    <motion.button
      ref={ref}
      className="relative flex items-center justify-center rounded-xl bg-surface-hover text-text-primary transition-colors hover:bg-accent/10 group"
      style={{
        width: disabled ? restSize : width,
        height: disabled ? restSize : width,
      }}
      onClick={item.onClick}
      aria-label={item.label}
    >
      {item.icon}
      <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-surface px-2 py-1 text-xs text-text-primary opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none border border-border">
        {item.label}
      </span>
    </motion.button>
  )
}
