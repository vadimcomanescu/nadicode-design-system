import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { ThemeProvider } from "@/lib/ThemeProvider"
import { PricingTable } from "./PricingBlock"

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
)

describe("PricingTable (PricingBlock)", () => {
  it("renders without crashing", () => {
    render(<PricingTable />, { wrapper })
    expect(screen.getByText(/Simple, transparent pricing/)).toBeInTheDocument()
  })

  it("renders plan names", () => {
    render(<PricingTable />, { wrapper })
    expect(screen.getByText("Starter")).toBeInTheDocument()
    expect(screen.getByText("Pro")).toBeInTheDocument()
    expect(screen.getByText("Enterprise")).toBeInTheDocument()
  })

  it("renders Most Popular badge", () => {
    render(<PricingTable />, { wrapper })
    expect(screen.getByText("Most Popular")).toBeInTheDocument()
  })
})
