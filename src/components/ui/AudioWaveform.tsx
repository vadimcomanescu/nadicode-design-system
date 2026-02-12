'use client'

/* eslint-disable react-hooks/refs -- deterministic ref init pattern for stable random offsets */
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const audioWaveformVariants = cva(
  "flex items-center",
  {
    variants: {
      variant: {
        default: "[--waveform-color:rgb(var(--color-text-primary))]",
        accent: "[--waveform-color:rgb(var(--color-accent))]",
        success: "[--waveform-color:rgb(var(--color-success))]",
      },
      size: {
        sm: "h-4 gap-[2px]",
        default: "h-8 gap-[3px]",
        lg: "h-12 gap-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface AudioWaveformProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof audioWaveformVariants> {
  /** Number of bars in the waveform */
  bars?: number
  /** Whether the waveform is actively animating */
  active?: boolean
  /** Bar width in pixels */
  barWidth?: number
}

const AudioWaveform = React.forwardRef<HTMLDivElement, AudioWaveformProps>(
  (
    {
      className,
      variant,
      size,
      bars = 24,
      active = false,
      barWidth = 3,
      ...props
    },
    ref
  ) => {
    const randomOffsetsRef = React.useRef<number[] | null>(null)
    if (randomOffsetsRef.current === null || randomOffsetsRef.current.length !== bars) {
      randomOffsetsRef.current = Array.from({ length: bars }, (_, i) => ((i * 7 + 3) % 20))
    }
    const randomOffsets = randomOffsetsRef.current

    return (
      <div
        ref={ref}
        className={cn(audioWaveformVariants({ variant, size }), className)}
        role="img"
        aria-label={active ? "Audio waveform active" : "Audio waveform inactive"}
        {...props}
      >
        {Array.from({ length: bars }).map((_, i) => (
          <span
            key={i}
            className={cn(
              "rounded-full bg-[var(--waveform-color)] transition-all",
              active && "animate-pulse"
            )}
            style={{
              width: barWidth,
              height: active
                ? `${20 + Math.sin(i * 0.7) * 60 + randomOffsets[i]}%`
                : "15%",
              opacity: active ? 0.6 + Math.sin(i * 0.5) * 0.4 : 0.3,
              animationDelay: `${i * 75}ms`,
              animationDuration: `${600 + (i % 5) * 200}ms`,
            }}
            aria-hidden="true"
          />
        ))}
      </div>
    )
  }
)
AudioWaveform.displayName = "AudioWaveform"

export { AudioWaveform, audioWaveformVariants }
