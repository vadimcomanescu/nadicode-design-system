'use client'

import { Typography } from "../../ui/Typography"
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/Card"
import { Grid } from "../../layout/Grid"
import { UsageDonut } from "../../blocks/UsageDonutBlock"
import { InteractiveAreaChart } from "../../blocks/InteractiveAreaChartBlock"
import { AreaChart } from "../../ui/charts/AreaChart"
import { BarChart } from "../../ui/charts/BarChart"
import { LineChart } from "../../ui/charts/LineChart"
import { PieChart } from "../../ui/charts/PieChart"
import { RadarChart } from "../../ui/charts/RadarChart"
import { RadialBarChart } from "../../ui/charts/RadialBarChart"
import { HeatmapChart } from "../../ui/charts/HeatmapChart"
import type { ChartConfig } from "../../ui/Chart"

// ---------------------------------------------------------------------------
// Sample data: monthly revenue & expenses (Area, Bar, Line)
// ---------------------------------------------------------------------------

const monthlyData = [
  { month: "Jan", revenue: 4200, expenses: 2800 },
  { month: "Feb", revenue: 5100, expenses: 3200 },
  { month: "Mar", revenue: 4800, expenses: 2900 },
  { month: "Apr", revenue: 6300, expenses: 3500 },
  { month: "May", revenue: 5900, expenses: 3100 },
  { month: "Jun", revenue: 7200, expenses: 3800 },
]

const monthlyConfig: ChartConfig = {
  revenue: { label: "Revenue", color: "rgb(var(--chart-1))" },
  expenses: { label: "Expenses", color: "rgb(var(--chart-2))" },
}

// ---------------------------------------------------------------------------
// Sample data: browser market share (Pie)
// ---------------------------------------------------------------------------

const browserData = [
  { browser: "chrome", share: 62, fill: "rgb(var(--chart-1))" },
  { browser: "safari", share: 19, fill: "rgb(var(--chart-2))" },
  { browser: "firefox", share: 9, fill: "rgb(var(--chart-3))" },
  { browser: "edge", share: 6, fill: "rgb(var(--chart-4))" },
  { browser: "other", share: 4, fill: "rgb(var(--chart-5))" },
]

const browserConfig: ChartConfig = {
  chrome: { label: "Chrome", color: "rgb(var(--chart-1))" },
  safari: { label: "Safari", color: "rgb(var(--chart-2))" },
  firefox: { label: "Firefox", color: "rgb(var(--chart-3))" },
  edge: { label: "Edge", color: "rgb(var(--chart-4))" },
  other: { label: "Other", color: "rgb(var(--chart-5))" },
}

// ---------------------------------------------------------------------------
// Sample data: skill comparison (Radar)
// ---------------------------------------------------------------------------

const skillsData = [
  { skill: "Frontend", alice: 90, bob: 70 },
  { skill: "Backend", alice: 65, bob: 85 },
  { skill: "Design", alice: 80, bob: 50 },
  { skill: "Testing", alice: 70, bob: 75 },
  { skill: "DevOps", alice: 55, bob: 90 },
  { skill: "Communication", alice: 85, bob: 60 },
]

const skillsConfig: ChartConfig = {
  alice: { label: "Alice", color: "rgb(var(--chart-1))" },
  bob: { label: "Bob", color: "rgb(var(--chart-3))" },
}

// ---------------------------------------------------------------------------
// Sample data: storage usage (RadialBar)
// ---------------------------------------------------------------------------

const storageData = [
  { category: "documents", usage: 72, fill: "rgb(var(--chart-1))" },
  { category: "photos", usage: 58, fill: "rgb(var(--chart-2))" },
  { category: "videos", usage: 45, fill: "rgb(var(--chart-3))" },
  { category: "backups", usage: 30, fill: "rgb(var(--chart-4))" },
]

const storageConfig: ChartConfig = {
  documents: { label: "Documents", color: "rgb(var(--chart-1))" },
  photos: { label: "Photos", color: "rgb(var(--chart-2))" },
  videos: { label: "Videos", color: "rgb(var(--chart-3))" },
  backups: { label: "Backups", color: "rgb(var(--chart-4))" },
}

// ---------------------------------------------------------------------------
// Sample data: weekly activity heatmap (5 days x 5 time slots)
// ---------------------------------------------------------------------------

