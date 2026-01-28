import { cn } from "../../lib/utils"
import { Button } from "./Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./Card"

interface PromoCardProps extends React.ComponentProps<typeof Card> {
    title?: string
    description?: string
    actionLabel?: string
    onAction?: () => void
}

export function PromoCard({
    className,
    title = "Upgrade to Pro",
    description = "Unlock all features and get unlimited access.",
    actionLabel = "Upgrade",
    onAction,
    ...props
}: PromoCardProps) {
    return (
        <Card
            className={cn(
                "relative overflow-hidden border-border bg-background/50 backdrop-blur-sm transition-all hover:shadow-md",
                "before:absolute before:inset-0 before:-z-10 before:rounded-xl before:p-[1px]",
                "before:bg-gradient-to-b before:from-primary/20 before:to-transparent",
                "dark:before:from-primary/10 dark:before:to-transparent",
                className
            )}
            {...props}
        >
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-50" />
            <CardHeader className="p-4 pt-4 relative">
                <CardTitle className="text-sm font-semibold tracking-tight text-foreground">
                    {title}
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground mt-1">
                    {description}
                </CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0 relative">
                <Button
                    size="sm"
                    className="w-full shadow-sm bg-primary text-primary-foreground hover:bg-primary/90"
                    onClick={onAction}
                >
                    {actionLabel}
                </Button>
            </CardContent>
        </Card>
    )
}
