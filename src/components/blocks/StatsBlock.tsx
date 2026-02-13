'use client'

import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card"
import { PixelReveal } from "../ui/text-effects"
import { ArrowDownRightIcon, ArrowUpRightIcon, DollarSignIcon, ActivityIcon, CreditCardIcon } from "@/components/ui/icons"
import { UsersIcon } from "../ui/icons/users"

export function StatsGeneric() {
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card pixelTheme="encryption">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-text-secondary">
                        Total Revenue
                    </CardTitle>
                    <DollarSignIcon size={16} className="text-text-tertiary" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-text-primary tabular-nums">
                        $<PixelReveal text="45,231.89" delay={200} />
                    </div>
                    <div className="text-xs text-text-secondary flex items-center mt-1">
                        <ArrowUpRightIcon size={12} className="text-success mr-1" />
                        <span className="text-success font-medium">+20.1%</span>
                        <span className="ml-1">from last month</span>
                    </div>
                </CardContent>
            </Card>
            <Card pixelTheme="encryption">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-text-secondary">
                        Subscriptions
                    </CardTitle>
                    <UsersIcon size={16} className="text-text-tertiary" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-text-primary tabular-nums">
                        +<PixelReveal text="2350" delay={400} />
                    </div>
                    <div className="text-xs text-text-secondary flex items-center mt-1">
                        <ArrowUpRightIcon size={12} className="text-success mr-1" />
                        <span className="text-success font-medium">+180.1%</span>
                        <span className="ml-1">from last month</span>
                    </div>
                </CardContent>
            </Card>
            <Card pixelTheme="encryption">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-text-secondary">Sales</CardTitle>
                    <CreditCardIcon size={16} className="text-text-tertiary" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-text-primary tabular-nums">
                        +<PixelReveal text="12,234" delay={600} />
                    </div>
                    <div className="text-xs text-text-secondary flex items-center mt-1">
                        <ArrowDownRightIcon size={12} className="text-destructive mr-1" />
                        <span className="text-destructive font-medium">-19%</span>
                        <span className="ml-1">from last month</span>
                    </div>
                </CardContent>
            </Card>
            <Card pixelTheme="encryption">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-text-secondary">
                        Active Now
                    </CardTitle>
                    <ActivityIcon size={16} className="text-text-tertiary" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-text-primary tabular-nums">
                        +<PixelReveal text="573" delay={800} />
                    </div>
                    <div className="text-xs text-text-secondary flex items-center mt-1">
                        <ArrowUpRightIcon size={12} className="text-success mr-1" />
                        <span className="text-success font-medium">+201</span>
                        <span className="ml-1">since last hour</span>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
