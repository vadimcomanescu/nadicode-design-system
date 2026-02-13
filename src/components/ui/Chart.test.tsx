import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { ChartContainer, type ChartConfig } from './Chart'
import { BarChart, Bar } from 'recharts'

const config: ChartConfig = {
  value: { label: 'Value', color: 'var(--chart-1)' },
}

describe('Chart', () => {
  it('renders ChartContainer without crashing', () => {
    const { container } = render(
      <ChartContainer config={config}>
        <BarChart data={[{ name: 'A', value: 10 }]}>
          <Bar dataKey="value" />
        </BarChart>
      </ChartContainer>
    )
    expect(container.firstChild).toBeTruthy()
  })

  it('accepts custom className', () => {
    const { container } = render(
      <ChartContainer config={config} className="custom-chart">
        <BarChart data={[]}>
          <Bar dataKey="value" />
        </BarChart>
      </ChartContainer>
    )
    expect(container.firstChild).toHaveClass('custom-chart')
  })
})
