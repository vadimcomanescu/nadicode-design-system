import { createRef } from "react"
import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { AnimatedGradientText } from "./AnimatedGradientText"

describe("AnimatedGradientText", () => {
  it("renders children", () => {
    render(<AnimatedGradientText>Hello World</AnimatedGradientText>)
    expect(screen.getByText("Hello World")).toBeInTheDocument()
  })

  it("renders as a span element", () => {
    render(<AnimatedGradientText>Test</AnimatedGradientText>)
    expect(screen.getByText("Test").tagName).toBe("SPAN")
  })

  it("forwards ref", () => {
    const ref = createRef<HTMLSpanElement>()
    render(<AnimatedGradientText ref={ref}>Ref</AnimatedGradientText>)
    expect(ref.current).toBeInstanceOf(HTMLSpanElement)
  })

  it("applies custom className", () => {
    render(<AnimatedGradientText className="custom-class">Styled</AnimatedGradientText>)
    expect(screen.getByText("Styled")).toHaveClass("custom-class")
  })
})
