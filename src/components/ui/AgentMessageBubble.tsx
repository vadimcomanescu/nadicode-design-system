'use client'

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { CopyIcon } from "@/components/ui/icons/copy"
import { RefreshCwIcon } from "@/components/ui/icons"

const bubbleVariants = cva(
  "rounded-lg border p-3 max-w-[80%] text-sm",
  {
    variants: {
      role: {
        user: "ml-auto bg-primary/10 border-primary/20 text-text-primary",
        agent: "mr-auto glass-panel border-border text-text-primary",
        system: "mx-auto bg-muted border-border text-text-secondary text-center text-xs",
      },
    },
    defaultVariants: {
      role: "agent",
    },
  }
)

export interface AgentMessageBubbleProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bubbleVariants> {
  role: "user" | "agent" | "system"
  content: string
  avatar?: React.ReactNode
  timestamp?: string
  toolCalls?: React.ReactNode
  actions?: { onCopy?: () => void; onRetry?: () => void }
  isStreaming?: boolean
}

const AgentMessageBubble = React.forwardRef<HTMLDivElement, AgentMessageBubbleProps>(
  (
    {
      className,
      role,
      content,
      avatar,
      timestamp,
      toolCalls,
      actions,
      isStreaming,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex gap-2",
          role === "user" && "flex-row-reverse",
          role === "system" && "justify-center",
          className
        )}
        {...props}
      >
        {avatar && role !== "system" && (
          <div className="flex-shrink-0" aria-hidden="true">
            {avatar}
          </div>
        )}
        <div className="flex flex-col gap-1 min-w-0">
          <div className={cn(bubbleVariants({ role }))}>
            <p className="whitespace-pre-wrap break-words">{content}</p>
            {isStreaming && (
              <span className="inline-block w-1.5 h-4 ml-0.5 bg-accent animate-pulse rounded-sm" />
            )}
          </div>

          {toolCalls && <div className="flex flex-col gap-1.5 mt-1">{toolCalls}</div>}

          <div
            className={cn(
              "flex items-center gap-2 text-xs text-text-tertiary",
              role === "user" && "flex-row-reverse"
            )}
          >
            {timestamp && <span>{timestamp}</span>}
            {actions && (
              <div className="flex items-center gap-1">
                {actions.onCopy && (
                  <button
                    type="button"
                    onClick={actions.onCopy}
                    className="hover:text-text-secondary transition-colors"
                    aria-label="Copy message"
                  >
                    <CopyIcon size={12} />
                  </button>
                )}
                {actions.onRetry && (
                  <button
                    type="button"
                    onClick={actions.onRetry}
                    className="hover:text-text-secondary transition-colors"
                    aria-label="Retry message"
                  >
                    <RefreshCwIcon size={12} />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
)
AgentMessageBubble.displayName = "AgentMessageBubble"

export { AgentMessageBubble, bubbleVariants }
