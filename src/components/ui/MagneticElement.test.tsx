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

import { MagneticElement } from './MagneticElement'

describe('MagneticElement', () => {
  it('renders without crashing', () => {
    render(<MagneticElement>Content</MagneticElement>)
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('forwards ref', () => {
    const ref = { current: null }
    render(<MagneticElement ref={ref}>Content</MagneticElement>)
    expect(ref.current).toBeInstanceOf(HTMLElement)
  })

  it('accepts custom className', () => {
    const { container } = render(<MagneticElement className="custom">Content</MagneticElement>)
    expect(container.firstChild).toHaveClass('custom')
  })
})
