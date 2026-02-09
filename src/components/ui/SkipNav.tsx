import * as React from 'react'
import { cn } from '../../lib/utils'

export function SkipNav({ className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      href="#main-content"
      className={cn(
        'sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-max focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2',
        className
      )}
      {...props}
    >
      Skip to content
    </a>
  )
}
