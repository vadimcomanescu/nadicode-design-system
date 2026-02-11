import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('motion/react', () => ({
  motion: new Proxy({} as Record<string, unknown>, {
    get: () => {
      return (p: Record<string, unknown>) => {
        const { children, className, style } = p
        return <div className={className as string} style={style as React.CSSProperties}>{children as React.ReactNode}</div>
      }
    },
  }),
  useMotionValue: () => ({ set: vi.fn(), get: () => 0 }),
  useMotionTemplate: () => 'none',
  useAnimation: () => ({ start: vi.fn() }),
  useReducedMotion: () => false,
}))

import { AvatarUpload } from './AvatarUpload'

describe('AvatarUpload', () => {
  it('renders without crashing', () => {
    const { container } = render(<AvatarUpload />)
    expect(container).toBeTruthy()
  })

  it('shows upload instruction text', () => {
    render(<AvatarUpload />)
    expect(screen.getByText('Click or drag to upload')).toBeInTheDocument()
  })

  it('accepts custom className', () => {
    const { container } = render(<AvatarUpload className="custom-avatar" />)
    expect(container.firstChild).toHaveClass('custom-avatar')
  })
})
