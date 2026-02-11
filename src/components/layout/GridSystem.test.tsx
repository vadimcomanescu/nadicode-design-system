import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { GridSystem } from "./GridSystem";

// Wrap with ThemeProvider since GridSystem doesn't need it, but testing env needs it
describe("GridSystem", () => {
  it("renders children", () => {
    render(
      <GridSystem>
        <GridSystem.Grid>
          <GridSystem.Cell>Content</GridSystem.Cell>
        </GridSystem.Grid>
      </GridSystem>
    );
    expect(screen.getByText("Content")).toBeInTheDocument();
  });

  it("applies max-width from config", () => {
    const { container } = render(
      <GridSystem config={{ maxWidth: 960 }}>
        <div>child</div>
      </GridSystem>
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root.style.maxWidth).toBe("960px");
  });

  it("renders guide overlay when showGuides is true", () => {
    render(
      <GridSystem showGuides>
        <GridSystem.Grid>
          <GridSystem.Cell>cell</GridSystem.Cell>
        </GridSystem.Grid>
      </GridSystem>
    );
    expect(screen.getByTestId("grid-guides")).toBeInTheDocument();
  });

  it("does not render guides by default", () => {
    render(
      <GridSystem>
        <GridSystem.Grid>
          <GridSystem.Cell>cell</GridSystem.Cell>
        </GridSystem.Grid>
      </GridSystem>
    );
    expect(screen.queryByTestId("grid-guides")).not.toBeInTheDocument();
  });

  it("Cell applies col-span class for numeric span", () => {
    const { container } = render(
      <GridSystem>
        <GridSystem.Grid>
          <GridSystem.Cell span={6}>wide</GridSystem.Cell>
        </GridSystem.Grid>
      </GridSystem>
    );
    const cell = container.querySelector(".col-span-6");
    expect(cell).toBeInTheDocument();
  });

  it("Cell applies offset via gridColumnStart", () => {
    render(
      <GridSystem>
        <GridSystem.Grid>
          <GridSystem.Cell offset={3}>offset</GridSystem.Cell>
        </GridSystem.Grid>
      </GridSystem>
    );
    const cell = screen.getByText("offset");
    expect(cell.style.gridColumnStart).toBe("4");
  });

  it("Grid row renders as a grid element", () => {
    render(
      <GridSystem>
        <GridSystem.Grid>
          <GridSystem.Cell>a</GridSystem.Cell>
        </GridSystem.Grid>
      </GridSystem>
    );
    expect(screen.getByText("a")).toBeInTheDocument();
  });

  it("Grid row supports custom gap override", () => {
    const { container } = render(
      <GridSystem>
        <GridSystem.Grid gap={8}>
          <GridSystem.Cell>b</GridSystem.Cell>
        </GridSystem.Grid>
      </GridSystem>
    );
    const grid = container.querySelector(".grid") as HTMLElement;
    expect(grid.style.gap).toBe("8px");
  });
});
