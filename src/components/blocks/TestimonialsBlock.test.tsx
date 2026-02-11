import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Testimonials } from "./TestimonialsBlock"

describe("Testimonials", () => {
  it("renders without crashing", () => {
    render(<Testimonials />)
    expect(screen.getByText(/Build by makers/)).toBeInTheDocument()
  })

  it("renders testimonial quotes", () => {
    render(<Testimonials />)
    expect(screen.getByText(/Tailus has transformed/)).toBeInTheDocument()
  })

  it("renders author names", () => {
    render(<Testimonials />)
    expect(screen.getByText(/Méschac Irung/)).toBeInTheDocument()
  })
})
