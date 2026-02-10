import { Button } from "../ui/Button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/Card"
import { motion } from "motion/react"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "../ui/InputOTP"

export function OTPBlock() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
    <Card className="mx-auto max-w-sm text-center text-text-primary">
      <CardHeader>
        <CardTitle className="text-2xl">One-Time Password</CardTitle>
        <CardDescription>
          Please enter the one-time password sent to your phone.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 justify-center">
        <InputOTP maxLength={6}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        <Button className="w-full">Verify</Button>
      </CardContent>
    </Card>
    </motion.div>
  )
}
