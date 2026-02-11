import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@/lib/ThemeProvider'

vi.mock('@stripe/react-stripe-js', () => ({
  CardElement: () => <div data-testid="card-element">Card Element</div>,
  useStripe: () => null,
  useElements: () => null,
}))

import { CheckoutFormDemo } from './CheckoutFormDemo'

describe('CheckoutFormDemo', () => {
  it('renders without crashing', () => {
    render(
      <ThemeProvider>
        <CheckoutFormDemo />
      </ThemeProvider>
    )
    expect(screen.getByText('Nadicode Pro')).toBeInTheDocument()
  })

  it('displays custom product name', () => {
    render(
      <ThemeProvider>
        <CheckoutFormDemo productName="Custom Plan" />
      </ThemeProvider>
    )
    expect(screen.getByText('Custom Plan')).toBeInTheDocument()
  })

  it('renders feature list', () => {
    render(
      <ThemeProvider>
        <CheckoutFormDemo features={['Feature A', 'Feature B']} />
      </ThemeProvider>
    )
    expect(screen.getByText('Feature A')).toBeInTheDocument()
    expect(screen.getByText('Feature B')).toBeInTheDocument()
  })
})
