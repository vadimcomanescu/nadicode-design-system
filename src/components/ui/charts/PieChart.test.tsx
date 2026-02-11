import { describe, it, expect, beforeAll } from "vitest"
import { render } from "@testing-library/react"
import { PieChart } from "./PieChart"
import type { ChartConfig } from "../Chart"

beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
})

const sampleData = [
  { browser: "chrome", visitors: 275 },
  { browser: "safari", visitors: 200 },
  { browser: "firefox", visitors: 187 },
]

const config: ChartConfig = {
  chrome: { label: "Chrome", color: "rgb(59 130 246)" },
  safari: { label: "Safari", color: "rgb(16 185 129)" },
  firefox: { label: "Firefox", color: "rgb(245 158 11)" },
}

describe("PieChart", () => {
  it("renders with sample data as donut", () => {
    const { container } = render(
      <PieChart data={sampleData} config={config} dataKey="visitors" nameKey="browser" />
    )
    expect(container).toBeTruthy()
  })

  it("renders as pie variant", () => {
    const { container } = render(
      <PieChart data={sampleData} config={config} dataKey="visitors" nameKey="browser" variant="pie" />
    )
    expect(container).toBeTruthy()
  })

  it("renders with empty data", () => {
    const { container } = render(
      <PieChart data={[]} config={config} dataKey="visitors" nameKey="browser" />
    )
    expect(container).toBeTruthy()
  })
})
