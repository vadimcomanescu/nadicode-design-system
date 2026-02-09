import * as React from "react"
import {
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react"
import { cn } from "../../lib/utils"

interface NumberTickerProps {
  value: number
  duration?: number
  decimals?: number
  className?: string
}

export const NumberTicker = React.forwardRef<
  HTMLSpanElement,
  NumberTickerProps
>(({ value, duration = 900, decimals = 0, className }, ref) => {
  const prefersReduced = useReducedMotion()
  const springValue = useSpring(0, {
    duration: prefersReduced ? 0 : duration / 1000,
    bounce: 0.1,
  })
  const display = useTransform(springValue, (v) => v.toFixed(decimals))
  const [text, setText] = React.useState(
    prefersReduced ? value.toFixed(decimals) : (0).toFixed(decimals)
  )

  React.useEffect(() => {
    if (prefersReduced) {
      setText(value.toFixed(decimals))
      return
    }
    springValue.set(value)
  }, [value, springValue, prefersReduced, decimals])

  React.useEffect(() => {
    if (prefersReduced) return
    const unsubscribe = display.on("change", (v) => setText(v))
    return unsubscribe
  }, [display, prefersReduced])

  return (
    <span
      ref={ref}
      className={cn("tabular-nums", className)}
    >
      {text}
    </span>
  )
})
NumberTicker.displayName = "NumberTicker"
