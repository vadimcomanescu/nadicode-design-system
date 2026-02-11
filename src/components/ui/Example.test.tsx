import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Example } from './Example'

describe('Example', () => {
  it('renders without crashing', () => {
    render(<Example>Content</Example>)
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('forwards ref', () => {
    const ref = { current: null }
    render(<Example ref={ref}>Content</Example>)
    expect(ref.current).toBeInstanceOf(HTMLElement)
  })

  it('accepts custom className', () => {
    render(<Example className="custom-example">Content</Example>)
    expect(screen.getByText('Content')).toHaveClass('custom-example')
  })
})
