import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { GoogleIcon, MicrosoftIcon, GitHubIcon, AppleIcon } from './BrandIcons'

describe('BrandIcons', () => {
  it('renders GoogleIcon', () => {
    const { container } = render(<GoogleIcon />)
    expect(container.querySelector('svg')).toBeTruthy()
  })

  it('renders MicrosoftIcon', () => {
    const { container } = render(<MicrosoftIcon />)
    expect(container.querySelector('svg')).toBeTruthy()
  })

  it('renders GitHubIcon', () => {
    const { container } = render(<GitHubIcon />)
    expect(container.querySelector('svg')).toBeTruthy()
  })

  it('renders AppleIcon', () => {
    const { container } = render(<AppleIcon />)
    expect(container.querySelector('svg')).toBeTruthy()
  })

  it('passes SVG props through', () => {
    const { container } = render(<GoogleIcon data-testid="google" className="custom" />)
    expect(container.querySelector('svg')).toHaveClass('custom')
  })
})
