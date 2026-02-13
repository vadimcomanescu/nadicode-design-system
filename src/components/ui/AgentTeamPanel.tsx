'use client'

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { ChevronDownIcon } from "@/components/ui/icons/chevron-down"

const agentTeamPanelVariants = cva(
  "rounded-lg border border-border glass-panel overflow-hidden",
  {
    variants: {
      size: {
        compact: "text-xs",
        default: "text-sm",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

type AgentEntry = {
  id: string
  name: string
  role: string
  status: "idle" | "active" | "complete" | "error"
  avatar?: React.ReactNode
}

const statusDotClass: Record<AgentEntry["status"], string> = {
  idle: "bg-text-tertiary",
  active: "bg-accent animate-pulse",
  complete: "bg-success",
  error: "bg-destructive",
}

export interface AgentTeamPanelProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof agentTeamPanelVariants> {
  agents: AgentEntry[]
}

const AgentTeamPanel = React.forwardRef<HTMLDivElement, AgentTeamPanelProps>(
  ({ className, size, agents, ...props }, ref) => {
    const [expandedIds, setExpandedIds] = React.useState<Set<string>>(new Set())
    const panelBaseId = React.useId()

    const toggle = (id: string) => {
      setExpandedIds((prev) => {
        const next = new Set(prev)
        if (next.has(id)) next.delete(id)
        else next.add(id)
        return next
      })
    }

    return (
      <div
        ref={ref}
        className={cn(agentTeamPanelVariants({ size }), className)}
        {...props}
      >
        <div className="px-3 py-2 border-b border-border">
          <span className="font-semibold text-text-primary">
            Team ({agents.length})
          </span>
        </div>
        <div className="divide-y divide-border">
          {agents.map((agent, index) => {
            const isExpanded = expandedIds.has(agent.id)
            const detailsId = `${panelBaseId}-agent-${index}-details`
            return (
              <div key={agent.id}>
                <button
                  type="button"
                  onClick={() => toggle(agent.id)}
                  aria-expanded={isExpanded}
                  aria-controls={detailsId}
                  className="flex items-center gap-2 w-full px-3 py-2 hover:bg-surface-hover transition-colors text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                >
                  {agent.avatar && (
                    <div className="flex-shrink-0" aria-hidden="true">
                      {agent.avatar}
                    </div>
                  )}
                  <span
                    className={cn(
                      "h-2 w-2 rounded-full flex-shrink-0",
                      statusDotClass[agent.status]
                    )}
                    aria-label={agent.status}
                  />
                  <span className="font-medium text-text-primary truncate">
                    {agent.name}
                  </span>
                  <ChevronDownIcon
                    size={14}
                    className={cn(
                      "ml-auto text-text-tertiary transition-transform flex-shrink-0",
                      isExpanded && "rotate-180"
                    )}
                  />
                </button>
                <div
                  id={detailsId}
                  className={cn("px-3 pb-2 text-text-secondary", !isExpanded && "hidden")}
                  aria-hidden={!isExpanded}
                >
                  <span className="text-xs">Role: {agent.role}</span>
                  <span className="block text-xs capitalize">
                    Status: {agent.status}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
)
AgentTeamPanel.displayName = "AgentTeamPanel"

export { AgentTeamPanel, agentTeamPanelVariants }
