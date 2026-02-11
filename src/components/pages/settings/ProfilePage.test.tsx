import { describe, it, expect, beforeAll } from "vitest"
import { render } from "@testing-library/react"
import { ThemeProvider } from "@/lib/ThemeProvider"
import { ProfilePage } from "./ProfilePage"

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

describe("ProfilePage", () => {
  it("renders without crashing", () => {
    const { container } = render(
      <ThemeProvider>
        <ProfilePage />
      </ThemeProvider>
    )
    expect(container).toBeTruthy()
  })
})
