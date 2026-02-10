import * as React from "react"
import { motion } from "motion/react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "../ui/Card"
import { PasswordInput } from "../ui/PasswordInput"
import { Label } from "../ui/Label"
import { Button } from "../ui/Button"
import { Spinner } from "../ui/Spinner"
import { KeyIcon } from "../ui/icons/key"
import { CheckIcon } from "../ui/icons/check"
import { XIcon } from "../ui/icons/x"
import { scaleIn } from "../../lib/motion"
import { cn } from "../../lib/utils"

interface ResetPasswordBlockProps {
  className?: string
  onSubmit?: (password: string) => void
  onBackToLogin?: () => void
}

const rules = [
  { label: "At least 8 characters", test: (v: string) => v.length >= 8 },
  { label: "One uppercase letter", test: (v: string) => /[A-Z]/.test(v) },
  { label: "One number", test: (v: string) => /\d/.test(v) },
  { label: "One special character", test: (v: string) => /[^A-Za-z0-9]/.test(v) },
]

export function ResetPasswordBlock({
  className,
  onSubmit,
  onBackToLogin,
}: ResetPasswordBlockProps) {
  const [password, setPassword] = React.useState("")
  const [confirm, setConfirm] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState("")

  const allRulesPass = rules.every((r) => r.test(password))
  const passwordsMatch = password === confirm && confirm.length > 0

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!allRulesPass) return
    if (!passwordsMatch) {
      setError("Passwords do not match")
      return
    }
    setError("")
    setLoading(true)
    onSubmit?.(password)
  }

  return (
    <motion.div {...scaleIn} className={cn("w-full max-w-sm mx-auto", className)}>
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto mb-2">
            <KeyIcon size={32} className="text-text-secondary" />
          </div>
          <CardTitle className="text-2xl">Set new password</CardTitle>
          <CardDescription>Your new password must be different from previous passwords</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="new-password">New password</Label>
              <PasswordInput
                id="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                autoComplete="new-password"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="confirm-password">Confirm password</Label>
              <PasswordInput
                id="confirm-password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Confirm new password"
                autoComplete="new-password"
              />
            </div>

            <ul className="space-y-1.5 text-xs" aria-label="Password requirements">
              {rules.map((rule) => {
                const pass = rule.test(password)
                return (
                  <li key={rule.label} className="flex items-center gap-2">
                    {pass ? (
                      <CheckIcon size={14} className="text-success shrink-0" />
                    ) : (
                      <XIcon size={14} className="text-text-tertiary shrink-0" />
                    )}
                    <span className={pass ? "text-success" : "text-text-tertiary"}>
                      {rule.label}
                    </span>
                  </li>
                )
              })}
              <li className="flex items-center gap-2">
                {passwordsMatch ? (
                  <CheckIcon size={14} className="text-success shrink-0" />
                ) : (
                  <XIcon size={14} className="text-text-tertiary shrink-0" />
                )}
                <span className={passwordsMatch ? "text-success" : "text-text-tertiary"}>
                  Passwords match
                </span>
              </li>
            </ul>

            {error && <p className="text-xs font-medium text-destructive">{error}</p>}

            <Button
              variant="accent"
              className="w-full"
              disabled={loading || !allRulesPass || !passwordsMatch}
            >
              {loading ? (
                <>
                  <Spinner className="mr-2" />
                  Resetting...
                </>
              ) : (
                "Reset password"
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
            Back to login
          </button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
