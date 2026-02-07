import { BarChart as BarChartPrimitive } from "../ui/charts/BarChart"
import { type ChartConfig } from "../ui/Chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/Card"

const data = [
    {
        name: "Jan",
        total: Math.floor(Math.random() * 5000) + 1000,
        prediction: Math.floor(Math.random() * 3000) + 500,
    },
    {
        name: "Feb",
        total: Math.floor(Math.random() * 5000) + 1000,
        prediction: Math.floor(Math.random() * 3000) + 500,
    },
    {
        name: "Mar",
        total: Math.floor(Math.random() * 5000) + 1000,
        prediction: Math.floor(Math.random() * 3000) + 500,
    },
    {
        name: "Apr",
        total: Math.floor(Math.random() * 5000) + 1000,
        prediction: Math.floor(Math.random() * 3000) + 500,
    },
    {
        name: "May",
        total: Math.floor(Math.random() * 5000) + 1000,
        prediction: Math.floor(Math.random() * 3000) + 500,
    },
    {
        name: "Jun",
        total: Math.floor(Math.random() * 5000) + 1000,
        prediction: Math.floor(Math.random() * 3000) + 500,
    },
]

const chartConfig = {
    total: { label: "Total", color: "hsl(var(--chart-1))" },
    prediction: { label: "Prediction", color: "hsl(var(--chart-2))" },
} satisfies ChartConfig

export function BarChart() {
    return (
        <Card variant="glass-panel" className="w-full">
            <CardHeader>
                <CardTitle>Token Usage</CardTitle>
                <CardDescription>Monthly inference token consumption</CardDescription>
            </CardHeader>
            <CardContent className="pb-4">
                <BarChartPrimitive
                    data={data}
                    config={chartConfig}
                    indexKey="name"
                    bars={["total", "prediction"]}
                    stacked
                    height={240}
                />
            </CardContent>
        </Card>
    )
}
