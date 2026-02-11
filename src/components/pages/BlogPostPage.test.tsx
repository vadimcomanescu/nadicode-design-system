import { describe, it, expect, beforeAll } from "vitest"
import { render } from "@testing-library/react"
import { ThemeProvider } from "@/lib/ThemeProvider"
import { BlogPostPage } from "./BlogPostPage"

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

describe("BlogPostPage", () => {
  it("renders without crashing", () => {
    const { container } = render(
      <ThemeProvider>
        <BlogPostPage />
      </ThemeProvider>
    )
    expect(container).toBeTruthy()
  })
})
