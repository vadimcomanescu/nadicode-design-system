import { createRef } from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect, vi } from "vitest"
import { ApprovalCard } from "./ApprovalCard"

describe("ApprovalCard", () => {
  it("renders title", () => {
    render(<ApprovalCard title="Delete file?" />)
    expect(screen.getByText("Delete file?")).toBeInTheDocument()
  })

  it("renders description", () => {
    render(<ApprovalCard title="Delete" description="This is permanent" />)
    expect(screen.getByText("This is permanent")).toBeInTheDocument()
  })

  it("applies low risk variant", () => {
    const { container } = render(
      <ApprovalCard title="Action" riskLevel="low" />
    )
    expect(container.firstChild).toHaveClass("border-success/40")
  })

  it("applies high risk variant", () => {
    const { container } = render(
      <ApprovalCard title="Action" riskLevel="high" />
    )
    expect(container.firstChild).toHaveClass("border-destructive/40")
  })

  it("calls onApprove", async () => {
    const onApprove = vi.fn()
    const user = userEvent.setup()
    render(<ApprovalCard title="Action" onApprove={onApprove} />)
    await user.click(screen.getByText("Approve"))
    expect(onApprove).toHaveBeenCalledOnce()
  })

  it("calls onReject", async () => {
    const onReject = vi.fn()
    const user = userEvent.setup()
    render(<ApprovalCard title="Action" onReject={onReject} />)
    await user.click(screen.getByText("Reject"))
    expect(onReject).toHaveBeenCalledOnce()
  })

  it("renders timeout countdown", () => {
    render(<ApprovalCard title="Action" timeout={30} />)
    expect(screen.getByText("30s remaining")).toBeInTheDocument()
  })

  it("has alert role", () => {
    render(<ApprovalCard title="Action" />)
    expect(screen.getByRole("alert")).toBeInTheDocument()
  })

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>()
    render(<ApprovalCard ref={ref} title="Action" />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it("applies custom className", () => {
    const { container } = render(
      <ApprovalCard title="Action" className="my-class" />
    )
    expect(container.firstChild).toHaveClass("my-class")
  })
})
