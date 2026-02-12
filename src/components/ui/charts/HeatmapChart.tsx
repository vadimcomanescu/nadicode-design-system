'use client'

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
    data: { x: string | number; y: string | number; value: number }[]
    config: ChartConfig
    className?: string
    height?: number | string
    xKey?: string // defaults to "x"
    yKey?: string // defaults to "y"
    valueKey?: string // defaults to "value"
}

function CustomShape(props: Record<string, unknown>) {
    const { cx, cy, fill, fillOpacity, stroke, strokeWidth, strokeOpacity } = props as { cx: number; cy: number; fill: string; fillOpacity: number; stroke: string; strokeWidth: number; strokeOpacity: number }
    const size = 24
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
            rx={4}
            ry={4}
        />
    )
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

    const values = data.map(d => (d as Record<string, unknown>)[valueKey] as number)
    const minVal = Math.min(...values)
    const maxVal = Math.max(...values)

    const getColor = (val: number) => {
        const percentage = (val - minVal) / (maxVal - minVal)
        if (percentage < 0.33) return `rgb(var(--chart-2))`
        if (percentage < 0.66) return `rgb(var(--chart-1))`
        return `rgb(var(--chart-5))`
    }

    return (
        <ChartContainer config={config} className={className}>
            <ResponsiveContainer width="100%" height={height as number | `${number}%`}>
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
                                const d = payload[0].payload as Record<string, unknown>
                                return (
                                    <div className="rounded-lg border border-border bg-background p-2 shadow-sm">
                                        <div className="grid grid-cols-2 gap-2">
                                            <span className="font-medium text-text-secondary">{String(d[xKey])} / {String(d[yKey])}</span>
                                            <span className="font-bold text-text-primary text-right">{String(d[valueKey])}</span>
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
                                    fill={getColor((entry as Record<string, unknown>)[valueKey] as number)}
                                    fillOpacity={0.9}
                                    stroke={getColor((entry as Record<string, unknown>)[valueKey] as number)}
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
