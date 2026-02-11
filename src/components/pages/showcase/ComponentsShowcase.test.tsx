import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ComponentsShowcase } from "./ComponentsShowcase";
import { ThemeProvider } from "@/lib/ThemeProvider";

describe("ComponentsShowcase", () => {
  it("renders without crashing and shows section headings", () => {
    render(
      <ThemeProvider>
        <ComponentsShowcase
          toast={vi.fn()}
          date={new Date()}
          setDate={vi.fn()}
          progress={13}
        />
      </ThemeProvider>
    );
    expect(screen.getByText("Actions & Indicators")).toBeInTheDocument();
    expect(screen.getByText("Data Entry")).toBeInTheDocument();
    expect(screen.getByText("Overlays & Feedback")).toBeInTheDocument();
  });
});
