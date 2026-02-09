import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'

const statusDotVariants = cva(
  'inline-block rounded-full shrink-0',
  {
    variants: {
      status: {
        online: 'bg-success animate-pulse',
        offline: 'bg-muted-foreground',
        busy: 'bg-warning',
        dnd: 'bg-destructive',
      },
      size: {
        sm: 'size-2',
        md: 'size-2.5',
        lg: 'size-3',
      },
    },
    defaultVariants: {
      status: 'offline',
      size: 'md',
    },
  }
)

export interface StatusDotProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof statusDotVariants> {}

export function StatusDot({ className, status, size, ...props }: StatusDotProps) {
  return (
    <span
      role="status"
      aria-label={status ?? 'offline'}
      className={cn(statusDotVariants({ status, size, className }))}
      {...props}
    />
  )
}
