import { describe, it, expect, beforeEach } from "vitest"
import { render } from "@testing-library/react"
import { CountingNumber } from "./CountingNumber"

beforeEach(() => {
  // Mock IntersectionObserver for useIsInView
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

describe("CountingNumber", () => {
  it("renders without crashing", () => {
    const { container } = render(<CountingNumber number={42} />)
    expect(container.querySelector('[data-slot="counting-number"]')).toBeInTheDocument()
  })

  it("renders with initiallyStable showing final number", () => {
    const { container } = render(<CountingNumber number={99} initiallyStable />)
    expect(container.textContent).toBe("99")
  })

  it("renders with data-slot attribute", () => {
    const { container } = render(<CountingNumber number={10} />)
    expect(container.querySelector('[data-slot="counting-number"]')).toBeInTheDocument()
  })

  it("renders decimal places when initiallyStable", () => {
    const { container } = render(<CountingNumber number={3.14} decimalPlaces={2} initiallyStable />)
    expect(container.textContent).toBe("3.14")
  })
})
