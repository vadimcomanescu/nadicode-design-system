/* eslint-disable react-refresh/only-export-components */
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/utils'
import { XIcon } from './icons/x'

export const bannerVariants = cva(
  'relative flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium',
  {
    variants: {
      variant: {
        info: 'bg-info text-info-foreground',
        warning: 'bg-warning text-warning-foreground',
        success: 'bg-success text-success-foreground',
        accent: 'bg-accent text-accent-foreground',
      },
    },
    defaultVariants: {
      variant: 'accent',
    },
  }
)

interface AnnouncementBannerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof bannerVariants> {
  storageKey?: string
}

export function AnnouncementBanner({
  className,
  variant,
  storageKey = 'announcement-dismissed',
  children,
  ...props
}: AnnouncementBannerProps) {
  const [dismissed, setDismissed] = React.useState(() => {
    if (typeof window === 'undefined') return false
    return localStorage.getItem(storageKey) === 'true'
  })

  if (dismissed) return null

  return (
    <div className={cn(bannerVariants({ variant, className }))} role="banner" {...props}>
      <span className="text-pretty">{children}</span>
      <button
        onClick={() => {
          setDismissed(true)
          localStorage.setItem(storageKey, 'true')
        }}
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-sm p-1 opacity-70 hover:opacity-100 transition-opacity"
        aria-label="Dismiss announcement"
      >
        <XIcon size={16} />
      </button>
    </div>
  )
}
