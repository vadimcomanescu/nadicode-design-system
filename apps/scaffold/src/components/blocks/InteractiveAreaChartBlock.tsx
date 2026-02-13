'use client'

import * as React from "react"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/Card"
import {
    type ChartConfig,
} from "../ui/Chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/Select"
import { AreaChart as AreaChartPrimitive } from "../ui/charts/AreaChart"

// Generate data for the last 3 months + some buffer
const chartData = Array.from({ length: 100 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (100 - i))
    return {
        date: date.toISOString().split("T")[0],
        desktop: Math.floor(Math.random() * 300) + 100, // Random value between 100-400
        mobile: Math.floor(Math.random() * 250) + 150,  // Random value between 150-400
    }
})

const chartConfig = {
    visitors: {
        label: "Visitors",
    },
    desktop: {
        label: "Desktop",
        color: "rgb(var(--chart-1))",
    },
    mobile: {
        label: "Mobile",
        color: "rgb(var(--chart-2))",
    },
} satisfies ChartConfig

export function InteractiveAreaChart() {
    const [timeRange, setTimeRange] = React.useState("90d")

    const filteredData = chartData.filter((item) => {
        const date = new Date(item.date)
        const now = new Date()
        let daysToSubtract = 90
        if (timeRange === "30d") {
            daysToSubtract = 30
        } else if (timeRange === "7d") {
            daysToSubtract = 7
        }
        now.setDate(now.getDate() - daysToSubtract)
        return date >= now
    })

    return (
        <Card >
            <CardHeader className="flex items-center gap-2 space-y-0 border-b border-border py-5 sm:flex-row">
                <div className="grid flex-1 gap-1 text-center sm:text-left">
                    <CardTitle>Traffic Analysis</CardTitle>
                    <CardDescription>
                        Showing total visitors for the last 3 months
                    </CardDescription>
                </div>
                <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger
                        className="w-[160px] rounded-lg sm:ml-auto"
                        aria-label="Select a value"
                    >
                        <SelectValue placeholder="Last 3 months" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                        <SelectItem value="90d" className="rounded-lg">
                            Last 3 months
                        </SelectItem>
                        <SelectItem value="30d" className="rounded-lg">
                            Last 30 days
                        </SelectItem>
                        <SelectItem value="7d" className="rounded-lg">
                            Last 7 days
                        </SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <AreaChartPrimitive
                    data={filteredData}
                    config={chartConfig}
                    indexKey="date"
                    areas={["mobile", "desktop"]}
                    stacked={true}
                />
            </CardContent>
        </Card>
    )
}
