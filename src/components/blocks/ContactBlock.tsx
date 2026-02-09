import { useState } from "react"
import { Button } from "../ui/Button"
import { Input } from "../ui/Input"
import { Textarea } from "../ui/Textarea"
import { Typography } from "../ui/Typography"
import { Field, FieldContent, FieldLabel } from "../ui/Field"
import { CheckIcon } from "../ui/icons/check"
import { Spinner } from "../ui/Spinner"
import { cn } from "../../lib/utils"

interface ContactBlockProps {
  onSubmit?: (data: { name: string; email: string; message: string }) => void
  title?: string
  description?: string
  className?: string
}

export function ContactBlock({
  onSubmit,
  title = "Get in touch",
  description = "Have a question or want to work together? Drop us a message.",
  className,
}: ContactBlockProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !message.trim()) return

    setStatus("loading")
    try {
      await onSubmit?.({ name, email, message })
    } catch {
      // Allow parent to handle errors
    }
    // Simulate success for demo
    setTimeout(() => {
      setStatus("success")
      setTimeout(() => {
        setStatus("idle")
        setName("")
        setEmail("")
        setMessage("")
      }, 2000)
    }, 800)
  }

  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="mx-auto max-w-lg px-6">
        <div className="mb-8 text-center">
          <Typography variant="h2" className="text-text-primary">
            {title}
          </Typography>
          <Typography variant="body" className="mt-2 text-text-secondary">
            {description}
          </Typography>
        </div>

        <div className="glass-panel rounded-xl border border-border/50 p-6 sm:p-8">
          {status === "success" ? (
            <div className="flex flex-col items-center gap-3 py-8 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success/10 text-success">
                <CheckIcon size={24} />
              </div>
              <Typography variant="h4" className="text-text-primary">
                Message sent
              </Typography>
              <Typography variant="body" className="text-text-secondary">
                We'll get back to you soon.
              </Typography>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <Field>
                <FieldLabel>Name</FieldLabel>
                <FieldContent>
                  <Input
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </FieldContent>
              </Field>

              <Field>
                <FieldLabel>Email</FieldLabel>
                <FieldContent>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </FieldContent>
              </Field>

              <Field>
                <FieldLabel>Message</FieldLabel>
                <FieldContent>
                  <Textarea
                    placeholder="Tell us what you need..."
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </FieldContent>
              </Field>

              <Button
                type="submit"
                className="w-full"
                variant="accent"
                disabled={status === "loading"}
              >
                {status === "loading" ? (
                  <>
                    <Spinner className="mr-2 h-4 w-4" />
                    Sending...
                  </>
                ) : (
                  "Send message"
                )}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
