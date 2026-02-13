'use client'

import * as React from "react"
import { cn } from "@/lib/utils"
import { AgentMessageBubble } from "@/components/ui/AgentMessageBubble"
import { ToolCallCard } from "@/components/ui/ToolCallCard"
import { ThinkingIndicator } from "@/components/ui/ThinkingIndicator"

interface ToolCall {
  toolName: string
  args?: Record<string, unknown>
  status: 'pending' | 'running' | 'complete' | 'error'
  result?: string
  duration?: number
}

interface ConversationMessage {
  id: string
  role: 'user' | 'agent' | 'system'
  content: string
  timestamp?: string
  toolCalls?: ToolCall[]
  isThinking?: boolean
  reasoning?: string
  isStreaming?: boolean
}

interface AgentConversationBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  messages: ConversationMessage[]
}

const AgentConversationBlock = React.forwardRef<HTMLDivElement, AgentConversationBlockProps>(
  ({ className, messages, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col gap-4 p-4 glass-panel rounded-lg", className)} {...props}>
      {messages.map((msg) => (
        <div key={msg.id} className="flex flex-col gap-2">
          {msg.isThinking && <ThinkingIndicator reasoning={msg.reasoning} />}
          <AgentMessageBubble
            role={msg.role}
            content={msg.content}
            timestamp={msg.timestamp}
            isStreaming={msg.isStreaming}
            toolCalls={
              msg.toolCalls && msg.toolCalls.length > 0 ? (
                <>
                  {msg.toolCalls.map((tc, i) => (
                    <ToolCallCard
                      key={i}
                      toolName={tc.toolName}
                      args={tc.args}
                      status={tc.status}
                      result={tc.result}
                      duration={tc.duration}
                    />
                  ))}
                </>
              ) : undefined
            }
          />
        </div>
      ))}
    </div>
  )
)
AgentConversationBlock.displayName = "AgentConversationBlock"

export { AgentConversationBlock }
export type { AgentConversationBlockProps, ConversationMessage }
