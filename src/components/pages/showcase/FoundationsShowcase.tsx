'use client'

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/Card";
import { Typography } from "../../ui/Typography";
import { Grid } from "../../layout/Grid";
import { useTheme } from "@/lib/ThemeProvider";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/Table";
import { SuccessCheck } from "../../ui/SuccessCheck";
import { ConfettiBurst } from "../../ui/ConfettiBurst";
import { SpringHover } from "../../ui/SpringHover";
import { GridSystem } from "../../layout/GridSystem";
import { Button } from "../../ui/Button";

function SuccessCheckDemo() {
  const [key, setKey] = useState(0);
  return (
    <div className="flex flex-col items-center gap-4">
      <SuccessCheck key={key} size={64} />
      <Button variant="outline" size="sm" onClick={() => setKey((k) => k + 1)}>
        Replay
      </Button>
    </div>
  );
}

function ConfettiBurstDemo() {
  const [key, setKey] = useState(0);
  return (
    <div className="flex flex-col items-center gap-4 relative">
      <div className="relative">
        <ConfettiBurst key={key} count={24} />
      </div>
      <Button variant="outline" size="sm" onClick={() => setKey((k) => k + 1)}>
        Burst
      </Button>
    </div>
  );
}

function CombinedDelightDemo() {
  const [key, setKey] = useState(0);
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <SuccessCheck key={key} size={72} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <ConfettiBurst key={`c-${key}`} count={32} spread={120} />
        </div>
      </div>
      <Button variant="accent" size="sm" onClick={() => setKey((k) => k + 1)}>
        Celebrate
      </Button>
    </div>
  );
}

function rgbToHex(rgbStr: string): string {
  const parts = rgbStr.trim().split(/\s+/).map(Number);
  if (parts.length < 3 || parts.some(isNaN)) return "";
  return (
    "#" +
    parts
      .slice(0, 3)
      .map((n) => Math.max(0, Math.min(255, n)).toString(16).padStart(2, "0"))
      .join("")
  );
}

const CSS_VAR_NAMES = [
  "--color-background",
  "--color-surface",
  "--color-surface-active",
  "--color-border",
  "--color-primary",
  "--color-accent",
  "--color-destructive",
  "--chart-1",
  "--chart-2",
  "--chart-3",
  "--chart-4",
  "--chart-5",
] as const;

type CssVarName = (typeof CSS_VAR_NAMES)[number];

function createEmptyColors(): Record<CssVarName, string> {
  const empty = {} as Record<CssVarName, string>;
  for (const v of CSS_VAR_NAMES) empty[v] = "";
  return empty;
}

function useComputedColors(): Record<CssVarName, string> {
  const { resolvedTheme, style } = useTheme();
  void resolvedTheme;
  void style;

  if (typeof window === "undefined") {
    return createEmptyColors();
  }

  const styles = getComputedStyle(document.documentElement);
  const result = {} as Record<CssVarName, string>;
  for (const v of CSS_VAR_NAMES) {
    result[v] = rgbToHex(styles.getPropertyValue(v));
  }
  return result;
}

function ColorCard({
  name,
  cssVar,
  computedColors,
  className,
}: {
  name: string;
  cssVar: CssVarName;
  computedColors: Record<CssVarName, string>;
  className?: string;
}) {
  const hex = computedColors[cssVar];
  return (
    <div className="rounded-lg overflow-hidden border border-border">
      <div className={`h-24 w-full ${className}`}></div>
      <div className="p-3 bg-surface flex items-center justify-between">
        <Typography variant="small" className="font-semibold text-text-primary">{name}</Typography>
        <Typography variant="small" className="text-text-secondary font-sans">{hex}</Typography>
      </div>
    </div>
  );
}

interface FoundationsShowcaseProps {
  progress: number;
}

