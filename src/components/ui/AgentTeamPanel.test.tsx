import { createRef } from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect } from "vitest"
import { AgentTeamPanel } from "./AgentTeamPanel"

const agents = [
  { id: "1", name: "Planner", role: "orchestrator", status: "active" as const },
  { id: "2", name: "Coder", role: "developer", status: "idle" as const },
  { id: "3", name: "Reviewer", role: "qa", status: "complete" as const },
]

describe("AgentTeamPanel", () => {
  it("renders agent count header", () => {
    render(<AgentTeamPanel agents={agents} />)
    expect(screen.getByText("Team (3)")).toBeInTheDocument()
  })

  it("renders all agent names", () => {
    render(<AgentTeamPanel agents={agents} />)
    expect(screen.getByText("Planner")).toBeInTheDocument()
    expect(screen.getByText("Coder")).toBeInTheDocument()
    expect(screen.getByText("Reviewer")).toBeInTheDocument()
  })

  it("expands agent details on click", async () => {
    const user = userEvent.setup()
    render(<AgentTeamPanel agents={agents} />)
    const plannerButton = screen.getByRole("button", { name: /Planner/i })
    expect(plannerButton).toHaveAttribute("aria-expanded", "false")

    const detailsId = plannerButton.getAttribute("aria-controls")
    expect(detailsId).toBeTruthy()
    expect(document.getElementById(detailsId!)).toHaveAttribute("aria-hidden", "true")

    await user.click(plannerButton)
    expect(plannerButton).toHaveAttribute("aria-expanded", "true")
    expect(document.getElementById(detailsId!)).toHaveAttribute("aria-hidden", "false")
    expect(screen.getByText("Role: orchestrator")).toBeInTheDocument()
  })

  it("renders avatar when provided", () => {
    const agentsWithAvatar = [
      { ...agents[0], avatar: <div data-testid="av">A</div> },
    ]
    render(<AgentTeamPanel agents={agentsWithAvatar} />)
    expect(screen.getByTestId("av")).toBeInTheDocument()
  })

  it("applies compact size variant", () => {
    const { container } = render(
      <AgentTeamPanel agents={agents} size="compact" />
    )
    expect(container.firstChild).toHaveClass("text-xs")
  })

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>()
    render(<AgentTeamPanel ref={ref} agents={agents} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })

  it("applies custom className", () => {
    const { container } = render(
      <AgentTeamPanel agents={agents} className="my-class" />
    )
    expect(container.firstChild).toHaveClass("my-class")
  })
})
