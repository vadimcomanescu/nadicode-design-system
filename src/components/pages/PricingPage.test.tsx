import { describe, it, expect, beforeAll } from "vitest"
import { render } from "@testing-library/react"
import { ThemeProvider } from "@/lib/ThemeProvider"
import { PricingPage } from "./PricingPage"

beforeAll(() => {
  global.IntersectionObserver = class {
    readonly root = null
    readonly rootMargin = ""
    readonly thresholds = [0]
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() { return [] }
  } as unknown as typeof IntersectionObserver
})

describe("PricingPage", () => {
  it("renders without crashing", () => {
    const { container } = render(
      <ThemeProvider>
        <PricingPage />
      </ThemeProvider>
    )
    expect(container).toBeTruthy()
  })
})
