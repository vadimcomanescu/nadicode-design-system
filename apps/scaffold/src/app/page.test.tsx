import { describe, expect, it, vi } from 'vitest'

vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}))

import { redirect } from 'next/navigation'
import Home from './page'

describe('Home route', () => {
  it('should redirect to foundations showcase', () => {
    Home()
    expect(redirect).toHaveBeenCalledWith('/foundations')
  })
})
