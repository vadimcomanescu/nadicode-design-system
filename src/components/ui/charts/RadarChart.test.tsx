import { describe, it, expect, beforeAll } from "vitest"
import { render } from "@testing-library/react"
import { RadarChart } from "./RadarChart"
import type { ChartConfig } from "../Chart"

beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
})

const sampleData = [
  { subject: "Speed", a: 120, b: 110 },
  { subject: "Reliability", a: 98, b: 130 },
  { subject: "Comfort", a: 86, b: 90 },
]

const config: ChartConfig = {
  a: { label: "Series A", color: "rgb(59 130 246)" },
  b: { label: "Series B", color: "rgb(16 185 129)" },
}

describe("RadarChart", () => {
  it("renders with sample data", () => {
    const { container } = render(
      <RadarChart data={sampleData} config={config} indexKey="subject" series={["a", "b"]} />
    )
    expect(container).toBeTruthy()
  })

  it("renders with empty data", () => {
    const { container } = render(
      <RadarChart data={[]} config={config} indexKey="subject" series={["a", "b"]} />
    )
    expect(container).toBeTruthy()
  })

  it("renders with polygon grid shape", () => {
    const { container } = render(
      <RadarChart data={sampleData} config={config} indexKey="subject" series={["a"]} gridShape="polygon" />
    )
    expect(container).toBeTruthy()
  })
})
