'use client'

import * as React from "react"
import { cn } from "../../lib/utils"

const Empty = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col items-center justify-center space-y-4 rounded-lg border border-dashed border-border bg-surface/50 p-12 text-center shadow-sm animate-in fade-in-50",
      className
    )}
    {...props}
  />
))
Empty.displayName = "Empty"

const EmptyIcon = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex h-12 w-12 items-center justify-center rounded-full bg-secondary/50 text-secondary-foreground ring-4 ring-secondary/10",
      className
    )}
    {...props}
  />
))
EmptyIcon.displayName = "EmptyIcon"

const EmptyTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-lg font-semibold text-text-primary tracking-tight", className)}
    {...props}
  />
))
EmptyTitle.displayName = "EmptyTitle"

const EmptyDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("max-w-sm text-sm text-text-tertiary leading-relaxed", className)}
    {...props}
  />
))
EmptyDescription.displayName = "EmptyDescription"

export { Empty, EmptyIcon, EmptyTitle, EmptyDescription }
