'use client'

import * as React from "react"
import { motion } from "motion/react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/Card"
import { Input } from "../ui/Input"
import { Label } from "../ui/Label"
import { Button } from "../ui/Button"
import { Spinner } from "../ui/Spinner"
import { MailIcon } from "../ui/icons/mail"
import { CheckIcon } from "../ui/icons/check"
import { scaleIn } from "../../lib/motion"
import { cn } from "../../lib/utils"

interface ForgotPasswordBlockProps {
  className?: string
  onSubmit?: (email: string) => void
  onBackToLogin?: () => void
}

export function ForgotPasswordBlock({
  className,
  onSubmit,
  onBackToLogin,
}: ForgotPasswordBlockProps) {
  const [email, setEmail] = React.useState("")
  const [state, setState] = React.useState<"idle" | "loading" | "success">("idle")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setState("loading")
    onSubmit?.(email)
    setTimeout(() => setState("success"), 1500)
  }

  return (
    <motion.div {...scaleIn} className={cn("w-full max-w-sm mx-auto", className)}>
      <Card>
        <CardHeader className="text-center">
          {state === "success" ? (
            <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-success/10 shadow-[0_0_24px_rgba(61,214,140,0.2)]">
              <CheckIcon size={32} className="text-success" />
            </div>
          ) : (
            <div className="mx-auto mb-2">
              <MailIcon size={32} className="text-text-secondary" />
            </div>
          )}
          <CardTitle className="text-2xl">
            {state === "success" ? "Email sent" : "Forgot password?"}
          </CardTitle>
          <CardDescription>
            {state === "success"
              ? `We sent a reset link to ${email}`
              : "Enter your email to reset your password"}
          </CardDescription>
        </CardHeader>

        {state !== "success" && (
          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="forgot-email">Email</Label>
                <Input
                  id="forgot-email"
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
                    Sending...
                  </>
                ) : (
                  "Send reset link"
                )}
              </Button>
            </form>
          </CardContent>
        )}

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
