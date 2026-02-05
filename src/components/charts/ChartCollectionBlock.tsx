import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  Line,
  LineChart,
  Pie,
  PieChart,
  Radar,
  RadarChart,
  PolarAngleAxis,
  PolarGrid,
  Bar,
  BarChart,
  RadialBar,
  RadialBarChart,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/Card"
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/Chart"

const areaData = [
  { month: "Jan", desktop: 186, mobile: 80 },
  { month: "Feb", desktop: 305, mobile: 200 },
  { month: "Mar", desktop: 237, mobile: 120 },
  { month: "Apr", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "Jun", desktop: 214, mobile: 140 },
]

const chartData = [
  { browser: "chrome", visitors: 275, fill: "rgb(var(--chart-1))" },
  { browser: "safari", visitors: 200, fill: "rgb(var(--chart-2))" },
  { browser: "firefox", visitors: 187, fill: "rgb(var(--chart-3))" },
  { browser: "edge", visitors: 173, fill: "rgb(var(--chart-4))" },
  { browser: "other", visitors: 90, fill: "rgb(var(--chart-5))" },
]

const radarData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 273 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
]

const radialData = [
  { browser: "chrome", visitors: 275, fill: "rgb(var(--chart-1))" },
  { browser: "safari", visitors: 200, fill: "rgb(var(--chart-2))" },
  { browser: "firefox", visitors: 187, fill: "rgb(var(--chart-3))" },
  { browser: "edge", visitors: 173, fill: "rgb(var(--chart-4))" },
  { browser: "other", visitors: 90, fill: "rgb(var(--chart-5))" },
]

const config = {
  desktop: {
    label: "Desktop",
    color: "rgb(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "rgb(var(--chart-2))",
  },
  chrome: { label: "Chrome", color: "rgb(var(--chart-1))" },
  safari: { label: "Safari", color: "rgb(var(--chart-2))" },
  firefox: { label: "Firefox", color: "rgb(var(--chart-3))" },
  edge: { label: "Edge", color: "rgb(var(--chart-4))" },
  other: { label: "Other", color: "rgb(var(--chart-5))" },
} satisfies ChartConfig

export function ChartCollectionBlock() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card variant="glass-panel">
        <CardHeader>
          <CardTitle>Area Chart</CardTitle>
          <CardDescription>Usage overview</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={config} className="h-[250px] w-full">
            <AreaChart
              data={areaData}
              margin={{ left: 12, right: 12, top: 12, bottom: 12 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                dataKey="desktop"
                type="natural"
                fill="rgb(var(--chart-1))"
                fillOpacity={0.4}
                stroke="rgb(var(--chart-1))"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card variant="glass-panel">
        <CardHeader>
          <CardTitle>Bar Chart</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={config} className="h-[250px] w-full">
            <BarChart
              data={areaData}
              margin={{ left: 12, right: 12, top: 12, bottom: 12 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="desktop" fill="rgb(var(--chart-1))" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card variant="glass-panel">
        <CardHeader>
          <CardTitle>Line Chart</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={config} className="h-[250px] w-full">
            <LineChart
              data={areaData}
              margin={{ left: 12, right: 12, top: 12, bottom: 12 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                dataKey="desktop"
                type="monotone"
                stroke="rgb(var(--chart-1))"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card variant="glass-panel">
        <CardHeader>
          <CardTitle>Pie Chart</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={config} className="mx-auto aspect-square max-h-[250px]">
            <PieChart>
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Pie
                data={chartData}
                dataKey="visitors"
                nameKey="browser"
                innerRadius={60}
              />
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card variant="glass-panel">
        <CardHeader>
          <CardTitle>Radar Chart</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={config} className="h-[250px] w-full">
            <RadarChart
              data={radarData}
              margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
            >
              <ChartTooltip content={<ChartTooltipContent />} />
              <PolarGrid />
              <PolarAngleAxis dataKey="month" />
              <Radar
                dataKey="desktop"
                fill="rgb(var(--chart-1))"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card variant="glass-panel">
        <CardHeader>
          <CardTitle>Radial Chart</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={config} className="h-[250px] w-full">
            <RadialBarChart
              data={radialData}
              innerRadius={40}
              outerRadius={100}
              margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
            >
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <RadialBar dataKey="visitors" background />
            </RadialBarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  )
}

