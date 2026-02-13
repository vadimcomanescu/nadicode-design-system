'use client'

import { Timeline } from "../ui/Timeline"
import { Avatar, AvatarFallback } from "../ui/Avatar"
import { Typography } from "../ui/Typography"
import { ScrollFadeIn } from "../ui/ScrollFadeIn"
import { cn } from "../../lib/utils"

interface Activity {
  id: string
  user: string
  action: string
  timestamp: string
  avatar?: string
}

interface ActivityFeedBlockProps {
  activities?: Activity[]
  title?: string
  className?: string
}

const defaultActivities: Activity[] = [
  { id: "1", user: "Nadia", action: "deployed v2.1.0 to production", timestamp: "2 min ago" },
  { id: "2", user: "Alex", action: "merged PR 142 into main", timestamp: "15 min ago" },
  { id: "3", user: "Jordan", action: "commented on issue #87", timestamp: "1 hour ago" },
  { id: "4", user: "Sam", action: "created branch feature/aurora-effect", timestamp: "3 hours ago" },
  { id: "5", user: "Riley", action: "updated the design tokens", timestamp: "5 hours ago" },
]

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

export function ActivityFeedBlock({
  activities = defaultActivities,
  title = "Recent activity",
  className,
}: ActivityFeedBlockProps) {
  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="mx-auto max-w-2xl px-6">
        {title && (
          <ScrollFadeIn>
            <Typography variant="h2" className="mb-8 text-text-primary">
              {title}
            </Typography>
          </ScrollFadeIn>
        )}

        <ScrollFadeIn delay={0.1}>
          <Timeline
            items={activities.map((activity) => ({
              icon: (
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-[10px]">
                    {getInitials(activity.user)}
                  </AvatarFallback>
                </Avatar>
              ),
              title: activity.user,
              description: activity.action,
              timestamp: activity.timestamp,
            }))}
          />
        </ScrollFadeIn>
      </div>
    </section>
  )
}
