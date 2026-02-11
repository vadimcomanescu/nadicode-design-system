import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { ThemeProvider } from "@/lib/ThemeProvider"
import { FAQBlock } from "./FAQBlock"

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
)

describe("FAQBlock", () => {
  it("renders without crashing", () => {
    render(<FAQBlock />, { wrapper })
    expect(screen.getByText("Frequently asked questions")).toBeInTheDocument()
  })

  it("renders default FAQ items", () => {
    render(<FAQBlock />, { wrapper })
    expect(screen.getByText("What frameworks are supported?")).toBeInTheDocument()
    expect(screen.getByText("Is dark mode supported?")).toBeInTheDocument()
  })

  it("renders custom title", () => {
    render(<FAQBlock title="Custom FAQ" />, { wrapper })
    expect(screen.getByText("Custom FAQ")).toBeInTheDocument()
  })

  it("renders custom items", () => {
    const items = [{ question: "Custom Q?", answer: "Custom A." }]
    render(<FAQBlock items={items} />, { wrapper })
    expect(screen.getByText("Custom Q?")).toBeInTheDocument()
  })
})
