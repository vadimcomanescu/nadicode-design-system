import { createRef } from "react";
import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { FileUpload, type UploadedFile } from "./FileUpload"

describe("FileUpload", () => {
  it("renders upload trigger with accessible label", () => {
    render(<FileUpload />)
    expect(screen.getByRole("button", { name: "Upload files" })).toBeInTheDocument()
  })

  it("shows helper text", () => {
    render(<FileUpload helperText="PDF, PNG, JPG" />)
    expect(screen.getByText("PDF, PNG, JPG")).toBeInTheDocument()
  })

  it("shows max size hint", () => {
    render(<FileUpload maxSize={5 * 1024 * 1024} />)
    expect(screen.getByText("Max size: 5.0 MB")).toBeInTheDocument()
  })

  it("renders uploaded files list", () => {
    const files: UploadedFile[] = [
      { name: "report.pdf", size: 1024 * 100, type: "application/pdf" },
      { name: "photo.jpg", size: 2048 * 1024, type: "image/jpeg" },
    ]
    render(<FileUpload files={files} />)
    expect(screen.getByText("report.pdf")).toBeInTheDocument()
    expect(screen.getByText("photo.jpg")).toBeInTheDocument()
  })

  it("calls onRemove when remove button is clicked", async () => {
    const user = userEvent.setup()
    const onRemove = vi.fn()
    const files: UploadedFile[] = [
      { name: "doc.txt", size: 500, type: "text/plain" },
    ]
    render(<FileUpload files={files} onRemove={onRemove} />)

    await user.click(screen.getByLabelText("Remove doc.txt"))
    expect(onRemove).toHaveBeenCalledWith(0)
  })

  it("disables interaction when disabled", () => {
    render(<FileUpload disabled />)
    expect(screen.getByRole("button", { name: "Upload files" })).toHaveAttribute(
      "tabindex",
      "-1"
    )
  })

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>()
    render(<FileUpload ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})
