import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('motion/react', () => ({
  motion: {
    div: ({ children, className, ...props }: Record<string, unknown>) => (
      <div className={className as string} {...props}>{children as React.ReactNode}</div>
    ),
  },
  useMotionValue: () => ({ set: vi.fn(), get: () => 0 }),
  useSpring: () => ({ set: vi.fn(), get: () => 0 }),
  useReducedMotion: () => false,
}))

import { TiltCard } from './TiltCard'

describe('TiltCard', () => {
  it('renders without crashing', () => {
    render(<TiltCard>Content</TiltCard>)
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('forwards ref', () => {
    const ref = { current: null }
    render(<TiltCard ref={ref}>Content</TiltCard>)
    expect(ref.current).toBeInstanceOf(HTMLElement)
  })

  it('accepts custom className', () => {
    const { container } = render(<TiltCard className="custom">Content</TiltCard>)
    expect(container.firstChild).toHaveClass('custom')
  })
})
