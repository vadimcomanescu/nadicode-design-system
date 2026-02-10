import * as React from "react"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"
import { motionSpring } from "@/lib/motion"
import { cn } from "@/lib/utils"

interface FlipWordsProps {
  words: string[]
  interval?: number
  className?: string
}

export const FlipWords = React.forwardRef<HTMLSpanElement, FlipWordsProps>(
  ({ words, interval = 3000, className }, ref) => {
    const prefersReduced = useReducedMotion()
    const [index, setIndex] = React.useState(0)

    React.useEffect(() => {
      if (prefersReduced || words.length <= 1) return
      const id = setInterval(() => {
        setIndex((prev) => (prev + 1) % words.length)
      }, interval)
      return () => clearInterval(id)
    }, [words.length, interval, prefersReduced])

    if (prefersReduced) {
      return (
        <span ref={ref} className={className}>
          {words[0]}
        </span>
      )
    }

    return (
      <span ref={ref} className={cn("inline-block relative", className)}>
        <AnimatePresence mode="wait">
          <motion.span
            key={words[index]}
            className="inline-block"
            initial={{ rotateX: 90, opacity: 0, filter: "blur(4px)" }}
            animate={{
              rotateX: 0,
              opacity: 1,
              filter: "blur(0px)",
              transition: motionSpring.gentle,
            }}
            exit={{
              rotateX: -90,
              opacity: 0,
              filter: "blur(4px)",
              transition: { duration: 0.2 },
            }}
            style={{ transformOrigin: "center bottom" }}
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    )
  }
)
FlipWords.displayName = "FlipWords"
