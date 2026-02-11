import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ScrollArea, ScrollBar } from './ScrollArea'

describe('ScrollArea', () => {
  it('renders without crashing', () => {
    render(<ScrollArea>Content</ScrollArea>)
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('forwards ref', () => {
    const ref = { current: null }
    render(<ScrollArea ref={ref}>Content</ScrollArea>)
    expect(ref.current).toBeInstanceOf(HTMLElement)
  })

  it('accepts custom className', () => {
    const { container } = render(<ScrollArea className="custom-scroll">Content</ScrollArea>)
    expect(container.firstChild).toHaveClass('custom-scroll')
  })
})

describe('ScrollBar', () => {
  it('renders without crashing in horizontal orientation', () => {
    const { container } = render(
      <ScrollArea>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    )
    expect(container).toBeTruthy()
  })
})
