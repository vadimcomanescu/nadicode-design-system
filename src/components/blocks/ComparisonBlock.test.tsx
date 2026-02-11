import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { ThemeProvider } from "@/lib/ThemeProvider"
import { ComparisonBlock } from "./ComparisonBlock"

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
)

describe("ComparisonBlock", () => {
  it("renders without crashing", () => {
    render(<ComparisonBlock />, { wrapper })
    expect(screen.getByText("Compare plans")).toBeInTheDocument()
  })

  it("renders plan names in table header", () => {
    render(<ComparisonBlock />, { wrapper })
    expect(screen.getByText("Starter")).toBeInTheDocument()
    expect(screen.getByText("Pro")).toBeInTheDocument()
    expect(screen.getByText("Enterprise")).toBeInTheDocument()
  })

  it("renders feature rows", () => {
    render(<ComparisonBlock />, { wrapper })
    expect(screen.getByText("Dark Mode")).toBeInTheDocument()
    expect(screen.getByText("TypeScript")).toBeInTheDocument()
  })

  it("renders Popular badge on featured plan", () => {
    render(<ComparisonBlock />, { wrapper })
    expect(screen.getByText("Popular")).toBeInTheDocument()
  })
})
