'use client'

import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { XIcon } from "@/components/ui/icons"
import { BellIcon } from "./icons/bell"

const notificationVariants = cva(
  "flex gap-3 rounded-lg border p-3 transition-all",
  {
    variants: {
      type: {
        default: "border-border bg-surface",
        info: "border-info/20 bg-info/5",
        success: "border-success/20 bg-success/5",
        warning: "border-warning/20 bg-warning/5",
        error: "border-destructive/20 bg-destructive/5",
      },
    },
    defaultVariants: {
      type: "default",
    },
  }
)

export interface Notification {
  id: string
  title: string
  description?: string
  type?: "default" | "info" | "success" | "warning" | "error"
  timestamp?: string
  read?: boolean
}

export interface NotificationCenterProps
  extends React.HTMLAttributes<HTMLDivElement> {
  notifications: Notification[]
  /** Called when a notification is dismissed */
  onDismiss?: (id: string) => void
  /** Called when a notification is clicked */
  onNotificationClick?: (notification: Notification) => void
  /** Empty state message */
  emptyMessage?: string
}

const NotificationCenter = React.forwardRef<HTMLDivElement, NotificationCenterProps>(
  (
    {
      className,
      notifications,
      onDismiss,
      onNotificationClick,
      emptyMessage = "No notifications",
      ...props
    },
    ref
  ) => {
    const unreadCount = notifications.filter((n) => !n.read).length

    return (
      <div
        ref={ref}
        className={cn("flex flex-col rounded-xl border border-border bg-surface", className)}
        role="region"
        aria-label="Notification center"
        {...props}
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="flex items-center gap-2">
            <BellIcon size={16} className="text-text-secondary" />
            <span className="text-sm font-medium text-text-primary">Notifications</span>
            {unreadCount > 0 && (
              <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1.5 text-[10px] font-bold text-accent-foreground">
                {unreadCount}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col divide-y divide-border overflow-y-auto max-h-[400px]">
          {notifications.length === 0 ? (
            <div className="flex items-center justify-center py-8 text-sm text-text-tertiary">
              {emptyMessage}
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={cn(
                  notificationVariants({ type: notification.type }),
                  "m-2 cursor-pointer hover:bg-surface-hover",
                  !notification.read && "ring-1 ring-accent/10"
                )}
                onClick={() => onNotificationClick?.(notification)}
                role="article"
              >
                <div className="flex-1 min-w-0">
                  <p className={cn(
                    "text-sm",
                    notification.read ? "text-text-secondary" : "font-medium text-text-primary"
                  )}>
                    {notification.title}
                  </p>
                  {notification.description && (
                    <p className="text-xs text-text-tertiary mt-0.5 line-clamp-2">
                      {notification.description}
                    </p>
                  )}
                  {notification.timestamp && (
                    <p className="text-[10px] text-text-tertiary mt-1">
                      {notification.timestamp}
                    </p>
                  )}
                </div>
                {onDismiss && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onDismiss(notification.id)
                    }}
                    className="shrink-0 rounded p-0.5 text-text-tertiary hover:text-text-primary hover:bg-surface-hover transition-colors"
                    aria-label={`Dismiss notification: ${notification.title}`}
                  >
                    <XIcon size={14} />
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    )
  }
)
NotificationCenter.displayName = "NotificationCenter"

export { NotificationCenter, notificationVariants }
