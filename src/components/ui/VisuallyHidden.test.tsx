import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { VisuallyHidden } from './VisuallyHidden'

describe('VisuallyHidden', () => {
  it('renders without crashing', () => {
    render(<VisuallyHidden>Hidden text</VisuallyHidden>)
    expect(screen.getByText('Hidden text')).toBeInTheDocument()
  })

  it('has sr-only class', () => {
    render(<VisuallyHidden>Hidden</VisuallyHidden>)
    expect(screen.getByText('Hidden')).toHaveClass('sr-only')
  })

  it('renders as a span', () => {
    render(<VisuallyHidden>Hidden</VisuallyHidden>)
    expect(screen.getByText('Hidden').tagName).toBe('SPAN')
  })
})
