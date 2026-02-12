'use client'

import { Typography } from "../ui/Typography"
import { Progress } from "../ui/Progress"
import { Checkbox } from "../ui/Checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card"
import { CheckIcon } from "../ui/icons/check"
import { cn } from "../../lib/utils"

interface OnboardingStep {
  id: string
  title: string
  description: string
  completed: boolean
}

interface OnboardingBlockProps {
  steps?: OnboardingStep[]
  title?: string
  onToggle?: (id: string, completed: boolean) => void
  className?: string
}

const defaultSteps: OnboardingStep[] = [
  { id: "account", title: "Create your account", description: "Sign up and verify your email address.", completed: true },
  { id: "profile", title: "Complete your profile", description: "Add your name, avatar, and bio.", completed: true },
  { id: "team", title: "Invite your team", description: "Add collaborators to your workspace.", completed: false },
  { id: "project", title: "Create first project", description: "Set up your first design system project.", completed: false },
  { id: "deploy", title: "Deploy to production", description: "Publish your component library.", completed: false },
]

export function OnboardingBlock({
  steps = defaultSteps,
  title = "Getting started",
  onToggle,
  className,
}: OnboardingBlockProps) {
  const completedCount = steps.filter((s) => s.completed).length
  const progressPercent = steps.length > 0 ? Math.round((completedCount / steps.length) * 100) : 0

  return (
    <Card className={cn("w-full max-w-lg", className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-text-primary">{title}</CardTitle>
          <Typography variant="small" className="text-text-tertiary tabular-nums">
            {completedCount}/{steps.length}
          </Typography>
        </div>
        <Progress value={progressPercent} className="mt-3" />
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {steps.map((step) => (
            <li key={step.id} className="flex items-start gap-3">
              <div className="pt-0.5">
                {step.completed ? (
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-success text-white">
                    <CheckIcon size={12} />
                  </div>
                ) : (
                  <Checkbox
                    checked={step.completed}
                    onCheckedChange={(checked) =>
                      onToggle?.(step.id, checked === true)
                    }
                  />
                )}
              </div>
              <div className="flex-1">
                <Typography
                  variant="small"
                  className={cn(
                    "font-medium",
                    step.completed ? "text-text-tertiary line-through" : "text-text-primary"
                  )}
                >
                  {step.title}
                </Typography>
                <Typography variant="muted" className="text-xs">
                  {step.description}
                </Typography>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
