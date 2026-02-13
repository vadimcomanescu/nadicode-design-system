'use client'

import {
    Bar,
    BarChart as RechartsBarChart,
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

interface BarChartProps {
    data: Record<string, unknown>[]
    config: ChartConfig
    indexKey: string
    bars?: string[]
    stacked?: boolean
    layout?: "vertical" | "horizontal"
    className?: string
    showLegend?: boolean
    showYAxis?: boolean
    yAxisWidth?: number
}

export function BarChart({
    data,
    config,
    indexKey,
    bars,
    stacked = false,
    layout = "horizontal",
    className,
    showLegend = true,
    showYAxis = false,
    yAxisWidth = 40,
}: BarChartProps) {
    const barKeys = bars || Object.keys(config).filter(key => key !== indexKey)

    return (
        <ChartContainer config={config} className={className}>
            <RechartsBarChart
                data={data}
                layout={layout}
                margin={{
                    top: 5,
                    right: 10,
                    left: 10,
                    bottom: 0,
                }}
            >
                <CartesianGrid vertical={false} stroke="var(--color-border)" strokeOpacity={0.4} strokeDasharray="4 4" />

                {layout === "horizontal" ? (
                    <>
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
                    </>
                ) : (
                    <>
                        <XAxis type="number" hide />
                        <YAxis
                            dataKey={indexKey}
                            type="category"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={10}
                            width={100}
                        />
                    </>
                )}

                <ChartTooltip
                    cursor={{ fill: "var(--color-surface-hover)", opacity: 0.5 }}
                    content={<ChartTooltipContent indicator="dot" />}
                />

                {barKeys.map((key) => (
                    <Bar
                        key={key}
                        dataKey={key}
                        fill={`var(--color-${key})`}
                        stackId={stacked ? "a" : undefined}
                        radius={stacked ? [0, 0, 0, 0] : [4, 4, 0, 0]}
                    />
                ))}

                {showLegend && <ChartLegend content={<ChartLegendContent />} />}
            </RechartsBarChart>
        </ChartContainer>
    )
}
