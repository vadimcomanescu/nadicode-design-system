import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback } from "./Avatar"

const threadVariants = cva(
  "flex flex-col gap-4",
  {
    variants: {
      variant: {
        default: "",
        compact: "gap-2",
        relaxed: "gap-6",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const messageVariants = cva(
  "flex gap-3 max-w-full",
  {
    variants: {
      role: {
        user: "flex-row-reverse",
        assistant: "flex-row",
        system: "justify-center",
      },
    },
    defaultVariants: {
      role: "user",
    },
  }
)

const bubbleVariants = cva(
  "rounded-2xl px-4 py-2.5 text-sm leading-relaxed max-w-[80%]",
  {
    variants: {
      role: {
        user: "bg-primary text-primary-foreground rounded-br-sm",
        assistant: "bg-surface border border-border text-text-primary rounded-bl-sm",
        system: "bg-muted/50 text-text-tertiary text-xs italic px-3 py-1.5 rounded-lg",
      },
    },
    defaultVariants: {
      role: "user",
    },
  }
)

export interface Message {
  id: string
  role: "user" | "assistant" | "system"
  content: string
  timestamp?: string
  avatar?: string
}

export interface ConversationThreadProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof threadVariants> {
  messages: Message[]
  /** Show timestamps below messages */
  showTimestamps?: boolean
}

const ConversationThread = React.forwardRef<HTMLDivElement, ConversationThreadProps>(
  ({ className, variant, messages, showTimestamps = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(threadVariants({ variant }), className)}
        role="log"
        aria-label="Conversation"
        {...props}
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(messageVariants({ role: message.role }))}
          >
            {message.role !== "system" && (
              <Avatar className="h-8 w-8 shrink-0">
                <AvatarFallback className="text-xs">
                  {message.role === "user" ? "U" : "AI"}
                </AvatarFallback>
              </Avatar>
            )}
            <div className={cn("flex flex-col", message.role === "user" ? "items-end" : "items-start")}>
              <div className={cn(bubbleVariants({ role: message.role }))}>
                {message.content}
              </div>
              {showTimestamps && message.timestamp && (
                <span className="text-[10px] text-text-tertiary mt-1 px-1">
                  {message.timestamp}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    )
  }
)
ConversationThread.displayName = "ConversationThread"

export { ConversationThread, threadVariants }
