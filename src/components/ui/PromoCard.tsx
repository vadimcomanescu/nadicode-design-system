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
                "relative overflow-hidden shadow-sm",
                className
            )}
            {...props}
        >
            <CardHeader className="p-4 pt-4">
                <CardTitle className="text-sm font-semibold tracking-tight text-text-primary">
                    {title}
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground mt-1">
                    {description}
                </CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
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
