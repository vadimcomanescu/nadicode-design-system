import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { ThemeProvider } from "@/lib/ThemeProvider"
import { LogoCloud, Testimonials } from "./SocialProofBlock"

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
)

describe("LogoCloud (SocialProofBlock)", () => {
  it("renders without crashing", () => {
    render(<LogoCloud />, { wrapper })
    expect(screen.getByText("Trusted by innovative teams")).toBeInTheDocument()
  })

  it("renders logo names", () => {
    render(<LogoCloud />, { wrapper })
    expect(screen.getByText("Vercel")).toBeInTheDocument()
    expect(screen.getByText("Stripe")).toBeInTheDocument()
  })
})

describe("Testimonials (SocialProofBlock)", () => {
  it("renders without crashing", () => {
    render(<Testimonials />, { wrapper })
    expect(screen.getByText(/Seed has completely transformed/)).toBeInTheDocument()
  })

  it("renders author names", () => {
    render(<Testimonials />, { wrapper })
    expect(screen.getByText("Sarah Chen")).toBeInTheDocument()
    expect(screen.getByText("Marcus Rodriguez")).toBeInTheDocument()
  })
})
