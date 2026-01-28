import { Button } from "../ui/Button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/Card"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "../ui/InputOTP"

export function OTPBlock() {
  return (
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
  )
}
