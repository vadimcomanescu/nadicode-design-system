"use client"

import { Bar, BarChart as RechartsBarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"
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

export function BarChart() {
    return (
        <Card variant="glass" className="w-full">
            <CardHeader>
                <CardTitle>Token Usage</CardTitle>
                <CardDescription>Monthly inference token consumption</CardDescription>
            </CardHeader>
            <CardContent className="pb-4">
                <div className="h-[240px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <RechartsBarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" opacity={0.5} />
                            <XAxis
                                dataKey="name"
                                stroke="var(--color-text-secondary)"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                            />
                            <YAxis
                                stroke="var(--color-text-secondary)"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value) => `$${value}`}
                            />
                            <Tooltip
                                cursor={{ fill: 'var(--color-muted)', opacity: 0.2 }}
                                contentStyle={{
                                    backgroundColor: 'var(--color-background)',
                                    borderColor: 'var(--color-border)',
                                    borderRadius: '8px',
                                    color: 'var(--color-text-primary)'
                                }}
                            />
                            <Bar
                                dataKey="prediction"
                                stackId="a"
                                fill="var(--chart-2)"
                                radius={[0, 0, 4, 4]}
                                className="opacity-70"
                            />
                            <Bar
                                dataKey="total"
                                stackId="a"
                                fill="var(--chart-1)"
                                radius={[4, 4, 0, 0]}
                            />
                        </RechartsBarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}
