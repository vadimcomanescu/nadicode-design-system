import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { PixelReveal } from "./PixelReveal"

describe("PixelReveal", () => {
  it("renders without crashing", () => {
    const { container } = render(<PixelReveal text="Hello" />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it("renders as span by default", () => {
    const { container } = render(<PixelReveal text="Hello" />)
    expect(container.firstChild?.nodeName).toBe("SPAN")
  })

  it("renders with custom element type", () => {
    const { container } = render(<PixelReveal text="Div" as="div" />)
    expect(container.firstChild?.nodeName).toBe("DIV")
  })

  it("applies custom className", () => {
    const { container } = render(<PixelReveal text="Styled" className="my-class" />)
    expect(container.firstChild).toHaveClass("my-class")
  })
})
