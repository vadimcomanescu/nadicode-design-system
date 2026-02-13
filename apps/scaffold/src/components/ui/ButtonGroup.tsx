'use client'

import * as React from "react"
import { cn } from "../../lib/utils"

const ButtonGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "inline-flex -space-x-px rounded-md shadow-sm *:rounded-none first:*:rounded-l-md last:*:rounded-r-md",
      className
    )}
    {...props}
  />
))
ButtonGroup.displayName = "ButtonGroup"

export { ButtonGroup }
