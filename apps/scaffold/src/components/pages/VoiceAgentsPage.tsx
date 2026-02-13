'use client'

import * as React from "react"
import { motion, AnimatePresence } from "motion/react"
import { SendIcon, ArrowLeftIcon } from "@/components/ui/icons"
import { Container } from "../layout/Grid"
import { Typography } from "../ui/Typography"
import { Button } from "../ui/Button"
import { Input } from "../ui/Input"
import { AudioWaveform } from "../ui/AudioWaveform"
import { ConversationThread, type Message } from "../ui/ConversationThread"
import { ThemeToggle } from "../ui/ThemeToggle"
import { MicIcon } from "../ui/icons/mic"
import { motionSpring, fadeInUp } from "@/lib/motion"
import { MouseGlow } from "../ui/MouseEffect"
import { StreamingText } from "../ui/text-effects"

/*
 * ANIMATION STORYBOARD - Selection View
 *    0ms   waiting for mount
 *    0ms   selection container fades in (snappy spring)
 *   80ms   agent cards stagger in (80ms apart, 30px up, gentle spring)
 *          cards hover: lift 4px
 *
 * ANIMATION STORYBOARD - Conversation View
 *    0ms   conversation container scales in (1.02 -> 1.0, snappy)
 *    0ms   avatar visible immediately
 * 1200ms   agent state: idle -> listening (CSS ring transition)
 * 1200ms   waveform fades in (scaleX 0.8 -> 1.0, snappy)
 *   +0ms   agent state: listening -> speaking
 *   +0ms   streaming text begins (20ms per character)
 */

const SELECTION = {
  cardStaggerMs: 80,
  cardOffsetY: 30,
  cardHoverY: -4,
  spring: motionSpring.gentle,
} as const

const CONVERSATION = {
  enterScale: 1.02,
  spring: motionSpring.snappy,
} as const

const AGENT_STATE = {
  listeningDelayMs: 1200,
} as const

const WAVEFORM = {
  bars: 40,
  initialScaleX: 0.8,
  spring: motionSpring.snappy,
} as const

const STREAMING = {
  speed: 2,
  intervalMs: 20,
} as const

interface VoiceAgent {
  id: string
  name: string
  role: string
  personality: string
  video: string
  poster: string
}

const agents: VoiceAgent[] = [
  {
    id: "aria",
    name: "Aria",
    role: "Creative Director",
    personality: "Design systems, brand, visual storytelling",
    video: "/avatars/agent-aria.mp4",
    poster: "/avatars/agent-aria.webp",
  },
  {
    id: "kai",
    name: "Kai",
    role: "Engineering Lead",
    personality: "Architecture, performance, code quality",
    video: "/avatars/agent-kai.mp4",
    poster: "/avatars/agent-kai.webp",
  },
  {
    id: "nova",
    name: "Nova",
    role: "Research Analyst",
    personality: "Data insights, trends, forecasting",
    video: "/avatars/agent-nova.mp4",
    poster: "/avatars/agent-nova.webp",
  },
  {
    id: "zara",
    name: "Zara",
    role: "Product Strategist",
    personality: "Roadmap, UX, growth strategies",
    video: "/avatars/agent-zara.mp4",
    poster: "/avatars/agent-zara.webp",
  },
]

const agentResponses: Record<string, (message: string) => string> = {
  aria: (msg) =>
    `I heard you say: "${msg}". As your Creative Director, I'd approach that through the lens of visual storytelling and brand coherence. Let me sketch out some ideas around composition, color theory, and how we can create a more emotionally resonant experience.`,
  kai: (msg) =>
    `I heard you say: "${msg}". As your Engineering Lead, I'd evaluate the technical tradeoffs first. We should consider the architecture implications, performance budgets, and how this fits into our existing patterns. Let me propose a clean implementation path.`,
  nova: (msg) =>
    `I heard you say: "${msg}". As your Research Analyst, I'd want to ground this in data. Let me pull together relevant trends, user behavior patterns, and competitive benchmarks to give us a clearer picture of the opportunity space.`,
  zara: (msg) =>
    `I heard you say: "${msg}". As your Product Strategist, I'd frame this within our roadmap priorities. We need to weigh user impact, development effort, and strategic alignment. Here's how I'd sequence the approach for maximum value.`,
}

type AgentState = "idle" | "listening" | "speaking"

