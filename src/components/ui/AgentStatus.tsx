import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const agentStatusVariants = cva(
  "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium transition-colors border",
  {
    variants: {
      status: {
        idle: "border-border bg-surface text-text-secondary",
        thinking: "border-accent/30 bg-accent/5 text-accent",
        streaming: "border-info/30 bg-info/5 text-info",
        error: "border-destructive/30 bg-destructive/5 text-destructive",
        complete: "border-success/30 bg-success/5 text-success",
      },
      size: {
        sm: "px-2 py-1 text-[10px] gap-1.5",
        default: "px-3 py-1.5 text-xs gap-2",
        lg: "px-4 py-2 text-sm gap-2.5",
      },
    },
    defaultVariants: {
      status: "idle",
      size: "default",
    },
  }
)

const dotVariants = cva(
  "rounded-full",
  {
    variants: {
      status: {
        idle: "bg-text-tertiary",
        thinking: "bg-accent animate-pulse",
        streaming: "bg-info animate-pulse",
        error: "bg-destructive",
        complete: "bg-success",
      },
      size: {
        sm: "h-1.5 w-1.5",
        default: "h-2 w-2",
        lg: "h-2.5 w-2.5",
      },
    },
    defaultVariants: {
      status: "idle",
      size: "default",
    },
  }
)

type AgentStatusType = "idle" | "thinking" | "streaming" | "error" | "complete"

const STATUS_LABELS: Record<AgentStatusType, string> = {
  idle: "Idle",
  thinking: "Thinking...",
  streaming: "Streaming",
  error: "Error",
  complete: "Complete",
}

export interface AgentStatusProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children">,
    VariantProps<typeof agentStatusVariants> {
  /** Current agent status */
  status?: AgentStatusType
  /** Custom label (overrides default status label) */
  label?: string
  /** Show the status dot indicator */
  showDot?: boolean
}

const AgentStatus = React.forwardRef<HTMLSpanElement, AgentStatusProps>(
  ({ className, status = "idle", size, label, showDot = true, ...props }, ref) => {
    const displayLabel = label ?? STATUS_LABELS[status]

    return (
      <span
        ref={ref}
        className={cn(agentStatusVariants({ status, size }), className)}
        role="status"
        aria-label={`Agent status: ${displayLabel}`}
        {...props}
      >
        {showDot && (
          <span className={cn(dotVariants({ status, size }))} aria-hidden="true" />
        )}
        {displayLabel}
      </span>
    )
  }
)
AgentStatus.displayName = "AgentStatus"

export { AgentStatus, agentStatusVariants }
