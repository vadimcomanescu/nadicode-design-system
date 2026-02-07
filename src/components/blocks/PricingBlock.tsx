import { Check } from "lucide-react"
import { useState } from "react"
import { Button } from "../ui/Button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/Card"
import { Badge } from "../ui/Badge"
import { Switch } from "../ui/Switch"
import { cn } from "../../lib/utils"

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
        <section className="py-24">
            <div className="container mx-auto px-6 lg:px-8">
                <div className="mb-12 text-center">
                    <h2 className="mb-4 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
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

                <div className="grid gap-8 md:grid-cols-3">
                    {plans.map((plan) => (
                        <Card
                            key={plan.name}
                            interactive
                            className={cn(
                                "flex flex-col relative overflow-hidden transition-all duration-300",
                                plan.popular ? "border-primary/50 shadow-lg scale-105 z-10" : "border-border/50 hover:border-border"
                            )}
                        >
                            {plan.popular && (
                                <div className="absolute -top-3 left-0 ring-0 w-full flex justify-center">
                                    <Badge variant="accent" className="shadow-lg">Most Popular</Badge>
                                </div>
                            )}
                            <CardHeader className="pb-8 pt-8">
                                <CardTitle className="text-xl font-bold text-text-primary">{plan.name}</CardTitle>
                                <p className="text-sm text-text-secondary">{plan.description}</p>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <div className="mb-8 flex items-baseline">
                                    <span className="text-4xl font-extrabold text-text-primary">{plan.price}</span>
                                    <span className="ml-1 text-text-tertiary">{plan.period}</span>
                                </div>
                                <ul className="space-y-4">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex items-center gap-3 text-sm text-text-secondary">
                                            <div className={cn("flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary")}>
                                                <Check className="h-3 w-3" />
                                            </div>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full" variant={plan.variant as any}>
                                    {plan.action}
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