function AgentVideoAvatar({
  agent,
  size = "lg",
  state = "idle",
}: {
  agent: VoiceAgent
  size?: "md" | "lg" | "xl"
  state?: AgentState
}) {
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const sizeClasses = {
    md: "h-[80px] w-[80px]",
    lg: "h-[140px] w-[140px]",
    xl: "h-[240px] w-[240px]",
  }

  return (
    <div className="relative inline-flex items-center justify-center">
      {/* Ambient glow */}
      <div
        className={[
          "absolute inset-[-12px] rounded-full blur-xl transition-all duration-500",
          state === "speaking"
            ? "bg-accent/30 opacity-100 avatar-3d-glow"
            : state === "listening"
              ? "bg-primary/20 opacity-100 avatar-3d-glow"
              : "bg-accent/10 opacity-0",
        ].join(" ")}
      />

      {/* Ring animation */}
      <div
        className={[
          "absolute inset-[-4px] rounded-full",
          state === "speaking" ? "avatar-3d-speaking" : "",
          state === "listening" ? "avatar-3d-listening" : "",
        ].join(" ")}
      />

      {/* Video container */}
      <div
        className={[
          sizeClasses[size],
          "relative overflow-hidden rounded-full agent-avatar-breathe",
          state === "idle" ? "ring-2 ring-border/50" : "",
          state === "listening"
            ? "ring-2 ring-primary/60 shadow-[0_0_20px_rgba(var(--color-primary),0.2)]"
            : "",
          state === "speaking"
            ? "ring-2 ring-accent shadow-[0_0_30px_rgba(var(--color-accent),0.4)]"
            : "",
        ].join(" ")}
      >
        <video
          ref={videoRef}
          src={agent.video}
          poster={agent.poster}
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
          draggable={false}
        />

        {/* Depth overlay */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, transparent 50%, rgba(0,0,0,0.12) 100%)",
          }}
        />
      </div>
    </div>
  )
}

