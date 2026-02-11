import { describe, it, expect, beforeEach } from "vitest"
import { render } from "@testing-library/react"
import { SlidingNumber } from "./SlidingNumber"

beforeEach(() => {
  if (!globalThis.IntersectionObserver) {
    globalThis.IntersectionObserver = class IntersectionObserver {
      callback: IntersectionObserverCallback
      constructor(callback: IntersectionObserverCallback) { this.callback = callback }
      observe() {}
      unobserve() {}
      disconnect() {}
      root = null
      rootMargin = ""
      thresholds = [0]
      takeRecords() { return [] }
    }
  }
})

describe("SlidingNumber", () => {
  it("renders without crashing", () => {
    const { container } = render(<SlidingNumber number={42} />)
    expect(container.querySelector('[data-slot="sliding-number"]')).toBeInTheDocument()
  })

  it("renders with initiallyStable", () => {
    const { container } = render(<SlidingNumber number={7} initiallyStable />)
    expect(container.querySelector('[data-slot="sliding-number"]')).toBeInTheDocument()
  })

  it("renders roller elements", () => {
    const { container } = render(<SlidingNumber number={42} initiallyStable />)
    const rollers = container.querySelectorAll('[data-slot="sliding-number-roller"]')
    expect(rollers.length).toBeGreaterThan(0)
  })
})
