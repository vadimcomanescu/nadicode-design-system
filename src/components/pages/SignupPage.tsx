import { LoginBlock } from "../blocks/LoginBlock"

export function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <LoginBlock type="signup" />
    </div>
  )
}
