import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'

vi.mock('motion/react', () => ({
  useReducedMotion: () => true,
  useInView: () => true,
  motion: {
    div: ({ children, className, ...props }: Record<string, unknown>) => (
      <div className={className as string} {...props}>{children as React.ReactNode}</div>
    ),
  },
}))

import { BentoGrid } from './BentoGrid'

describe('BentoGrid', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <BentoGrid>
        <div>Item 1</div>
        <div>Item 2</div>
      </BentoGrid>
    )
    expect(container.firstChild).toBeTruthy()
  })

  it('renders children', () => {
    const { getByText } = render(
      <BentoGrid>
        <div>Card A</div>
      </BentoGrid>
    )
    expect(getByText('Card A')).toBeInTheDocument()
  })

  it('forwards ref', () => {
    const ref = { current: null }
    render(
      <BentoGrid ref={ref}>
        <div>Item</div>
      </BentoGrid>
    )
    expect(ref.current).toBeInstanceOf(HTMLElement)
  })

  it('accepts columns prop', () => {
    const { container } = render(
      <BentoGrid columns={2}>
        <div>A</div>
      </BentoGrid>
    )
    expect(container.firstChild).toHaveClass('md:grid-cols-2')
  })
})
