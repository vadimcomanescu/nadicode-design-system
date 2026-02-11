import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('motion/react', () => ({
  motion: {
    div: ({ children, className, ...props }: Record<string, unknown>) => (
      <div className={className as string} {...props}>{children as React.ReactNode}</div>
    ),
  },
  useMotionValue: () => ({ set: vi.fn(), get: () => 0 }),
  useMotionTemplate: () => 'none',
}))

import { MouseSpotlight } from './MouseEffect'

describe('MouseSpotlight', () => {
  it('renders without crashing', () => {
    render(<MouseSpotlight>Content</MouseSpotlight>)
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('accepts custom className', () => {
    const { container } = render(<MouseSpotlight className="custom">Content</MouseSpotlight>)
    expect(container.firstChild).toHaveClass('custom')
  })
})
