import React, { useEffect, useState } from "react"
import { useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"

interface PixelRevealProps {
  text: string | number
  className?: string
  duration?: number
  delay?: number
  as?: React.ElementType
}

const PIXEL_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*"

export function PixelReveal({
  text,
  className,
  duration = 300,
  delay = 0,
  as: Component = "span",
}: PixelRevealProps) {
  const prefersReduced = useReducedMotion()
  const targetText = text.toString()
  const [displayText, setDisplayText] = useState(prefersReduced ? targetText : "")
  const [isComplete, setIsComplete] = useState(!!prefersReduced)
  const [trigger, setTrigger] = useState(0)

  const replay = () => {
    if (!prefersReduced) setTrigger((prev) => prev + 1)
  }

  useEffect(() => {
    if (prefersReduced) {
      setDisplayText(targetText)
      setIsComplete(true)
      return
    }

    let startTime: number | null = null
    let animationFrameId: number
    setIsComplete(false)

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime

      if (elapsed < delay) {
        animationFrameId = requestAnimationFrame(animate)
        return
      }

      const progress = Math.min((elapsed - delay) / duration, 1)
      const revealIndex = Math.floor(progress * targetText.length)
      let nextText = ""

      for (let i = 0; i < targetText.length; i++) {
        if (i < revealIndex) {
          nextText += targetText[i]
        } else {
          const randomChar =
            PIXEL_CHARS[Math.floor(Math.random() * PIXEL_CHARS.length)]
          nextText += randomChar
        }
      }

      setDisplayText(nextText)

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate)
      } else {
        setIsComplete(true)
      }
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
    }
  }, [text, duration, delay, targetText, trigger, prefersReduced])

  return (
    <Component
      className={cn(
        !isComplete ? "font-pixel text-primary/70" : "",
        className
      )}
      onMouseEnter={replay}
    >
      {displayText}
    </Component>
  )
}