function FoundationsShowcase({ progress }: FoundationsShowcaseProps) {
  void progress;
  const computedColors = useComputedColors();
  return (
    <>
            <section>
              <Typography variant="h2" className="mb-6 border-b border-border pb-2">Core Principles</Typography>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-primary">
                      <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                      Synthetic AI Aesthetics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Typography variant="body" className="text-text-secondary text-base leading-relaxed">
                      Designed for the next generation of intelligence. Interfaces that feel alive, using deep blacks, subtle glows, and glassmorphism to create a futuristic yet professional environment.
                    </Typography>
                  </CardContent>
                </Card>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-primary">Ultra-Realistic Depth</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Typography variant="body" className="text-text-secondary text-base leading-relaxed">
                      Moving beyond flat design. We use realistic shadows, borders, and lighting to create a tangible sense of depth and hierarchy, making the UI feel grounded and physical.
                    </Typography>
                  </CardContent>
                </Card>
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-primary">High-Contrast Accessibility</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Typography variant="body" className="text-text-secondary text-base leading-relaxed">
                      Beauty does not compromise usability. We prioritize strict contrast ratios ensuring that our &quot;dark mode&quot; is legible, crisp, and accessible to everyone.
                    </Typography>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section>
              <Typography variant="h2" className="mb-8 border-b border-border pb-2">Typography</Typography>

              <div className="mb-8 space-y-2">
                <Typography variant="h3" className="mb-4">Font Family</Typography>
                <div className="flex items-baseline gap-4">
                  <span className="text-3xl font-semibold text-text-primary">Satoshi</span>
                  <Typography variant="muted">sans-serif fallback</Typography>
                </div>
                <Typography variant="body" className="text-text-secondary text-sm !mt-2">
                  A modern geometric sans-serif with clean proportions. Used across all UI text.
                </Typography>
              </div>

              <div className="mb-10">
                <Typography variant="h3" className="mb-4">Type Scale</Typography>
                <div className="border border-border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Variant</TableHead>
                        <TableHead>Element</TableHead>
                        <TableHead className="tabular-nums">Size</TableHead>
                        <TableHead>Weight</TableHead>
                        <TableHead className="tabular-nums">Line Height</TableHead>
                        <TableHead>Tracking</TableHead>
                        <TableHead>Color</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        { variant: "h1", element: "h1", size: "36 / 48px", weight: "800 Extrabold", lh: "1.2", tracking: "-0.025em", color: "primary" },
                        { variant: "h2", element: "h2", size: "30px", weight: "600 Semibold", lh: "1.2", tracking: "-0.025em", color: "primary" },
                        { variant: "h3", element: "h3", size: "24px", weight: "600 Semibold", lh: "1.2", tracking: "-0.025em", color: "primary" },
                        { variant: "h4", element: "h4", size: "20px", weight: "600 Semibold", lh: "1.2", tracking: "-0.025em", color: "primary" },
                        { variant: "body", element: "p", size: "16px", weight: "400 Normal", lh: "28px (1.75)", tracking: "normal", color: "text-primary" },
                        { variant: "small", element: "small", size: "14px", weight: "500 Medium", lh: "1.0", tracking: "normal", color: "text-secondary" },
                        { variant: "muted", element: "p", size: "14px", weight: "400 Normal", lh: "1.43", tracking: "normal", color: "text-tertiary" },
                      ].map((row) => (
                        <TableRow key={row.variant}>
                          <TableCell className="font-mono text-accent">{row.variant}</TableCell>
                          <TableCell className="font-mono text-text-tertiary">&lt;{row.element}&gt;</TableCell>
                          <TableCell className="tabular-nums">{row.size}</TableCell>
                          <TableCell>{row.weight}</TableCell>
                          <TableCell className="tabular-nums">{row.lh}</TableCell>
                          <TableCell className="font-mono text-xs">{row.tracking}</TableCell>
                          <TableCell className="text-text-secondary">{row.color}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div>
                <Typography variant="h3" className="mb-4">Live Preview</Typography>
                <div className="space-y-6 border border-border rounded-lg p-8 bg-surface">
                  {([
                    { v: "h1" as const, label: "h1", text: "Build the future" },
                    { v: "h2" as const, label: "h2", text: "Design at scale" },
                    { v: "h3" as const, label: "h3", text: "Token architecture" },
                    { v: "h4" as const, label: "h4", text: "Component variants" },
                    { v: "body" as const, label: "body", text: "The quick brown fox jumps over the lazy dog. Design systems are essential for scaling consistency across enterprise and consumer applications." },
                    { v: "small" as const, label: "small", text: "Metadata and captions, 14px medium weight." },
                    { v: "muted" as const, label: "muted", text: "Less important information, tertiary color." },
                  ]).map((item) => (
                    <div key={item.label} className="flex items-start gap-6">
                      <span className="font-mono text-xs text-accent w-14 pt-1.5 shrink-0">{item.label}</span>
                      <Typography variant={item.v}>{item.text}</Typography>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section>
              <Typography variant="h2" className="mb-8 border-b border-border pb-2">Colors</Typography>
              <Grid cols={4} gap="md">
                <ColorCard name="Background" cssVar="--color-background" computedColors={computedColors} className="bg-background border border-border" />
                <ColorCard name="Surface" cssVar="--color-surface" computedColors={computedColors} className="bg-surface" />
                <ColorCard name="Surface Active" cssVar="--color-surface-active" computedColors={computedColors} className="bg-surface-active" />
                <ColorCard name="Border" cssVar="--color-border" computedColors={computedColors} className="bg-border" />
                <ColorCard name="Primary" cssVar="--color-primary" computedColors={computedColors} className="bg-primary text-primary-foreground" />
                <ColorCard name="Accent" cssVar="--color-accent" computedColors={computedColors} className="bg-accent text-white" />
                <ColorCard name="Destructive" cssVar="--color-destructive" computedColors={computedColors} className="bg-destructive text-white" />
              </Grid>

              <Typography variant="h3" className="mt-8 mb-4">Data Visualization Palette</Typography>
              <Grid cols={5} gap="md">
                <ColorCard name="Chart 1" cssVar="--chart-1" computedColors={computedColors} className="bg-[rgb(var(--chart-1))]" />
                <ColorCard name="Chart 2" cssVar="--chart-2" computedColors={computedColors} className="bg-[rgb(var(--chart-2))]" />
                <ColorCard name="Chart 3" cssVar="--chart-3" computedColors={computedColors} className="bg-[rgb(var(--chart-3))]" />
                <ColorCard name="Chart 4" cssVar="--chart-4" computedColors={computedColors} className="bg-[rgb(var(--chart-4))]" />
                <ColorCard name="Chart 5" cssVar="--chart-5" computedColors={computedColors} className="bg-[rgb(var(--chart-5))]" />
              </Grid>
            </section>

            <section>
              <Typography variant="h2" className="mb-8 border-b border-border pb-2">Spacing</Typography>
              <Typography variant="body" className="text-text-secondary text-sm !mt-0 mb-6">
                All spacing derives from a <span className="font-mono text-accent">4px</span> base unit. Components and layouts use multiples of this base for consistent vertical and horizontal rhythm.
              </Typography>

              <div className="border border-border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-24"></TableHead>
                      <TableHead className="tabular-nums">px</TableHead>
                      <TableHead className="tabular-nums">rem</TableHead>
                      <TableHead>Tailwind</TableHead>
                      <TableHead>Usage</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { px: 4, rem: "0.25", tw: "p-1, gap-1", usage: "Inline spacing, icon gaps" },
                      { px: 8, rem: "0.5", tw: "p-2, gap-2", usage: "Tight component padding" },
                      { px: 12, rem: "0.75", tw: "p-3, gap-3", usage: "Compact component padding" },
                      { px: 16, rem: "1", tw: "p-4, gap-4", usage: "Default component padding" },
                      { px: 20, rem: "1.25", tw: "p-5", usage: "Comfortable padding" },
                      { px: 24, rem: "1.5", tw: "p-6, gap-6", usage: "Card padding, section gaps" },
                      { px: 32, rem: "2", tw: "p-8, gap-8", usage: "Section padding" },
                      { px: 40, rem: "2.5", tw: "p-10", usage: "Large section padding" },
                      { px: 48, rem: "3", tw: "p-12", usage: "Hero content padding" },
                      { px: 64, rem: "4", tw: "py-16", usage: "Page section spacing" },
                      { px: 80, rem: "5", tw: "py-20", usage: "Large page sections" },
                      { px: 96, rem: "6", tw: "py-24", usage: "Hero and landing sections" },
                    ].map((row) => (
                      <TableRow key={row.px}>
                        <TableCell>
                          <div className="flex items-center h-5">
                            <div
                              className="h-3 rounded-sm bg-accent/30 border border-accent/50"
                              style={{ width: `${Math.min(row.px, 96)}px` }}
                            />
                          </div>
                        </TableCell>
                        <TableCell className="tabular-nums font-mono">{row.px}</TableCell>
                        <TableCell className="tabular-nums font-mono text-text-tertiary">{row.rem}</TableCell>
                        <TableCell className="font-mono text-xs text-accent">{row.tw}</TableCell>
                        <TableCell className="text-text-secondary">{row.usage}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </section>

            <section>
              <Typography variant="h2" className="mb-8 border-b border-border pb-2">Shadow Scale</Typography>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {["shadow-sm", "shadow", "shadow-md", "shadow-lg", "shadow-xl", "shadow-2xl", "shadow-glow", "shadow-glow-accent"].map((shadow) => (
                  <div key={shadow} className={`${shadow} rounded-lg border border-border bg-surface p-6 flex items-center justify-center min-h-[100px]`}>
                    <Typography variant="small" className="text-text-secondary font-mono">{shadow}</Typography>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <Typography variant="h2" className="mb-8 border-b border-border pb-2">Border Radius Scale</Typography>
              <div className="flex flex-wrap items-center gap-6">
                {[
                  { name: "sm (4px)", cls: "rounded-sm" },
                  { name: "md (8px)", cls: "rounded-md" },
                  { name: "lg (16px)", cls: "rounded-lg" },
                  { name: "full", cls: "rounded-full" },
                ].map((r) => (
                  <div key={r.name} className="flex flex-col items-center gap-2">
                    <div className={`h-20 w-20 ${r.cls} bg-accent/20 border-2 border-accent/60`} />
                    <Typography variant="small" className="text-text-secondary">{r.name}</Typography>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <Typography variant="h2" className="mb-8 border-b border-border pb-2">Z-Index Scale</Typography>
              <div className="relative h-64 w-full max-w-lg">
                {[
                  { name: "base (0)", z: "z-0", offset: "top-0 left-0", color: "bg-accent/10 border-accent/30" },
                  { name: "dropdown (50)", z: "z-[50]", offset: "top-6 left-6", color: "bg-info/10 border-info/30" },
                  { name: "sticky (100)", z: "z-[100]", offset: "top-12 left-12", color: "bg-success/10 border-success/30" },
                  { name: "overlay (200)", z: "z-[200]", offset: "top-18 left-18", color: "bg-warning/10 border-warning/30" },
                  { name: "modal (300)", z: "z-[300]", offset: "top-24 left-24", color: "bg-destructive/10 border-destructive/30" },
                  { name: "toast (500)", z: "z-[500]", offset: "top-30 left-30", color: "bg-primary/10 border-primary/30" },
                ].map((layer) => (
                  <div
                    key={layer.name}
                    className={`absolute ${layer.offset} ${layer.z} ${layer.color} w-48 h-20 rounded-lg border backdrop-blur-sm flex items-center justify-center`}
                  >
                    <Typography variant="small" className="text-text-primary font-mono text-xs">{layer.name}</Typography>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <Typography variant="h2" className="mb-8 border-b border-border pb-2">Delight & Motion</Typography>
              <Typography variant="body" className="text-text-secondary mb-8">
                Animated feedback components. Switch between Arctic and Bloom styles using the toggle in the header to see how motion adapts.
              </Typography>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <Card>
                  <CardHeader>
                    <CardTitle>Success Check</CardTitle>
                    <CardDescription>Animated SVG checkmark with spring overshoot</CardDescription>
                  </CardHeader>
                  <CardContent className="flex items-center justify-center py-8">
                    <SuccessCheckDemo />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Confetti Burst</CardTitle>
                    <CardDescription>Particle spray with spring physics</CardDescription>
                  </CardHeader>
                  <CardContent className="flex items-center justify-center py-8">
                    <ConfettiBurstDemo />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Spring Hover</CardTitle>
                    <CardDescription>Interactive spring-based hover & press</CardDescription>
                  </CardHeader>
                  <CardContent className="flex items-center justify-center py-8">
                    <SpringHover>
                      <div className="px-6 py-4 rounded-lg bg-accent text-white font-semibold cursor-pointer select-none">
                        Hover & Press Me
                      </div>
                    </SpringHover>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Spring Hover (Cards)</CardTitle>
                    <CardDescription>Wrap any element for spring interaction</CardDescription>
                  </CardHeader>
                  <CardContent className="flex gap-4 justify-center py-6">
                    {["primary", "accent", "secondary"].map((v) => (
                      <SpringHover key={v}>
                        <Button variant={v as "primary" | "accent" | "secondary"}>{v}</Button>
                      </SpringHover>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Combined: Check + Confetti</CardTitle>
                    <CardDescription>Trigger both for celebratory feedback</CardDescription>
                  </CardHeader>
                  <CardContent className="flex items-center justify-center py-8">
                    <CombinedDelightDemo />
                  </CardContent>
                </Card>
              </div>
            </section>

            <section>
              <Typography variant="h2" className="mb-8 border-b border-border pb-2">Grid System</Typography>
              <Typography variant="body" className="text-text-secondary mb-8">
                Geist-inspired three-tier grid: GridSystem (container) &gt; GridSystem.Grid (row) &gt; GridSystem.Cell (unit). Toggle <code className="text-accent font-mono text-sm">showGuides</code> to see column alignment.
              </Typography>

              <div className="space-y-8">
                <div className="space-y-4">
                  <Typography variant="h3">12-Column with Guides</Typography>
                  <div className="border border-border rounded-lg overflow-hidden p-4 bg-surface">
                    <GridSystem showGuides>
                      <GridSystem.Grid>
                        <GridSystem.Cell span={4}>
                          <div className="bg-accent/20 border border-accent/40 rounded-md p-4 text-center text-sm">span 4</div>
                        </GridSystem.Cell>
                        <GridSystem.Cell span={4}>
                          <div className="bg-accent/20 border border-accent/40 rounded-md p-4 text-center text-sm">span 4</div>
                        </GridSystem.Cell>
                        <GridSystem.Cell span={4}>
                          <div className="bg-accent/20 border border-accent/40 rounded-md p-4 text-center text-sm">span 4</div>
                        </GridSystem.Cell>
                      </GridSystem.Grid>
                    </GridSystem>
                  </div>
                </div>

                <div className="space-y-4">
                  <Typography variant="h3">Mixed Spans</Typography>
                  <div className="border border-border rounded-lg overflow-hidden p-4 bg-surface">
                    <GridSystem>
                      <GridSystem.Grid>
                        <GridSystem.Cell span={8}>
                          <div className="bg-primary/20 border border-primary/40 rounded-md p-4 text-center text-sm">Main (8)</div>
                        </GridSystem.Cell>
                        <GridSystem.Cell span={4}>
                          <div className="bg-primary/20 border border-primary/40 rounded-md p-4 text-center text-sm">Sidebar (4)</div>
                        </GridSystem.Cell>
                      </GridSystem.Grid>
                      <GridSystem.Grid>
                        <GridSystem.Cell span={3}>
                          <div className="bg-info/20 border border-info/40 rounded-md p-4 text-center text-sm">3</div>
                        </GridSystem.Cell>
                        <GridSystem.Cell span={6}>
                          <div className="bg-info/20 border border-info/40 rounded-md p-4 text-center text-sm">6</div>
                        </GridSystem.Cell>
                        <GridSystem.Cell span={3}>
                          <div className="bg-info/20 border border-info/40 rounded-md p-4 text-center text-sm">3</div>
                        </GridSystem.Cell>
                      </GridSystem.Grid>
                    </GridSystem>
                  </div>
                </div>

                <div className="space-y-4">
                  <Typography variant="h3">Offset Cells</Typography>
                  <div className="border border-border rounded-lg overflow-hidden p-4 bg-surface">
                    <GridSystem showGuides>
                      <GridSystem.Grid>
                        <GridSystem.Cell span={4} offset={2}>
                          <div className="bg-success/20 border border-success/40 rounded-md p-4 text-center text-sm">offset 2, span 4</div>
                        </GridSystem.Cell>
                        <GridSystem.Cell span={4}>
                          <div className="bg-success/20 border border-success/40 rounded-md p-4 text-center text-sm">span 4</div>
                        </GridSystem.Cell>
                      </GridSystem.Grid>
                    </GridSystem>
                  </div>
                </div>
              </div>
            </section>
    </>
  );
}

export { FoundationsShowcase };
