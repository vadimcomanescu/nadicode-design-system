'use client'

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const contextMeterVariants = cva(
  "w-full",
  {
    variants: {
      size: {
        compact: "space-y-1",
        default: "space-y-2",
        expanded: "space-y-3",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

function getUsageColor(percent: number): string {
  if (percent >= 80) return "bg-destructive"
  if (percent >= 60) return "bg-warning"
  return "bg-success"
}

function getUsageLabel(percent: number): string {
  if (percent >= 80) return "Critical"
  if (percent >= 60) return "Elevated"
  return "Normal"
}

export interface ContextMeterProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof contextMeterVariants> {
  used: number
  total: number
  breakdown?: { system?: number; user?: number; assistant?: number }
}

const ContextMeter = React.forwardRef<HTMLDivElement, ContextMeterProps>(
  ({ className, size, used, total, breakdown, ...props }, ref) => {
    const percent = total > 0 ? Math.min(100, Math.round((used / total) * 100)) : 0
    const barColor = getUsageColor(percent)

    return (
      <div
        ref={ref}
        className={cn(contextMeterVariants({ size }), className)}
        role="meter"
        aria-valuenow={used}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label={`Context usage: ${percent}%`}
        {...props}
      >
        {/* Bar */}
        <div className="relative h-2 w-full overflow-hidden rounded-full bg-secondary">
          <div
            className={cn("h-full rounded-full transition-all duration-300 ease-out", barColor)}
            style={{ width: `${percent}%` }}
          />
        </div>

        {/* Compact: just percentage */}
        {size === "compact" && (
          <div className="flex justify-end">
            <span className="text-xs text-text-tertiary">{percent}%</span>
          </div>
        )}

        {/* Default: bar + used/total */}
        {size !== "compact" && (
          <div className="flex items-center justify-between text-xs text-text-secondary">
            <span className={cn(
              "font-medium",
              percent >= 80 ? "text-destructive" : percent >= 60 ? "text-warning" : "text-success"
            )}>
              {getUsageLabel(percent)}
            </span>
            <span className="tabular-nums">
              {used.toLocaleString()} / {total.toLocaleString()} tokens
            </span>
          </div>
        )}

        {/* Expanded: breakdown */}
        {size === "expanded" && breakdown && (
          <div className="flex gap-4 text-xs text-text-tertiary">
            {breakdown.system != null && (
              <span>System: {breakdown.system}%</span>
            )}
            {breakdown.user != null && (
              <span>User: {breakdown.user}%</span>
            )}
            {breakdown.assistant != null && (
              <span>Assistant: {breakdown.assistant}%</span>
            )}
          </div>
        )}
      </div>
    )
  }
)
ContextMeter.displayName = "ContextMeter"

export { ContextMeter, contextMeterVariants }
