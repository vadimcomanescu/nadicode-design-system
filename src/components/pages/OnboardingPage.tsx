import { useState } from "react"
import { motion } from "motion/react"
import { motionSpring } from "../../lib/motion"
import { FormWizard } from "../ui/FormWizard"
import { Typography } from "../ui/Typography"
import { Input } from "../ui/Input"
import { Textarea } from "../ui/Textarea"
import { Label } from "../ui/Label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/Select"
import { Button } from "../ui/Button"
import { CheckIcon } from "../ui/icons/check"
import { RocketIcon } from "../ui/icons/rocket"

export function OnboardingPage() {
  const [completed, setCompleted] = useState(false)

  if (completed) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-background px-6">
        <motion.div
          className="text-center space-y-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={motionSpring.snappy}
        >
          <motion.div
            className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-success"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ...motionSpring.bouncy, delay: 0.15 }}
          >
            <CheckIcon size={32} />
          </motion.div>
          <Typography variant="h2" className="text-text-primary">
            You're all set!
          </Typography>
          <Typography variant="body" className="text-text-secondary max-w-sm mx-auto">
            Your workspace is ready. Start building something great.
          </Typography>
          <Button variant="accent" size="lg" onClick={() => setCompleted(false)}>
            <RocketIcon size={16} className="mr-2" />
            Go to Dashboard
          </Button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="flex min-h-dvh items-center justify-center bg-background px-6 py-12">
      <motion.div
        className="w-full max-w-2xl"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={motionSpring.snappy}
      >
        <div className="mb-8 text-center">
          <Typography variant="h2" className="text-text-primary">
            Welcome to Nadicode
          </Typography>
          <Typography variant="body" className="mt-2 text-text-secondary">
            Let's get your workspace set up in a few steps.
          </Typography>
        </div>

        <FormWizard
          variant="card"
          onComplete={() => setCompleted(true)}
          steps={[
            {
              id: "welcome",
              title: "Welcome",
              description: "Get started",
              content: (
                <div className="space-y-4 py-4 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <RocketIcon size={24} />
                  </div>
                  <Typography variant="h3" className="text-text-primary">
                    Ready to launch?
                  </Typography>
                  <Typography variant="body" className="text-text-secondary max-w-md mx-auto">
                    We'll walk you through setting up your profile, preferences, and first project. It only takes a minute.
                  </Typography>
                </div>
              ),
            },
            {
              id: "profile",
              title: "Profile",
              description: "Your details",
              content: (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Display Name</Label>
                    <Input placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label>Organization</Label>
                    <Input placeholder="Acme Inc." />
                  </div>
                  <div className="space-y-2">
                    <Label>Bio</Label>
                    <Textarea placeholder="Tell us about yourself..." rows={3} />
                  </div>
                </div>
              ),
            },
            {
              id: "preferences",
              title: "Preferences",
              description: "Customize",
              content: (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Primary Framework</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select framework" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="react">React</SelectItem>
                        <SelectItem value="next">Next.js</SelectItem>
                        <SelectItem value="vue">Vue</SelectItem>
                        <SelectItem value="svelte">Svelte</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Team Size</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="solo">Just me</SelectItem>
                        <SelectItem value="small">2-10</SelectItem>
                        <SelectItem value="medium">11-50</SelectItem>
                        <SelectItem value="large">50+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Primary Use Case</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select use case" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="saas">SaaS Application</SelectItem>
                        <SelectItem value="dashboard">Admin Dashboard</SelectItem>
                        <SelectItem value="marketing">Marketing Site</SelectItem>
                        <SelectItem value="ecommerce">E-commerce</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              ),
            },
            {
              id: "complete",
              title: "Complete",
              content: (
                <div className="text-center py-8 space-y-2">
                  <Typography variant="h3" className="text-text-primary">
                    All set!
                  </Typography>
                  <Typography variant="muted">
                    Review your details and click Complete to launch your workspace.
                  </Typography>
                </div>
              ),
            },
          ]}
        />
      </motion.div>
    </div>
  )
}
