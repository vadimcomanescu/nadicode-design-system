'use client'

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"
import { Badge } from "./Badge"

const artifactCardVariants = cva(
  "glass-panel rounded-lg overflow-hidden",
  {
    variants: {
      type: {
        code: "",
        markdown: "",
        table: "",
        image: "",
      },
    },
    defaultVariants: {
      type: "code",
    },
  }
)

export interface ArtifactCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof artifactCardVariants> {
  type: 'code' | 'markdown' | 'table' | 'image'
  content: string
  title?: string
  language?: string
  onCopy?: () => void
  onDownload?: () => void
  defaultExpanded?: boolean
}

function renderContent(type: string, content: string, language?: string) {
  switch (type) {
    case "code":
      return (
        <pre className="overflow-x-auto p-3 text-xs font-mono leading-relaxed text-text-primary bg-surface/50 rounded">
          <code>{content}</code>
        </pre>
      )
    case "markdown":
      return (
        <div className="prose prose-sm max-w-none p-3 text-text-primary">
          <pre className="whitespace-pre-wrap text-sm leading-relaxed font-sans">
            {content}
          </pre>
        </div>
      )
    case "table":
      return (
        <div className="overflow-x-auto p-3">
          <div
            className="text-xs text-text-primary [&_table]:w-full [&_table]:border-collapse [&_th]:border [&_th]:border-border/50 [&_th]:bg-surface/50 [&_th]:px-2 [&_th]:py-1 [&_th]:text-left [&_th]:font-medium [&_td]:border [&_td]:border-border/50 [&_td]:px-2 [&_td]:py-1"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      )
    case "image":
      return (
        <div className="p-3">
          <img
            src={content}
            alt={language || "Artifact image"}
            className="rounded-md border border-border/50 max-w-full"
          />
        </div>
      )
    default:
      return null
  }
}

const ArtifactCard = React.forwardRef<HTMLDivElement, ArtifactCardProps>(
  ({ className, type, content, title, language, onCopy, onDownload, defaultExpanded = false, ...props }, ref) => {
    const [expanded, setExpanded] = React.useState(defaultExpanded)

    const typeLabel = type === "code" && language ? language : type

    return (
      <div
        ref={ref}
        className={cn(artifactCardVariants({ type }), className)}
        {...props}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-2 px-3 py-2 border-b border-border/50">
          <div className="flex items-center gap-2 min-w-0">
            {title && (
              <span className="text-sm font-medium text-text-primary truncate">
                {title}
              </span>
            )}
            <Badge variant="outline" className="text-[10px] px-1.5 py-0 shrink-0">
              {typeLabel}
            </Badge>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            {onCopy && (
              <button
                type="button"
                onClick={onCopy}
                className="text-xs text-text-tertiary hover:text-text-primary transition-colors px-1.5 py-0.5 rounded hover:bg-surface-hover"
                aria-label="Copy content"
              >
                Copy
              </button>
            )}
            {onDownload && (
              <button
                type="button"
                onClick={onDownload}
                className="text-xs text-text-tertiary hover:text-text-primary transition-colors px-1.5 py-0.5 rounded hover:bg-surface-hover"
                aria-label="Download content"
              >
                Download
              </button>
            )}
            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              className="text-xs text-text-tertiary hover:text-text-primary transition-colors px-1.5 py-0.5 rounded hover:bg-surface-hover"
              aria-label={expanded ? "Collapse" : "Expand"}
            >
              {expanded ? "Collapse" : "Expand"}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className={cn(!expanded && "max-h-32 overflow-hidden relative")}>
          {renderContent(type, content, language)}
          {!expanded && (
            <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-surface/80 to-transparent pointer-events-none" />
          )}
        </div>
      </div>
    )
  }
)
ArtifactCard.displayName = "ArtifactCard"

export { ArtifactCard, artifactCardVariants }
