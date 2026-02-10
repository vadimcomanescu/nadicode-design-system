import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { Avatar3D } from "./Avatar3D"

describe("Avatar3D", () => {
  const defaultProps = {
    src: "/test-avatar.png",
    name: "Test Agent",
  }

  it("renders with image and name as aria-label", () => {
    render(<Avatar3D {...defaultProps} />)
    expect(screen.getByRole("button")).toHaveAttribute("aria-label", "Test Agent")
    expect(screen.getByAltText("Test Agent")).toBeInTheDocument()
  })

  it("applies speaking state classes", () => {
    const { container } = render(<Avatar3D {...defaultProps} state="speaking" />)
    expect(container.querySelector(".avatar-3d-speaking")).toBeInTheDocument()
    expect(container.querySelector(".ring-accent")).toBeInTheDocument()
  })

  it("applies listening state classes", () => {
    const { container } = render(<Avatar3D {...defaultProps} state="listening" />)
    expect(container.querySelector(".avatar-3d-listening")).toBeInTheDocument()
  })

  it("calls onSelect when clicked", () => {
    const handleSelect = vi.fn()
    render(<Avatar3D {...defaultProps} onSelect={handleSelect} />)
    fireEvent.click(screen.getByRole("button"))
    expect(handleSelect).toHaveBeenCalledOnce()
  })

  it("applies size variants correctly", () => {
    const { container, rerender } = render(<Avatar3D {...defaultProps} size="md" />)
    expect(container.querySelector(".h-\\[80px\\]")).toBeInTheDocument()

    rerender(<Avatar3D {...defaultProps} size="xl" />)
    expect(container.querySelector(".h-\\[200px\\]")).toBeInTheDocument()
  })
})
