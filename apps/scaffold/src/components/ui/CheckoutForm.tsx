'use client'

import React, { useState } from "react"
import {
    PaymentElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js"
import { Button } from "./Button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./Card"
import { Alert, AlertDescription, AlertTitle } from "./Alert"
import { LoaderCircleIcon } from "@/components/ui/icons"

interface CheckoutFormProps {
    amount?: number
    currency?: string
}

export function CheckoutForm({ amount = 2000, currency = "usd" }: CheckoutFormProps) {
    const stripe = useStripe()
    const elements = useElements()

    const [message, setMessage] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return
        }

        setIsLoading(true)
        setMessage(null)

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: `${window.location.origin}/completion`,
            },
        })

        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.
        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message ?? "An unexpected error occurred.")
        } else {
            setMessage("An unexpected error occurred.")
        }

        setIsLoading(false)
    }

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle>Payment Details</CardTitle>
                <CardDescription>
                    Complete your purchase of ${amount / 100} {currency.toUpperCase()}.
                </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="grid gap-6">
                    <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
                    {message && (
                        <Alert variant="destructive">
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{message}</AlertDescription>
                        </Alert>
                    )}
                </CardContent>
                <CardFooter>
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
                            "Pay Now"
                        )}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}
