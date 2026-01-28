import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { cn } from "../../lib/utils"

export interface AudioVisualizerProps {
  className?: string
  bars?: number
  isPlaying?: boolean
}

export function AudioVisualizer({
  className,
  bars = 20,
  isPlaying = false,
}: AudioVisualizerProps) {
  const [heights, setHeights] = useState<number[]>(Array(bars).fill(10))

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>

    if (isPlaying) {
      interval = setInterval(() => {
        setHeights(Array.from({ length: bars }, () => Math.random() * 100))
      }, 100)
    } else {
      setHeights(Array(bars).fill(10))
    }

    return () => clearInterval(interval)
  }, [isPlaying, bars])

  return (
    <div className={cn("flex h-16 items-center justify-center gap-1", className)}>
      {heights.map((height, i) => (
        <motion.div
          key={i}
          className="w-1 rounded-full bg-accent"
          animate={{
            height: `${Math.max(10, height)}%`,
            opacity: isPlaying ? 0.5 + Math.random() * 0.5 : 0.3,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
        />
      ))}
    </div>
  )
}
