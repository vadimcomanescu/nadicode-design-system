import * as React from "react"
import { motion } from "motion/react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/Card"
import { Input } from "../ui/Input"
import { Label } from "../ui/Label"
import { Button } from "../ui/Button"
import { Alert, AlertDescription } from "../ui/Alert"
import { Separator } from "../ui/Separator"
import { Spinner } from "../ui/Spinner"
import { SparklesIcon } from "../ui/icons/sparkles"
import { CheckIcon } from "../ui/icons/check"
import { MailIcon } from "../ui/icons/mail"
import { scaleIn } from "../../lib/motion"
import { cn } from "../../lib/utils"

interface MagicLinkBlockProps {
  className?: string
  onSubmit?: (email: string) => void
  onBackToLogin?: () => void
}

export function MagicLinkBlock({
  className,
  onSubmit,
  onBackToLogin,
}: MagicLinkBlockProps) {
  const [email, setEmail] = React.useState("")
  const [state, setState] = React.useState<"idle" | "loading" | "success">("idle")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setState("loading")
    onSubmit?.(email)
    setTimeout(() => setState("success"), 1500)
  }

  if (state === "success") {
    return (
      <motion.div {...scaleIn} className={cn("w-full max-w-sm mx-auto", className)}>
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-2">
              <MailIcon size={48} className="text-accent" />
            </div>
            <CardTitle className="text-2xl">Check your email</CardTitle>
            <CardDescription>
              We sent a magic link to <span className="font-mono text-text-primary">{email}</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <ul className="space-y-2 text-sm text-text-secondary">
              <li className="flex items-start gap-2">
                <CheckIcon size={16} className="text-success mt-0.5 shrink-0" />
                <span>Click the link in the email to sign in</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckIcon size={16} className="text-success mt-0.5 shrink-0" />
                <span>The link expires in 15 minutes</span>
              </li>
            </ul>
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
          <div className="mx-auto mb-2">
            <SparklesIcon size={32} className="text-accent" />
          </div>
          <CardTitle className="text-2xl">Sign in with magic link</CardTitle>
          <CardDescription>No password needed</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="magic-email">Email</Label>
              <Input
                id="magic-email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>

            <Alert>
              <AlertDescription className="text-xs text-text-tertiary">
                We{"'"}ll send you a link that expires in 15 minutes.
              </AlertDescription>
            </Alert>

            <Button variant="accent" className="w-full" disabled={state === "loading"}>
              {state === "loading" ? (
                <>
                  <Spinner className="mr-2" />
                  Sending...
                </>
              ) : (
                "Send magic link"
              )}
            </Button>
          </form>

          <Separator className="my-4" />

          <div className="text-center">
            <button
              type="button"
              onClick={onBackToLogin}
              className="text-sm text-text-tertiary hover:text-text-primary transition-colors"
            >
              Prefer password? Sign in normally
            </button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
