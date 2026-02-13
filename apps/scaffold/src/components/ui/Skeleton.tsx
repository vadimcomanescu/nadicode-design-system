'use client'

import * as React from "react"
import { cn } from "../../lib/utils"

const Skeleton = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("relative overflow-hidden rounded-md bg-secondary/50", className)}
        {...props}
      >
        <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    )
  }
)
Skeleton.displayName = "Skeleton"

export { Skeleton }
