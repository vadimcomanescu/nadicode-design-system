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
  useReducedMotion: () => false,
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

  it('forwards ref', () => {
    const ref = { current: null }
    render(<MouseSpotlight ref={ref}>Content</MouseSpotlight>)
    expect(ref.current).toBeInstanceOf(HTMLElement)
  })

  it('accepts color and size props', () => {
    render(<MouseSpotlight color="rgb(100 200 150 / 0.1)" size={400}>Styled</MouseSpotlight>)
    expect(screen.getByText('Styled')).toBeInTheDocument()
  })
})
