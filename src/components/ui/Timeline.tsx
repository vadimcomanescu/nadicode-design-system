import * as React from 'react'
import { cn } from '../../lib/utils'

interface TimelineItemProps {
  icon?: React.ReactNode
  timestamp?: string
  title: string
  description?: string
}

export interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  items: TimelineItemProps[]
}

export const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
  ({ className, items, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('relative space-y-0', className)} {...props}>
        {items.map((item, index) => (
          <div key={index} className="relative flex gap-4 pb-8 last:pb-0">
            {/* Connector line */}
            {index < items.length - 1 && (
              <div className="absolute left-[15px] top-8 bottom-0 w-px bg-border" />
            )}

            {/* Icon circle */}
            <div className="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full glass-panel">
              {item.icon ?? (
                <div className="size-2 rounded-full bg-primary" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 pt-0.5">
              <div className="flex items-baseline justify-between gap-2">
                <p className="text-sm font-medium text-text-primary">{item.title}</p>
                {item.timestamp && (
                  <time className="shrink-0 text-xs text-text-tertiary">{item.timestamp}</time>
                )}
              </div>
              {item.description && (
                <p className="mt-1 text-sm text-text-secondary">{item.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    )
  }
)

Timeline.displayName = 'Timeline'