const heatmapData: { x: string; y: string; value: number }[] = [
  { x: "Mon", y: "9am", value: 32 },
  { x: "Mon", y: "11am", value: 68 },
  { x: "Mon", y: "1pm", value: 45 },
  { x: "Mon", y: "3pm", value: 78 },
  { x: "Mon", y: "5pm", value: 55 },
  { x: "Tue", y: "9am", value: 41 },
  { x: "Tue", y: "11am", value: 82 },
  { x: "Tue", y: "1pm", value: 37 },
  { x: "Tue", y: "3pm", value: 90 },
  { x: "Tue", y: "5pm", value: 60 },
  { x: "Wed", y: "9am", value: 25 },
  { x: "Wed", y: "11am", value: 55 },
  { x: "Wed", y: "1pm", value: 70 },
  { x: "Wed", y: "3pm", value: 48 },
  { x: "Wed", y: "5pm", value: 35 },
  { x: "Thu", y: "9am", value: 50 },
  { x: "Thu", y: "11am", value: 95 },
  { x: "Thu", y: "1pm", value: 62 },
  { x: "Thu", y: "3pm", value: 85 },
  { x: "Thu", y: "5pm", value: 40 },
  { x: "Fri", y: "9am", value: 28 },
  { x: "Fri", y: "11am", value: 72 },
  { x: "Fri", y: "1pm", value: 53 },
  { x: "Fri", y: "3pm", value: 65 },
  { x: "Fri", y: "5pm", value: 22 },
]

const heatmapConfig: ChartConfig = {
  activity: { label: "Activity", color: "rgb(var(--chart-1))" },
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

function ChartsShowcase() {
  return (
    <section className="space-y-16">
      <Typography variant="h2" className="mb-8 border-b border-border pb-2">
        Data Visualization & Charts
      </Typography>

      {/* Chart Primitives */}
      <div className="space-y-6">
        <Typography variant="h3">Chart Primitives</Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="glass-panel">
            <CardHeader>
              <CardTitle>Area Chart</CardTitle>
            </CardHeader>
            <CardContent>
              <AreaChart
                data={monthlyData}
                config={monthlyConfig}
                indexKey="month"
                showYAxis
              />
            </CardContent>
          </Card>

          <Card className="glass-panel">
            <CardHeader>
              <CardTitle>Bar Chart</CardTitle>
            </CardHeader>
            <CardContent>
              <BarChart
                data={monthlyData}
                config={monthlyConfig}
                indexKey="month"
                showYAxis
              />
            </CardContent>
          </Card>

          <Card className="glass-panel">
            <CardHeader>
              <CardTitle>Line Chart</CardTitle>
            </CardHeader>
            <CardContent>
              <LineChart
                data={monthlyData}
                config={monthlyConfig}
                indexKey="month"
                showYAxis
              />
            </CardContent>
          </Card>

          <Card className="glass-panel">
            <CardHeader>
              <CardTitle>Pie Chart (Donut)</CardTitle>
            </CardHeader>
            <CardContent>
              <PieChart
                data={browserData}
                config={browserConfig}
                dataKey="share"
                nameKey="browser"
                variant="donut"
              />
            </CardContent>
          </Card>

          <Card className="glass-panel">
            <CardHeader>
              <CardTitle>Radar Chart</CardTitle>
            </CardHeader>
            <CardContent>
              <RadarChart
                data={skillsData}
                config={skillsConfig}
                indexKey="skill"
                series={["alice", "bob"]}
                gridShape="polygon"
              />
            </CardContent>
          </Card>

          <Card className="glass-panel">
            <CardHeader>
              <CardTitle>Radial Bar Chart</CardTitle>
            </CardHeader>
            <CardContent>
              <RadialBarChart
                data={storageData}
                config={storageConfig}
                dataKey="usage"
                nameKey="category"
              />
            </CardContent>
          </Card>

          <Card className="glass-panel md:col-span-2">
            <CardHeader>
              <CardTitle>Heatmap Chart</CardTitle>
            </CardHeader>
            <CardContent>
              <HeatmapChart
                data={heatmapData}
                config={heatmapConfig}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Block-level Demos */}
      <Grid cols={1} gap="xl">
        <div className="space-y-4">
          <Typography variant="h3">Usage Donut</Typography>
          <UsageDonut />
        </div>
        <div className="space-y-4">
          <Typography variant="h3">Interactive Area Chart</Typography>
          <InteractiveAreaChart />
        </div>
      </Grid>
    </section>
  )
}

export { ChartsShowcase }
