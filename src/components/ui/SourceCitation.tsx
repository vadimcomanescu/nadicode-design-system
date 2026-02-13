'use client'

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"
import { Badge } from "./Badge"

const sourceCitationVariants = cva(
  "",
  {
    variants: {
      size: {
        inline: "inline-flex items-center gap-1.5",
        default: "space-y-2",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

function scoreVariant(score: number): "accent" | "secondary" | "outline" {
  if (score > 0.8) return "accent"
  if (score > 0.5) return "secondary"
  return "outline"
}

export interface Source {
  id: string
  title: string
  url?: string
  score?: number
  snippet?: string
}

export interface SourceCitationProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof sourceCitationVariants> {
  sources: Source[]
}

const SourceCitation = React.forwardRef<HTMLDivElement, SourceCitationProps>(
  ({ className, size, sources, ...props }, ref) => {
    const [expandedId, setExpandedId] = React.useState<string | null>(null)
    const sourcePanelBaseId = React.useId()

    if (size === "inline") {
      return (
        <div
          ref={ref}
          className={cn(sourceCitationVariants({ size }), className)}
          {...props}
        >
          <span className="text-xs text-text-tertiary">
            {sources.length} source{sources.length !== 1 ? "s" : ""}
          </span>
          {sources.slice(0, 3).map((s) => (
            <Badge key={s.id} variant="outline" className="text-[10px] px-1.5 py-0">
              {s.title}
            </Badge>
          ))}
          {sources.length > 3 && (
            <span className="text-xs text-text-tertiary">
              +{sources.length - 3}
            </span>
          )}
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn(sourceCitationVariants({ size }), className)}
        {...props}
      >
        {sources.map((source, index) => {
          const isExpanded = expandedId === source.id
          const snippetId = `${sourcePanelBaseId}-snippet-${index}`
          return (
            <div
              key={source.id}
              className="glass-panel rounded-lg p-3 space-y-1.5"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  {source.url ? (
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-accent hover:underline truncate"
                    >
                      {source.title}
                    </a>
                  ) : (
                    <span className="text-sm font-medium text-text-primary truncate">
                      {source.title}
                    </span>
                  )}
                </div>
                {source.score != null && (
                  <Badge
                    variant={scoreVariant(source.score)}
                    className="text-[10px] px-1.5 py-0 shrink-0"
                  >
                    {source.score.toFixed(2)}
                  </Badge>
                )}
              </div>
              {source.snippet && (
                <>
                  <button
                    type="button"
                    onClick={() => setExpandedId(isExpanded ? null : source.id)}
                    aria-expanded={isExpanded}
                    aria-controls={snippetId}
                    className="text-xs text-text-tertiary hover:text-text-secondary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded-sm"
                  >
                    {isExpanded ? "Hide snippet" : "Show snippet"}
                  </button>
                  <p
                    id={snippetId}
                    className={cn(
                      "text-xs text-text-secondary leading-relaxed border-l-2 border-border pl-2",
                      !isExpanded && "hidden"
                    )}
                    aria-hidden={!isExpanded}
                  >
                    {source.snippet}
                  </p>
                </>
              )}
            </div>
          )
        })}
      </div>
    )
  }
)
SourceCitation.displayName = "SourceCitation"

export { SourceCitation, sourceCitationVariants }
