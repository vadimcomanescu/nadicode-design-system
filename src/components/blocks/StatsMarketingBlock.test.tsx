import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { ThemeProvider } from "@/lib/ThemeProvider"
import { StatsSection } from "./StatsMarketingBlock"

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
)

describe("StatsSection", () => {
  it("renders without crashing", () => {
    render(<StatsSection />, { wrapper })
    expect(screen.getByText("Nadicode in numbers")).toBeInTheDocument()
  })

  it("renders stat labels", () => {
    render(<StatsSection />, { wrapper })
    expect(screen.getByText("Stars on GitHub")).toBeInTheDocument()
    expect(screen.getByText("Active Users")).toBeInTheDocument()
    expect(screen.getByText("Powered Apps")).toBeInTheDocument()
  })
})
