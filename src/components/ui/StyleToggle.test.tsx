import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from '@/lib/ThemeProvider'
import { StyleToggle } from './StyleToggle'

function renderWithTheme() {
  return render(
    <ThemeProvider>
      <StyleToggle />
    </ThemeProvider>
  )
}

describe('StyleToggle', () => {
  it('renders without crashing', () => {
    renderWithTheme()
    expect(screen.getByText('Arctic')).toBeInTheDocument()
    expect(screen.getByText('Bloom')).toBeInTheDocument()
  })

  it('has radiogroup role', () => {
    renderWithTheme()
    expect(screen.getByRole('radiogroup', { name: /design style/i })).toBeInTheDocument()
  })

  it('has radio buttons for each style', () => {
    renderWithTheme()
    const radios = screen.getAllByRole('radio')
    expect(radios).toHaveLength(2)
  })

  it('forwards ref', () => {
    const ref = { current: null }
    render(
      <ThemeProvider>
        <StyleToggle ref={ref} />
      </ThemeProvider>
    )
    expect(ref.current).toBeInstanceOf(HTMLElement)
  })

  it('accepts custom className', () => {
    const ref = { current: null }
    render(
      <ThemeProvider>
        <StyleToggle ref={ref} className="custom-toggle" />
      </ThemeProvider>
    )
    expect(ref.current).toHaveClass('custom-toggle')
  })
})
