import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { ProgressiveBlur } from './ProgressiveBlur'

describe('ProgressiveBlur', () => {
  it('renders without crashing', () => {
    const { container } = render(<ProgressiveBlur />)
    expect(container.firstChild).toBeTruthy()
  })

  it('accepts custom className', () => {
    const { container } = render(<ProgressiveBlur className="custom-blur" />)
    expect(container.firstChild).toHaveClass('custom-blur')
  })

  it('applies direction via inline style', () => {
    const { container } = render(<ProgressiveBlur direction="right" />)
    const el = container.firstChild as HTMLElement
    expect(el.style.background).toContain('to right')
  })
})
