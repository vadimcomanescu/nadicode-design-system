import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { BannerBlock } from "./BannerBlock"

describe("BannerBlock", () => {
  it("renders children text", () => {
    render(<BannerBlock>Important notice</BannerBlock>)
    expect(screen.getByText("Important notice")).toBeInTheDocument()
  })

  it("renders dismiss button by default", () => {
    render(<BannerBlock>Notice</BannerBlock>)
    expect(screen.getByLabelText("Dismiss")).toBeInTheDocument()
  })

  it("hides dismiss button when dismissible is false", () => {
    render(<BannerBlock dismissible={false}>Notice</BannerBlock>)
    expect(screen.queryByLabelText("Dismiss")).not.toBeInTheDocument()
  })

  it("calls onDismiss when dismiss is clicked", async () => {
    const user = userEvent.setup()
    const onDismiss = vi.fn()
    render(<BannerBlock onDismiss={onDismiss}>Notice</BannerBlock>)
    await user.click(screen.getByLabelText("Dismiss"))
    expect(onDismiss).toHaveBeenCalled()
  })
})
