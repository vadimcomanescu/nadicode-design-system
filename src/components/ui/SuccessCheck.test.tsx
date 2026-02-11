import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'

vi.mock('motion/react', () => ({
  motion: {
    div: ({ children, style, ...props }: Record<string, unknown>) => (
      <div style={style as React.CSSProperties} {...props}>{children as React.ReactNode}</div>
    ),
    circle: (props: Record<string, unknown>) => <circle {...props} />,
    path: (props: Record<string, unknown>) => <path {...props} />,
  },
}))

vi.mock('@/lib/motion', () => ({
  useStyleMotion: () => ({
    spring: { bouncy: {}, gentle: {} },
    style: 'arctic',
  }),
}))

import { SuccessCheck } from './SuccessCheck'

describe('SuccessCheck', () => {
  it('renders without crashing', () => {
    const { container } = render(<SuccessCheck />)
    expect(container.querySelector('svg')).toBeTruthy()
  })

  it('forwards ref', () => {
    const ref = { current: null }
    render(<SuccessCheck ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLElement)
  })

  it('accepts custom size', () => {
    const { container } = render(<SuccessCheck size={64} />)
    const svg = container.querySelector('svg')
    expect(svg).toHaveAttribute('width', '64')
  })

  it('accepts custom className', () => {
    const { container } = render(<SuccessCheck className="custom" />)
    expect(container.firstChild).toHaveClass('custom')
  })
})
