'use client'

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const agentMetricsCardVariants = cva(
  "glass-panel rounded-lg p-4",
  {
    variants: {
      layout: {
        grid: "",
        row: "",
      },
    },
    defaultVariants: {
      layout: "grid",
    },
  }
)

function TrendIndicator({ trend }: { trend: 'up' | 'down' | 'flat' }) {
  if (trend === 'up') {
    return <span className="text-success text-xs" aria-label="trending up">&#9650;</span>
  }
  if (trend === 'down') {
    return <span className="text-destructive text-xs" aria-label="trending down">&#9660;</span>
  }
  return <span className="text-text-tertiary text-xs" aria-label="flat">&#9644;</span>
}

export interface Metric {
  label: string
  value: string | number
  unit?: string
  trend?: 'up' | 'down' | 'flat'
}

export interface AgentMetricsCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof agentMetricsCardVariants> {
  metrics: Metric[]
  onRefresh?: () => void
}

const AgentMetricsCard = React.forwardRef<HTMLDivElement, AgentMetricsCardProps>(
  ({ className, layout, metrics, onRefresh, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(agentMetricsCardVariants({ layout }), className)}
        {...props}
      >
        {onRefresh && (
          <div className="flex justify-end mb-3">
            <button
              type="button"
              onClick={onRefresh}
              className="text-xs text-text-tertiary hover:text-text-primary transition-colors"
              aria-label="Refresh metrics"
            >
              Refresh
            </button>
          </div>
        )}
        <div className={cn(
          layout === "row"
            ? "flex gap-4 overflow-x-auto"
            : "grid grid-cols-2 gap-3"
        )}>
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-md bg-surface/50 border border-border/50 p-3 min-w-0"
            >
              <p className="text-xs text-text-tertiary truncate">{metric.label}</p>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="text-lg font-semibold text-text-primary tabular-nums">
                  {metric.value}
                </span>
                {metric.unit && (
                  <span className="text-xs text-text-tertiary">{metric.unit}</span>
                )}
                {metric.trend && <TrendIndicator trend={metric.trend} />}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
)
AgentMetricsCard.displayName = "AgentMetricsCard"

export { AgentMetricsCard, agentMetricsCardVariants }
