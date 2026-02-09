import * as React from "react"
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react"
import { cn } from "../../lib/utils"

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
}: {
  item: DockItem
  mouseX: ReturnType<typeof useMotionValue<number>>
  disabled: boolean
}) {
  const ref = React.useRef<HTMLButtonElement>(null)

  const distance = useTransform(mouseX, (val) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return 150
    return val - rect.left - rect.width / 2
  })

  const widthSync = useTransform(distance, [-100, 0, 100], [40, 56, 40])
  const width = useSpring(widthSync, { duration: 0.15, bounce: 0.25 })

  return (
    <motion.button
      ref={ref}
      className="relative flex items-center justify-center rounded-xl bg-surface-hover text-text-primary transition-colors hover:bg-accent/10 group"
      style={{
        width: disabled ? 40 : width,
        height: disabled ? 40 : width,
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
