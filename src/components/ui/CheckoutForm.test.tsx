import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('@stripe/react-stripe-js', () => ({
  PaymentElement: () => <div data-testid="payment-element">Payment Element</div>,
  useStripe: () => null,
  useElements: () => null,
}))

import { CheckoutForm } from './CheckoutForm'

describe('CheckoutForm', () => {
  it('renders without crashing', () => {
    render(<CheckoutForm />)
    expect(screen.getByText('Payment Details')).toBeInTheDocument()
  })

  it('displays amount from props', () => {
    render(<CheckoutForm amount={5000} currency="eur" />)
    expect(screen.getByText(/50 EUR/i)).toBeInTheDocument()
  })

  it('disables Pay Now button when stripe is not loaded', () => {
    render(<CheckoutForm />)
    expect(screen.getByRole('button', { name: /pay now/i })).toBeDisabled()
  })
})
