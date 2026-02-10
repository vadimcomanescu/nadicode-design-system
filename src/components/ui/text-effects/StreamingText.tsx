import * as React from "react"
import { useReducedMotion } from "motion/react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const streamingTextVariants = cva(
  "inline",
  {
    variants: {
      variant: {
        default: "text-text-primary",
        muted: "text-text-secondary",
        accent: "text-accent",
      },
      size: {
        sm: "text-sm",
        default: "text-base",
        lg: "text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const cursorVariants = cva(
  "inline-block animate-cursor-blink ml-0.5",
  {
    variants: {
      cursorStyle: {
        block: "w-[8px] h-[1em] bg-text-primary/80",
        line: "w-[2px] h-[1.2em] bg-accent",
        underscore: "w-[8px] h-[2px] bg-text-primary/80 self-end translate-y-[2px]",
      },
    },
    defaultVariants: {
      cursorStyle: "line",
    },
  }
)

export interface StreamingTextProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof streamingTextVariants> {
  /** Text content to stream character by character */
  text: string
  /** Characters revealed per tick */
  speed?: number
  /** Milliseconds between ticks */
  interval?: number
  /** Show blinking cursor while streaming */
  showCursor?: boolean
  /** Cursor visual style */
  cursorStyle?: "block" | "line" | "underscore"
  /** Called when streaming completes */
  onComplete?: () => void
  /** Whether streaming is active (resets on text change) */
  streaming?: boolean
}

const StreamingText = React.forwardRef<HTMLSpanElement, StreamingTextProps>(
  (
    {
      className,
      variant,
      size,
      text,
      speed = 1,
      interval = 30,
      showCursor = true,
      cursorStyle = "line",
      onComplete,
      streaming = true,
      ...props
    },
    ref
  ) => {
    const prefersReduced = useReducedMotion()
    const [displayedLength, setDisplayedLength] = React.useState(0)
    const [isComplete, setIsComplete] = React.useState(false)

    React.useEffect(() => {
      if (prefersReduced) {
        setDisplayedLength(text.length)
        setIsComplete(true)
        onComplete?.()
        return
      }
      setDisplayedLength(0)
      setIsComplete(false)
    }, [text, prefersReduced, onComplete])

    React.useEffect(() => {
      if (prefersReduced || !streaming || isComplete) return

      if (displayedLength >= text.length) {
        setIsComplete(true)
        onComplete?.()
        return
      }

      const timer = setTimeout(() => {
        setDisplayedLength((prev) => Math.min(prev + speed, text.length))
      }, interval)

      return () => clearTimeout(timer)
    }, [streaming, displayedLength, text, speed, interval, isComplete, onComplete, prefersReduced])

    return (
      <span
        ref={ref}
        className={cn(streamingTextVariants({ variant, size }), className)}
        role="status"
        aria-live="polite"
        {...props}
      >
        {text.slice(0, displayedLength)}
        {showCursor && !isComplete && (
          <span
            className={cn(cursorVariants({ cursorStyle }))}
            aria-hidden="true"
          />
        )}
      </span>
    )
  }
)
StreamingText.displayName = "StreamingText"

export { StreamingText, streamingTextVariants }
