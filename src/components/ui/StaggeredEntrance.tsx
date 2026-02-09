import * as React from 'react'
import { cn } from '../../lib/utils'

interface StaggeredEntranceProps {
  children: React.ReactNode
  className?: string
  delayMs?: number
}

export function StaggeredEntrance({ children, className, delayMs = 50 }: StaggeredEntranceProps) {
  return (
    <div className={cn('contents', className)}>
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child
        return (
          <div
            style={{ '--stagger-index': index } as React.CSSProperties}
            className="animate-fade-in-up opacity-0 [animation-fill-mode:backwards]"
            key={child.key ?? index}
          >
            {React.cloneElement(child as React.ReactElement<{ style?: React.CSSProperties }>, {
              style: {
                ...(child.props as { style?: React.CSSProperties }).style,
                animationDelay: `calc(var(--stagger-index) * ${delayMs}ms)`,
              },
            })}
          </div>
        )
      })}
    </div>
  )
}
