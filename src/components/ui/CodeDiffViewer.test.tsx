import { createRef } from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect, vi } from "vitest"
import { CodeDiffViewer, type DiffHunk } from "./CodeDiffViewer"

const mockHunks: DiffHunk[] = [
  {
    changes: [
      { type: "context", content: "import React from 'react'", lineNumber: 1 },
      { type: "remove", content: "const old = true", lineNumber: 2 },
      { type: "add", content: "const updated = true", lineNumber: 2 },
      { type: "context", content: "export default App", lineNumber: 3 },
    ],
  },
]

describe("CodeDiffViewer", () => {
  it("renders file path", () => {
    render(<CodeDiffViewer filePath="src/App.tsx" hunks={mockHunks} />)
    expect(screen.getByText("src/App.tsx")).toBeInTheDocument()
  })

  it("renders language badge when provided", () => {
    render(<CodeDiffViewer filePath="src/App.tsx" language="tsx" hunks={mockHunks} />)
    expect(screen.getByText("tsx")).toBeInTheDocument()
  })

  it("renders diff lines", () => {
    render(<CodeDiffViewer filePath="src/App.tsx" hunks={mockHunks} />)
    expect(screen.getByText("import React from 'react'")).toBeInTheDocument()
    expect(screen.getByText("const old = true")).toBeInTheDocument()
    expect(screen.getByText("const updated = true")).toBeInTheDocument()
  })

  it("renders line numbers", () => {
    render(<CodeDiffViewer filePath="src/App.tsx" hunks={mockHunks} />)
    expect(screen.getAllByText("1")).toHaveLength(1)
  })

  it("applies addition styling", () => {
    const { container } = render(<CodeDiffViewer filePath="f" hunks={mockHunks} />)
    const addLine = container.querySelector(".bg-success\\/10")
    expect(addLine).toBeInTheDocument()
  })

  it("applies removal styling", () => {
    const { container } = render(<CodeDiffViewer filePath="f" hunks={mockHunks} />)
    const removeLine = container.querySelector(".bg-destructive\\/10")
    expect(removeLine).toBeInTheDocument()
  })

  it("renders accept/reject buttons when callbacks provided", () => {
    render(
      <CodeDiffViewer
        filePath="f"
        hunks={mockHunks}
        onAccept={() => {}}
        onReject={() => {}}
      />
    )
    expect(screen.getByText("Accept")).toBeInTheDocument()
    expect(screen.getByText("Reject")).toBeInTheDocument()
  })

  it("calls onAccept with hunk index", async () => {
    const onAccept = vi.fn()
    const user = userEvent.setup()
    render(<CodeDiffViewer filePath="f" hunks={mockHunks} onAccept={onAccept} />)

    await user.click(screen.getByLabelText("Accept hunk 1"))
    expect(onAccept).toHaveBeenCalledWith(0)
  })

  it("calls onReject with hunk index", async () => {
    const onReject = vi.fn()
    const user = userEvent.setup()
    render(<CodeDiffViewer filePath="f" hunks={mockHunks} onReject={onReject} />)

    await user.click(screen.getByLabelText("Reject hunk 1"))
    expect(onReject).toHaveBeenCalledWith(0)
  })

  it("does not render action buttons without callbacks", () => {
    render(<CodeDiffViewer filePath="f" hunks={mockHunks} />)
    expect(screen.queryByText("Accept")).not.toBeInTheDocument()
    expect(screen.queryByText("Reject")).not.toBeInTheDocument()
  })

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>()
    render(<CodeDiffViewer ref={ref} filePath="f" hunks={mockHunks} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it("applies custom className", () => {
    const { container } = render(
      <CodeDiffViewer filePath="f" hunks={mockHunks} className="custom" />
    )
    expect(container.firstChild).toHaveClass("custom")
  })
})
