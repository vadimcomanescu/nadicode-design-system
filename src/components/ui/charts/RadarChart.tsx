"use client"

import {
    Radar,
    RadarChart as RechartsRadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
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

interface RadarChartProps {
    data: any[]
    config: ChartConfig
    indexKey: string // Key for the angle axis (labels like "Speed", "Reliability")
    series: string[] // Keys for the radar shapes
    className?: string
    showLegend?: boolean
    gridShape?: 'polygon' | 'circle'
    height?: number | string
}

export function RadarChart({
    data,
    config,
    indexKey,
    series,
    className,
    showLegend = true,
    gridShape = 'circle',
    height = 300
}: RadarChartProps) {

    const seriesKeys = series || Object.keys(config).filter(key => key !== indexKey)

    return (
        <ChartContainer config={config} className={className}>
            <ResponsiveContainer width="100%" height={height}>
                <RechartsRadarChart data={data} outerRadius="80%">
                    <PolarGrid gridType={gridShape} stroke="var(--color-border)" strokeOpacity={0.5} />
                    <PolarAngleAxis
                        dataKey={indexKey}
                        tick={{ fill: "var(--color-text-secondary)", fontSize: 12 }}
                    />
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent indicator="line" />}
                    />

                    {seriesKeys.map((key) => (
                        <Radar
                            key={key}
                            name={key}
                            dataKey={key}
                            stroke={`var(--color-${key})`}
                            fill={`var(--color-${key})`}
                            fillOpacity={0.4}
                        />
                    ))}

                    {showLegend && <ChartLegend content={<ChartLegendContent />} />}
                </RechartsRadarChart>
            </ResponsiveContainer>
        </ChartContainer>
    )
}
