'use client'

import * as React from "react"
import { cn } from "../../lib/utils"

export interface TerminalLine {
  text: string
  type?: 'stdin' | 'stdout' | 'stderr'
}

export interface AgentTerminalProps extends React.HTMLAttributes<HTMLDivElement> {
  lines: TerminalLine[]
  title?: string
  onCopy?: () => void
}

const lineTypeColor: Record<string, string> = {
  stdin: "text-accent",
  stdout: "text-text-primary",
  stderr: "text-destructive",
}

const lineTypePrefix: Record<string, string> = {
  stdin: "$ ",
  stdout: "",
  stderr: "",
}

const AgentTerminal = React.forwardRef<HTMLDivElement, AgentTerminalProps>(
  ({ className, lines, title, onCopy, ...props }, ref) => {
    const scrollRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight
      }
    }, [lines])

    return (
      <div
        ref={ref}
        className={cn(
          "glass-panel rounded-lg overflow-hidden bg-surface border border-border",
          className
        )}
        {...props}
      >
        {/* Title bar */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-border/50">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-warning/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-success/60" />
            </div>
            {title && (
              <span className="text-xs text-text-secondary font-mono ml-1">
                {title}
              </span>
            )}
          </div>
          {onCopy && (
            <button
              type="button"
              onClick={onCopy}
              className="text-xs text-text-tertiary hover:text-text-primary transition-colors"
              aria-label="Copy terminal output"
            >
              Copy
            </button>
          )}
        </div>

        {/* Terminal output */}
        <div
          ref={scrollRef}
          className="p-3 max-h-80 overflow-y-auto font-mono text-xs leading-5"
          role="log"
          aria-label={title || "Terminal output"}
        >
          {lines.map((line, idx) => {
            const type = line.type || "stdout"
            return (
              <div key={idx} className={cn(lineTypeColor[type])}>
                <span className="select-none text-text-tertiary">
                  {lineTypePrefix[type]}
                </span>
                {line.text}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
)
AgentTerminal.displayName = "AgentTerminal"

export { AgentTerminal }
