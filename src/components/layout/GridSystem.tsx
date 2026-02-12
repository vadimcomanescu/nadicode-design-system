'use client'

import * as React from "react";
import { cn } from "@/lib/utils";

// ── Grid Config ──

interface GridConfig {
  columns: { xs: number; sm: number; md: number; lg: number; xl: number };
  gutter: { xs: number; sm: number; md: number; lg: number; xl: number };
  margin: { xs: number; sm: number; md: number; lg: number; xl: number | "auto" };
  maxWidth: number;
}

const DEFAULT_CONFIG: GridConfig = {
  columns: { xs: 4, sm: 8, md: 12, lg: 12, xl: 12 },
  gutter: { xs: 16, sm: 20, md: 24, lg: 32, xl: 32 },
  margin: { xs: 16, sm: 24, md: 32, lg: 48, xl: "auto" as const },
  maxWidth: 1280,
};

const GridContext = React.createContext<GridConfig>(DEFAULT_CONFIG);

// ── GridSystem (container) ──

interface GridSystemProps extends React.HTMLAttributes<HTMLDivElement> {
  config?: Partial<GridConfig>;
  showGuides?: boolean;
}

function GridSystemRoot({
  config: configOverride,
  showGuides = false,
  className,
  children,
  style: styleProp,
  ...props
}: GridSystemProps) {
  const config = React.useMemo<GridConfig>(
    () => ({
      ...DEFAULT_CONFIG,
      ...configOverride,
      columns: { ...DEFAULT_CONFIG.columns, ...configOverride?.columns },
      gutter: { ...DEFAULT_CONFIG.gutter, ...configOverride?.gutter },
      margin: { ...DEFAULT_CONFIG.margin, ...configOverride?.margin },
    }),
    [configOverride]
  );

  return (
    <GridContext.Provider value={config}>
      <div
        className={cn("relative mx-auto w-full", className)}
        style={{
          maxWidth: config.maxWidth,
          ...styleProp,
        }}
        {...props}
      >
        {showGuides && <GuideOverlay config={config} />}
        {children}
      </div>
    </GridContext.Provider>
  );
}

// ── Guide overlay (dev-time alignment aid) ──

function GuideOverlay({ config }: { config: GridConfig }) {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-max"
      aria-hidden
      data-testid="grid-guides"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(var(--grid-cols, ${config.columns.md}), 1fr)`,
        gap: `${config.gutter.md}px`,
        paddingInline: typeof config.margin.md === "number" ? `${config.margin.md}px` : undefined,
      }}
    >
      {Array.from({ length: config.columns.md }, (_, i) => (
        <div
          key={i}
          className="h-full bg-accent/5 rounded-sm"
          style={{ minHeight: "100%" }}
        />
      ))}
    </div>
  );
}

// ── Grid (row) ──

interface GridRowProps extends React.HTMLAttributes<HTMLDivElement> {
  gap?: number;
  align?: "start" | "center" | "end" | "stretch";
}

function GridRow({ gap, align = "stretch", className, style: styleProp, ...props }: GridRowProps) {
  const config = React.useContext(GridContext);

  return (
    <div
      className={cn("grid", className)}
      style={{
        gridTemplateColumns: `repeat(var(--grid-cols, ${config.columns.md}), 1fr)`,
        gap: gap != null ? `${gap}px` : `calc(${config.gutter.md}px * var(--grid-gutter-scale, 1))`,
        alignItems: align,
        paddingInline: typeof config.margin.md === "number" ? `${config.margin.md}px` : undefined,
        ...styleProp,
      }}
      {...props}
    />
  );
}

// ── Cell (unit) ──

interface CellProps extends React.HTMLAttributes<HTMLDivElement> {
  span?: number | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number };
  offset?: number;
}

function Cell({ span = 1, offset, className, style: styleProp, ...props }: CellProps) {
  const resolvedSpan = typeof span === "number" ? span : span.md ?? 1;
  const responsiveClasses = typeof span === "object"
    ? [
        span.xs && `col-span-${span.xs}`,
        span.sm && `sm:col-span-${span.sm}`,
        span.md && `md:col-span-${span.md}`,
        span.lg && `lg:col-span-${span.lg}`,
        span.xl && `xl:col-span-${span.xl}`,
      ].filter(Boolean)
    : [];

  return (
    <div
      className={cn(responsiveClasses.length === 0 && `col-span-${resolvedSpan}`, ...responsiveClasses, className)}
      style={{
        ...(offset != null && { gridColumnStart: offset + 1 }),
        ...styleProp,
      }}
      {...props}
    />
  );
}

// ── Compound component ──

export const GridSystem = Object.assign(GridSystemRoot, {
  Grid: GridRow,
  Cell,
});

export type { GridConfig, GridSystemProps, GridRowProps, CellProps };
