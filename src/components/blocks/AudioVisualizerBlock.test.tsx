import { describe, it, expect } from "vitest"
import { render } from "@testing-library/react"
import { AudioVisualizer } from "./AudioVisualizerBlock"

describe("AudioVisualizer", () => {
  it("renders without crashing", () => {
    const { container } = render(<AudioVisualizer />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it("renders the correct number of bars", () => {
    const { container } = render(<AudioVisualizer bars={10} />)
    // Container div > bar divs (motion.div renders as div)
    const barElements = container.firstElementChild?.children
    expect(barElements?.length).toBe(10)
  })

  it("applies custom className", () => {
    const { container } = render(<AudioVisualizer className="custom" />)
    expect(container.firstChild).toHaveClass("custom")
  })
})
