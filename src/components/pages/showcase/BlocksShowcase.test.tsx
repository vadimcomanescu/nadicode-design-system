import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BlocksShowcase } from "./BlocksShowcase";
import { ThemeProvider } from "@/lib/ThemeProvider";
import { MemoryRouter } from "react-router-dom";

describe("BlocksShowcase", () => {
  it("renders without crashing and shows section headings", () => {
    render(
      <MemoryRouter>
        <ThemeProvider>
          <BlocksShowcase />
        </ThemeProvider>
      </MemoryRouter>
    );
    expect(screen.getAllByText("Marketing").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Authentication").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Application").length).toBeGreaterThan(0);
    expect(screen.getByText("AI & Voice")).toBeInTheDocument();
  });
});
