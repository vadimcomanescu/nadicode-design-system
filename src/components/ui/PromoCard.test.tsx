import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PromoCard } from './PromoCard'

describe('PromoCard', () => {
  it('renders without crashing', () => {
    render(<PromoCard />)
    expect(screen.getByText('Upgrade to Pro')).toBeInTheDocument()
  })

  it('renders custom title and description', () => {
    render(<PromoCard title="Go Premium" description="Get all features" />)
    expect(screen.getByText('Go Premium')).toBeInTheDocument()
    expect(screen.getByText('Get all features')).toBeInTheDocument()
  })

  it('renders custom action label', () => {
    render(<PromoCard actionLabel="Buy Now" />)
    expect(screen.getByRole('button', { name: 'Buy Now' })).toBeInTheDocument()
  })

  it('calls onAction when button is clicked', async () => {
    const onAction = vi.fn()
    render(<PromoCard onAction={onAction} />)
    await userEvent.setup().click(screen.getByRole('button', { name: 'Upgrade' }))
    expect(onAction).toHaveBeenCalledOnce()
  })
})
