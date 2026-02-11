import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { AspectRatio } from './AspectRatio'

describe('AspectRatio', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <AspectRatio ratio={16 / 9}>
        <div>Content</div>
      </AspectRatio>
    )
    expect(container.firstChild).toBeTruthy()
  })

  it('renders children', () => {
    const { getByText } = render(
      <AspectRatio ratio={1}>
        <span>Inside</span>
      </AspectRatio>
    )
    expect(getByText('Inside')).toBeInTheDocument()
  })
})
