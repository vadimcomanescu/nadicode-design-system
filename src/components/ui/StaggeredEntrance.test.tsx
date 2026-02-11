import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StaggeredEntrance } from './StaggeredEntrance'

describe('StaggeredEntrance', () => {
  it('renders without crashing', () => {
    render(
      <StaggeredEntrance>
        <div>Item 1</div>
        <div>Item 2</div>
      </StaggeredEntrance>
    )
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
  })

  it('wraps children with animation delay', () => {
    const { container } = render(
      <StaggeredEntrance delayMs={100}>
        <div>Child</div>
      </StaggeredEntrance>
    )
    const wrapper = container.querySelector('.animate-fade-in-up')
    expect(wrapper).toBeTruthy()
  })

  it('accepts custom className', () => {
    const { container } = render(
      <StaggeredEntrance className="custom-stagger">
        <div>Child</div>
      </StaggeredEntrance>
    )
    expect(container.firstChild).toHaveClass('custom-stagger')
  })
})
