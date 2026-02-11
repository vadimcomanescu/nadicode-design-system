import { describe, it, expect, beforeEach } from "vitest"
import { render, screen } from "@testing-library/react"
import { MorphingText } from "./MorphingText"

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

describe("MorphingText", () => {
  it("renders with string text", () => {
    render(<MorphingText text="Hello" />)
    expect(screen.getByLabelText("Hello")).toBeInTheDocument()
  })

  it("renders with array text showing first item", () => {
    render(<MorphingText text={["First", "Second"]} />)
    expect(screen.getByLabelText("First")).toBeInTheDocument()
  })

  it("renders individual characters as aria-hidden spans", () => {
    const { container } = render(<MorphingText text="Hi" />)
    const hiddenSpans = container.querySelectorAll('[aria-hidden="true"]')
    expect(hiddenSpans.length).toBe(2)
  })
})
