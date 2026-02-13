import { createRef } from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect, vi } from "vitest"
import { MemoryInspector, type MemoryEntry } from "./MemoryInspector"

const mockEntries: MemoryEntry[] = [
  { id: "1", type: "episodic", content: "User asked about login flow", timestamp: "2025-01-15", source: "chat" },
  { id: "2", type: "semantic", content: "React uses virtual DOM for reconciliation", source: "docs" },
  { id: "3", type: "procedural", content: "To deploy: run npm build then push to main" },
]

describe("MemoryInspector", () => {
  it("renders all entries", () => {
    render(<MemoryInspector entries={mockEntries} />)
    expect(screen.getByText("User asked about login flow")).toBeInTheDocument()
    expect(screen.getByText(/React uses virtual DOM/)).toBeInTheDocument()
    expect(screen.getByText(/To deploy/)).toBeInTheDocument()
  })

  it("renders type badges", () => {
    render(<MemoryInspector entries={mockEntries} />)
    expect(screen.getByText("episodic")).toBeInTheDocument()
    expect(screen.getByText("semantic")).toBeInTheDocument()
    expect(screen.getByText("procedural")).toBeInTheDocument()
  })

  it("renders search input", () => {
    render(<MemoryInspector entries={mockEntries} />)
    expect(screen.getByPlaceholderText("Search memories...")).toBeInTheDocument()
  })

  it("filters entries by search query", async () => {
    const user = userEvent.setup()
    render(<MemoryInspector entries={mockEntries} />)

    const input = screen.getByPlaceholderText("Search memories...")
    await user.type(input, "React")

    expect(screen.getByText(/React uses virtual DOM/)).toBeInTheDocument()
    expect(screen.queryByText("User asked about login flow")).not.toBeInTheDocument()
  })

  it("shows empty state when no results", async () => {
    const user = userEvent.setup()
    render(<MemoryInspector entries={mockEntries} />)

    const input = screen.getByPlaceholderText("Search memories...")
    await user.type(input, "zzzznotfound")

    expect(screen.getByText("No memories found")).toBeInTheDocument()
  })

  it("calls onSearch callback", async () => {
    const onSearch = vi.fn()
    const user = userEvent.setup()
    render(<MemoryInspector entries={mockEntries} onSearch={onSearch} />)

    const input = screen.getByPlaceholderText("Search memories...")
    await user.type(input, "ab")

    expect(onSearch).toHaveBeenCalledWith("a")
    expect(onSearch).toHaveBeenCalledWith("ab")
  })

  it("shows timestamp when provided", () => {
    render(<MemoryInspector entries={mockEntries} />)
    expect(screen.getByText("2025-01-15")).toBeInTheDocument()
  })

  it("toggles expanded memory content semantics", async () => {
    const user = userEvent.setup()
    render(<MemoryInspector entries={mockEntries} />)

    const itemButton = screen.getByRole("button", { name: /User asked about login flow/i })
    expect(itemButton).toHaveAttribute("aria-expanded", "false")

    const content = document.getElementById(itemButton.getAttribute("aria-controls")!)
    expect(content).toHaveClass("line-clamp-2")

    await user.click(itemButton)
    expect(itemButton).toHaveAttribute("aria-expanded", "true")
    expect(content).not.toHaveClass("line-clamp-2")
  })

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>()
    render(<MemoryInspector ref={ref} entries={mockEntries} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it("applies custom className", () => {
    const { container } = render(
      <MemoryInspector entries={mockEntries} className="custom" />
    )
    expect(container.firstChild).toHaveClass("custom")
  })
})
