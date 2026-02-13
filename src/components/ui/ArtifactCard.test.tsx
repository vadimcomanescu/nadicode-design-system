import { createRef } from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect, vi } from "vitest"
import { ArtifactCard } from "./ArtifactCard"

describe("ArtifactCard", () => {
  it("renders code content with monospace", () => {
    render(<ArtifactCard type="code" content="const x = 1" />)
    expect(screen.getByText("const x = 1")).toBeInTheDocument()
    const pre = screen.getByText("const x = 1").closest("pre")
    expect(pre).toHaveClass("font-mono")
  })

  it("renders title when provided", () => {
    render(<ArtifactCard type="code" content="code" title="main.ts" />)
    expect(screen.getByText("main.ts")).toBeInTheDocument()
  })

  it("renders language badge for code type", () => {
    render(<ArtifactCard type="code" content="code" language="typescript" />)
    expect(screen.getByText("typescript")).toBeInTheDocument()
  })

  it("renders type badge for non-code types", () => {
    render(<ArtifactCard type="markdown" content="# Hello" />)
    expect(screen.getByText("markdown")).toBeInTheDocument()
  })

  it("toggles expand/collapse", async () => {
    const user = userEvent.setup()
    render(<ArtifactCard type="code" content="code" />)

    const expandBtn = screen.getByLabelText("Expand")
    await user.click(expandBtn)
    expect(screen.getByLabelText("Collapse")).toBeInTheDocument()

    await user.click(screen.getByLabelText("Collapse"))
    expect(screen.getByLabelText("Expand")).toBeInTheDocument()
  })

  it("starts expanded when defaultExpanded is true", () => {
    render(<ArtifactCard type="code" content="code" defaultExpanded />)
    expect(screen.getByLabelText("Collapse")).toBeInTheDocument()
  })

  it("calls onCopy when copy button clicked", async () => {
    const onCopy = vi.fn()
    const user = userEvent.setup()
    render(<ArtifactCard type="code" content="code" onCopy={onCopy} />)

    await user.click(screen.getByLabelText("Copy content"))
    expect(onCopy).toHaveBeenCalledOnce()
  })

  it("calls onDownload when download button clicked", async () => {
    const onDownload = vi.fn()
    const user = userEvent.setup()
    render(<ArtifactCard type="code" content="code" onDownload={onDownload} />)

    await user.click(screen.getByLabelText("Download content"))
    expect(onDownload).toHaveBeenCalledOnce()
  })

  it("does not render copy/download buttons when callbacks not provided", () => {
    render(<ArtifactCard type="code" content="code" />)
    expect(screen.queryByLabelText("Copy content")).not.toBeInTheDocument()
    expect(screen.queryByLabelText("Download content")).not.toBeInTheDocument()
  })

  it("renders image type", () => {
    render(<ArtifactCard type="image" content="https://example.com/img.png" />)
    const img = screen.getByRole("img")
    expect(img).toHaveAttribute("src", "https://example.com/img.png")
  })

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>()
    render(<ArtifactCard ref={ref} type="code" content="code" />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it("applies custom className", () => {
    const { container } = render(
      <ArtifactCard type="code" content="code" className="custom" />
    )
    expect(container.firstChild).toHaveClass("custom")
  })
})
