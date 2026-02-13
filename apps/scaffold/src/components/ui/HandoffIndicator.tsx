'use client'

import * as React from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"
import { ArrowRightIcon } from "@/components/ui/icons/arrow-right"
import { motionSpring } from "@/lib/motion"

type AgentInfo = {
  name: string
  avatar?: React.ReactNode
}

export interface HandoffIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  fromAgent: AgentInfo
  toAgent: AgentInfo
  reason?: string
}

const AgentChip: React.FC<{ agent: AgentInfo }> = ({ agent }) => (
  <div className="flex items-center gap-2">
    {agent.avatar && <div className="flex-shrink-0">{agent.avatar}</div>}
    <span className="text-sm font-medium text-text-primary">{agent.name}</span>
  </div>
)

const HandoffIndicator = React.forwardRef<HTMLDivElement, HandoffIndicatorProps>(
  ({ className, fromAgent, toAgent, reason, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex flex-col items-center gap-1.5 rounded-lg border border-border glass-panel p-3",
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-3">
          <AgentChip agent={fromAgent} />
          <motion.div
            initial={{ x: -6, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={motionSpring.snappy}
          >
            <ArrowRightIcon size={18} className="text-accent" />
          </motion.div>
          <AgentChip agent={toAgent} />
        </div>
        {reason && (
          <span className="text-xs text-text-tertiary">{reason}</span>
        )}
      </div>
    )
  }
)
HandoffIndicator.displayName = "HandoffIndicator"

export { HandoffIndicator }
