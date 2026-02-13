import { createRef } from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect } from "vitest"
import { SourceCitation, type Source } from "./SourceCitation"

const mockSources: Source[] = [
  { id: "1", title: "React Docs", url: "https://react.dev", score: 0.95, snippet: "React is a library for building UIs." },
  { id: "2", title: "MDN Web Docs", score: 0.7, snippet: "Mozilla Developer Network documentation." },
  { id: "3", title: "TypeScript Handbook", score: 0.4 },
]

describe("SourceCitation", () => {
  it("renders all sources in default mode", () => {
    render(<SourceCitation sources={mockSources} />)
    expect(screen.getByText("React Docs")).toBeInTheDocument()
    expect(screen.getByText("MDN Web Docs")).toBeInTheDocument()
    expect(screen.getByText("TypeScript Handbook")).toBeInTheDocument()
  })

  it("renders source count in inline mode", () => {
    render(<SourceCitation sources={mockSources} size="inline" />)
    expect(screen.getByText("3 sources")).toBeInTheDocument()
  })

  it("shows +N when more than 3 sources in inline mode", () => {
    const manySources: Source[] = [
      ...mockSources,
      { id: "4", title: "Fourth Source" },
      { id: "5", title: "Fifth Source" },
    ]
    render(<SourceCitation sources={manySources} size="inline" />)
    expect(screen.getByText("+2")).toBeInTheDocument()
  })

  it("renders url as link", () => {
    render(<SourceCitation sources={mockSources} />)
    const link = screen.getByRole("link", { name: "React Docs" })
    expect(link).toHaveAttribute("href", "https://react.dev")
  })

  it("displays relevance score badge", () => {
    render(<SourceCitation sources={mockSources} />)
    expect(screen.getByText("0.95")).toBeInTheDocument()
    expect(screen.getByText("0.70")).toBeInTheDocument()
  })

  it("toggles snippet on click", async () => {
    const user = userEvent.setup()
    render(<SourceCitation sources={mockSources} />)

    const showButton = screen.getAllByRole("button", { name: "Show snippet" })[0]
    expect(showButton).toHaveAttribute("aria-expanded", "false")
    const panel = document.getElementById(showButton.getAttribute("aria-controls")!)
    expect(panel).toHaveClass("hidden")
    expect(panel).toHaveAttribute("aria-hidden", "true")

    await user.click(showButton)
    expect(showButton).toHaveAttribute("aria-expanded", "true")
    expect(panel).not.toHaveClass("hidden")
    expect(panel).toHaveAttribute("aria-hidden", "false")
    expect(screen.getByText("React is a library for building UIs.")).toBeInTheDocument()

    await user.click(screen.getByRole("button", { name: "Hide snippet" }))
    expect(showButton).toHaveAttribute("aria-expanded", "false")
    expect(panel).toHaveClass("hidden")
    expect(panel).toHaveAttribute("aria-hidden", "true")
  })

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>()
    render(<SourceCitation ref={ref} sources={mockSources} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it("applies custom className", () => {
    const { container } = render(
      <SourceCitation sources={mockSources} className="custom" />
    )
    expect(container.firstChild).toHaveClass("custom")
  })
})
