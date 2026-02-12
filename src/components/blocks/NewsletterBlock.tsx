import { useState } from "react"
import { Button } from "../ui/Button"
import { Input } from "../ui/Input"
import { Typography } from "../ui/Typography"
import { CheckIcon } from "../ui/icons/check"
import { Spinner } from "../ui/Spinner"
import { cn } from "../../lib/utils"
import { ScrollFadeIn } from "../ui/ScrollFadeIn"
import { Shine } from "@/components/animate-ui/primitives/effects/shine"

interface NewsletterBlockProps {
  onSubscribe?: (email: string) => void
  title?: string
  description?: string
  className?: string
}

export function NewsletterBlock({
  onSubscribe,
  title = "Stay in the loop",
  description = "Get notified about new components, updates, and design system tips. No spam.",
  className,
}: NewsletterBlockProps) {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    setStatus("loading")
    try {
      await onSubscribe?.(email)
    } catch {
      // Allow parent to handle errors
    }
    setTimeout(() => {
      setStatus("success")
      setTimeout(() => {
        setStatus("idle")
        setEmail("")
      }, 3000)
    }, 600)
  }

  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="mx-auto max-w-xl px-6">
        <ScrollFadeIn>
        <Shine enableOnHover loop loopDelay={300} color="var(--color-accent)" opacity={0.1}>
        <div className="glass-panel rounded-2xl border border-border/50 p-8 text-center sm:p-12">
          <Typography variant="h2" className="text-text-primary">
            {title}
          </Typography>
          <Typography variant="body" className="mt-3 text-text-secondary">
            {description}
          </Typography>

          {status === "success" ? (
            <div className="mt-8 flex items-center justify-center gap-2 text-success">
              <CheckIcon size={20} />
              <span className="text-sm font-medium">You{"'"}re subscribed!</span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1"
              />
              <Button
                type="submit"
                variant="accent"
                disabled={status === "loading"}
                className="shrink-0"
              >
                {status === "loading" ? (
                  <Spinner className="h-4 w-4" />
                ) : (
                  "Subscribe"
                )}
              </Button>
            </form>
          )}

          <Typography variant="small" className="mt-4 text-text-tertiary">
            Unsubscribe anytime. We respect your inbox.
          </Typography>
        </div>
        </Shine>
        </ScrollFadeIn>
      </div>
    </section>
  )
}
