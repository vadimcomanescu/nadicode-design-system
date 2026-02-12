'use client'

import * as React from "react"
import { motion } from "motion/react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/Card"
import { Input } from "../ui/Input"
import { Label } from "../ui/Label"
import { Button } from "../ui/Button"
import { Badge } from "../ui/Badge"
import { Separator } from "../ui/Separator"
import { Spinner } from "../ui/Spinner"
import { MailIcon } from "../ui/icons/mail"
import { SparklesIcon } from "../ui/icons/sparkles"
import { CheckIcon } from "../ui/icons/check"
import { scaleIn, fadeInUp } from "../../lib/motion"
import { cn } from "../../lib/utils"

interface PasswordRecoveryBlockProps {
  className?: string
  mode?: "reset" | "magic-link"
  onSubmit?: (email: string) => void
  onBackToLogin?: () => void
}

const CONFIG = {
  reset: {
    icon: <MailIcon size={32} className="text-text-secondary" />,
    title: "Forgot password?",
    description: "Enter your email to reset your password",
    buttonText: "Send reset link",
    loadingText: "Sending...",
    successTitle: "Check your email",
    successDescription: "We sent a password reset link to",
    instructions: [
      "Check your inbox for the email",
      "Click the link to reset your password",
      "Check your spam folder if you don't see it",
    ],
  },
  "magic-link": {
    icon: <SparklesIcon size={32} className="text-accent" />,
    title: "Sign in with magic link",
    description: "No password needed",
    buttonText: "Send magic link",
    loadingText: "Sending...",
    successTitle: "Check your email",
    successDescription: "We sent a magic link to",
    instructions: [
      "Click the link in the email to sign in",
      "The link expires in 15 minutes",
      "Check your spam folder if you don't see it",
    ],
  },
}

export function PasswordRecoveryBlock({
  className,
  mode = "reset",
  onSubmit,
  onBackToLogin,
}: PasswordRecoveryBlockProps) {
  const [email, setEmail] = React.useState("")
  const [state, setState] = React.useState<"entry" | "loading" | "success">("entry")
  const [resendState, setResendState] = React.useState<"idle" | "sending" | "sent">("idle")
  const config = CONFIG[mode]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setState("loading")
    onSubmit?.(email)
    setTimeout(() => setState("success"), 1500)
  }

  const handleResend = () => {
    setResendState("sending")
    onSubmit?.(email)
    setTimeout(() => {
      setResendState("sent")
      setTimeout(() => setResendState("idle"), 3000)
    }, 1000)
  }

  if (state === "success") {
    return (
      <motion.div {...fadeInUp} className={cn("w-full max-w-sm mx-auto", className)}>
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-2">
              <MailIcon size={48} className="text-accent" />
            </div>
            <CardTitle className="text-2xl">{config.successTitle}</CardTitle>
            <CardDescription>{config.successDescription}</CardDescription>
          </CardHeader>

          <CardContent className="grid gap-4">
            <div className="flex justify-center">
              <Badge variant="outline" className="font-mono text-xs">
                {email}
              </Badge>
            </div>

            <ol className="space-y-2 text-sm text-text-secondary list-none">
              {config.instructions.map((step, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckIcon size={16} className="text-success mt-0.5 shrink-0" />
                  <span>{step}</span>
                </li>
              ))}
            </ol>

            <Separator />

            <div className="text-center space-y-2">
              <p className="text-sm text-text-tertiary">Didn{"'"}t receive the email?</p>
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

  return (
    <motion.div {...scaleIn} className={cn("w-full max-w-sm mx-auto", className)}>
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto mb-2">{config.icon}</div>
          <CardTitle className="text-2xl">{config.title}</CardTitle>
          <CardDescription>{config.description}</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="recovery-email">Email</Label>
              <Input
                id="recovery-email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>
            <Button variant="accent" className="w-full" disabled={state === "loading"}>
              {state === "loading" ? (
                <>
                  <Spinner className="mr-2" />
                  {config.loadingText}
                </>
              ) : (
                config.buttonText
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="justify-center">
          <button
            type="button"
            onClick={onBackToLogin}
            className="text-sm text-text-tertiary hover:text-text-primary transition-colors"
          >
            {mode === "magic-link" ? "Prefer password? Sign in normally" : "Back to login"}
          </button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
