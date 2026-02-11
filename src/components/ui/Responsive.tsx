import * as React from "react"
import { ResizablePanel, ResizableHandle } from "./Resizable"
import { cn } from "../../lib/utils"

type ResponsivePanelProps = React.ComponentProps<typeof ResizablePanel> & {
    mobileBehavior?: "hide" | "show"
}

// Forward ref for Panel to ensure compatibility with library
// Using 'any' for ref type to bypass intricate primitive type mismatches temporarily, 
// as ResizablePrimitive types are complex.
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- ResizablePanel uses ImperativePanelHandle, not a DOM element
const ResponsivePanel = React.forwardRef<any, ResponsivePanelProps>(({ className, mobileBehavior = "hide", ...props }, ref) => {
    return (
        <ResizablePanel
            ref={ref}
            className={cn(
                mobileBehavior === "hide" && "hidden md:flex",
                className
            )}
            {...props}
        />
    )
})
ResponsivePanel.displayName = "ResponsivePanel"

type ResponsiveHandleProps = React.ComponentProps<typeof ResizableHandle> & {
    mobileBehavior?: "hide" | "show"
}

const ResponsiveHandle = ({ className, mobileBehavior = "hide", ...props }: ResponsiveHandleProps) => {
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
