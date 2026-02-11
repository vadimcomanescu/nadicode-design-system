import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import {
  Field,
  FieldSet,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldSeparator,
} from './Field'

describe('Field', () => {
  it('renders without crashing', () => {
    render(<Field>Field content</Field>)
    expect(screen.getByText('Field content')).toBeInTheDocument()
  })

  it('forwards ref', () => {
    const ref = { current: null }
    render(<Field ref={ref}>Content</Field>)
    expect(ref.current).toBeInstanceOf(HTMLElement)
  })

  it('applies orientation variant', () => {
    const { container } = render(<Field orientation="horizontal">Content</Field>)
    expect(container.firstChild).toHaveClass('grid-cols-[1fr_2fr]')
  })
})

describe('FieldSet', () => {
  it('renders a fieldset element', () => {
    const { container } = render(<FieldSet>Content</FieldSet>)
    expect(container.querySelector('fieldset')).toBeTruthy()
  })
})

describe('FieldLabel', () => {
  it('renders a label', () => {
    render(<FieldLabel>Name</FieldLabel>)
    expect(screen.getByText('Name')).toBeInTheDocument()
  })
})

describe('FieldError', () => {
  it('renders error messages', () => {
    render(<FieldError errors={['Required field']} />)
    expect(screen.getByText('Required field')).toBeInTheDocument()
  })

  it('renders nothing when no errors', () => {
    const { container } = render(<FieldError errors={[]} />)
    expect(container.firstChild).toBeNull()
  })
})

describe('FieldDescription', () => {
  it('renders description text', () => {
    render(<FieldDescription>Helper text</FieldDescription>)
    expect(screen.getByText('Helper text')).toBeInTheDocument()
  })
})

describe('FieldSeparator', () => {
  it('renders with children', () => {
    render(<FieldSeparator>OR</FieldSeparator>)
    expect(screen.getByText('OR')).toBeInTheDocument()
  })
})
