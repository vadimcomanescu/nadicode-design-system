import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Pricing } from "./PricingTableBlock"

describe("Pricing (PricingTableBlock)", () => {
  it("renders without crashing", () => {
    render(<Pricing />)
    expect(screen.getByText(/Pricing that Scales/)).toBeInTheDocument()
  })

  it("renders plan names", () => {
    render(<Pricing />)
    expect(screen.getByText("Free")).toBeInTheDocument()
    expect(screen.getByText("Pro")).toBeInTheDocument()
    expect(screen.getByText("Startup")).toBeInTheDocument()
  })

  it("renders popular badge", () => {
    render(<Pricing />)
    expect(screen.getByText("Popular")).toBeInTheDocument()
  })
})
