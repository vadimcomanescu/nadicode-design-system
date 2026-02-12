'use client'

import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import type { Appearance } from "@stripe/stripe-js"
import { motion } from "motion/react"
import { useTheme } from "../../lib/ThemeProvider"
import { colorTokens } from "../../tokens"
import { CheckoutFormDemo } from "../ui/CheckoutFormDemo"

const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx")

function useStripeAppearance(): Appearance {
    const { resolvedTheme } = useTheme()
    const isDark = resolvedTheme === "dark"

    const palette = isDark ? colorTokens.dark : colorTokens.light

    return {
        theme: "flat",
        variables: {
            colorPrimary: palette.accent.DEFAULT,
            colorText: palette.text.primary,
            colorTextSecondary: palette.text.secondary,
            colorDanger: palette.destructive.DEFAULT,
            borderRadius: "8px",
            fontFamily: '"Inter", sans-serif',
            fontSizeBase: "14px",
            focusBoxShadow: `0 0 0 1px ${palette.accent.DEFAULT}`,
            colorBackground: "transparent",
        },
        rules: {
            ".Label": {
                display: "none",
            },
            ".Input": {
                backgroundColor: "transparent",
                border: "none",
                boxShadow: "none",
                padding: "0",
                fontSize: "14px",
            },
            ".Input:focus": {
                boxShadow: "none",
                border: "none",
            },
        },
    }
}

export function CheckoutPage() {
    const appearance = useStripeAppearance()

    return (
        <div className="min-h-dvh bg-background text-text-primary flex items-center justify-center px-4 py-12">
            <motion.div
                className="w-full max-w-lg"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
                <Elements stripe={stripePromise} options={{ appearance }}>
                    <CheckoutFormDemo />
                </Elements>
            </motion.div>
        </div>
    )
}
