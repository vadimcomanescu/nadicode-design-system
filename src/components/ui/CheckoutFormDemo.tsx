'use client'

import React, { useState } from "react"
import {
    CardElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js"
import { Button } from "./Button"
import { Badge } from "./Badge"
import { Separator } from "./Separator"
import { Alert, AlertDescription, AlertTitle } from "./Alert"
import { LoaderCircleIcon } from "@/components/ui/icons"
import { CheckIcon } from "./icons/check"
import { LockIcon } from "./icons/lock"
import { useTheme } from "../../lib/ThemeProvider"
import { colorTokens } from "../../tokens"
import { Input } from "./Input"
import { Label } from "./Label"

interface CheckoutFormDemoProps {
    amount?: number
    productName?: string
    features?: string[]
}

export function CheckoutFormDemo({
    amount = 2000,
    productName = "Nadicode Pro",
    features = [
        "Unlimited components",
        "Advanced design tokens",
        "Priority support",
        "Lifetime updates",
    ],
}: CheckoutFormDemoProps) {
    const stripe = useStripe()
    const elements = useElements()
    const { resolvedTheme } = useTheme()
    const isDark = resolvedTheme === "dark"

    const [message, setMessage] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const palette = isDark ? colorTokens.dark : colorTokens.light

    const cardElementOptions = {
        style: {
            base: {
                color: palette.text.primary,
                fontFamily: '"Inter", sans-serif',
                fontSmoothing: "antialiased",
                fontSize: "14px",
                "::placeholder": {
                    color: palette.text.secondary,
                },
                iconColor: palette.accent.DEFAULT,
            },
            invalid: {
                color: palette.destructive.DEFAULT,
                iconColor: palette.destructive.DEFAULT,
            },
        },
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!stripe || !elements) return

        setIsLoading(true)
        setMessage(null)

        await new Promise((resolve) => setTimeout(resolve, 2000))

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
            setMessage("Success!")
        }

        setIsLoading(false)
    }

    const price = amount / 100

    return (
        <div className="glass-panel rounded-xl p-8 space-y-6">
            {/* Plan summary */}
            <div className="space-y-4">
                <Badge variant="secondary">Pro Plan</Badge>
                <h3 className="text-xl font-semibold text-text-primary">{productName}</h3>
                <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold tabular-nums">${price}</span>
                    <span className="text-text-secondary text-sm">/month</span>
                </div>
                <ul className="space-y-2.5 pt-2">
                    {features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-2.5 text-sm text-text-secondary">
                            <CheckIcon size={16} className="text-accent shrink-0" />
                            {feature}
                        </li>
                    ))}
                </ul>
            </div>

            <Separator />

            {/* Payment form */}
            <form onSubmit={handleSubmit} className="space-y-6">
                <h4 className="text-sm font-medium text-text-primary">Payment method</h4>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="checkout-email">Email</Label>
                        <Input id="checkout-email" type="email" placeholder="you@example.com" required />
                    </div>

                    <div className="space-y-2">
                        <Label>Card details</Label>
                        <div className="rounded-md border border-border bg-surface px-3 py-2.5 focus-within:ring-1 focus-within:ring-accent">
                            <CardElement options={cardElementOptions} />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="checkout-name">Cardholder name</Label>
                        <Input id="checkout-name" placeholder="Full name on card" required />
                    </div>
                </div>

                <Separator />

                {/* Price breakdown */}
                <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                        <span className="text-text-secondary">Subtotal</span>
                        <span className="tabular-nums">${price.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-text-secondary">Tax</span>
                        <span className="tabular-nums">$0.00</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold text-base">
                        <span>Total</span>
                        <span className="tabular-nums">${price.toFixed(2)}</span>
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
                    className="w-full"
                    type="submit"
                >
                    {isLoading ? (
                        <>
                            <LoaderCircleIcon size={16} className="mr-2 animate-spin" />
                            Processing...
                        </>
                    ) : (
                        `Subscribe \u2013 $${price}/mo`
                    )}
                </Button>

                {/* Trust footer */}
                <div className="flex items-center justify-center gap-2 text-xs text-text-tertiary">
                    <LockIcon size={12} />
                    <span>Encrypted</span>
                    <span aria-hidden="true">&middot;</span>
                    <span>Powered by Stripe</span>
                    <span aria-hidden="true">&middot;</span>
                    <a href="#" className="text-link hover:underline">Terms</a>
                </div>
            </form>
        </div>
    )
}
