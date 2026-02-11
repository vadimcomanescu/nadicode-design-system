import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { FoundationsShowcase } from "./FoundationsShowcase";
import { ThemeProvider } from "@/lib/ThemeProvider";

describe("FoundationsShowcase", () => {
  it("renders without crashing and shows section headings", () => {
    render(
      <ThemeProvider>
        <FoundationsShowcase progress={13} />
      </ThemeProvider>
    );
    expect(screen.getByText("Core Principles")).toBeInTheDocument();
    expect(screen.getByText("Typography")).toBeInTheDocument();
    expect(screen.getByText("Colors")).toBeInTheDocument();
    expect(screen.getByText("Grid System")).toBeInTheDocument();
  });
});
