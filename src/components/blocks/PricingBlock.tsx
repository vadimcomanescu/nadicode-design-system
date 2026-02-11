import { CheckIcon } from "../ui/icons/check"
import { useState } from "react"
import { CountingNumber } from "../ui/text-effects"
import { Button } from "../ui/Button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/Card"
import { Badge } from "../ui/Badge"
import { Switch } from "../ui/Switch"
import { cn } from "../../lib/utils"
import { StaggerChildren } from "../ui/StaggerChildren"
import { Shine } from "@/components/animate-ui/primitives/effects/shine"

export function PricingTable() {
    const [isYearly, setIsYearly] = useState(false)

    const plans = [
        {
            name: "Starter",
            description: "Perfect for hobbyists and side projects.",
            price: isYearly ? "$0" : "$0",
            period: "/forever",
            features: ["1,000 requests/mo", "Community support", "1 project", "Basic analytics"],
            action: "Get Started",
            variant: "outline",
        },
        {
            name: "Pro",
            description: "For professional developers and small teams.",
            price: isYearly ? "$29" : "$39",
            period: "/month",
            features: ["100,000 requests/mo", "Priority support", "Unlimited projects", "Advanced analytics", "Custom domains"],
            action: "Upgrade to Pro",
            variant: "accent", // Highlighted
            popular: true,
        },
        {
            name: "Enterprise",
            description: "Custom solutions for large organizations.",
            price: "Custom",
            period: "",
            features: ["Unlimited requests", "24/7 Dedicated support", "SSO & Audit logs", "SLA guarantees", "On-premise deployment"],
            action: "Contact Sales",
            variant: "outline",
        },
    ]

    return (
        <section className="py-16 md:py-24">
            <div className="container mx-auto px-6 lg:px-8">
                <div className="mb-12 text-center">
                    <h2 className="mb-4 text-3xl font-semibold tracking-tight leading-tight text-text-primary sm:text-4xl">
                        Simple, transparent pricing
                    </h2>
                    <p className="mb-8 text-lg text-text-secondary">
                        Choose the plan that's right for you. Change or cancel anytime.
                    </p>
                    <div className="flex items-center justify-center gap-4">
                        <span className={cn("text-sm font-medium", !isYearly ? "text-text-primary" : "text-text-tertiary")}>
                            Monthly
                        </span>
                        <Switch checked={isYearly} onCheckedChange={setIsYearly} />
                        <span className={cn("text-sm font-medium", isYearly ? "text-text-primary" : "text-text-tertiary")}>
                            Yearly <span className="ml-1 text-accent">(Save 20%)</span>
                        </span>
                    </div>
                </div>

                <StaggerChildren staggerMs={120} className="grid gap-8 md:grid-cols-3">
                    {plans.map((plan) => {
                        const card = (
                            <Card
                                key={plan.name}
                                interactive
                                className={cn(
                                    "flex flex-col relative overflow-hidden transition-all duration-300",
                                    plan.popular ? "border-accent shadow-lg shadow-accent/5 z-10" : "border-border/50 hover:border-border"
                                )}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-3 left-0 ring-0 w-full flex justify-center">
                                        <Badge variant="accent" className="shadow-lg">Most Popular</Badge>
                                    </div>
                                )}
                                <CardHeader className="pb-8 pt-8">
                                    <CardTitle className="text-xl font-semibold text-text-primary">{plan.name}</CardTitle>
                                    <p className="text-sm text-text-secondary">{plan.description}</p>
                                </CardHeader>
                                <CardContent className="flex-1">
                                    <div className="mb-8 flex items-baseline">
                                        {plan.price === "Custom" ? (
                                            <span className="text-4xl font-extrabold text-text-primary">{plan.price}</span>
                                        ) : (
                                            <span className="text-4xl font-extrabold text-text-primary tabular-nums">
                                                $<CountingNumber number={parseInt(plan.price.slice(1), 10)} inViewOnce />
                                            </span>
                                        )}
                                        <span className="ml-1 text-text-tertiary">{plan.period}</span>
                                    </div>
                                    <ul className="space-y-4">
                                        {plan.features.map((feature) => (
                                            <li key={feature} className="flex items-center gap-3 text-sm text-text-secondary">
                                                <div className={cn("flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary")}>
                                                    <CheckIcon size={12} />
                                                </div>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                                <CardFooter>
                                    <Button className="w-full" variant={plan.variant as "outline" | "accent"}>
                                        {plan.action}
                                    </Button>
                                </CardFooter>
                            </Card>
                        );
                        return plan.popular ? (
                            <Shine key={plan.name} enable loop loopDelay={3000} color="var(--color-accent)" opacity={0.12} duration={1500}>
                                {card}
                            </Shine>
                        ) : (
                            <div key={plan.name}>{card}</div>
                        );
                    })}
                </StaggerChildren>
            </div>
        </section>
    )
}
