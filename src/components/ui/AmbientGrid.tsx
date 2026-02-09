import { cn } from "@/lib/utils"

interface AmbientGridProps {
  /** Cell size in pixels (default 24, matches spacing scale) */
  cellSize?: number
  /** Bumps opacity to 0.15 and adds column indicators */
  debug?: boolean
  className?: string
}

export function AmbientGrid({ cellSize = 24, debug = false, className }: AmbientGridProps) {
  const opacity = debug ? 0.15 : 0.06

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 z-0",
        className
      )}
      style={{
        backgroundImage: [
          `repeating-linear-gradient(0deg, rgba(200, 220, 240, ${opacity}) 0 1px, transparent 1px ${cellSize}px)`,
          `repeating-linear-gradient(90deg, rgba(200, 220, 240, ${opacity}) 0 1px, transparent 1px ${cellSize}px)`,
        ].join(", "),
        backgroundSize: `${cellSize}px ${cellSize}px`,
      }}
    />
  )
}
