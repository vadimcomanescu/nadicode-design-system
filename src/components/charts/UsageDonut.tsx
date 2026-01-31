"use client"

import { Pie, PieChart, ResponsiveContainer, Cell, Tooltip } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/Card"

const data = [
    { name: "Vector DB", value: 400 },
    { name: "Model Storage", value: 300 },
    { name: "Logs", value: 300 },
    { name: "Cache", value: 200 },
]

const COLORS = [
    'var(--chart-1)',
    'var(--chart-2)',
    'var(--chart-3)',
    'var(--chart-4)'
];

export function UsageDonut() {
    return (
        <Card variant="glass" className="w-[350px]">
            <CardHeader>
                <CardTitle>Storage</CardTitle>
                <CardDescription>Distribution of data types</CardDescription>
            </CardHeader>
            <CardContent className="pb-4">
                <div className="h-[240px] relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                                stroke="none"
                            >
                                {data.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'rgba(5,5,5,0.9)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '8px',
                                    color: 'white'
                                }}
                                itemStyle={{ color: 'white' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-3xl font-bold text-text-primary">1.2<span className="text-lg text-text-secondary">GB</span></span>
                        <span className="text-xs text-text-tertiary uppercase tracking-wider">Used</span>
                    </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                    {data.map((item, index) => (
                        <div key={item.name} className="flex items-center gap-2 text-text-secondary">
                            <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                            {item.name}
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
