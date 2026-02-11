import { createRef } from "react"
import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { TextReveal } from "./TextReveal"

describe("TextReveal", () => {
  it("renders the text content", () => {
    render(<TextReveal text="Hello World" />)
    expect(screen.getByText(/Hello/)).toBeInTheDocument()
  })

  it("splits by word by default", () => {
    const { container } = render(<TextReveal text="one two three" />)
    const spans = container.querySelectorAll("span > span")
    expect(spans.length).toBe(3)
  })

  it("splits by character when by='char'", () => {
    const { container } = render(<TextReveal text="abc" by="char" />)
    const spans = container.querySelectorAll("span > span")
    expect(spans.length).toBe(3)
  })

  it("forwards ref", () => {
    const ref = createRef<HTMLSpanElement>()
    render(<TextReveal ref={ref} text="Ref test" />)
    expect(ref.current).toBeInstanceOf(HTMLSpanElement)
  })

  it("applies custom className", () => {
    const ref = createRef<HTMLSpanElement>()
    render(<TextReveal ref={ref} text="Styled" className="my-class" />)
    expect(ref.current).toHaveClass("my-class")
  })
})
