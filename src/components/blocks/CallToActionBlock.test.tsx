import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { ThemeProvider } from "@/lib/ThemeProvider"
import { CallToAction } from "./CallToActionBlock"

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
)

describe("CallToAction", () => {
  it("renders without crashing", () => {
    render(<CallToAction />, { wrapper })
    expect(screen.getByText("Get Started")).toBeInTheDocument()
  })

  it("renders book demo button", () => {
    render(<CallToAction />, { wrapper })
    expect(screen.getByText("Book Demo")).toBeInTheDocument()
  })
})
