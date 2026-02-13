'use client'

import { motion } from "motion/react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "../ui/Card"
import { Alert, AlertDescription } from "../ui/Alert"
import { Button } from "../ui/Button"
import { LockIcon } from "../ui/icons/lock"
import { scaleIn } from "../../lib/motion"
import { cn } from "../../lib/utils"

interface AccountLockedBlockProps {
  className?: string
  reason?: "too_many_attempts" | "suspicious_activity" | "admin"
  unlockMinutes?: number
  onContactSupport?: () => void
  onBackToLogin?: () => void
}

const reasonMessages = {
  too_many_attempts: (minutes?: number) =>
    `Too many failed login attempts.${minutes ? ` Try again in ${minutes} minutes.` : ""}`,
  suspicious_activity: () =>
    "We detected unusual activity on your account.",
  admin: () =>
    "Your account has been locked by an administrator.",
}

export function AccountLockedBlock({
  className,
  reason = "too_many_attempts",
  unlockMinutes,
  onContactSupport,
  onBackToLogin,
}: AccountLockedBlockProps) {
  return (
    <motion.div {...scaleIn} className={cn("w-full max-w-md mx-auto", className)}>
      <Card>
        <CardHeader className="text-center">
          <motion.div
            className="mx-auto mb-2"
            initial={{ x: 0 }}
            animate={{ x: [0, -4, 4, -4, 4, 0] }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 shadow-[0_0_24px_rgb(var(--color-destructive)/0.2)]">
              <LockIcon size={32} className="text-destructive" />
            </div>
          </motion.div>
          <CardTitle className="text-2xl">Account locked</CardTitle>
          <CardDescription>
            Your account has been temporarily locked for security
          </CardDescription>
        </CardHeader>

        <CardContent className="grid gap-4">
          <Alert variant="warning">
            <AlertDescription>
              {reasonMessages[reason](unlockMinutes)}
            </AlertDescription>
          </Alert>

          {reason === "too_many_attempts" && unlockMinutes && (
            <p className="text-center text-sm text-text-tertiary">
              Your account will be automatically unlocked after the waiting period.
            </p>
          )}

          {(reason === "suspicious_activity" || reason === "admin") && (
            <p className="text-center text-sm text-text-tertiary">
              Please contact support to regain access to your account.
            </p>
          )}

          <Button variant="outline" className="w-full" onClick={onContactSupport}>
            Contact support
          </Button>
        </CardContent>

        <CardFooter className="justify-center">
          <button
            type="button"
            onClick={onBackToLogin}
            className="text-sm text-text-tertiary hover:text-text-primary transition-colors"
          >
            Back to login
          </button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
