import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import React from "react"
import { AudioWaveform } from "./AudioWaveform"

describe("AudioWaveform", () => {
  it("renders with accessible role and label", () => {
    render(<AudioWaveform />)
    expect(screen.getByRole("img")).toHaveAttribute(
      "aria-label",
      "Audio waveform inactive"
    )
  })

  it("updates aria-label when active", () => {
    render(<AudioWaveform active />)
    expect(screen.getByRole("img")).toHaveAttribute(
      "aria-label",
      "Audio waveform active"
    )
  })

  it("renders correct number of bars", () => {
    const { container } = render(<AudioWaveform bars={12} />)
    const bars = container.querySelectorAll("[aria-hidden='true']")
    expect(bars).toHaveLength(12)
  })

  it("defaults to 24 bars", () => {
    const { container } = render(<AudioWaveform />)
    const bars = container.querySelectorAll("[aria-hidden='true']")
    expect(bars).toHaveLength(24)
  })

  it("forwards ref", () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<AudioWaveform ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})
