'use client'

import {
    Pie,
    PieChart as RechartsPieChart,
    Cell
} from "recharts"

import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "../../ui/Chart"
import { cn } from "@/lib/utils"

interface PieChartProps {
    data: Record<string, unknown>[]
    config: ChartConfig
    dataKey: string
    nameKey: string
    variant?: "pie" | "donut"
    className?: string
    showLegend?: boolean
    innerRadius?: number | string
    outerRadius?: number | string
    label?: boolean
}

export function PieChart({
    data,
    config,
    dataKey,
    nameKey,
    variant = "donut",
    className,
    showLegend = true,
    innerRadius,
    outerRadius = "80%",
    label = false
}: PieChartProps) {

    // Default radii
    const finalInnerRadius = innerRadius ?? (variant === "donut" ? "60%" : 0)

    return (
        <ChartContainer config={config} className={cn("mx-auto aspect-square max-h-[300px]", className)}>
            <RechartsPieChart>
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                    data={data}
                    dataKey={dataKey}
                    nameKey={nameKey}
                    innerRadius={finalInnerRadius}
                    outerRadius={outerRadius}
                    strokeWidth={0} // Remove default stroke for cleaner look
                    label={label}
                >
                    {data.map((entry, index) => {
                        const key = String(entry[nameKey])
                        const configColor = config[key]?.color

                        return (
                            <Cell
                                key={`cell-${index}`}
                                fill={(entry.fill as string) || configColor || `var(--color-${key})`}
                                stroke="rgba(0,0,0,0)"
                            />
                        )
                    })}
                </Pie>
                {showLegend && <ChartLegend content={<ChartLegendContent />} className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center" />}
            </RechartsPieChart>
        </ChartContainer>
    )
}
