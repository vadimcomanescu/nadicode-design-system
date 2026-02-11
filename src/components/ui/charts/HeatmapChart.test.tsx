import { describe, it, expect, beforeAll } from "vitest"
import { render } from "@testing-library/react"
import { HeatmapChart } from "./HeatmapChart"
import type { ChartConfig } from "../Chart"

beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
})

const sampleData = [
  { x: "Mon", y: "AM", value: 10 },
  { x: "Mon", y: "PM", value: 25 },
  { x: "Tue", y: "AM", value: 15 },
  { x: "Tue", y: "PM", value: 30 },
]

const config: ChartConfig = {
  value: { label: "Activity", color: "rgb(59 130 246)" },
}

describe("HeatmapChart", () => {
  it("renders with sample data", () => {
    const { container } = render(
      <HeatmapChart data={sampleData} config={config} />
    )
    expect(container).toBeTruthy()
  })

  it("renders with empty data", () => {
    const { container } = render(
      <HeatmapChart data={[]} config={config} />
    )
    expect(container).toBeTruthy()
  })
})
