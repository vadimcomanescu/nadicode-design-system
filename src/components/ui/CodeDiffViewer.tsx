'use client'

import * as React from "react"
import { cn } from "../../lib/utils"
import { Badge } from "./Badge"

export interface DiffChange {
  type: 'add' | 'remove' | 'context'
  content: string
  lineNumber?: number
}

export interface DiffHunk {
  changes: DiffChange[]
}

export interface CodeDiffViewerProps extends React.HTMLAttributes<HTMLDivElement> {
  filePath: string
  language?: string
  hunks: DiffHunk[]
  onAccept?: (hunkIndex: number) => void
  onReject?: (hunkIndex: number) => void
}

const lineTypeStyles: Record<string, string> = {
  add: "bg-success/10 text-text-primary",
  remove: "bg-destructive/10 text-text-primary",
  context: "text-text-secondary",
}

const linePrefix: Record<string, string> = {
  add: "+",
  remove: "-",
  context: " ",
}

const CodeDiffViewer = React.forwardRef<HTMLDivElement, CodeDiffViewerProps>(
  ({ className, filePath, language, hunks, onAccept, onReject, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("glass-panel rounded-lg overflow-hidden", className)}
        {...props}
      >
        {/* File header */}
        <div className="flex items-center justify-between gap-2 px-3 py-2 border-b border-border/50">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-sm font-mono text-text-primary truncate">
              {filePath}
            </span>
            {language && (
              <Badge variant="outline" className="text-[10px] px-1.5 py-0 shrink-0">
                {language}
              </Badge>
            )}
          </div>
        </div>

        {/* Hunks */}
        {hunks.map((hunk, hunkIdx) => (
          <div key={hunkIdx} className="border-b border-border/30 last:border-b-0">
            <div className="overflow-x-auto">
              {hunk.changes.map((change, changeIdx) => (
                <div
                  key={changeIdx}
                  className={cn(
                    "flex font-mono text-xs leading-6",
                    lineTypeStyles[change.type]
                  )}
                >
                  <span className="w-12 shrink-0 text-right pr-2 text-text-tertiary select-none border-r border-border/30">
                    {change.lineNumber ?? ""}
                  </span>
                  <span className="w-5 shrink-0 text-center select-none text-text-tertiary">
                    {linePrefix[change.type]}
                  </span>
                  <span className="flex-1 pr-3 whitespace-pre">{change.content}</span>
                </div>
              ))}
            </div>

            {(onAccept || onReject) && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-surface/30 border-t border-border/30">
                {onAccept && (
                  <button
                    type="button"
                    onClick={() => onAccept(hunkIdx)}
                    className="text-xs font-medium text-success hover:text-success/80 transition-colors"
                    aria-label={`Accept hunk ${hunkIdx + 1}`}
                  >
                    Accept
                  </button>
                )}
                {onReject && (
                  <button
                    type="button"
                    onClick={() => onReject(hunkIdx)}
                    className="text-xs font-medium text-destructive hover:text-destructive/80 transition-colors"
                    aria-label={`Reject hunk ${hunkIdx + 1}`}
                  >
                    Reject
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    )
  }
)
CodeDiffViewer.displayName = "CodeDiffViewer"

export { CodeDiffViewer }
