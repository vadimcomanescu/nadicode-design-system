'use client'

import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronDownIcon } from "@/components/ui/icons/chevron-down"

type TimelineEventType = "tool_call" | "message" | "decision" | "error"

const eventDotColor: Record<TimelineEventType, string> = {
  tool_call: "bg-accent",
  message: "bg-primary",
  decision: "bg-warning",
  error: "bg-destructive",
}

const eventLineColor: Record<TimelineEventType, string> = {
  tool_call: "border-accent/30",
  message: "border-primary/30",
  decision: "border-warning/30",
  error: "border-destructive/30",
}

type TimelineEvent = {
  id: string
  timestamp: string
  type: TimelineEventType
  agent?: string
  title: string
  detail?: string
}

export interface AgentTimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  events: TimelineEvent[]
}

const AgentTimeline = React.forwardRef<HTMLDivElement, AgentTimelineProps>(
  ({ className, events, ...props }, ref) => {
    const [expandedIds, setExpandedIds] = React.useState<Set<string>>(new Set())

    const toggle = (id: string) => {
      setExpandedIds((prev) => {
        const next = new Set(prev)
        if (next.has(id)) next.delete(id)
        else next.add(id)
        return next
      })
    }

    return (
      <div ref={ref} className={cn("relative", className)} {...props}>
        {events.map((event, i) => {
          const isLast = i === events.length - 1
          const isExpanded = expandedIds.has(event.id)
          return (
            <div key={event.id} className="relative flex gap-3 pb-4">
              {/* Connector line */}
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "h-2.5 w-2.5 rounded-full flex-shrink-0 mt-1",
                    eventDotColor[event.type]
                  )}
                />
                {!isLast && (
                  <div
                    className={cn(
                      "w-px flex-1 border-l",
                      eventLineColor[event.type]
                    )}
                  />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 -mt-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-text-primary truncate">
                    {event.title}
                  </span>
                  {event.detail && (
                    <button
                      type="button"
                      onClick={() => toggle(event.id)}
                      className="text-text-tertiary hover:text-text-secondary transition-colors flex-shrink-0"
                    >
                      <ChevronDownIcon
                        size={14}
                        className={cn(
                          "transition-transform",
                          isExpanded && "rotate-180"
                        )}
                      />
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-text-tertiary mt-0.5">
                  <time>{event.timestamp}</time>
                  {event.agent && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span>{event.agent}</span>
                    </>
                  )}
                </div>
                {event.detail && isExpanded && (
                  <p className="mt-1 text-xs text-text-secondary rounded bg-surface p-2">
                    {event.detail}
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    )
  }
)
AgentTimeline.displayName = "AgentTimeline"

export { AgentTimeline }
