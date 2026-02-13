'use client'

import * as React from "react"
import { motion } from "motion/react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/Card"
import { Button } from "../ui/Button"
import { scaleIn, motionSpring } from "../../lib/motion"
import { cn } from "../../lib/utils"

interface AuthSuccessBlockProps {
  className?: string
  icon: React.ReactNode
  title: string
  description: string
  buttonText?: string
  onContinue?: () => void
  autoRedirectSeconds?: number
}

export function AuthSuccessBlock({
  className,
  icon,
  title,
  description,
  buttonText = "Continue",
  onContinue,
  autoRedirectSeconds,
}: AuthSuccessBlockProps) {
  const [countdown, setCountdown] = React.useState(autoRedirectSeconds ?? 0)

  React.useEffect(() => {
    if (!autoRedirectSeconds) return
    setCountdown(autoRedirectSeconds)
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          onContinue?.()
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [autoRedirectSeconds, onContinue])

  return (
    <motion.div {...scaleIn} className={cn("w-full max-w-sm mx-auto", className)}>
      <Card>
        <CardHeader className="text-center">
          <motion.div
            className="mx-auto mb-2"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={motionSpring.bouncy}
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10 shadow-[0_0_24px_rgb(var(--color-success)/0.2)]">
              {icon}
            </div>
          </motion.div>
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>

        <CardContent className="grid gap-4">
          {autoRedirectSeconds !== undefined && countdown > 0 && (
            <p className="text-center text-sm text-text-tertiary tabular-nums">
              Redirecting in {countdown}...
            </p>
          )}
          <Button variant="accent" className="w-full" onClick={onContinue}>
            {buttonText}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}