export function VoiceAgentsPage({ onNavigateHome }: { onNavigateHome?: () => void }) {
  const [selectedAgent, setSelectedAgent] = React.useState<VoiceAgent | null>(null)
  const [agentState, setAgentState] = React.useState<AgentState>("idle")
  const [messages, setMessages] = React.useState<Message[]>([])
  const [input, setInput] = React.useState("")
  const [isStreaming, setIsStreaming] = React.useState(false)
  const [streamingContent, setStreamingContent] = React.useState<string | null>(null)
  const scrollRef = React.useRef<HTMLDivElement>(null)

  const handleSelectAgent = (agent: VoiceAgent) => {
    setSelectedAgent(agent)
    setAgentState("listening")
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: `Hi, I'm ${agent.name}, your ${agent.role}. I'm ready to help. What would you like to discuss?`,
      },
    ])
    setTimeout(() => setAgentState("idle"), 2000)
  }

  const handleBack = () => {
    setSelectedAgent(null)
    setAgentState("idle")
    setMessages([])
    setInput("")
    setIsStreaming(false)
    setStreamingContent(null)
  }

  const handleStreamComplete = React.useCallback(() => {
    if (streamingContent) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant" as const,
          content: streamingContent,
        },
      ])
    }
    setStreamingContent(null)
    setAgentState("idle")
    setIsStreaming(false)
  }, [streamingContent])

  const handleSend = () => {
    if (!input.trim() || !selectedAgent || isStreaming) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    }

    setMessages((prev) => [...prev, userMessage])
    const sentInput = input.trim()
    setInput("")
    setAgentState("listening")

    setTimeout(() => {
      setAgentState("speaking")
      setIsStreaming(true)

      const responseText = agentResponses[selectedAgent.id]?.(sentInput) ??
        `I heard you say: "${sentInput}". Let me think about that...`

      setStreamingContent(responseText)
    }, AGENT_STATE.listeningDelayMs)
  }

  React.useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="min-h-dvh bg-background text-text-primary relative overflow-hidden">
      <MouseGlow className="fixed inset-0 z-0 pointer-events-none opacity-70" />

      <AnimatePresence mode="wait">
        {/* ──── SELECTION VIEW ──── */}
        {!selectedAgent && (
          <motion.div
            key="selection"
            className="relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={CONVERSATION.spring}
          >
            <Container className="py-12">
              <header className="mb-16 flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onNavigateHome?.()}
                    aria-label="Back to docs"
                  >
                    <ArrowLeftIcon size={16} />
                  </Button>
                  <div>
                    <Typography variant="h1" className="mb-2">Voice Agents</Typography>
                    <Typography variant="body" className="text-text-secondary max-w-xl">
                      Select an agent to start a conversation.
                    </Typography>
                  </div>
                </div>
                <ThemeToggle />
              </header>

              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto"
                {...fadeInUp}
              >
                {agents.map((agent, i) => (
                  <motion.button
                    key={agent.id}
                    type="button"
                    className="group flex flex-col items-center gap-5 rounded-2xl glass-panel p-8 cursor-pointer border border-transparent hover:border-accent/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    onClick={() => handleSelectAgent(agent)}
                    initial={{ opacity: 0, y: SELECTION.cardOffsetY }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ...SELECTION.spring, delay: i * (SELECTION.cardStaggerMs / 1000) }}
                    whileHover={{ y: SELECTION.cardHoverY }}
                  >
                    <AgentVideoAvatar agent={agent} size="lg" />
                    <div className="text-center">
                      <Typography variant="h4" className="text-text-primary text-base font-semibold">
                        {agent.name}
                      </Typography>
                      <Typography variant="small" className="text-accent text-xs font-medium mt-0.5">
                        {agent.role}
                      </Typography>
                      <Typography variant="muted" className="text-xs mt-2 leading-relaxed">
                        {agent.personality}
                      </Typography>
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            </Container>
          </motion.div>
        )}

        {/* ──── CONVERSATION VIEW (full-screen immersive) ──── */}
        {selectedAgent && (
          <motion.div
            key={`conversation-${selectedAgent.id}`}
            className="relative z-10 min-h-dvh flex flex-col"
            initial={{ opacity: 0, scale: CONVERSATION.enterScale }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={CONVERSATION.spring}
          >
            {/* Top bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border/50">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                className="gap-2 text-text-secondary"
              >
                <ArrowLeftIcon size={16} />
                Back
              </Button>
              <ThemeToggle />
            </div>

            {/* Agent hero + waveform */}
            <div className="flex flex-col items-center gap-4 pt-10 pb-6">
              <AgentVideoAvatar agent={selectedAgent} size="xl" state={agentState} />

              <div className="text-center">
                <Typography variant="h2" className="text-text-primary">
                  {selectedAgent.name}
                </Typography>
                <Typography variant="small" className="text-accent">
                  {selectedAgent.role}
                </Typography>
              </div>

              {/* Waveform - visible when speaking, placeholder height otherwise */}
              <div className="h-8 flex items-center">
                <AnimatePresence>
                  {agentState === "speaking" && (
                    <motion.div
                      initial={{ opacity: 0, scaleX: WAVEFORM.initialScaleX }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      exit={{ opacity: 0, scaleX: WAVEFORM.initialScaleX }}
                      transition={WAVEFORM.spring}
                    >
                      <AudioWaveform active variant="accent" bars={WAVEFORM.bars} size="default" />
                    </motion.div>
                  )}
                  {agentState === "listening" && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <AudioWaveform active={false} variant="default" bars={WAVEFORM.bars} size="default" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Chat area - takes remaining space */}
            <div className="flex-1 flex flex-col max-w-2xl w-full mx-auto px-4 pb-4">
              <div className="flex-1 overflow-y-auto rounded-xl glass-panel mb-4">
                <div className="p-6">
                  <ConversationThread
                    messages={messages}
                    showTimestamps={false}
                  />
                  {streamingContent && (
                    <div className="mt-3 text-sm text-text-primary">
                      <StreamingText
                        text={streamingContent}
                        speed={STREAMING.speed}
                        interval={STREAMING.intervalMs}
                        showCursor
                        cursorStyle="line"
                        onComplete={handleStreamComplete}
                      />
                    </div>
                  )}
                  <div ref={scrollRef} />
                </div>
              </div>

              {/* Input bar */}
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSend()
                }}
                className="flex items-center gap-2 glass-panel rounded-xl px-3 py-2"
              >
                <Button type="button" size="icon" variant="ghost" className="shrink-0">
                  <MicIcon size={16} />
                </Button>
                <Input
                  placeholder={`Ask ${selectedAgent.name} something...`}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 border-0 bg-transparent focus-visible:ring-0 shadow-none"
                  disabled={isStreaming}
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={!input.trim() || isStreaming}
                  className="shrink-0"
                >
                  <SendIcon size={16} />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
