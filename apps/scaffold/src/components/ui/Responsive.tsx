'use client'

import { ResizablePanel, ResizableHandle } from "./Resizable"
import { cn } from "../../lib/utils"
import * as React from "react"

type ResponsivePanelProps = React.ComponentProps<typeof ResizablePanel> & {
    mobileBehavior?: "hide" | "show"
}

function ResponsivePanel({ className, mobileBehavior = "hide", ...props }: ResponsivePanelProps) {
    return (
        <ResizablePanel
            className={cn(
                mobileBehavior === "hide" && "hidden md:flex",
                className
            )}
            {...props}
        />
    )
}
ResponsivePanel.displayName = "ResponsivePanel"

type ResponsiveHandleProps = React.ComponentProps<typeof ResizableHandle> & {
    mobileBehavior?: "hide" | "show"
}

function ResponsiveHandle({ className, mobileBehavior = "hide", ...props }: ResponsiveHandleProps) {
    return (
        <ResizableHandle
            className={cn(
                mobileBehavior === "hide" && "hidden md:flex",
                className
            )}
            {...props}
        />
    )
}
ResponsiveHandle.displayName = "ResponsiveHandle"

export { ResponsivePanel, ResponsiveHandle }
