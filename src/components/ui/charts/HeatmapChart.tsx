import {
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
    Cell
} from "recharts"

import {
    ChartContainer,
    ChartTooltip,
    type ChartConfig,
} from "../../ui/Chart"

interface HeatmapChartProps {
    data: { x: any; y: any; value: number }[]
    config: ChartConfig
    className?: string
    height?: number | string
    xKey?: string // defaults to "x"
    yKey?: string // defaults to "y"
    valueKey?: string // defaults to "value"
}

export function HeatmapChart({
    data,
    config,
    className,
    height = 300,
    xKey = "x",
    yKey = "y",
    valueKey = "value"
}: HeatmapChartProps) {

    // 1. Determine unique X and Y categories for axes (recharts handles this via type="category")


    // 2. Find min/max values to calculate color intensity
    const values = data.map(d => (d as any)[valueKey])
    const minVal = Math.min(...values)
    const maxVal = Math.max(...values)

    // Helper to determine color based on value (Low/Mid/High)
    const getColor = (val: number) => {
        const percentage = (val - minVal) / (maxVal - minVal)
        if (percentage < 0.33) return `rgb(var(--chart-2))` // Cyan (Low)
        if (percentage < 0.66) return `rgb(var(--chart-1))` // Indigo (Mid)
        return `rgb(var(--chart-5))` // Pink (High)
    }

    const CustomShape = (props: any) => {
        const { cx, cy, fill, fillOpacity, stroke, strokeWidth, strokeOpacity } = props
        const size = 24 // Adjusted size to prevent overlap
        // We render a rect centered at (cx, cy)
        return (
            <rect
                x={cx - size}
                y={cy - size / 2}
                width={size * 2}
                height={size}
                fill={fill}
                fillOpacity={fillOpacity}
                stroke={stroke}
                strokeWidth={strokeWidth}
                strokeOpacity={strokeOpacity}
                rx={4} // Rounded corners
                ry={4}
            />
        )
    }

    return (
        <ChartContainer config={config} className={className}>
            <ResponsiveContainer width="100%" height={height as any}>
                <ScatterChart
                    margin={{ top: 20, right: 30, bottom: 20, left: 30 }}
                >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} vertical={false} stroke="var(--color-border)" opacity={0.3} />

                    <XAxis
                        type="category"
                        dataKey={xKey}
                        allowDuplicatedCategory={false}
                        tick={{ fill: "rgb(var(--color-text-primary))", fontSize: 13, fontWeight: 500 }}
                        tickLine={false}
                        axisLine={false}
                        interval={0}
                    />
                    <YAxis
                        type="category"
                        dataKey={yKey}
                        allowDuplicatedCategory={false}
                        tick={{ fill: "rgb(var(--color-text-primary))", fontSize: 13, fontWeight: 500 }}
                        tickLine={false}
                        axisLine={false}
                        interval={0}
                    />

                    <ChartTooltip
                        cursor={{ strokeDasharray: '3 3' }}
                        content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                                const d = payload[0].payload
                                return (
                                    <div className="rounded-lg border border-border bg-background p-2 shadow-sm">
                                        <div className="grid grid-cols-2 gap-2">
                                            <span className="font-medium text-text-secondary">{(d as any)[xKey]} / {(d as any)[yKey]}</span>
                                            <span className="font-bold text-text-primary text-right">{(d as any)[valueKey]}</span>
                                        </div>
                                    </div>
                                )
                            }
                            return null
                        }}
                    />

                    <Scatter data={data} shape={<CustomShape />}>
                        {data.map((entry, index) => {
                            return (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={getColor((entry as any)[valueKey])}
                                    fillOpacity={0.9}
                                    stroke={getColor((entry as any)[valueKey])}
                                    strokeWidth={1}
                                    strokeOpacity={1}
                                />
                            )
                        })}
                    </Scatter>
                </ScatterChart>
            </ResponsiveContainer>
        </ChartContainer>
    )
}
