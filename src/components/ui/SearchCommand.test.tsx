import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React from "react"
import { SearchCommand, type SearchResult } from "./SearchCommand"

const mockResults: SearchResult[] = [
  { id: "1", title: "Dashboard", category: "Pages" },
  { id: "2", title: "Settings", description: "App configuration", category: "Pages" },
  { id: "3", title: "Create project", category: "Actions" },
]

describe("SearchCommand", () => {
  it("renders search input with placeholder", () => {
    render(<SearchCommand />)
    expect(screen.getByPlaceholderText("Type a command or search...")).toBeInTheDocument()
  })

  it("renders custom placeholder", () => {
    render(<SearchCommand placeholder="Find anything..." />)
    expect(screen.getByPlaceholderText("Find anything...")).toBeInTheDocument()
  })

  it("displays results grouped by category", () => {
    render(<SearchCommand value="test" results={mockResults} />)
    expect(screen.getByText("Pages")).toBeInTheDocument()
    expect(screen.getByText("Actions")).toBeInTheDocument()
    expect(screen.getByText("Dashboard")).toBeInTheDocument()
  })

  it("shows no results message when value is set but no results", () => {
    render(<SearchCommand value="xyz" results={[]} />)
    expect(screen.getByText("No results found")).toBeInTheDocument()
  })

  it("shows loading state", () => {
    render(<SearchCommand loading />)
    expect(screen.getByText("Searching...")).toBeInTheDocument()
  })

  it("calls onChange when typing", async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<SearchCommand onChange={onChange} />)

    await user.type(screen.getByRole("searchbox"), "hello")
    expect(onChange).toHaveBeenCalledTimes(5)
  })

  it("calls onSelect when a result is clicked", async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    render(<SearchCommand value="d" results={mockResults} onSelect={onSelect} />)

    await user.click(screen.getByText("Dashboard"))
    expect(onSelect).toHaveBeenCalledWith(mockResults[0])
  })

  it("supports keyboard navigation", async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    render(<SearchCommand value="test" results={mockResults} onSelect={onSelect} />)

    const input = screen.getByRole("searchbox")
    await user.click(input)
    await user.keyboard("{ArrowDown}{Enter}")
    expect(onSelect).toHaveBeenCalledWith(mockResults[1])
  })

  it("forwards ref", () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<SearchCommand ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})
