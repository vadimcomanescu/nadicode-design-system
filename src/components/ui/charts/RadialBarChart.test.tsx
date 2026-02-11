import { describe, it, expect, beforeAll } from "vitest"
import { render } from "@testing-library/react"
import { RadialBarChart } from "./RadialBarChart"
import type { ChartConfig } from "../Chart"

beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
})

const sampleData = [
  { name: "chrome", value: 275, fill: "rgb(59 130 246)" },
  { name: "safari", value: 200, fill: "rgb(16 185 129)" },
  { name: "firefox", value: 187, fill: "rgb(245 158 11)" },
]

const config: ChartConfig = {
  chrome: { label: "Chrome", color: "rgb(59 130 246)" },
  safari: { label: "Safari", color: "rgb(16 185 129)" },
  firefox: { label: "Firefox", color: "rgb(245 158 11)" },
}

describe("RadialBarChart", () => {
  it("renders with sample data", () => {
    const { container } = render(
      <RadialBarChart data={sampleData} config={config} dataKey="value" nameKey="name" />
    )
    expect(container).toBeTruthy()
  })

  it("renders with empty data", () => {
    const { container } = render(
      <RadialBarChart data={[]} config={config} dataKey="value" nameKey="name" />
    )
    expect(container).toBeTruthy()
  })
})
