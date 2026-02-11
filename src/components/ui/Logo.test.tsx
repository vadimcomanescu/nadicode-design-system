import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { Logo, LogoIcon } from './Logo'

describe('Logo', () => {
  it('renders Logo SVG', () => {
    const { container } = render(<Logo />)
    expect(container.querySelector('svg')).toBeTruthy()
  })

  it('renders LogoIcon SVG', () => {
    const { container } = render(<LogoIcon />)
    expect(container.querySelector('svg')).toBeTruthy()
  })

  it('passes SVG props through', () => {
    const { container } = render(<Logo className="custom-logo" />)
    expect(container.querySelector('svg')).toHaveClass('custom-logo')
  })
})
