import { describe, it, expect, beforeEach } from "vitest"
import { render, screen } from "@testing-library/react"
import { HighlightText } from "./HighlightText"

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

describe("HighlightText", () => {
  it("renders children text", () => {
    render(<HighlightText>Important</HighlightText>)
    expect(screen.getByText("Important")).toBeInTheDocument()
  })

  it("renders as a span element", () => {
    const { container } = render(<HighlightText>Text</HighlightText>)
    expect(container.firstChild?.nodeName).toBe("SPAN")
  })

  it("applies custom className", () => {
    const { container } = render(<HighlightText className="custom">Styled</HighlightText>)
    expect(container.firstChild).toHaveClass("custom")
  })
})
