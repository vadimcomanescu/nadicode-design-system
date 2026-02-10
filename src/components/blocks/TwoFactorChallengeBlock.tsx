import * as React from "react"
import { motion } from "motion/react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/Card"
import { Button } from "../ui/Button"
import { Alert, AlertDescription } from "../ui/Alert"
import { Separator } from "../ui/Separator"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/InputOTP"
import { ShieldCheckIcon } from "../ui/icons/shield-check"
import { scaleIn } from "../../lib/motion"
import { cn } from "../../lib/utils"

interface TwoFactorChallengeBlockProps {
  className?: string
  onVerify?: (code: string) => void
  onUseBackupCode?: () => void
  onBackToLogin?: () => void
  error?: string
}

export function TwoFactorChallengeBlock({
  className,
  onVerify,
  onUseBackupCode,
  onBackToLogin,
  error,
}: TwoFactorChallengeBlockProps) {
  const [code, setCode] = React.useState("")
  const [shake, setShake] = React.useState(false)

  React.useEffect(() => {
    if (error) {
      setShake(true)
      setCode("")
      const timeout = setTimeout(() => setShake(false), 300)
      return () => clearTimeout(timeout)
    }
  }, [error])

  const handleComplete = (value: string) => {
    setCode(value)
    if (value.length === 6) {
      onVerify?.(value)
    }
  }

  return (
    <motion.div {...scaleIn} className={cn("w-full max-w-sm mx-auto", className)}>
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto mb-2">
            <ShieldCheckIcon size={32} className="text-text-secondary" />
          </div>
          <CardTitle className="text-2xl">Two-factor authentication</CardTitle>
          <CardDescription>
            Enter the 6-digit code from your authenticator app
          </CardDescription>
        </CardHeader>

        <CardContent className="grid gap-4">
          <motion.div
            className="flex justify-center"
            animate={shake ? { x: [-4, 4, -4, 4, 0] } : {}}
            transition={{ duration: 0.3 }}
          >
            <InputOTP
              maxLength={6}
              value={code}
              onChange={handleComplete}
              autoFocus
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </motion.div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Separator />

          <div className="text-center">
            <button
              type="button"
              onClick={onUseBackupCode}
              className="text-sm text-accent hover:text-accent/80 transition-colors"
            >
              Use a backup code
            </button>
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
