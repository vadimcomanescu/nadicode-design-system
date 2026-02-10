import * as React from "react"
import { motion } from "motion/react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/Card"
import { Button } from "../ui/Button"
import { Badge } from "../ui/Badge"
import { Separator } from "../ui/Separator"
import { Spinner } from "../ui/Spinner"
import { MailIcon } from "../ui/icons/mail"
import { fadeInUp } from "../../lib/motion"
import { cn } from "../../lib/utils"

interface CheckEmailBlockProps {
  className?: string
  email?: string
  type?: "verification" | "reset" | "magic-link"
  onResend?: () => void
  onBackToLogin?: () => void
}

const titleMap = {
  verification: "Verify your email",
  reset: "Check your email",
  "magic-link": "Check your email",
}

const descMap = {
  verification: "We sent a verification link to your email address.",
  reset: "We sent a password reset link to your email address.",
  "magic-link": "We sent a magic link to your email address.",
}

export function CheckEmailBlock({
  className,
  email,
  type = "verification",
  onResend,
  onBackToLogin,
}: CheckEmailBlockProps) {
  const [resendState, setResendState] = React.useState<"idle" | "sending" | "sent">("idle")

  const handleResend = () => {
    setResendState("sending")
    onResend?.()
    setTimeout(() => {
      setResendState("sent")
      setTimeout(() => setResendState("idle"), 3000)
    }, 1000)
  }

  return (
    <motion.div {...fadeInUp} className={cn("w-full max-w-md mx-auto", className)}>
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto mb-2">
            <MailIcon size={48} className="text-accent" />
          </div>
          <CardTitle className="text-2xl">{titleMap[type]}</CardTitle>
          <CardDescription>{descMap[type]}</CardDescription>
        </CardHeader>

        <CardContent className="grid gap-4">
          {email && (
            <div className="flex justify-center">
              <Badge variant="outline" className="font-mono text-xs">
                {email}
              </Badge>
            </div>
          )}

          <ol className="space-y-2 text-sm text-text-secondary list-none">
            {[
              "Check your inbox for the email",
              "Click the link in the email",
              "Check your spam folder if you don't see it",
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-surface-active text-xs font-medium text-text-tertiary">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>

          <Separator />

          <div className="text-center space-y-2">
            <p className="text-sm text-text-tertiary">Didn't receive the email?</p>
            <Button
              variant="outline"
              size="sm"
              onClick={handleResend}
              disabled={resendState === "sending"}
            >
              {resendState === "sending" && <Spinner className="mr-2" />}
              {resendState === "sent" ? "Email resent!" : "Resend email"}
            </Button>
          </div>
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
