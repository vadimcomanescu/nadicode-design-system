import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { ThemeProvider } from "@/lib/ThemeProvider"
import { NewsletterBlock } from "./NewsletterBlock"

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
)

describe("NewsletterBlock", () => {
  it("renders without crashing", () => {
    render(<NewsletterBlock />, { wrapper })
    expect(screen.getByText("Stay in the loop")).toBeInTheDocument()
  })

  it("renders email input and subscribe button", () => {
    render(<NewsletterBlock />, { wrapper })
    expect(screen.getByPlaceholderText("you@example.com")).toBeInTheDocument()
    expect(screen.getByText("Subscribe")).toBeInTheDocument()
  })

  it("renders custom title", () => {
    render(<NewsletterBlock title="Join Us" />, { wrapper })
    expect(screen.getByText("Join Us")).toBeInTheDocument()
  })
})
