import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('motion/react', () => ({
  useReducedMotion: () => false,
}))

import { MovingBorder } from './MovingBorder'

describe('MovingBorder', () => {
  it('renders without crashing', () => {
    render(<MovingBorder>Content</MovingBorder>)
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('forwards ref', () => {
    const ref = { current: null }
    render(<MovingBorder ref={ref}>Content</MovingBorder>)
    expect(ref.current).toBeInstanceOf(HTMLElement)
  })

  it('accepts custom className', () => {
    const { container } = render(<MovingBorder className="custom">Content</MovingBorder>)
    expect(container.firstChild).toHaveClass('custom')
  })
})
