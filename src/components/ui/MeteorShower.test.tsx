import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'

vi.mock('motion/react', () => ({
  useReducedMotion: () => false,
}))

import { MeteorShower } from './MeteorShower'

describe('MeteorShower', () => {
  it('renders without crashing', () => {
    const { container } = render(<MeteorShower />)
    expect(container.firstChild).toBeTruthy()
  })

  it('forwards ref', () => {
    const ref = { current: null }
    render(<MeteorShower ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLElement)
  })

  it('renders meteors based on count', () => {
    const { container } = render(<MeteorShower count={5} />)
    const meteors = container.querySelectorAll('[class*="h-px"]')
    expect(meteors.length).toBe(5)
  })

  it('has aria-hidden on container', () => {
    const { container } = render(<MeteorShower />)
    expect(container.firstChild).toHaveAttribute('aria-hidden', 'true')
  })
})
