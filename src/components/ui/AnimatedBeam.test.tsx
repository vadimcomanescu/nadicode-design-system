import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'

vi.mock('motion/react', () => ({
  motion: {
    path: (props: Record<string, unknown>) => <path {...props} />,
  },
  useReducedMotion: () => false,
}))

import { AnimatedBeam } from './AnimatedBeam'

describe('AnimatedBeam', () => {
  it('renders without crashing', () => {
    const containerRef = { current: document.createElement('div') }
    const fromRef = { current: document.createElement('div') }
    const toRef = { current: document.createElement('div') }

    const { container } = render(
      <AnimatedBeam containerRef={containerRef} fromRef={fromRef} toRef={toRef} />
    )
    expect(container).toBeTruthy()
  })

  it('returns null when path cannot be computed', () => {
    const containerRef = { current: null }
    const fromRef = { current: null }
    const toRef = { current: null }

    const { container } = render(
      <AnimatedBeam containerRef={containerRef} fromRef={fromRef} toRef={toRef} />
    )
    expect(container.querySelector('svg')).toBeNull()
  })
})
