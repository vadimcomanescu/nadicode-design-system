import {
    Area,
    AreaChart as RechartsAreaChart,
    CartesianGrid,
    XAxis,
    YAxis,
    ResponsiveContainer
} from "recharts"

import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "../../ui/Chart"

interface AreaChartProps {
    data: any[]
    config: ChartConfig
    indexKey: string
    areas?: string[] // Keys to plot
    stacked?: boolean
    className?: string
    showLegend?: boolean
    showYAxis?: boolean
    yAxisWidth?: number
}

export function AreaChart({
    data,
    config,
    indexKey,
    areas,
    stacked = false,
    className,
    showLegend = true,
    showYAxis = false,
    yAxisWidth = 40,
}: AreaChartProps) {
    const areaKeys = areas || Object.keys(config).filter(key => key !== indexKey)

    return (
        <ChartContainer config={config} className={className}>
            <ResponsiveContainer width="100%" height={300}>
                <RechartsAreaChart
                    data={data}
                    margin={{
                        top: 5,
                        right: 10,
                        left: 10,
                        bottom: 0,
                    }}
                >
                    <defs>
                        {areaKeys.map(key => (
                            <linearGradient key={key} id={`fill-${key}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={`var(--color-${key})`} stopOpacity={0.8} />
                                <stop offset="95%" stopColor={`var(--color-${key})`} stopOpacity={0.1} />
                            </linearGradient>
                        ))}
                    </defs>
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

                    {areaKeys.map((key) => (
                        <Area
                            key={key}
                            dataKey={key}
                            type="natural"
                            fill={`url(#fill-${key})`}
                            stroke={`var(--color-${key})`}
                            stackId={stacked ? "a" : undefined}
                            strokeWidth={2}
                            isAnimationActive={true}
                            animationDuration={800}
                            animationEasing="ease-out"
                        />
                    ))}

                    {showLegend && <ChartLegend content={<ChartLegendContent />} />}
                </RechartsAreaChart>
            </ResponsiveContainer>
        </ChartContainer>
    )
}
