import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { ThemeProvider } from "@/lib/ThemeProvider"
import { CreateBlock } from "./CreateBlock"

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
)

describe("CreateBlock", () => {
  it("renders without crashing", () => {
    render(<CreateBlock />, { wrapper })
    expect(screen.getByText("Create Profile")).toBeInTheDocument()
  })

  it("renders form fields", () => {
    render(<CreateBlock />, { wrapper })
    expect(screen.getByPlaceholderText("shadcn")).toBeInTheDocument()
    expect(screen.getByText("Username")).toBeInTheDocument()
    expect(screen.getByText("Email")).toBeInTheDocument()
    expect(screen.getByText("Bio")).toBeInTheDocument()
  })

  it("renders submit button", () => {
    render(<CreateBlock />, { wrapper })
    expect(screen.getByText("Update profile")).toBeInTheDocument()
  })
})
