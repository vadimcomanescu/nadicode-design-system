import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

function stripMotionProps(props: Record<string, unknown>) {
  const cleaned = { ...props }

  for (const key of [
    "whileHover",
    "whileTap",
    "whileInView",
    "whileFocus",
    "whileDrag",
    "initial",
    "animate",
    "exit",
    "transition",
    "variants",
    "layout",
    "layoutId",
  ] as const) {
    delete cleaned[key]
  }

  return cleaned
}

vi.mock('motion/react', () => ({
  motion: {
    div: ({
      children,
      className,
      ...props
    }: Record<string, unknown>) => (
      <div className={className as string} {...stripMotionProps(props)}>{children as React.ReactNode}</div>
    ),
  },
}))

vi.mock('@/lib/motion', () => ({
  useStyleMotion: () => ({
    spring: { bouncy: {}, snappy: {} },
    style: 'arctic',
  }),
}))

import { SpringHover } from './SpringHover'

describe('SpringHover', () => {
  it('renders without crashing', () => {
    render(<SpringHover>Content</SpringHover>)
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('forwards ref', () => {
    const ref = { current: null }
    render(<SpringHover ref={ref}>Content</SpringHover>)
    expect(ref.current).toBeInstanceOf(HTMLElement)
  })

  it('renders plain div when disabled', () => {
    render(<SpringHover disabled>Content</SpringHover>)
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('accepts custom className', () => {
    const { container } = render(<SpringHover className="custom">Content</SpringHover>)
    expect(container.firstChild).toHaveClass('custom')
  })
})
