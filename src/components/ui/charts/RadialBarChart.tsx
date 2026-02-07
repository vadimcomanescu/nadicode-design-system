"use client"

import {
    RadialBar,
    RadialBarChart as RechartsRadialBarChart,
    PolarAngleAxis,
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

interface RadialBarChartProps {
    data: any[]
    config: ChartConfig
    dataKey: string // Value key
    nameKey: string // Name key
    className?: string
    showLegend?: boolean
    innerRadius?: number | string
    outerRadius?: number | string
    height?: number | string
    maxAngle?: number // 360 for full circle, 180 for semi-circle
}

export function RadialBarChart({
    data,
    config,
    dataKey,
    nameKey,
    className,
    showLegend = true,
    innerRadius = "20%",
    outerRadius = "100%",
    height = 300,
    maxAngle = 360
}: RadialBarChartProps) {

    return (
        <ChartContainer config={config} className={className}>
            <ResponsiveContainer width="100%" height={height}>
                <RechartsRadialBarChart
                    data={data}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    startAngle={90}
                    endAngle={90 - maxAngle}
                >
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel nameKey={nameKey} />}
                    />
                    {/* 
            Recharts RadialBar background doesn't work well with transparency in dark mode usually, 
            so we omit it or keep it simple. 
          */}
                    <RadialBar
                        dataKey={dataKey}
                        background={{ fill: "var(--color-surface)", opacity: 0.3 }}
                        cornerRadius={4}
                    />
                    <PolarAngleAxis type="number" domain={[0, 'auto']} tick={false} />

                    {showLegend && <ChartLegend content={<ChartLegendContent />} />}
                </RechartsRadialBarChart>
            </ResponsiveContainer>
        </ChartContainer>
    )
}
