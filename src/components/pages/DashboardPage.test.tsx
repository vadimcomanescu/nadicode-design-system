import { describe, it, expect, beforeAll } from "vitest"
import { render } from "@testing-library/react"
import { ThemeProvider } from "@/lib/ThemeProvider"
import { DashboardPage } from "./DashboardPage"

beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
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

describe("DashboardPage", () => {
  it("renders without crashing", () => {
    const { container } = render(
      <ThemeProvider>
        <DashboardPage />
      </ThemeProvider>
    )
    expect(container).toBeTruthy()
  })
})
