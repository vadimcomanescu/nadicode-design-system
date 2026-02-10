import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { FlipWords } from "../ui/text-effects"
import { HeroHeader } from "../blocks/HeaderBlock"
import { Footer } from "../blocks/FooterBlock"
import { ComparisonBlock } from "../blocks/ComparisonBlock"
import { FAQBlock } from "../blocks/FAQBlock"
import { Button } from "../ui/Button"
import { Badge } from "../ui/Badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/Card"
import { Typography } from "../ui/Typography"
import { ScrollFadeIn } from "../ui/ScrollFadeIn"
import { CheckIcon } from "../ui/icons/check"
import { cn } from "../../lib/utils"

const plans = [
  {
    name: "Starter",
    description: "For personal projects and learning.",
    monthly: 0,
    yearly: 0,
    period: "forever",
    features: ["50+ components", "Community support", "1 project", "Basic tokens"],
    action: "Get Started",
    variant: "outline" as const,
  },
  {
    name: "Pro",
    description: "For professional developers and teams.",
    monthly: 39,
    yearly: 29,
    period: "month",
    features: ["100+ components", "Priority support", "Unlimited projects", "Custom tokens", "Dark + light themes"],
    action: "Upgrade to Pro",
    variant: "accent" as const,
    popular: true,
  },
  {
    name: "Enterprise",
    description: "Custom solutions for large organizations.",
    monthly: null,
    yearly: null,
    period: "",
    features: ["Everything in Pro", "24/7 dedicated support", "SSO & audit logs", "SLA guarantee", "On-premise option"],
    action: "Contact Sales",
    variant: "outline" as const,
  },
]

const pricingFAQ = [
  { question: "Can I switch plans later?", answer: "Yes, you can upgrade or downgrade at any time. When upgrading, you'll be charged the prorated difference. Downgrades take effect at the end of your billing cycle." },
  { question: "Do you offer refunds?", answer: "We offer a 14-day money-back guarantee on all paid plans. If you're not satisfied, contact support for a full refund." },
  { question: "What payment methods do you accept?", answer: "We accept all major credit cards, PayPal, and wire transfers for Enterprise plans." },
  { question: "Is there a free trial?", answer: "The Starter plan is free forever. For Pro, you can try all features for 14 days before committing." },
]

export function PricingPage() {
  const [isYearly, setIsYearly] = useState(false)

  return (
    <div className="min-h-dvh bg-background text-text-primary">
      <HeroHeader />

      {/* Pricing header */}
      <section className="pt-32 pb-16 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <ScrollFadeIn>
            <Typography variant="h1" className="text-text-primary">
              Simple, transparent pricing
            </Typography>
            <Typography variant="body" className="mt-4 text-lg text-text-secondary">
              Start free, scale as you grow. No hidden fees.
            </Typography>
          </ScrollFadeIn>

          {/* Billing toggle */}
          <ScrollFadeIn delay={0.1}>
            <div className="mt-8 inline-flex items-center gap-1 rounded-full border border-border bg-surface p-1">
              <Button
                variant={!isYearly ? "primary" : "ghost"}
                size="sm"
                onClick={() => setIsYearly(false)}
                className="rounded-full"
              >
                Monthly
              </Button>
              <Button
                variant={isYearly ? "primary" : "ghost"}
                size="sm"
                onClick={() => setIsYearly(true)}
                className="rounded-full"
              >
                Yearly
                <Badge variant="accent" className="ml-2 text-[10px]">
                  -20%
                </Badge>
              </Button>
            </div>
            <AnimatePresence>
              {isYearly && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="mt-3 text-sm font-medium text-accent"
                >
                  <FlipWords words={["Save 20%", "Best value"]} interval={4000} />
                </motion.div>
              )}
            </AnimatePresence>
          </ScrollFadeIn>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="pb-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-8 md:grid-cols-3">
            {plans.map((plan) => (
              <ScrollFadeIn key={plan.name}>
                <Card
                  interactive
                  className={cn(
                    "flex h-full flex-col relative overflow-hidden transition-all duration-300",
                    plan.popular
                      ? "border-primary/50 shadow-lg md:scale-105 z-10"
                      : "border-border/50 hover:border-border"
                  )}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-0 w-full flex justify-center">
                      <Badge variant="accent" className="shadow-lg">Most Popular</Badge>
                    </div>
                  )}
                  <CardHeader className="pb-8 pt-8">
                    <CardTitle className="text-xl font-bold text-text-primary">
                      {plan.name}
                    </CardTitle>
                    <p className="text-sm text-text-secondary">{plan.description}</p>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="mb-8 flex items-baseline">
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={isYearly ? "yearly" : "monthly"}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.2 }}
                          className="text-4xl font-extrabold text-text-primary tabular-nums"
                        >
                          {plan.monthly === null
                            ? "Custom"
                            : `$${isYearly ? plan.yearly : plan.monthly}`}
                        </motion.span>
                      </AnimatePresence>
                      {plan.period && (
                        <span className="ml-1 text-text-tertiary">/{plan.period}</span>
                      )}
                    </div>
                    <ul className="space-y-4">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3 text-sm text-text-secondary">
                          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <CheckIcon size={12} />
                          </div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" variant={plan.variant}>
                      {plan.action}
                    </Button>
                  </CardFooter>
                </Card>
              </ScrollFadeIn>
            ))}
          </div>
        </div>
      </section>

      <ComparisonBlock />

      <FAQBlock items={pricingFAQ} title="Pricing FAQ" />

      <Footer />
    </div>
  )
}
