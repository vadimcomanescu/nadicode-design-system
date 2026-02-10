import { motion } from "motion/react"
import { cn } from "@/lib/utils"
import { Avatar3D, type Avatar3DState } from "../ui/Avatar3D"
import { Typography } from "../ui/Typography"
import { Badge } from "../ui/Badge"
import { motionSpring } from "@/lib/motion"

interface VoiceAgent {
  id: string
  name: string
  role: string
  avatar: string
}

interface VoiceAgentCardProps {
  agent: VoiceAgent
  state: Avatar3DState
  selected?: boolean
  onSelect?: () => void
  className?: string
}

const stateLabels: Record<Avatar3DState, string> = {
  idle: "Ready",
  listening: "Listening",
  speaking: "Speaking",
}

const stateBadgeVariants: Record<Avatar3DState, "secondary" | "accent" | "primary"> = {
  idle: "secondary",
  listening: "primary",
  speaking: "accent",
}

function VoiceAgentCard({
  agent,
  state,
  selected = false,
  onSelect,
  className,
}: VoiceAgentCardProps) {
  return (
    <motion.div
      className={cn(
        "flex flex-col items-center gap-3 rounded-xl p-4 transition-colors cursor-pointer",
        selected
          ? "glass-panel ring-1 ring-accent/30"
          : "hover:bg-surface-hover/50",
        className
      )}
      onClick={onSelect}
      whileHover={{ y: -2 }}
      transition={motionSpring.snappy}
    >
      <Avatar3D
        src={agent.avatar}
        name={agent.name}
        state={selected ? state : "idle"}
        size="lg"
        enableTilt={selected}
      />

      <div className="flex flex-col items-center gap-1 text-center">
        <Typography variant="h4" className="text-sm font-semibold text-text-primary">
          {agent.name}
        </Typography>
        <Typography variant="small" className="text-text-tertiary text-xs">
          {agent.role}
        </Typography>
      </div>

      {selected && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={motionSpring.snappy}
        >
          <Badge variant={stateBadgeVariants[state]} className="text-[10px]">
            {stateLabels[state]}
          </Badge>
        </motion.div>
      )}
    </motion.div>
  )
}

export { VoiceAgentCard }
export type { VoiceAgent, VoiceAgentCardProps }
