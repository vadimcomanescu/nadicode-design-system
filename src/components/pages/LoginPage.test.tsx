import { describe, it, expect, beforeAll } from "vitest"
import { render } from "@testing-library/react"
import { ThemeProvider } from "@/lib/ThemeProvider"
import { LoginPage } from "./LoginPage"

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

describe("LoginPage", () => {
  it("renders without crashing", () => {
    const { container } = render(
      <ThemeProvider>
        <LoginPage />
      </ThemeProvider>
    )
    expect(container).toBeTruthy()
  })
})
