import { createRef } from "react"
import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { FlipWords } from "./FlipWords"

describe("FlipWords", () => {
  it("renders the first word", () => {
    render(<FlipWords words={["hello", "world"]} />)
    expect(screen.getByText("hello")).toBeInTheDocument()
  })

  it("renders single word without animation", () => {
    render(<FlipWords words={["only"]} />)
    expect(screen.getByText("only")).toBeInTheDocument()
  })

  it("forwards ref", () => {
    const ref = createRef<HTMLSpanElement>()
    render(<FlipWords ref={ref} words={["test"]} />)
    expect(ref.current).toBeInstanceOf(HTMLSpanElement)
  })

  it("applies custom className to the wrapper", () => {
    const ref = createRef<HTMLSpanElement>()
    render(<FlipWords ref={ref} words={["styled"]} className="my-class" />)
    expect(ref.current).toHaveClass("my-class")
  })
})
