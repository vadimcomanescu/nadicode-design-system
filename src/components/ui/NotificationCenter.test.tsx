import { createRef } from "react";
import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { NotificationCenter, type Notification } from "./NotificationCenter"

const mockNotifications: Notification[] = [
  { id: "1", title: "Build completed", type: "success", read: false },
  { id: "2", title: "Disk usage warning", description: "90% capacity", type: "warning", read: true },
]

describe("NotificationCenter", () => {
  it("renders all notifications", () => {
    render(<NotificationCenter notifications={mockNotifications} />)
    expect(screen.getByText("Build completed")).toBeInTheDocument()
    expect(screen.getByText("Disk usage warning")).toBeInTheDocument()
  })

  it("shows unread count badge", () => {
    render(<NotificationCenter notifications={mockNotifications} />)
    expect(screen.getByText("1")).toBeInTheDocument()
  })

  it("shows empty message when no notifications", () => {
    render(<NotificationCenter notifications={[]} />)
    expect(screen.getByText("No notifications")).toBeInTheDocument()
  })

  it("supports custom empty message", () => {
    render(<NotificationCenter notifications={[]} emptyMessage="All clear!" />)
    expect(screen.getByText("All clear!")).toBeInTheDocument()
  })

  it("calls onDismiss with notification id", async () => {
    const user = userEvent.setup()
    const onDismiss = vi.fn()
    render(<NotificationCenter notifications={mockNotifications} onDismiss={onDismiss} />)

    const dismissButtons = screen.getAllByLabelText(/Dismiss notification/)
    await user.click(dismissButtons[0])
    expect(onDismiss).toHaveBeenCalledWith("1")
  })

  it("calls onNotificationClick when clicked", async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(
      <NotificationCenter
        notifications={mockNotifications}
        onNotificationClick={onClick}
      />
    )

    await user.click(screen.getByText("Build completed"))
    expect(onClick).toHaveBeenCalledWith(mockNotifications[0])
  })

  it("has accessible region role", () => {
    render(<NotificationCenter notifications={[]} />)
    expect(screen.getByRole("region")).toHaveAttribute(
      "aria-label",
      "Notification center"
    )
  })

  it("forwards ref", () => {
    const ref = createRef<HTMLDivElement>()
    render(<NotificationCenter ref={ref} notifications={[]} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})
