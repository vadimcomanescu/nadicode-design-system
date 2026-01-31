import React, { useState } from "react"
import {
    CardElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js"
import { Button } from "./Button"
import { Alert, AlertDescription, AlertTitle } from "./Alert"
import { Loader2, Check, ShieldCheck } from "lucide-react"
import { useTheme } from "../../lib/ThemeProvider"
import { Typography } from "./Typography"
import { Input } from "./Input"
import { Label } from "./Label"

interface CheckoutFormDemoProps {
    amount?: number
    currency?: string
    productName?: string
    features?: string[]
}

export function CheckoutFormDemo({
    amount = 2000, // $20.00

    productName = "Seed Design Pro",
    features = [
        "Unlimited components",
        "Advanced design tokens",
        "Priority support",
        "Lifetime updates"
    ]
}: CheckoutFormDemoProps) {
    const stripe = useStripe()
    const elements = useElements()
    const { theme } = useTheme()

    const [message, setMessage] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    // Dynamic styles based on theme
    const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)

    const cardElementOptions = {
        style: {
            base: {
                color: isDark ? "#f2f2f2" : "#0a0a0a",
                fontFamily: '"Inter", sans-serif',
                fontSmoothing: "antialiased",
                fontSize: "16px",
                "::placeholder": {
                    color: isDark ? "#a1a1a1" : "#737373",
                },
                iconColor: isDark ? "#99a1ff" : "#4f46e5", // Accent color for icon
            },
            invalid: {
                color: "#ef4444",
                iconColor: "#ef4444",
            },
        },
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!stripe || !elements) {
            return
        }

        setIsLoading(true)
        setMessage(null)

        // Simulate network delay for demo
        await new Promise(resolve => setTimeout(resolve, 2000))

        const cardElement = elements.getElement(CardElement)

        if (!cardElement) {
            setIsLoading(false)
            return
        }

        const { error } = await stripe.createPaymentMethod({
            type: "card",
            card: cardElement,
        })

        if (error) {
            setMessage(error.message ?? "An unexpected error occurred.")
        } else {
            setMessage(`Success!`)
            // Success logic would go here
        }

        setIsLoading(false)
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 max-w-5xl mx-auto rounded-xl overflow-hidden shadow-2xl border border-border bg-surface">

            {/* Left Column: Product Summary */}
            <div className="md:col-span-5 bg-surface-active p-8 md:p-10 flex flex-col justify-between border-r border-border">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <Typography variant="muted" className="uppercase tracking-wider text-xs font-semibold">Subscribe to</Typography>
                        <Typography variant="h2">{productName}</Typography>
                        <div className="flex items-baseline space-x-1">
                            <span className="text-4xl font-bold tracking-tight">${amount / 100}</span>
                            <span className="text-text-secondary">/month</span>
                        </div>
                    </div>

                    <div className="pt-6">
                        <ul className="space-y-4">
                            {features.map((feature, i) => (
                                <li key={i} className="flex items-start">
                                    <Check className="h-5 w-5 text-accent mr-3 shrink-0" />
                                    <Typography variant="body" className="text-sm">{feature}</Typography>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-border space-y-4">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-text-secondary">Subtotal</span>
                        <span>${(amount / 100).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-text-secondary">Tax</span>
                        <span>$0.00</span>
                    </div>
                    <div className="flex justify-between items-center text-lg font-bold pt-2 border-t border-border">
                        <span>Total due today</span>
                        <span>${(amount / 100).toFixed(2)}</span>
                    </div>
                </div>
            </div>

            {/* Right Column: Payment Details */}
            <div className="md:col-span-7 p-8 md:p-10 bg-background">
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div>
                        <Typography variant="h3" className="mb-2">Payment Details</Typography>
                        <Typography variant="muted">Complete your purchase safely and securely.</Typography>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email address</Label>
                            <Input id="email" type="email" placeholder="you@example.com" required />
                        </div>

                        <div className="space-y-2">
                            <Label>Card information</Label>
                            <div className="rounded-md border border-input bg-transparent px-3 py-3 text-sm shadow-sm transition-colors focus-within:ring-1 focus-within:ring-ring focus-within:border-ring">
                                <CardElement options={cardElementOptions} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="name">Name on card</Label>
                            <Input id="name" placeholder="John Doe" required />
                        </div>

                        <div className="pt-2 flex items-center space-x-2 text-xs text-text-tertiary">
                            <ShieldCheck className="h-4 w-4" />
                            <span>Payments are secure and encrypted.</span>
                        </div>
                    </div>

                    {message && (
                        <Alert variant={message.startsWith("Success") ? "default" : "destructive"}>
                            <AlertTitle>{message.startsWith("Success") ? "Payment Successful" : "Payment Failed"}</AlertTitle>
                            <AlertDescription>
                                {message.startsWith("Success")
                                    ? "Thank you for your subscription. A confirmation email has been sent."
                                    : message}
                            </AlertDescription>
                        </Alert>
                    )}

                    <Button
                        disabled={isLoading || !stripe || !elements}
                        className="w-full text-lg h-12"
                        type="submit"
                        variant="primary"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                Processing...
                            </>
                        ) : (
                            "Subscribe"
                        )}
                    </Button>
                </form>
            </div>
        </div>
    )
}
