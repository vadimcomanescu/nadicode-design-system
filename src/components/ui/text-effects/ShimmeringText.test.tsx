import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { ShimmeringText } from "./ShimmeringText"

describe("ShimmeringText", () => {
  it("renders the text characters", () => {
    const { container } = render(<ShimmeringText text="Hello" />)
    expect(container.textContent).toBe("Hello")
  })

  it("renders one span per character", () => {
    const { container } = render(<ShimmeringText text="Hi" />)
    // Outer motion.span + 2 inner character motion.spans
    const innerSpans = container.querySelectorAll("span > span")
    expect(innerSpans.length).toBe(2)
  })

  it("renders with wave mode", () => {
    const { container } = render(<ShimmeringText text="Wave" wave />)
    expect(container.textContent).toBe("Wave")
  })
})
