import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import {
  Item,
  ItemGroup,
  ItemTitle,
  ItemDescription,
} from './Item'

describe('Item', () => {
  it('renders without crashing', () => {
    render(<Item>Item content</Item>)
    expect(screen.getByText('Item content')).toBeInTheDocument()
  })

  it('forwards ref', () => {
    const ref = { current: null }
    render(<Item ref={ref}>Content</Item>)
    expect(ref.current).toBeInstanceOf(HTMLElement)
  })

  it('applies variant classes', () => {
    render(<Item variant="outline">Content</Item>)
    expect(screen.getByText('Content')).toHaveClass('border')
  })

  it('applies size classes', () => {
    render(<Item size="sm">Content</Item>)
    expect(screen.getByText('Content')).toHaveClass('py-2')
  })
})

describe('ItemGroup', () => {
  it('renders children', () => {
    render(<ItemGroup><span>Child</span></ItemGroup>)
    expect(screen.getByText('Child')).toBeInTheDocument()
  })
})

describe('ItemTitle', () => {
  it('renders title text', () => {
    render(<ItemTitle>My Title</ItemTitle>)
    expect(screen.getByText('My Title')).toBeInTheDocument()
  })
})

describe('ItemDescription', () => {
  it('renders description text', () => {
    render(<ItemDescription>Description</ItemDescription>)
    expect(screen.getByText('Description')).toBeInTheDocument()
  })
})
