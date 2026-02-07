"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card"
import { PixelReveal } from "../ui/PixelReveal"
import { ArrowDownRight, ArrowUpRight, DollarSign, Users, Activity, CreditCard } from "lucide-react"

export function StatsGeneric() {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card pixelTheme="encryption">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-text-secondary">
                        Total Revenue
                    </CardTitle>
                    <DollarSign className="h-4 w-4 text-text-tertiary" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-text-primary">
                        $<PixelReveal text="45,231.89" delay={200} />
                    </div>
                    <p className="text-xs text-text-secondary flex items-center mt-1">
                        <ArrowUpRight className="h-3 w-3 text-emerald-500 mr-1" />
                        <span className="text-emerald-500 font-medium">+20.1%</span>
                        <span className="ml-1">from last month</span>
                    </p>
                </CardContent>
            </Card>
            <Card pixelTheme="encryption">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-text-secondary">
                        Subscriptions
                    </CardTitle>
                    <Users className="h-4 w-4 text-text-tertiary" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-text-primary">
                        +<PixelReveal text="2350" delay={400} />
                    </div>
                    <p className="text-xs text-text-secondary flex items-center mt-1">
                        <ArrowUpRight className="h-3 w-3 text-emerald-500 mr-1" />
                        <span className="text-emerald-500 font-medium">+180.1%</span>
                        <span className="ml-1">from last month</span>
                    </p>
                </CardContent>
            </Card>
            <Card pixelTheme="encryption">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-text-secondary">Sales</CardTitle>
                    <CreditCard className="h-4 w-4 text-text-tertiary" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-text-primary">
                        +<PixelReveal text="12,234" delay={600} />
                    </div>
                    <p className="text-xs text-text-secondary flex items-center mt-1">
                        <ArrowDownRight className="h-3 w-3 text-rose-500 mr-1" />
                        <span className="text-rose-500 font-medium">-19%</span>
                        <span className="ml-1">from last month</span>
                    </p>
                </CardContent>
            </Card>
            <Card pixelTheme="encryption">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-text-secondary">
                        Active Now
                    </CardTitle>
                    <Activity className="h-4 w-4 text-text-tertiary" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-text-primary">
                        +<PixelReveal text="573" delay={800} />
                    </div>
                    <p className="text-xs text-text-secondary flex items-center mt-1">
                        <ArrowUpRight className="h-3 w-3 text-emerald-500 mr-1" />
                        <span className="text-emerald-500 font-medium">+201</span>
                        <span className="ml-1">since last hour</span>
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
