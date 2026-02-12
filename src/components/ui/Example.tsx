'use client'

import * as React from "react"
import { cn } from "../../lib/utils"

const Example = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border border-border bg-surface p-4 text-text-primary",
      className
    )}
    {...props}
  />
))
Example.displayName = "Example"

export { Example }
