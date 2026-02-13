import { render, screen, act, cleanup } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, it, expect, beforeEach, vi, afterEach } from "vitest"
import { ThemeProvider, useTheme } from "./ThemeProvider"

function ThemeConsumer() {
  const { theme, resolvedTheme, style, setTheme, setStyle } = useTheme()
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <span data-testid="resolved">{resolvedTheme}</span>
      <span data-testid="style">{style}</span>
      <button onClick={() => setTheme("dark")}>set-dark</button>
      <button onClick={() => setTheme("light")}>set-light</button>
      <button onClick={() => setTheme("system")}>set-system</button>
      <button onClick={() => setStyle("bloom")}>set-bloom</button>
      <button onClick={() => setStyle("arctic")}>set-arctic</button>
    </div>
  )
}

const storage: Record<string, string> = {}

beforeEach(() => {
  for (const key of Object.keys(storage)) delete storage[key]
  vi.stubGlobal("localStorage", {
    getItem: (key: string) => storage[key] ?? null,
    setItem: (key: string, value: string) => {
      storage[key] = value
    },
    removeItem: (key: string) => {
      delete storage[key]
    },
  })
  document.documentElement.classList.remove("light", "dark", "bloom")
})

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
})

describe("ThemeProvider", () => {
  it("should render children", () => {
    render(
      <ThemeProvider>
        <p>child</p>
      </ThemeProvider>
    )
    expect(screen.getByText("child")).toBeInTheDocument()
  })

  it("should default to system theme and arctic style", () => {
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    )
    expect(screen.getByTestId("theme")).toHaveTextContent("system")
    expect(screen.getByTestId("style")).toHaveTextContent("arctic")
  })

  it("should accept custom defaults", () => {
    render(
      <ThemeProvider defaultTheme="dark" defaultStyle="bloom">
        <ThemeConsumer />
      </ThemeProvider>
    )
    expect(screen.getByTestId("theme")).toHaveTextContent("dark")
    expect(screen.getByTestId("style")).toHaveTextContent("bloom")
  })

  it("should resolve system theme based on prefers-color-scheme", () => {
    render(
      <ThemeProvider defaultTheme="system">
        <ThemeConsumer />
      </ThemeProvider>
    )
    // jsdom matchMedia defaults to not matching, so system resolves to light
    expect(screen.getByTestId("resolved")).toHaveTextContent("light")
  })

  it("should switch to dark theme", async () => {
    const user = userEvent.setup()
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    )

    await user.click(screen.getByText("set-dark"))

    expect(screen.getByTestId("theme")).toHaveTextContent("dark")
    expect(screen.getByTestId("resolved")).toHaveTextContent("dark")
    expect(document.documentElement.classList.contains("dark")).toBe(true)
  })

  it("should switch to light theme", async () => {
    const user = userEvent.setup()
    render(
      <ThemeProvider defaultTheme="dark">
        <ThemeConsumer />
      </ThemeProvider>
    )

    await user.click(screen.getByText("set-light"))

    expect(screen.getByTestId("theme")).toHaveTextContent("light")
    expect(screen.getByTestId("resolved")).toHaveTextContent("light")
    expect(document.documentElement.classList.contains("light")).toBe(true)
  })

  it("should persist theme to localStorage", async () => {
    const user = userEvent.setup()
    render(
      <ThemeProvider storageKey="test-theme">
        <ThemeConsumer />
      </ThemeProvider>
    )

    await user.click(screen.getByText("set-dark"))
    expect(storage["test-theme"]).toBe("dark")
  })

  it("should restore theme from localStorage", () => {
    storage["design-system-theme"] = "dark"
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    )
    expect(screen.getByTestId("theme")).toHaveTextContent("dark")
  })

  it("should force light when bloom style is active", async () => {
    const user = userEvent.setup()
    render(
      <ThemeProvider defaultTheme="dark">
        <ThemeConsumer />
      </ThemeProvider>
    )

    await user.click(screen.getByText("set-bloom"))

    expect(screen.getByTestId("style")).toHaveTextContent("bloom")
    expect(screen.getByTestId("resolved")).toHaveTextContent("light")
    expect(document.documentElement.classList.contains("bloom")).toBe(true)
  })

  it("should restore resolved theme when switching from bloom to arctic", async () => {
    const user = userEvent.setup()
    render(
      <ThemeProvider defaultTheme="dark">
        <ThemeConsumer />
      </ThemeProvider>
    )

    await user.click(screen.getByText("set-bloom"))
    expect(screen.getByTestId("resolved")).toHaveTextContent("light")

    await user.click(screen.getByText("set-arctic"))
    expect(screen.getByTestId("resolved")).toHaveTextContent("dark")
    expect(document.documentElement.classList.contains("bloom")).toBe(false)
  })

  it("should persist style to localStorage", async () => {
    const user = userEvent.setup()
    render(
      <ThemeProvider styleStorageKey="test-style">
        <ThemeConsumer />
      </ThemeProvider>
    )

    await user.click(screen.getByText("set-bloom"))
    expect(storage["test-style"]).toBe("bloom")
  })

  it("should restore style from localStorage", () => {
    storage["design-system-style"] = "bloom"
    render(
      <ThemeProvider>
        <ThemeConsumer />
      </ThemeProvider>
    )
    expect(screen.getByTestId("style")).toHaveTextContent("bloom")
  })

  it("should ignore invalid stored theme values", () => {
    storage["design-system-theme"] = "invalid"
    render(
      <ThemeProvider defaultTheme="dark">
        <ThemeConsumer />
      </ThemeProvider>
    )
    expect(screen.getByTestId("theme")).toHaveTextContent("dark")
  })

  it("should ignore invalid stored style values", () => {
    storage["design-system-style"] = "invalid"
    render(
      <ThemeProvider defaultStyle="bloom">
        <ThemeConsumer />
      </ThemeProvider>
    )
    expect(screen.getByTestId("style")).toHaveTextContent("bloom")
  })

  it("should respond to system color-scheme changes when theme is system", async () => {
    let changeHandler: (() => void) | null = null
    const mockMediaQuery = {
      matches: false,
      media: "(prefers-color-scheme: dark)",
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: (_event: string, handler: () => void) => {
        changeHandler = handler
      },
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }
    vi.stubGlobal("matchMedia", () => mockMediaQuery)

    const user = userEvent.setup()
    render(
      <ThemeProvider defaultTheme="dark">
        <ThemeConsumer />
      </ThemeProvider>
    )

    // Switch to system theme to activate the media query listener
    await user.click(screen.getByText("set-system"))
    expect(screen.getByTestId("theme")).toHaveTextContent("system")

    // Simulate the system switching to dark
    mockMediaQuery.matches = true
    act(() => {
      changeHandler!()
    })

    expect(document.documentElement.classList.contains("dark")).toBe(true)
  })

  it("should skip system listener when bloom style is active", async () => {
    const _user = userEvent.setup()
    render(
      <ThemeProvider defaultTheme="system" defaultStyle="bloom">
        <ThemeConsumer />
      </ThemeProvider>
    )
    // Bloom forces light regardless of system theme
    expect(screen.getByTestId("resolved")).toHaveTextContent("light")
  })
})

describe("useTheme", () => {
  it("should throw when used outside ThemeProvider", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {})
    expect(() => render(<ThemeConsumer />)).toThrow(
      "useTheme must be used within a ThemeProvider"
    )
    spy.mockRestore()
  })
})
