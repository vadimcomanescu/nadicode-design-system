import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SkipNav } from './SkipNav'

describe('SkipNav', () => {
  it('renders without crashing', () => {
    render(<SkipNav />)
    expect(screen.getByText('Skip to content')).toBeInTheDocument()
  })

  it('links to #main-content', () => {
    render(<SkipNav />)
    expect(screen.getByText('Skip to content')).toHaveAttribute('href', '#main-content')
  })

  it('has sr-only class for screen reader accessibility', () => {
    render(<SkipNav />)
    expect(screen.getByText('Skip to content')).toHaveClass('sr-only')
  })

  it('accepts custom className', () => {
    render(<SkipNav className="custom" />)
    expect(screen.getByText('Skip to content')).toHaveClass('custom')
  })
})
