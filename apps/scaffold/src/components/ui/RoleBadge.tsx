'use client'

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@radix-ui/react-tooltip"

const roleVariants = cva(
    "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
    {
        variants: {
            role: {
                owner:
                    "border-warning/50 bg-warning/10 text-warning shadow-[0_0_10px_-4px_rgba(var(--color-warning),0.5)]",
                admin:
                    "border-chart-5/50 bg-chart-5/10 text-chart-5 shadow-[0_0_10px_-4px_rgba(var(--chart-5),0.5)]",
                member:
                    "border-border/30 bg-surface-hover/50 text-text-secondary hover:bg-surface-hover",
                guest:
                    "border-border/10 bg-transparent text-text-tertiary",
            },
        },
        defaultVariants: {
            role: "member",
        },
    }
)

export interface RoleBadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof roleVariants> {
    role: "owner" | "admin" | "member" | "guest"
    description?: string
}

function RoleBadge({ className, role, description, ...props }: RoleBadgeProps) {
    const badge = (
        <div className={cn(roleVariants({ role }), className)} {...props}>
            {role.charAt(0).toUpperCase() + role.slice(1)}
        </div>
    )

    if (!description) return badge

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>{badge}</TooltipTrigger>
                <TooltipContent>
                    <p>{description}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export { RoleBadge, roleVariants }
