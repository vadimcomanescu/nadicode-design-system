import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BlocksShowcase } from "./BlocksShowcase";
import { ThemeProvider } from "@/lib/ThemeProvider";

describe("BlocksShowcase", () => {
  it("renders without crashing and shows section headings", () => {
    render(
      <ThemeProvider>
        <BlocksShowcase />
      </ThemeProvider>
    );
    expect(screen.getAllByText("Marketing").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Authentication").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Application").length).toBeGreaterThan(0);
    expect(screen.getByText("AI & Voice")).toBeInTheDocument();
  });
});
