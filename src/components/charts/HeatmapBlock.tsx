"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/Card"
import { HeatmapChart } from "../ui/charts/HeatmapChart"
import { type ChartConfig } from "../ui/Chart"

// Example: Activity Heatmap (Days vs Hours)
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const hours = ["Morning", "Afternoon", "Evening", "Night"]

const heatmapData = days.flatMap(day =>
    hours.map(hour => ({
        x: day,
        y: hour,
        value: Math.floor(Math.random() * 100) + 10 // Random activity level
    }))
)

// Config to define the base color
const heatmapConfig = {
    activity: {
        label: "Activity",
        color: "rgb(var(--chart-1))",
    }
} satisfies ChartConfig

export function HeatmapBlock() {
    return (
        <Card variant="glass-panel" className="w-full">
            <CardHeader>
                <CardTitle>User Activity Heatmap</CardTitle>
                <CardDescription>Intensity of user interactions by Day and Time</CardDescription>
            </CardHeader>
            <CardContent>
                <HeatmapChart
                    data={heatmapData}
                    config={heatmapConfig}
                    height={300}
                />
            </CardContent>
        </Card>
    )
}
