import { createRef } from "react"
import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { WorkflowGraph } from "./WorkflowGraph"

const nodes = [
  { id: "a", label: "Plan", status: "done" as const },
  { id: "b", label: "Code", status: "active" as const },
  { id: "c", label: "Test", status: "pending" as const },
]

const edges = [
  { from: "a", to: "b" },
  { from: "b", to: "c" },
]

describe("WorkflowGraph", () => {
  it("renders all node labels", () => {
    render(<WorkflowGraph nodes={nodes} edges={edges} />)
    expect(screen.getByText("Plan")).toBeInTheDocument()
    expect(screen.getByText("Code")).toBeInTheDocument()
    expect(screen.getByText("Test")).toBeInTheDocument()
  })

  it("applies active status styling", () => {
    render(<WorkflowGraph nodes={nodes} edges={edges} />)
    const codeNode = screen.getByText("Code")
    expect(codeNode).toHaveClass("border-accent")
  })

  it("applies done status styling", () => {
    render(<WorkflowGraph nodes={nodes} edges={edges} />)
    const planNode = screen.getByText("Plan")
    expect(planNode).toHaveClass("border-success/40")
  })

  it("applies pending status styling", () => {
    render(<WorkflowGraph nodes={nodes} edges={edges} />)
    const testNode = screen.getByText("Test")
    expect(testNode).toHaveClass("border-border")
  })

  it("has accessible role", () => {
    render(<WorkflowGraph nodes={nodes} edges={edges} />)
    expect(screen.getByRole("img")).toBeInTheDocument()
  })

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>()
    render(<WorkflowGraph ref={ref} nodes={nodes} edges={edges} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it("applies custom className", () => {
    const { container } = render(
      <WorkflowGraph nodes={nodes} edges={edges} className="my-class" />
    )
    expect(container.firstChild).toHaveClass("my-class")
  })
})
