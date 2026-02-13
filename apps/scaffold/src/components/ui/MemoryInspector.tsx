'use client'

import * as React from "react"
import { cn } from "../../lib/utils"
import { Badge } from "./Badge"

const memoryTypeBadgeVariant: Record<string, "accent" | "secondary" | "outline"> = {
  episodic: "accent",
  semantic: "secondary",
  procedural: "outline",
}

export interface MemoryEntry {
  id: string
  type: 'episodic' | 'semantic' | 'procedural'
  content: string
  timestamp?: string
  source?: string
}

export interface MemoryInspectorProps extends React.HTMLAttributes<HTMLDivElement> {
  entries: MemoryEntry[]
  onSearch?: (query: string) => void
}

const MemoryInspector = React.forwardRef<HTMLDivElement, MemoryInspectorProps>(
  ({ className, entries, onSearch, ...props }, ref) => {
    const [query, setQuery] = React.useState("")
    const [expandedId, setExpandedId] = React.useState<string | null>(null)
    const memoryPanelBaseId = React.useId()

    const filtered = query
      ? entries.filter(
          (e) =>
            e.content.toLowerCase().includes(query.toLowerCase()) ||
            e.type.includes(query.toLowerCase()) ||
            e.source?.toLowerCase().includes(query.toLowerCase())
        )
      : entries

    function handleQueryChange(e: React.ChangeEvent<HTMLInputElement>) {
      const value = e.target.value
      setQuery(value)
      onSearch?.(value)
    }

    return (
      <div
        ref={ref}
        className={cn("glass-panel rounded-lg p-4 space-y-3", className)}
        {...props}
      >
        <input
          type="text"
          value={query}
          onChange={handleQueryChange}
          placeholder="Search memories..."
          className="w-full rounded-md border border-border bg-surface px-3 py-1.5 text-sm text-text-primary placeholder:text-text-tertiary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
          aria-label="Search memories"
        />

        <div className="space-y-2 max-h-80 overflow-y-auto">
          {filtered.length === 0 && (
            <p className="text-xs text-text-tertiary text-center py-4">
              No memories found
            </p>
          )}
          {filtered.map((entry, index) => {
            const isExpanded = expandedId === entry.id
            const contentId = `${memoryPanelBaseId}-entry-${index}`
            return (
              <div
                key={entry.id}
                className="rounded-md border border-border/50 bg-surface/30 p-2.5"
              >
                <div className="flex items-center gap-2 justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    <Badge variant={memoryTypeBadgeVariant[entry.type]} className="text-[10px] px-1.5 py-0 shrink-0">
                      {entry.type}
                    </Badge>
                    {entry.source && (
                      <span className="text-xs text-text-tertiary truncate">
                        {entry.source}
                      </span>
                    )}
                  </div>
                  {entry.timestamp && (
                    <span className="text-[10px] text-text-tertiary shrink-0 tabular-nums">
                      {entry.timestamp}
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setExpandedId(isExpanded ? null : entry.id)}
                  aria-expanded={isExpanded}
                  aria-controls={contentId}
                  className="mt-1.5 text-left w-full focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded-sm"
                >
                  <p
                    id={contentId}
                    className={cn(
                      "text-xs text-text-secondary leading-relaxed",
                      !isExpanded && "line-clamp-2"
                    )}
                  >
                    {entry.content}
                  </p>
                </button>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
)
MemoryInspector.displayName = "MemoryInspector"

export { MemoryInspector }
