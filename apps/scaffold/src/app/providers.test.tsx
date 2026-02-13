import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { Providers } from './providers'

beforeEach(() => {
  vi.stubGlobal('localStorage', {
    getItem: vi.fn(() => null),
    setItem: vi.fn(),
    removeItem: vi.fn(),
  })
})

describe('Providers', () => {
  it('should render children within theme context wrapper', () => {
    render(
      <Providers>
        <p>provider child</p>
      </Providers>
    )

    expect(screen.getByText('provider child')).toBeInTheDocument()
  })

  it('should skip heavy 3D globals in test environment', () => {
    render(
      <Providers>
        <p>globals test</p>
      </Providers>
    )

    expect((window as unknown as Record<string, unknown>).THREE).toBeUndefined()
    expect((window as unknown as Record<string, unknown>).p5).toBeUndefined()
  })
})
