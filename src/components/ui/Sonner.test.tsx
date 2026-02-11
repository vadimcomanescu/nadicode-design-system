import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'

vi.mock('next-themes', () => ({
  useTheme: () => ({ theme: 'light' }),
}))

import { Sonner } from './Sonner'

describe('Sonner', () => {
  it('renders without crashing', () => {
    const { container } = render(<Sonner />)
    expect(container).toBeTruthy()
  })
})
