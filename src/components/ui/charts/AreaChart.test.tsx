import { describe, it, expect, beforeAll } from "vitest"
import { render } from "@testing-library/react"
import { AreaChart } from "./AreaChart"
import type { ChartConfig } from "../Chart"

beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
})

const sampleData = [
  { month: "Jan", desktop: 186, mobile: 80 },
  { month: "Feb", desktop: 305, mobile: 200 },
]

const config: ChartConfig = {
  desktop: { label: "Desktop", color: "rgb(59 130 246)" },
  mobile: { label: "Mobile", color: "rgb(16 185 129)" },
}

describe("AreaChart", () => {
  it("renders with sample data", () => {
    const { container } = render(
      <AreaChart data={sampleData} config={config} indexKey="month" />
    )
    expect(container).toBeTruthy()
  })

  it("renders with empty data", () => {
    const { container } = render(
      <AreaChart data={[]} config={config} indexKey="month" />
    )
    expect(container).toBeTruthy()
  })

  it("renders with stacked option", () => {
    const { container } = render(
      <AreaChart data={sampleData} config={config} indexKey="month" stacked />
    )
    expect(container).toBeTruthy()
  })
})
