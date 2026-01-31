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
        <Card variant="glass" className="w-[500px]">
            <CardHeader>
                <CardTitle>Token Usage</CardTitle>
                <CardDescription>Monthly inference token consumption</CardDescription>
            </CardHeader>
            <CardContent className="pb-4">
                <div className="h-[240px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <RechartsBarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
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
                                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                contentStyle={{
                                    backgroundColor: 'rgba(5,5,5,0.9)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '8px',
                                    color: 'white'
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
