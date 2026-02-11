import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { Pricing } from "./PricingTableBlock"

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <MemoryRouter>{children}</MemoryRouter>
)

describe("Pricing (PricingTableBlock)", () => {
  it("renders without crashing", () => {
    render(<Pricing />, { wrapper })
    expect(screen.getByText(/Pricing that Scales/)).toBeInTheDocument()
  })

  it("renders plan names", () => {
    render(<Pricing />, { wrapper })
    expect(screen.getByText("Free")).toBeInTheDocument()
    expect(screen.getByText("Pro")).toBeInTheDocument()
    expect(screen.getByText("Startup")).toBeInTheDocument()
  })

  it("renders popular badge", () => {
    render(<Pricing />, { wrapper })
    expect(screen.getByText("Popular")).toBeInTheDocument()
  })
})
