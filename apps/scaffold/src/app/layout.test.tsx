import { renderToStaticMarkup } from 'react-dom/server'
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('three', () => ({
  Scene: class Scene {},
}))

vi.mock('p5', () => ({
  default: function P5() {},
}))

vi.mock('next/font/local', () => ({
  default: () => ({ variable: 'mocked-font-variable' }),
}))

import RootLayout, { metadata } from './layout'

beforeEach(() => {
  vi.stubGlobal('localStorage', {
    getItem: vi.fn(() => null),
    setItem: vi.fn(),
    removeItem: vi.fn(),
  })
})

describe('RootLayout', () => {
  it('should export premium scaffold metadata', () => {
    expect(metadata.title).toBe('Scaffold Next.js SaaS')
    expect(metadata.icons).toEqual({ icon: '/scaffold.svg' })
  })

  it('should render wrapped children in main content container', () => {
    const markup = renderToStaticMarkup(
      <RootLayout>
        <p>world-class child</p>
      </RootLayout>
    )

    expect(markup).toContain('world-class child')
    expect(markup).toContain('id="main-content"')
  })
})
