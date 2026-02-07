"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/Card"
import { PieChart as PieChartPrimitive } from "../ui/charts/PieChart"
import { type ChartConfig } from "../ui/Chart"

const data = [
    { name: "Vector DB", value: 400, fill: "rgb(var(--chart-1))" },
    { name: "Model Storage", value: 300, fill: "rgb(var(--chart-2))" },
    { name: "Logs", value: 300, fill: "rgb(var(--chart-3))" },
    { name: "Cache", value: 200, fill: "rgb(var(--chart-4))" },
]

const chartConfig = {
    "Vector DB": {
        label: "Vector DB",
        color: "rgb(var(--chart-1))",
    },
    "Model Storage": {
        label: "Model Storage",
        color: "rgb(var(--chart-2))",
    },
    "Logs": {
        label: "Logs",
        color: "rgb(var(--chart-3))",
    },
    "Cache": {
        label: "Cache",
        color: "rgb(var(--chart-4))",
    },
} satisfies ChartConfig

export function UsageDonut() {
    return (
        <Card variant="glass-panel" className="w-[350px]">
            <CardHeader>
                <CardTitle>Storage</CardTitle>
                <CardDescription>Distribution of data types</CardDescription>
            </CardHeader>
            <CardContent className="pb-4">
                <div className="h-[240px] relative">
                    <PieChartPrimitive
                        data={data}
                        config={chartConfig}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={60}
                        outerRadius={80}
                        height={240}
                        showLegend={false}
                        className="mx-auto aspect-square max-h-[240px]"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-3xl font-bold text-text-primary">1.2<span className="text-lg text-text-secondary">GB</span></span>
                        <span className="text-xs text-text-tertiary uppercase tracking-wider">Used</span>
                    </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                    {data.map((item) => (
                        <div key={item.name} className="flex items-center gap-2 text-text-secondary">
                            <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.fill }} />
                            {item.name}
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
