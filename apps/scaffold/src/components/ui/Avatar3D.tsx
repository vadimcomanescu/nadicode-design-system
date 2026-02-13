'use client'

import * as React from "react"
import { motion, useSpring, useReducedMotion } from "motion/react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

export type Avatar3DState = "idle" | "listening" | "speaking"

export const avatar3DVariants = cva(
  "relative inline-flex items-center justify-center rounded-full select-none",
  {
    variants: {
      size: {
        md: "h-[80px] w-[80px]",
        lg: "h-[120px] w-[120px]",
        xl: "h-[200px] w-[200px]",
      },
    },
    defaultVariants: { size: "lg" },
  }
)

export interface Avatar3DProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatar3DVariants> {
  src: string
  name: string
  state?: Avatar3DState
  enableTilt?: boolean
  maxTilt?: number
  onSelect?: () => void
  interactive?: boolean
}

export const Avatar3D = React.forwardRef<HTMLDivElement, Avatar3DProps>(
  (
    {
      className,
      src,
      name,
      state = "idle",
      size,
      enableTilt = true,
      maxTilt = 15,
      onSelect,
      interactive = true,
      ...props
    },
    ref
  ) => {
    const prefersReduced = useReducedMotion()
    const rotateX = useSpring(0, { duration: 0.2, bounce: 0 })
    const rotateY = useSpring(0, { duration: 0.2, bounce: 0 })

    const clampedTilt = Math.min(Math.max(maxTilt, 5), 25)

    const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReduced || !enableTilt) return
      const rect = e.currentTarget.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width - 0.5
      const py = (e.clientY - rect.top) / rect.height - 0.5
      rotateX.set(-py * clampedTilt)
      rotateY.set(px * clampedTilt)
    }

    const handleMouseLeave = () => {
      rotateX.set(0)
      rotateY.set(0)
    }

    const isActive = state !== "idle"
    const interactionProps = interactive
      ? {
          role: "button" as const,
          tabIndex: 0,
          "aria-label": name,
          onClick: onSelect,
          onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault()
              onSelect?.()
            }
          },
        }
      : {}

    return (
      <div
        ref={ref}
        className={cn("group inline-flex", interactive ? "cursor-pointer" : "cursor-default", className)}
        {...interactionProps}
        {...props}
      >
        {/* Ambient glow */}
        <div
          className={cn(
            "absolute inset-[-8px] rounded-full bg-accent/20 blur-xl transition-opacity duration-500",
            isActive ? "opacity-100" : "opacity-0",
            isActive && "avatar-3d-glow",
            state === "speaking" && "bg-accent/30"
          )}
        />

        {/* Ring overlay */}
        <div
          className={cn(
            "absolute inset-[-4px] rounded-full",
            state === "speaking" && "avatar-3d-speaking",
            state === "listening" && "avatar-3d-listening"
          )}
        />

        {/* Perspective container */}
        <motion.div
          style={{
            perspective: 1000,
            rotateX,
            rotateY,
            willChange: "transform",
          }}
          onMouseMove={handleMouse}
          onMouseLeave={handleMouseLeave}
          className="relative"
        >
          {/* Image container */}
          <div
            className={cn(
              avatar3DVariants({ size }),
              "overflow-hidden rounded-full agent-avatar-breathe",
              state === "idle" && "ring-2 ring-border/50",
              state === "listening" &&
                "ring-2 ring-primary/60 shadow-[0_0_20px_rgba(var(--color-primary),0.2)]",
              state === "speaking" &&
                "ring-2 ring-accent shadow-[0_0_30px_rgba(var(--color-accent),0.4)]"
            )}
          >
            {/* Image */}
            <img
              src={src}
              alt={name}
              className="h-full w-full object-cover rounded-full"
              draggable={false}
            />

            {/* Depth overlay - 3D lighting effect */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, transparent 50%, rgba(0,0,0,0.15) 100%)",
              }}
            />

            {/* Hover overlay */}
            <div className="absolute inset-0 rounded-full bg-overlay/0 group-hover:bg-overlay/10 transition-colors pointer-events-none" />
          </div>
        </motion.div>
      </div>
    )
  }
)

Avatar3D.displayName = "Avatar3D"
