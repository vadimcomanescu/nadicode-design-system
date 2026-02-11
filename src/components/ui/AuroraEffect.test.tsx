import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'

vi.mock('motion/react', () => ({
  useReducedMotion: () => false,
}))

import { AuroraEffect } from './AuroraEffect'

describe('AuroraEffect', () => {
  it('renders without crashing', () => {
    const { container } = render(<AuroraEffect />)
    expect(container.firstChild).toBeTruthy()
  })

  it('accepts custom className', () => {
    const { container } = render(<AuroraEffect className="custom-aurora" />)
    expect(container.firstChild).toHaveClass('custom-aurora')
  })

  it('forwards ref', () => {
    const ref = { current: null }
    render(<AuroraEffect ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLElement)
  })

  it('applies intensity variant', () => {
    const { container } = render(<AuroraEffect intensity="high" />)
    expect(container.firstChild).toBeTruthy()
  })
})
