'use client'

import {
    Line,
    LineChart as RechartsLineChart,
    CartesianGrid,
    XAxis,
    YAxis,
} from "recharts"

import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "../../ui/Chart"

interface LineChartProps {
    data: Record<string, unknown>[]
    config: ChartConfig
    indexKey: string
    lines?: string[] // Simple list of keys to plot. If undefined, plots all keys in config that aren't the indexKey.
    className?: string
    showLegend?: boolean
    showYAxis?: boolean
    yAxisWidth?: number
}

export function LineChart({
    data,
    config,
    indexKey,
    lines,
    className,
    showLegend = true,
    showYAxis = false,
    yAxisWidth = 40,
}: LineChartProps) {
    // If lines are not provided, derive them from config keys
    const lineKeys = lines || Object.keys(config).filter(key => key !== indexKey)

    return (
        <ChartContainer config={config} className={className}>
            <RechartsLineChart
                data={data}
                margin={{
                    top: 5,
                    right: 10,
                    left: 10,
                    bottom: 0,
                }}
            >
                <CartesianGrid vertical={false} stroke="var(--color-border)" strokeOpacity={0.4} strokeDasharray="4 4" />
                <XAxis
                    dataKey={indexKey}
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    minTickGap={32}
                    tickFormatter={(value) => {
                        if (value instanceof Date) return value.toLocaleDateString()
                        return `${value}`
                    }}
                />
                {showYAxis && (
                    <YAxis
                        width={yAxisWidth}
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        stroke="var(--color-text-secondary)"
                    />
                )}
                <ChartTooltip
                    cursor={{
                        stroke: "var(--color-border)",
                        strokeWidth: 1,
                        strokeDasharray: "4 4"
                    }}
                    content={<ChartTooltipContent indicator="dot" />}
                />

                {lineKeys.map((key) => (
                    <Line
                        key={key}
                        dataKey={key}
                        type="monotone"
                        stroke={`var(--color-${key})`}
                        strokeWidth={2}
                        dot={false}
                        activeDot={{
                            r: 4,
                            strokeWidth: 0,
                            fill: `var(--color-${key})`
                        }}
                    />
                ))}

                {showLegend && <ChartLegend content={<ChartLegendContent />} />}
            </RechartsLineChart>
        </ChartContainer>
    )
}
