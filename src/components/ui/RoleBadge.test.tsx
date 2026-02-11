import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { RoleBadge } from './RoleBadge'

describe('RoleBadge', () => {
  it('renders without crashing', () => {
    render(<RoleBadge role="member" />)
    expect(screen.getByText('Member')).toBeInTheDocument()
  })

  it('renders owner role', () => {
    render(<RoleBadge role="owner" />)
    expect(screen.getByText('Owner')).toBeInTheDocument()
  })

  it('renders admin role', () => {
    render(<RoleBadge role="admin" />)
    expect(screen.getByText('Admin')).toBeInTheDocument()
  })

  it('renders guest role', () => {
    render(<RoleBadge role="guest" />)
    expect(screen.getByText('Guest')).toBeInTheDocument()
  })

  it('accepts custom className', () => {
    render(<RoleBadge role="member" className="custom" />)
    expect(screen.getByText('Member')).toHaveClass('custom')
  })
})
