'use client'

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { motion, useReducedMotion } from "motion/react"
import type { HTMLMotionProps } from "motion/react"
import { cn } from "../../lib/utils"
import { motionSpring } from "@/lib/motion"

const MotionSlot = motion.create(Slot)

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-50 transition-colors duration-fast",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline: "border border-border bg-transparent hover:bg-surface-hover text-text-primary",
        ghost: "hover:bg-surface-hover text-text-primary",
        link: "text-text-primary underline-offset-4 hover:underline",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        accent: "bg-accent text-accent-foreground hover:bg-accent/90 shadow-glow-accent",
        glass: "glass-panel hover:bg-surface/40 text-text-primary",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        default: "h-9 px-4 py-2",
        lg: "h-10 px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends Omit<HTMLMotionProps<"button">, "variant" | "size">,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const prefersReduced = useReducedMotion()
    const isLink = variant === "link"
    const shouldAnimate = !prefersReduced && !isLink

    const motionProps = shouldAnimate
      ? {
          whileHover: { scale: 1.02, y: -2 },
          whileTap: { scale: 0.97 },
          transition: motionSpring.snappy,
        }
      : {}

    if (asChild) {
      return (
        <MotionSlot
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref as React.Ref<HTMLElement>}
          {...motionProps}
          {...props}
        />
      )
    }

    return (
      <motion.button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...motionProps}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
