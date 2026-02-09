import * as React from "react"
import { useReducedMotion } from "motion/react"
import { cn } from "../../lib/utils"

interface TypewriterTextProps {
  text: string
  speed?: number
  cursor?: boolean
  className?: string
  onComplete?: () => void
}

export const TypewriterText = React.forwardRef<
  HTMLSpanElement,
  TypewriterTextProps
>(({ text, speed = 50, cursor = true, className, onComplete }, ref) => {
  const prefersReduced = useReducedMotion()
  const [displayed, setDisplayed] = React.useState(
    prefersReduced ? text : ""
  )
  const rafRef = React.useRef<number>(0)
  const lastTimeRef = React.useRef<number>(0)
  const indexRef = React.useRef(0)

  React.useEffect(() => {
    if (prefersReduced) {
      setDisplayed(text)
      onComplete?.()
      return
    }

    setDisplayed("")
    indexRef.current = 0
    lastTimeRef.current = 0

    const step = (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp
      const elapsed = timestamp - lastTimeRef.current

      if (elapsed >= speed) {
        indexRef.current++
        setDisplayed(text.slice(0, indexRef.current))
        lastTimeRef.current = timestamp

        if (indexRef.current >= text.length) {
          onComplete?.()
          return
        }
      }

      rafRef.current = requestAnimationFrame(step)
    }

    rafRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafRef.current)
  }, [text, speed, prefersReduced, onComplete])

  return (
    <span ref={ref} className={cn("inline", className)}>
      {displayed}
      {cursor && (
        <span
          className="animate-cursor-blink ml-px inline-block w-[2px] h-[1em] bg-text-primary align-middle"
          aria-hidden="true"
        />
      )}
    </span>
  )
})
TypewriterText.displayName = "TypewriterText"
