import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { ThemeProvider } from "@/lib/ThemeProvider"
import { Footer } from "./FooterBlock"

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
)

describe("Footer", () => {
  it("renders without crashing", () => {
    render(<Footer />, { wrapper })
    expect(screen.getByText("Nadicode")).toBeInTheDocument()
  })

  it("renders section headings", () => {
    render(<Footer />, { wrapper })
    expect(screen.getByText("Product")).toBeInTheDocument()
    expect(screen.getByText("Company")).toBeInTheDocument()
    expect(screen.getByText("Legal")).toBeInTheDocument()
  })

  it("renders subscribe button", () => {
    render(<Footer />, { wrapper })
    expect(screen.getByText("Subscribe")).toBeInTheDocument()
  })

  it("renders copyright notice", () => {
    render(<Footer />, { wrapper })
    expect(screen.getByText(/All rights reserved/)).toBeInTheDocument()
  })
})
