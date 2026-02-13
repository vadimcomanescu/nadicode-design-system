'use client'

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { ShieldCheckIcon } from "@/components/ui/icons/shield-check"
import { AlertTriangleIcon } from "@/components/ui/icons/alert-triangle"
import { ShieldIcon } from "@/components/ui/icons/shield"

const approvalCardVariants = cva(
  "rounded-lg border p-4 glass-floating transition-colors",
  {
    variants: {
      riskLevel: {
        low: "border-success/40",
        medium: "border-warning/40",
        high: "border-destructive/40",
      },
    },
    defaultVariants: {
      riskLevel: "low",
    },
  }
)

export interface ApprovalCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof approvalCardVariants> {
  title: string
  description?: string
  onApprove?: () => void
  onReject?: () => void
  timeout?: number
}

const RiskIcon: React.FC<{ riskLevel: ApprovalCardProps["riskLevel"] }> = ({
  riskLevel,
}) => {
  switch (riskLevel) {
    case "high":
      return <AlertTriangleIcon size={18} className="text-destructive" />
    case "medium":
      return <ShieldIcon size={18} className="text-warning" />
    default:
      return <ShieldCheckIcon size={18} className="text-success" />
  }
}

const ApprovalCard = React.forwardRef<HTMLDivElement, ApprovalCardProps>(
  (
    {
      className,
      riskLevel,
      title,
      description,
      onApprove,
      onReject,
      timeout,
      ...props
    },
    ref
  ) => {
    const [remaining, setRemaining] = React.useState(timeout)

    React.useEffect(() => {
      if (timeout == null) return
      setRemaining(timeout)
      const interval = setInterval(() => {
        setRemaining((prev) => {
          if (prev == null || prev <= 1) {
            clearInterval(interval)
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(interval)
    }, [timeout])

    return (
      <div
        ref={ref}
        className={cn(approvalCardVariants({ riskLevel }), className)}
        role="alert"
        {...props}
      >
        <div className="flex items-start gap-3">
          <RiskIcon riskLevel={riskLevel} />
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-text-primary">{title}</h4>
            {description && (
              <p className="mt-1 text-xs text-text-secondary">{description}</p>
            )}
          </div>
        </div>

        {timeout != null && remaining != null && (
          <div className="mt-3">
            <div className="h-1 rounded-full bg-surface overflow-hidden">
              <div
                className="h-full bg-accent transition-all duration-1000 ease-linear rounded-full"
                style={{ width: `${(remaining / timeout) * 100}%` }}
              />
            </div>
            <span className="text-[10px] text-text-tertiary mt-0.5 block">
              {remaining}s remaining
            </span>
          </div>
        )}

        <div className="flex items-center gap-2 mt-3">
          {onApprove && (
            <button
              type="button"
              onClick={onApprove}
              className="rounded-md bg-success/10 border border-success/30 px-3 py-1.5 text-xs font-medium text-success hover:bg-success/20 transition-colors"
            >
              Approve
            </button>
          )}
          {onReject && (
            <button
              type="button"
              onClick={onReject}
              className="rounded-md bg-destructive/10 border border-destructive/30 px-3 py-1.5 text-xs font-medium text-destructive hover:bg-destructive/20 transition-colors"
            >
              Reject
            </button>
          )}
        </div>
      </div>
    )
  }
)
ApprovalCard.displayName = "ApprovalCard"

export { ApprovalCard, approvalCardVariants }
