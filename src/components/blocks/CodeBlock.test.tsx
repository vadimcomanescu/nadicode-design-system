import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { ThemeProvider } from "@/lib/ThemeProvider"
import { CodeBlock } from "./CodeBlock"

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
)

describe("CodeBlock", () => {
  it("renders without crashing", () => {
    const { container } = render(<CodeBlock code="hello world" />, { wrapper })
    expect(container.querySelector("code")).toBeInTheDocument()
  })

  it("renders filename when provided", () => {
    render(<CodeBlock code="hello" filename="index.ts" />, { wrapper })
    expect(screen.getByText("index.ts")).toBeInTheDocument()
  })

  it("renders copy button", () => {
    render(<CodeBlock code="copy me" />, { wrapper })
    expect(screen.getByRole("button", { name: /copy code/i })).toBeInTheDocument()
  })
})
