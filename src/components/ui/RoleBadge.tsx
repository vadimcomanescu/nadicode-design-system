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
    "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    {
        variants: {
            role: {
                owner:
                    "border-amber-500/50 bg-amber-500/10 text-amber-500 shadow-[0_0_10px_-4px_rgba(245,158,11,0.5)]",
                admin:
                    "border-purple-500/50 bg-purple-500/10 text-purple-500 shadow-[0_0_10px_-4px_rgba(168,85,247,0.5)]",
                member:
                    "border-white/10 bg-white/5 text-text-secondary hover:bg-white/10",
                guest:
                    "border-white/5 bg-transparent text-text-tertiary",
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
