import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'

vi.mock('motion/react', () => ({
  motion: {
    div: ({ children, className, style, ...props }: Record<string, unknown>) => (
      <div className={className as string} style={style as React.CSSProperties} {...props}>{children as React.ReactNode}</div>
    ),
  },
}))

vi.mock('@/lib/motion', () => ({
  useStyleMotion: () => ({
    spring: { bouncy: {} },
    style: 'arctic',
  }),
}))

import { ConfettiBurst } from './ConfettiBurst'

describe('ConfettiBurst', () => {
  it('renders without crashing', () => {
    const { container } = render(<ConfettiBurst />)
    expect(container.firstChild).toBeTruthy()
  })

  it('renders nothing when trigger is false', () => {
    const { container } = render(<ConfettiBurst trigger={false} />)
    expect(container.firstChild).toBeNull()
  })

  it('forwards ref', () => {
    const ref = { current: null }
    render(<ConfettiBurst ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLElement)
  })

  it('renders particles based on count', () => {
    const { container } = render(<ConfettiBurst count={5} />)
    const particles = container.querySelectorAll('[class*="absolute"]')
    expect(particles.length).toBe(5)
  })
})
