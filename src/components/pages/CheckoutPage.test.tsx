import { describe, it, expect, vi } from "vitest"
import { render } from "@testing-library/react"
import { ThemeProvider } from "@/lib/ThemeProvider"

// Mock Stripe to avoid network calls in tests
vi.mock("@stripe/react-stripe-js", () => ({
  Elements: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  useStripe: () => null,
  useElements: () => null,
  CardElement: () => <div data-testid="card-element" />,
  PaymentElement: () => <div data-testid="payment-element" />,
}))

vi.mock("@stripe/stripe-js", () => ({
  loadStripe: () => Promise.resolve(null),
}))

import { CheckoutPage } from "./CheckoutPage"

describe("CheckoutPage", () => {
  it("renders without crashing", () => {
    const { container } = render(
      <ThemeProvider>
        <CheckoutPage />
      </ThemeProvider>
    )
    expect(container).toBeTruthy()
  })
})
