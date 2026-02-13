'use client'

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { WrenchIcon } from "@/components/ui/icons/wrench"
import { CheckIcon } from "@/components/ui/icons/check"
import { XIcon } from "@/components/ui/icons/x"
import { LoaderCircleIcon } from "@/components/ui/icons/loader-circle"
import { ChevronDownIcon } from "@/components/ui/icons/chevron-down"

const toolCallCardVariants = cva(
  "rounded-lg border p-3 glass-panel transition-colors",
  {
    variants: {
      status: {
        pending: "border-border",
        running: "border-accent/40",
        complete: "border-success/40",
        error: "border-destructive/40",
      },
    },
    defaultVariants: {
      status: "pending",
    },
  }
)

export interface ToolCallCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof toolCallCardVariants> {
  toolName: string
  args?: Record<string, unknown>
  result?: string
  duration?: number
  defaultExpanded?: boolean
}

const StatusIcon: React.FC<{ status: ToolCallCardProps["status"] }> = ({ status }) => {
  switch (status) {
    case "complete":
      return <CheckIcon size={16} className="text-success" />
    case "error":
      return <XIcon size={16} className="text-destructive" />
    case "running":
      return <LoaderCircleIcon size={16} className="text-accent animate-spin" />
    default:
      return <WrenchIcon size={16} className="text-text-tertiary" />
  }
}

const ToolCallCard = React.forwardRef<HTMLDivElement, ToolCallCardProps>(
  (
    {
      className,
      status,
      toolName,
      args,
      result,
      duration,
      defaultExpanded = false,
      ...props
    },
    ref
  ) => {
    const [expanded, setExpanded] = React.useState(defaultExpanded)
    const resultPanelId = React.useId()

    return (
      <div
        ref={ref}
        className={cn(toolCallCardVariants({ status }), className)}
        {...props}
      >
        <div className="flex items-center gap-2">
          <StatusIcon status={status} />
          <code className="text-sm font-semibold text-text-primary">{toolName}</code>
          {duration != null && (
            <span className="ml-auto text-xs text-text-tertiary">{duration}ms</span>
          )}
        </div>

        {args && Object.keys(args).length > 0 && (
          <pre className="mt-2 rounded bg-surface p-2 text-xs text-text-secondary overflow-x-auto">
            {JSON.stringify(args, null, 2)}
          </pre>
        )}

        {result && (
          <div className="mt-2">
            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              aria-expanded={expanded}
              aria-controls={resultPanelId}
              className="flex items-center gap-1 text-xs text-text-tertiary hover:text-text-secondary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded-sm"
            >
              <ChevronDownIcon
                size={14}
                className={cn("transition-transform", expanded && "rotate-180")}
              />
              {expanded ? "Hide result" : "Show result"}
            </button>
            <pre
              id={resultPanelId}
              className={cn(
                "mt-1 rounded bg-surface p-2 text-xs text-text-secondary overflow-x-auto whitespace-pre-wrap",
                !expanded && "hidden"
              )}
              aria-hidden={!expanded}
            >
              {result}
            </pre>
          </div>
        )}
      </div>
    )
  }
)
ToolCallCard.displayName = "ToolCallCard"

export { ToolCallCard, toolCallCardVariants }
